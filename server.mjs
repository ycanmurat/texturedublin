import { createServer } from 'node:http';
import sirv from 'sirv';
import { handler } from './dist/server/entry.mjs';
const base=(process.env.BASE_PATH||'/texturedublin').replace(/\/$/,'');
const files=sirv('./dist/client',{etag:true,maxAge:0,extensions:['html'],setHeaders(res,path){res.setHeader('Cache-Control',path.includes('/_astro/')?'public, max-age=31536000, immutable, no-transform':'no-cache, no-transform');}});
const server=createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Cache-Control','no-transform');
 const original=req.url||'/';const pathname=new URL(original,'http://localhost').pathname;
 if(pathname==='/healthz'){res.writeHead(200,{'Content-Type':'text/plain'});res.end('ok');return;}
 if(base&&pathname===base){res.writeHead(308,{Location:`${base}/`});res.end();return;}
 if(base&&!pathname.startsWith(`${base}/`)){res.writeHead(404);res.end('Not found');return;}
 // One canonical trailing-slash URL for page and API routes; keep file URLs intact.
 if(!pathname.endsWith('/')&&!pathname.split('/').at(-1).includes('.')){const query=new URL(original,'http://localhost').search;res.writeHead(308,{Location:`${pathname}/${query}`});res.end();return;}
 // Private endpoints and the editable catalogue always reach Astro's server.
 if(/\/(?:admin|api|media|shop|siopa)(?:\/|$)/.test(pathname)||pathname.endsWith('/sitemap.xml')){handler(req,res,()=>{res.writeHead(404);res.end('Not found');});return;}
 req.url=original.slice(base.length)||'/';
 files(req,res,()=>{req.url=original;handler(req,res,()=>{res.writeHead(404);res.end('Not found');});});
});
server.requestTimeout=30000;server.headersTimeout=15000;
server.listen(Number(process.env.PORT||3000),process.env.HOST||'0.0.0.0');
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{server.close(()=>process.exit(0));setTimeout(()=>process.exit(1),10000).unref();});
