import type { APIContext } from 'astro';
import { site } from '../../config/site.ts';
import { basePath } from '../paths.ts';
import { cookieName, session } from './auth.ts';
export const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export async function limitedBody(request:Request,max=32768) {
 const reader=request.body?.getReader();if(!reader)throw new Error('Missing request body.');
 let size=0;const chunks:Uint8Array[]=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>max){await reader.cancel();throw new Error('The file or request is too large.');}chunks.push(value);}
 const result=new Uint8Array(size);let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length;}return result;
}
export async function readJson(request:Request) {
 if(!request.headers.get('content-type')?.startsWith('application/json'))throw new Error('Expected JSON.');
 return JSON.parse(new TextDecoder().decode(await limitedBody(request))) as Record<string,unknown>;
}
export function sameOrigin(request:Request) {
 const origin=request.headers.get('origin');
 return !!origin&&(origin===new URL(request.url).origin||origin===new URL(site.url).origin)&&request.headers.get('sec-fetch-site')!=='cross-site';
}
export function authorised(context:APIContext) {
 const found=session(context.cookies.get(cookieName)?.value);
 return sameOrigin(context.request)&&found&&context.request.headers.get('x-csrf-token')===found.csrf;
}
export function setSession(context:APIContext,token:string) {
 const secure=!['localhost','127.0.0.1','[::1]'].includes(new URL(context.request.url).hostname);
 context.cookies.set(cookieName,token,{httpOnly:true,secure,sameSite:'strict',path:`${basePath}/`,maxAge:8*60*60});
}
