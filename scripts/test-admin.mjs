/** Isolated HTTP integration tests. No real messages or production data. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:net';
const root=path.resolve(import.meta.dirname,'..'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'texture-admin-test-'));
const probe=createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
const origin=`http://127.0.0.1:${port}`,base='/texturedublin',password=randomBytes(24).toString('base64url'),next=randomBytes(24).toString('base64url');
let child,logs='';
async function start(){child=spawn(process.execPath,['server.mjs'],{cwd:root,env:{...process.env,PORT:String(port),HOST:'127.0.0.1',BASE_PATH:base,DATA_DIR:temp,ADMIN_USERNAME:'admin',ADMIN_INITIAL_PASSWORD:password},stdio:['ignore','ignore','pipe']});child.stderr.on('data',v=>logs+=v);for(let i=0;i<100;i++){try{if((await fetch(origin+'/healthz')).ok)return;}catch{}await new Promise(r=>setTimeout(r,100));}throw new Error('Test server failed '+logs);}
async function stop(){if(child&&child.exitCode===null){child.kill('SIGTERM');await new Promise(r=>child.once('exit',r));}}
let cookie='',csrf='';
const request=(action,body,options={})=>fetch(`${origin}${base}/api/admin/${action}/`,{method:'POST',headers:{Origin:origin,'Content-Type':'application/json',Cookie:cookie,'X-CSRF-Token':csrf,...options.headers},body:JSON.stringify(body)});
async function signIn(secret){const r=await request('login',{username:'admin',password:secret});assert.equal(r.status,200,await r.clone().text());cookie=r.headers.get('set-cookie').split(';')[0];const h=await(await fetch(`${origin}${base}/admin/`,{headers:{Cookie:cookie}})).text();csrf=h.match(/name="csrf-token" content="([^"]+)"/)[1];return h;}
try{
 await start();
 assert.equal((await fetch(`${origin}${base}/api/admin/products/`)).status,401);
 assert.equal((await request('login',{username:'admin',password},{headers:{Origin:'https://evil.example'}})).status,403);
 const dashboard=await signIn(password);assert.match(dashboard,/Product management/);
 const list=await(await fetch(`${origin}${base}/api/admin/products/`,{headers:{Cookie:cookie}})).json();assert.equal(list.products.length,1);assert.equal(list.products[0].priceCents,149000);
 assert.equal((await request('products',{}, {headers:{'X-CSRF-Token':'invalid'}})).status,403);
 const sample={...list.products[0],id:undefined,slug:'integration-test-wardrobe',name:'Wardrobe </script><script>alert(1)</script>',summary:'An isolated integration test product used to verify safe catalogue updates and persistence.',published:false,priceCents:null};
 let r=await request('products',sample);assert.equal(r.status,200,await r.clone().text());const id=(await r.json()).id;sample.id=id;
 assert.equal((await fetch(`${origin}${base}/shop/${sample.slug}/`)).status,404);
 sample.published=true;r=await request('products',sample);assert.equal(r.status,200);
 let html=await(await fetch(`${origin}${base}/shop/${sample.slug}/`)).text();assert.match(html,/Price on enquiry/);assert.ok(html.includes('Wardrobe &lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;'));
 for(const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(block[1]);
 let map=await(await fetch(`${origin}${base}/sitemap.xml`)).text();assert.ok(map.includes(sample.slug));
 assert.equal((await request('products',{...sample,slug:'ignored-change',width:-5})).status,400);
 const other={...sample,id:undefined,published:false};assert.equal((await request('products',other)).status,400);
 const upload=async(name,data,type)=>{const form=new FormData();form.set('file',new File([data],name,{type}));return fetch(`${origin}${base}/api/admin/upload/`,{method:'POST',headers:{Origin:origin,Cookie:cookie,'X-CSRF-Token':csrf},body:form});};
 r=await upload('wardrobe.glb',fs.readFileSync(path.join(root,'public/models/wardrobe.glb')),'model/gltf-binary');assert.equal(r.status,200,await r.clone().text());const modelPath=(await r.json()).path;assert.equal((await fetch(origin+base+modelPath)).status,200);
 r=await upload('wardrobe.webp',fs.readFileSync(path.join(root,'public/models/wardrobe.webp')),'image/webp');assert.equal(r.status,200,await r.clone().text());const imagePath=(await r.json()).path;assert.equal((await fetch(origin+base+imagePath)).headers.get('content-type'),'image/webp');
 assert.equal((await upload('bad.glb','not a model','model/gltf-binary')).status,400);
 assert.equal((await upload('bad.svg','<svg onload="alert(1)"/>','image/svg+xml')).status,400);
 assert.equal((await request('password',{current:'incorrect',next,confirm:next})).status,400);
 const oldCookie=cookie;r=await request('password',{current:password,next,confirm:next});assert.equal(r.status,200);assert.equal((await fetch(`${origin}${base}/api/admin/products/`,{headers:{Cookie:oldCookie}})).status,401);
 assert.equal((await request('login',{username:'admin',password})).status,401);await signIn(next);
 await stop();await start();await signIn(next);
 const persisted=await(await fetch(`${origin}${base}/api/admin/products/`,{headers:{Cookie:cookie}})).json();assert.equal(persisted.products.find(p=>p.id===id).slug,sample.slug);
 assert.equal((await fetch(origin+base+modelPath)).status,200);assert.equal((await fetch(origin+base+imagePath)).status,200);
 sample.published=false;r=await request('products',sample);assert.equal(r.status,200);assert.equal((await fetch(`${origin}${base}/shop/${sample.slug}/`)).status,404);map=await(await fetch(`${origin}${base}/sitemap.xml`)).text();assert.ok(!map.includes(sample.slug));
 assert.equal((await request('logout',{})).status,200);assert.equal((await fetch(`${origin}${base}/api/admin/products/`,{headers:{Cookie:cookie}})).status,401);
 for(let i=0;i<5;i++)assert.equal((await request('login',{username:'admin',password:'wrong'})).status,401);
 const limit=await request('login',{username:'admin',password:next});assert.equal(limit.status,401);assert.match(await limit.text(),/Too many attempts/);
 console.log('✓ Admin auth, CSRF, password rotation, product CRUD, XSS escaping, uploads, archival, throttling and restart persistence passed');
}finally{await stop();fs.rmSync(temp,{recursive:true,force:true});}
