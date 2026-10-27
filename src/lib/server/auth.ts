import { randomBytes, scryptSync, timingSafeEqual, createHash } from 'node:crypto';
import { db } from './store.ts';
export const cookieName='td-admin-session';
const sha=(s:string)=>createHash('sha256').update(s).digest('hex');
export function hashPassword(password:string) { const salt=randomBytes(16).toString('hex');return `${salt}:${scryptSync(password,salt,64).toString('hex')}`; }
export function verifyPassword(password:string,encoded:string) {
 try {const [salt,key]=encoded.split(':');const expected=Buffer.from(key,'hex');const actual=scryptSync(password,salt,64);return expected.length===actual.length&&timingSafeEqual(expected,actual);}catch{return false;}
}
export function ensureAdmin() {
 const connection=db();
 let row=connection.prepare('SELECT password FROM admin WHERE id=1').get() as {password:string}|undefined;
 const initial=process.env.ADMIN_INITIAL_PASSWORD;
 if(!row&&initial&&initial.length>=12) {connection.prepare('INSERT OR IGNORE INTO admin VALUES (1,?)').run(hashPassword(initial));row=connection.prepare('SELECT password FROM admin WHERE id=1').get() as {password:string};}
 return row;
}
export const adminUser=()=>process.env.ADMIN_USERNAME||'admin';
export function session(token?:string) {
 if(!token||!/^[a-f0-9]{64}$/.test(token))return undefined;
 return db().prepare('SELECT hash,csrf,expires FROM sessions WHERE hash=? AND expires>?').get(sha(token),Date.now()) as {hash:string;csrf:string;expires:number}|undefined;
}
export function createSession() {
 const token=randomBytes(32).toString('hex'),csrf=randomBytes(32).toString('hex');
 db().prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());
 db().prepare('INSERT INTO sessions VALUES (?,?,?)').run(sha(token),csrf,Date.now()+8*60*60*1000);return {token,csrf};
}
export function deleteSession(token:string){db().prepare('DELETE FROM sessions WHERE hash=?').run(sha(token));}
export function changePassword(current:string,next:string) {
 const user=ensureAdmin();
 if(!user||!verifyPassword(current,user.password))throw new Error('The current password is incorrect.');
 if(next.length<12||next.length>128)throw new Error('Use a new password of 12 to 128 characters.');
 if(current===next)throw new Error('Choose a different new password.');
 db().prepare('UPDATE admin SET password=? WHERE id=1').run(hashPassword(next));
 db().prepare('DELETE FROM sessions').run();
 return createSession();
}
export function login(ip:string,username:string,password:string) {
 const user=ensureAdmin(); if(!user)throw new Error('Admin setup is not complete.');
 const now=Date.now();db().prepare('DELETE FROM login_attempts WHERE at<?').run(now-15*60*1000);
 const count=db().prepare('SELECT count(*) AS n FROM login_attempts WHERE ip=?').get(ip) as {n:number};
 const total=db().prepare('SELECT count(*) AS n FROM login_attempts').get() as {n:number};
 if(count.n>=5||total.n>=60)throw new Error('Too many attempts. Try again in 15 minutes.');
 db().prepare('INSERT INTO login_attempts VALUES (?,?)').run(ip,now);
 // Always perform a password derivation, including for a wrong username.
 const valid=verifyPassword(password,user.password);
 if(!valid||username!==adminUser())throw new Error('The username or password is incorrect.');
 db().prepare('DELETE FROM login_attempts WHERE ip=?').run(ip);return createSession();
}
