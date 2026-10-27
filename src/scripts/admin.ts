import { withBase } from '../lib/paths.ts';
const csrf=()=>document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content||'';
async function send(action:string,body:unknown) {
 const response=await fetch(withBase(`/api/admin/${action}/`),{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-CSRF-Token':csrf()},body:JSON.stringify(body)});
 const result=await response.json();if(!response.ok)throw new Error(result.error||'Unable to save. Try again.');return result;
}
function formHandler(selector:string,action:(form:HTMLFormElement)=>Promise<void>){
 document.querySelectorAll<HTMLFormElement>(selector).forEach(form=>form.addEventListener('submit',async event=>{
  event.preventDefault();const button=form.querySelector<HTMLButtonElement>('button[type="submit"]')!;const message=form.querySelector<HTMLElement>('[data-message]')!;button.disabled=true;message.hidden=false;message.className='small';message.textContent='Saving…';
  try{await action(form);}catch(error){message.className='admin-error';message.textContent=error instanceof Error?error.message:'Unable to save.';button.disabled=false;}
 }));
}
formHandler('[data-admin-login]',async form=>{const data=new FormData(form);await send('login',{username:data.get('username'),password:data.get('password')});location.href=withBase('/admin/');});
formHandler('[data-admin-password]',async form=>{const data=new FormData(form);await send('password',{current:data.get('current'),next:data.get('next'),confirm:data.get('confirm')});location.href=withBase('/admin/?security=1&saved=1');});
if(new URL(location.href).searchParams.has('saved')){const message=document.querySelector<HTMLElement>('[data-admin-password] [data-message]');if(message){message.hidden=false;message.textContent='Password changed. Your other sessions are signed out.';}}
formHandler('[data-admin-product]',async form=>{
 if(form.dataset.uploading==='true')throw new Error('Wait for the upload to finish before saving.');
 const data=new FormData(form);const text=(key:string)=>String(data.get(key)||'');const price=text('price');
 const result=await send('products',{id:form.dataset.productId||undefined,slug:text('slug'),name:text('name'),nameGa:text('nameGa'),summary:text('summary'),summaryGa:text('summaryGa'),description:text('description'),descriptionGa:text('descriptionGa'),priceCents:price===''?null:Math.round(Number(price)*100),width:Number(text('width')),height:Number(text('height')),depth:Number(text('depth')),finishes:text('finishes').split('\n').map(x=>x.trim()).filter(Boolean),poster:text('poster'),model:text('model'),example:data.has('example'),published:data.has('published')});
 location.href=withBase(`/admin/?edit=${encodeURIComponent(result.id)}&updated=1`);
});
document.querySelector<HTMLButtonElement>('[data-admin-logout]')?.addEventListener('click',async()=>{await send('logout',{});location.href=withBase('/admin/');});
document.querySelectorAll<HTMLInputElement>('[data-upload]').forEach(input=>input.addEventListener('change',async()=>{
 const file=input.files?.[0];if(!file)return;const form=input.form!;const key=input.dataset.upload!;const status=form.querySelector<HTMLElement>(`[data-upload-status="${key}"]`)!;const buttons=form.querySelectorAll<HTMLButtonElement>('button[type="submit"]');
 form.dataset.uploading='true';form.querySelectorAll<HTMLInputElement>('[data-upload]').forEach(x=>x.disabled=true);buttons.forEach(b=>b.disabled=true);status.textContent='Uploading…';
 try{const data=new FormData();data.set('file',file);const response=await fetch(withBase('/api/admin/upload/'),{method:'POST',credentials:'same-origin',headers:{'X-CSRF-Token':csrf()},body:data});const result=await response.json();if(!response.ok)throw new Error(result.error||'Upload failed.');(form.elements.namedItem(key) as HTMLInputElement).value=result.path;status.textContent='Uploaded. Save the product to apply it.';}
 catch(error){status.textContent=error instanceof Error?error.message:'Upload failed. Choose the file again to retry.';input.value='';}
 finally{form.dataset.uploading='false';form.querySelectorAll<HTMLInputElement>('[data-upload]').forEach(x=>x.disabled=false);buttons.forEach(b=>b.disabled=false);}
}));

document.querySelectorAll<HTMLButtonElement>('[data-clear-asset]').forEach(button=>button.addEventListener('click',()=>{const form=button.closest('form')!;const key=button.dataset.clearAsset!;(form.elements.namedItem(key) as HTMLInputElement).value='';form.querySelector<HTMLElement>(`[data-upload-status="${key}"]`)!.textContent='Removed from this product. Save to apply.';}));
