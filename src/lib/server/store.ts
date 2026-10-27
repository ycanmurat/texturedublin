import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, chmodSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { starterProducts, type Product } from '../../data/products.ts';
export const dataDir = () => resolve(process.env.DATA_DIR || '.data');
let database:DatabaseSync|undefined;
export function db() {
 if(database) return database;
 mkdirSync(dataDir(),{recursive:true,mode:0o700});
 mkdirSync(join(dataDir(),'media'),{recursive:true,mode:0o700});
 const filename=join(dataDir(),'texture.sqlite');
 database=new DatabaseSync(filename); chmodSync(filename,0o600);
 database.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, data TEXT NOT NULL, published INTEGER NOT NULL, updated TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY CHECK (id=1), password TEXT NOT NULL);
 CREATE TABLE IF NOT EXISTS sessions (hash TEXT PRIMARY KEY, csrf TEXT NOT NULL, expires INTEGER NOT NULL);
 CREATE TABLE IF NOT EXISTS login_attempts (ip TEXT NOT NULL, at INTEGER NOT NULL);
 CREATE INDEX IF NOT EXISTS login_time ON login_attempts(at);`);
 if(!database.prepare('SELECT value FROM meta WHERE key=?').get('seeded')) {
  database.exec('BEGIN');
  try {
   for(const p of starterProducts) database.prepare('INSERT OR IGNORE INTO products VALUES (?,?,?,?,?)').run(p.id,p.slug,JSON.stringify(p),p.published?1:0,p.updated);
   database.prepare('INSERT INTO meta VALUES (?,?)').run('seeded','1');database.exec('COMMIT');
  } catch(error) { database.exec('ROLLBACK');throw error; }
 }
 return database;
}
const parse=(row:unknown):Product|undefined => row ? JSON.parse((row as {data:string}).data) : undefined;
export const products=(all=false):Product[] => db().prepare(`SELECT data FROM products ${all?'':'WHERE published=1'} ORDER BY updated DESC,id`).all().map(r=>parse(r)!);
export const productBySlug=(slug:string) => parse(db().prepare('SELECT data FROM products WHERE slug=? AND published=1').get(slug));
export const productById=(id:string) => parse(db().prepare('SELECT data FROM products WHERE id=?').get(id));
const str=(v:unknown,max:number,required=false) => { if(typeof v!=='string'||v.length>max||(required&&!v.trim())) throw new Error('Check the required text fields and their length.');return v.trim(); };
export function validateProduct(body:Record<string,unknown>,existing?:Product):Product {
 const slug=existing?.slug || str(body.slug,80,true);
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Use lowercase words separated by hyphens for the product URL.');
 if(!existing&&db().prepare('SELECT id FROM products WHERE slug=?').get(slug)) throw new Error('This product URL is already in use.');
 const priceCents=body.priceCents===null?null:Number(body.priceCents);
 if(priceCents!==null&&(!Number.isSafeInteger(priceCents)||priceCents<0||priceCents>100000000)) throw new Error('Enter a valid euro price or leave it blank for enquiry.');
 const dim=(v:unknown)=>{const n=Number(v);if(!Number.isInteger(n)||n<0||n>10000) throw new Error('Dimensions must be whole millimetres between 0 and 10000.');return n;};
 const asset=(v:unknown,model=false)=>{const s=str(v,200);if(!s)return '';if(!(model?/^\/(models|media)\/[a-zA-Z0-9_-]+\.glb$/:/^\/(models|media)\/[a-zA-Z0-9_-]+\.(webp|png|jpg)$/).test(s))throw new Error('Use a file uploaded through this panel.');return s;};
 if(!Array.isArray(body.finishes)||body.finishes.length>12)throw new Error('Add up to 12 finish options.');
 const finishes=body.finishes.map(x=>str(x,60,true));
 return {id:existing?.id||randomUUID(),slug,name:str(body.name,100,true),nameGa:str(body.nameGa,100),summary:str(body.summary,220,true),summaryGa:str(body.summaryGa,220),description:str(body.description,4000,true),descriptionGa:str(body.descriptionGa,4000),priceCents,example:body.example===true,width:dim(body.width),height:dim(body.height),depth:dim(body.depth),finishes,poster:asset(body.poster),model:asset(body.model,true),published:body.published===true,updated:new Date().toISOString()};
}
export function saveProduct(p:Product) {
 db().prepare('INSERT INTO products VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,published=excluded.published,updated=excluded.updated').run(p.id,p.slug,JSON.stringify(p),p.published?1:0,p.updated);
 return p;
}
