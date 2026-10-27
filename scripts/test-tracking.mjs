/** Consent category isolation and revocation, without loading external tags. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { stripTypeScriptTypes } from 'node:module';
const consentSource=stripTypeScriptTypes(fs.readFileSync(new URL('../src/scripts/consent.ts',import.meta.url),'utf8')).replace('import.meta.env.DEV','false');
const trackSource=stripTypeScriptTypes(fs.readFileSync(new URL('../src/scripts/track.ts',import.meta.url),'utf8')).replaceAll('export function ','function ').replace('export { lead };','');
function session(initial=null,overrides={}) {
 const commands=[],scripts=[],cookies=[],listeners={},storage=new Map();
 const document={referrer:'https://example.com/?email=private#fragment',prerendering:false,body:{dataset:{}},documentElement:{lang:'en-IE'},getElementById:()=>null,addEventListener:(name,fn)=>listeners[name]=fn,createElement:()=>({}),head:{appendChild:s=>scripts.push(s.src)}};
 Object.defineProperty(document,'cookie',{get:()=> '_ga=old; _ga_TEST=old; _gcl_au=old; _fbp=old; necessary=keep',set:v=>cookies.push(v)});
 const window={__td:{cfg:{ga4:'G-TEST123',ads:'AW-123456',adsWa:'label',pixel:'',gtm:'',mode:'basic',...overrides},consent:initial},dataLayer:[],gtag:(...args)=>commands.push(args)};
 const context=vm.createContext({window,document,location:{origin:'https://texturedublin.com',hostname:'texturedublin.com',pathname:'/contact/'},localStorage:{setItem:(k,v)=>storage.set(k,v)},setTimeout:fn=>fn(),requestAnimationFrame:fn=>fn(),console});
 vm.runInContext(consentSource,context);vm.runInContext(trackSource,context);
 return {context,window,commands,scripts,cookies,save:(a,m)=>vm.runInContext(`save(${a},${m})`,context),track:()=>vm.runInContext("track('whatsapp_click', {placement:'footer'})",context)};
}
let s=session();s.track();assert.equal(s.scripts.length,0);assert.equal(s.commands.length,0);
s.save(false,false);s.track();assert.equal(s.scripts.length,0);assert.ok(!s.commands.some(c=>c[0]==='event'));
s=session();s.save(false,true);s.track();assert.ok(s.commands.some(c=>c[0]==='config'&&c[1]==='AW-123456'));assert.ok(!s.commands.some(c=>c[0]==='config'&&c[1]==='G-TEST123'));assert.ok(!s.commands.some(c=>c[0]==='event'));
s.save(true,false);s.track();assert.equal(s.scripts.length,1);assert.ok(s.commands.some(c=>c[0]==='config'&&c[1]==='G-TEST123'));const ga=s.commands.find(c=>c[0]==='config'&&c[1]==='G-TEST123');assert.equal(ga[2].page_location,'https://texturedublin.com/contact/');assert.equal(ga[2].page_referrer,'https://example.com/');assert.equal(ga[2].allow_google_signals,false);assert.ok(s.commands.some(c=>c[0]==='event'&&c[1]==='whatsapp_click'&&c[2].send_to==='G-TEST123'));
s.save(false,false);const count=s.commands.length;s.track();assert.equal(s.commands.length,count);assert.equal(s.window['ga-disable-G-TEST123'],true);assert.ok(s.cookies.some(c=>c.startsWith('_ga=')));assert.ok(s.cookies.some(c=>c.startsWith('_gcl_au=')));assert.ok(!s.cookies.some(c=>c.startsWith('necessary=')));
s.save(true,false);s.track();assert.equal(s.window['ga-disable-G-TEST123'],false);assert.equal(s.scripts.length,1);assert.equal(s.commands.filter(c=>c[0]==='config'&&c[1]==='G-TEST123').length,1);
s=session(null,{ads:'',adsWa:''});s.save(true,false);assert.equal(s.scripts.length,1);assert.equal(s.commands.filter(c=>c[0]==='event'&&c[1]==='page_view').length,1);s.save(true,false);assert.equal(s.commands.filter(c=>c[0]==='event'&&c[1]==='page_view').length,1);
s=session({v:1,a:true,m:false,t:Date.now()});assert.equal(s.scripts.length,1);
s=session(null,{gtm:'GTM-TEST',ga4:''});s.save(true,false);s.track();assert.ok(s.window.dataLayer.some(v=>v.event==='whatsapp_click'));assert.equal(s.scripts.length,1);
console.log('✓ Tracking: reject, analytics-only, marketing-only, combined tags, returning consent, revocation, cookie cleanup, no duplicate page views, GTM and query redaction.');
