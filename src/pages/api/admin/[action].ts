import type { APIRoute } from 'astro';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import sharp from 'sharp';
import { login, cookieName, deleteSession, changePassword, session } from '../../../lib/server/auth.ts';
import { json, readJson, sameOrigin, authorised, setSession, limitedBody } from '../../../lib/server/http.ts';
import { dataDir, products, productById, validateProduct, saveProduct } from '../../../lib/server/store.ts';
export const prerender=false;
export const GET:APIRoute=context=>{
 if(context.params.action!=='products')return json({error:'Not found'},404);
 if(!session(context.cookies.get(cookieName)?.value))return json({error:'Sign in first.'},401);
 return json({products:products(true)});
};
export const POST:APIRoute=async context=>{
 const {request,params}=context;
 if(!sameOrigin(request))return json({error:'This request must come from the admin panel.'},403);
 try {
  if(params.action==='login') {
   const b=await readJson(request);
   if(typeof b.username!=='string'||typeof b.password!=='string'||b.username.length>100||b.password.length>128)return json({error:'Check your sign-in details.'},400);
   const ip=(request.headers.get('cf-connecting-ip')||request.headers.get('x-forwarded-for')?.split(',')[0]||'local').slice(0,100);
   const created=login(ip,b.username,b.password);setSession(context,created.token);return json({ok:true});
  }
  if(!authorised(context))return json({error:'Your session expired. Sign in again.'},403);
  if(params.action==='logout'){deleteSession(context.cookies.get(cookieName)!.value);context.cookies.delete(cookieName,{path:import.meta.env.BASE_URL});return json({ok:true});}
  if(params.action==='password'){
   const b=await readJson(request);
   if(typeof b.current!=='string'||typeof b.next!=='string'||b.current.length>128||b.next!==b.confirm)return json({error:'Check the passwords and confirmation.'},400);
   const created=changePassword(b.current,b.next);setSession(context,created.token);return json({ok:true});
  }
  if(params.action==='products'){
   const b=await readJson(request);const existing=typeof b.id==='string'?productById(b.id):undefined;
   if(b.id&&!existing)return json({error:'Product not found.'},404);
   const p=validateProduct(b,existing);saveProduct(p);return json({ok:true,id:p.id});
  }
  if(params.action==='upload'){
   const bytes=await limitedBody(request,16*1024*1024);
   const form=await new Response(bytes,{headers:{'Content-Type':request.headers.get('content-type')||''}}).formData();
   const file=form.get('file');if(!(file instanceof File))throw new Error('Choose a file to upload.');
   const data=Buffer.from(await file.arrayBuffer());let output:Buffer;let ext:string;
   if(file.name.toLowerCase().endsWith('.glb')){
    if(data.length<20||data.toString('ascii',0,4)!=='glTF'||data.readUInt32LE(4)!==2||data.readUInt32LE(8)!==data.length||data.readUInt32LE(16)!==0x4e4f534a)throw new Error('Use a valid GLB 2.0 model.');
    const length=data.readUInt32LE(12);if(length>data.length-20)throw new Error('Invalid GLB model.');
    const gltf=JSON.parse(data.toString('utf8',20,20+length));
    if([...(gltf.buffers||[]),...(gltf.images||[])].some((r:{uri?:string})=>r.uri))throw new Error('The GLB must contain all textures and buffers inside the file.');
    output=data;ext='glb';
   }else{
    if(!/\.(png|jpe?g|webp)$/i.test(file.name)||data.length>6*1024*1024)throw new Error('Use a JPG, PNG or WebP image under 6 MB, or a self-contained GLB under 16 MB.');
    output=await sharp(data,{limitInputPixels:24000000}).rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();ext='webp';
   }
   const name=`${randomUUID()}.${ext}`;await writeFile(join(dataDir(),'media',name),output,{mode:0o600});return json({ok:true,path:`/media/${name}`});
  }
  return json({error:'Not found'},404);
 }catch(error){const message=error instanceof Error?error.message:'Unable to save your changes.';const safe=/UNIQUE constraint/i.test(message)?'This product URL is already in use.':message;return json({error:safe},params.action==='login'?401:400);}
};
