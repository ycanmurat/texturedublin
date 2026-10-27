/** Build audit: all prerendered pages plus the live catalogue and sitemap. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:net';
const root=path.resolve(import.meta.dirname,'..');
const DIST=path.join(root,'dist/client');
const files=[];
(function walk(dir){for(const f of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,f.name);if(f.isDirectory())walk(p);else if(f.name.endsWith('.html'))files.push(p);}})(DIST);
const home=fs.readFileSync(path.join(DIST,'index.html'),'utf8');
const homeCanonical=home.match(/<link rel="canonical" href="([^"]*)"/)[1];
const origin=new URL(homeCanonical).origin,base=new URL(homeCanonical).pathname.replace(/\/$/,'');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'texture-audit-'));
const probe=createServer();await new Promise(r=>probe.listen(0,'127.0.0.1',r));const port=probe.address().port;await new Promise(r=>probe.close(r));
const child=spawn(process.execPath,['server.mjs'],{cwd:root,env:{...process.env,PORT:String(port),HOST:'127.0.0.1',BASE_PATH:base,DATA_DIR:temp,ADMIN_INITIAL_PASSWORD:randomBytes(24).toString('base64url')},stdio:['ignore','ignore','pipe']});
let logs='';child.stderr.on('data',v=>logs+=v);
const local=`http://127.0.0.1:${port}`;
try{
 let up=false;for(let i=0;i<100;i++){try{if((await fetch(`${local}/healthz`)).ok){up=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}if(!up)throw new Error('Audit server failed: '+logs);
 const sitemapResponse=await fetch(`${local}${base}/sitemap.xml`);if(!sitemapResponse.ok)throw new Error('Sitemap failed: '+await sitemapResponse.text());
 const sitemap=await sitemapResponse.text();
 const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
 const dynamicPaths=new Set(locations.map(v=>new URL(v).pathname).filter(p=>/\/(shop|siopa)\//.test(p)));
 const pages=files.filter(f=>!f.endsWith('/404.html')).map(f=>({rel:`/${path.relative(DIST,f).replace(/index\.html$/,'').replace(/\\/g,'/')}`,html:fs.readFileSync(f,'utf8')}));
 for(const p of dynamicPaths){const response=await fetch(local+p);if(!response.ok)throw new Error(`Catalogue route failed: ${p} (${response.status})`);pages.push({rel:p.slice(base.length),html:await response.text()});}
 const stripBase=u=>base&&u.startsWith(base+'/')?u.slice(base.length):u;
 const exists=url=>{const clean=url.split('#')[0].split('?')[0];if(!clean)return true;if(dynamicPaths.has(clean))return true;const p=path.join(DIST,decodeURI(stripBase(clean)));return fs.existsSync(p)&&(fs.statSync(p).isFile()||fs.existsSync(path.join(p,'index.html')));};
 const problems=[],titles=new Map(),descs=new Map();let links=0,ldBlocks=0;
 for(const {rel,html:h} of pages){
  const decode=v=>v&&v.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
  const get=re=>decode((h.match(re)||[])[1]);
  const title=get(/<title>([^<]*)<\/title>/),desc=get(/<meta name="description" content="([^"]*)"/),canon=get(/<link rel="canonical" href="([^"]*)"/),og=get(/<meta property="og:image" content="([^"]*)"/);
  if(!title)problems.push([rel,'missing title']);else{if(title.length>70)problems.push([rel,`long title (${title.length})`]);titles.set(title,[...(titles.get(title)||[]),rel]);}
  if(!desc)problems.push([rel,'missing description']);else{if(desc.length>165||desc.length<70)problems.push([rel,`description length ${desc.length}`]);descs.set(desc,[...(descs.get(desc)||[]),rel]);}
  if(canon!==`${origin}${base}${rel}`)problems.push([rel,`canonical mismatch ${canon}`]);
  const h1s=(h.match(/<h1[\s>]/g)||[]).length;if(h1s!==1)problems.push([rel,`${h1s} H1 elements`]);
  if((h.match(/hreflang="(en-IE|ga-IE|x-default)"/g)||[]).length<3)problems.push([rel,'missing language alternates']);
  if(!og||!exists(new URL(og).pathname))problems.push([rel,`missing OG image ${og}`]);
  for(const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){ldBlocks++;try{const data=JSON.parse(m[1]);if(/"(?:price|minPrice|maxPrice)":0\b/.test(JSON.stringify(data)))problems.push([rel,'zero-price structured data']);}catch{problems.push([rel,'invalid JSON-LD']);}}
  for(const m of h.matchAll(/(?:href|src)="(\/[^"]*)"/g)){const u=decode(m[1]);if(u.startsWith('//'))continue;links++;if(base&&!u.startsWith(base+'/'))problems.push([rel,`link escapes base ${u}`]);if(!exists(u))problems.push([rel,`broken link ${u}`]);}
  // Prices are restricted to four published starting rates and the illustrative shop product.
  const body=h.split('<body')[1]?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  if(!/\/(pricing|praghsanna|shop|siopa)\//.test(rel)&&/€\s*\d/.test(body||''))problems.push([rel,'unexpected public numeric price']);
  if(/353851234567|\+353 85 123 4567/.test(h))problems.push([rel,'old placeholder phone']);
 }
 for(const [title,p]of titles)if(p.length>1)problems.push([p.join(', '),`duplicate title ${title}`]);
 for(const [desc,p]of descs)if(p.length>1)problems.push([p.slice(0,3).join(', '),`duplicate description ${desc.slice(0,70)}`]);
 if(locations.length!==pages.length)problems.push(['sitemap.xml',`page count ${locations.length} vs ${pages.length}`]);
 for(const value of locations){const u=new URL(value);if(u.origin!==origin||!exists(u.pathname))problems.push(['sitemap.xml',`invalid location ${value}`]);}
 const manifest=JSON.parse(fs.readFileSync(path.join(DIST,'site.webmanifest'),'utf8'));if(manifest.start_url!==base+'/'||manifest.scope!==base+'/')problems.push(['site.webmanifest','base mismatch']);for(const icon of manifest.icons)if(!exists(icon.src))problems.push(['site.webmanifest',`missing ${icon.src}`]);
 const missing=await fetch(`${local}${base}/shop/nonexistent-product/`);if(missing.status!==404)problems.push(['shop','missing product must return 404']);
 const admin=await fetch(`${local}${base}/admin/`);const adminHtml=await admin.text();if(!admin.ok||!adminHtml.includes('noindex')||!admin.headers.get('cache-control')?.includes('no-store'))problems.push(['admin','private page headers']);
 console.log(`Pages: ${pages.length} · internal links: ${links} · JSON-LD blocks: ${ldBlocks} · catalogue & sitemap rendered from server`);
 if(problems.length){for(const p of problems.slice(0,45))console.error(' -',...p);console.error(`${problems.length} problems`);process.exitCode=1;}else console.log('✓ No problems found');
}finally{child.kill('SIGTERM');await new Promise(resolve=>child.exitCode===null?child.once('exit',resolve):resolve());fs.rmSync(temp,{recursive:true,force:true});}
