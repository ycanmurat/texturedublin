/** Notify IndexNow search engines (Bing, Yandex, Seznam, Naver, Yep) of new or changed pages after a deploy. */
import fs from 'node:fs';
const origin=(process.env.SITE_URL||'https://texturedublin.com').replace(/\/$/,'');
const keyFile=fs.readdirSync(new URL('../public/',import.meta.url)).find(f=>/^[0-9a-f]{32}\.txt$/.test(f));
if(!keyFile)throw new Error('No IndexNow key file (32 hex characters + .txt) in public/.');
const key=keyFile.slice(0,-4),keyLocation=`${origin}/${keyFile}`;
// Search engines fetch the key file to validate a submission, so it must already be deployed.
const live=await fetch(keyLocation);
if(!live.ok||(await live.text()).trim()!==key)throw new Error(`${keyLocation} is not live yet: deploy first.`);
// Paths given as arguments (npm run indexnow -- /blog/new-post/), otherwise every URL in the live sitemap.
const paths=process.argv.slice(2);
const urlList=paths.length?paths.map(p=>new URL(p,origin).href):[...(await(await fetch(`${origin}/sitemap.xml`)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
if(!urlList.length||urlList.length>10000)throw new Error(`IndexNow takes 1–10,000 URLs per request, got ${urlList.length}.`);
const res=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:new URL(origin).host,key,keyLocation,urlList})});
// 200: accepted. 202: accepted while the key is still being validated.
if(res.status!==200&&res.status!==202)throw new Error(`IndexNow returned ${res.status}: ${await res.text()}`);
console.log(`✓ IndexNow: ${urlList.length} URLs submitted (HTTP ${res.status}).`);
