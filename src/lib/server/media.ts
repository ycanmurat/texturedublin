import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { dataDir } from './store.ts';
export const serveMedia=async(file:string)=>{
 if(!/^[a-f0-9-]{36}\.(webp|glb)$/.test(file))return new Response('Not found',{status:404});
 try{const data=await readFile(join(dataDir(),'media',file));return new Response(new Uint8Array(data),{headers:{'Content-Type':file.endsWith('.glb')?'model/gltf-binary':'image/webp','Cache-Control':'public, max-age=31536000, immutable, no-transform','X-Content-Type-Options':'nosniff'}});}catch{return new Response('Not found',{status:404});}
};
