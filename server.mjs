import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import sirv from 'sirv';
const base=(process.env.BASE_PATH||'/').replace(/\/$/,'');
const canonicalOrigin=process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : '';
const legacy=process.env.LEGACY_SITE_URL ? new URL(process.env.LEGACY_SITE_URL) : null;
const notFound=readFileSync('./dist/client/404.html');
const files=sirv('./dist/client',{etag:true,maxAge:0,extensions:['html'],setHeaders(res,path){res.setHeader('Cache-Control',path.includes('/_astro/')?'public, max-age=31536000, immutable, no-transform':'no-cache, no-transform');}});
const server=createServer((req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Cache-Control','no-transform');
 const original=req.url||'/';const pathname=new URL(original,'http://localhost').pathname;
 if(pathname==='/healthz'){res.writeHead(200,{'Content-Type':'text/plain'});res.end('ok');return;}
 const host=(req.headers.host||'').split(':')[0];
 if(canonicalOrigin && !['localhost','127.0.0.1','[::1]'].includes(host)) {
  const oldBase=legacy?.pathname.replace(/\/$/,'');
  if(legacy && host.replace(/^www\./,'')===legacy.hostname.replace(/^www\./,'') && (pathname===oldBase||pathname.startsWith(`${oldBase}/`))) {
   res.writeHead(308,{Location:`${canonicalOrigin}${base}${pathname.slice(oldBase.length)||'/'}${new URL(original,'http://localhost').search}`});res.end();return;
  }
  if(host!==new URL(canonicalOrigin).hostname){res.writeHead(308,{Location:`${canonicalOrigin}${original}`});res.end();return;}
 }
 if(base&&pathname===base){res.writeHead(308,{Location:`${base}/`});res.end();return;}
 if(base&&!pathname.startsWith(`${base}/`)){res.writeHead(404);res.end('Not found');return;}
 // The guides section became the blog: send old links to the same article.
 const rel=pathname.slice(base.length)||'/';const moved=rel.match(/^\/(?:guides|ga\/treoracha)(?=\/|$)/);
 if(moved){res.writeHead(308,{Location:`${base}${rel.startsWith('/ga/')?'/ga/blag':'/blog'}${rel.slice(moved[0].length)||'/'}${new URL(original,'http://localhost').search}`});res.end();return;}
 // One canonical trailing-slash URL for page and API routes; keep file URLs intact.
 if(!pathname.endsWith('/')&&!pathname.split('/').at(-1).includes('.')){const query=new URL(original,'http://localhost').search;res.writeHead(308,{Location:`${pathname}/${query}`});res.end();return;}
 req.url=original.slice(base.length)||'/';
 files(req,res,()=>{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':'noindex, follow'});res.end(req.method==='HEAD'?undefined:notFound);});
});
server.requestTimeout=30000;server.headersTimeout=15000;
server.listen(Number(process.env.PORT||3000),process.env.HOST||'0.0.0.0');
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{server.close(()=>process.exit(0));setTimeout(()=>process.exit(1),10000).unref();});
