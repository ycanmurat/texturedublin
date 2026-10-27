const form=document.querySelector<HTMLFormElement>('[data-product-enquiry]');
if(form) {
 const link=form.querySelector<HTMLAnchorElement>('[data-order-link]')!;
 const error=form.querySelector<HTMLElement>('.product-form-error')!;
 function update() {
  const data=new FormData(form!);const quantity=Number(data.get('quantity'));const valid=Number.isInteger(quantity)&&quantity>=1&&quantity<=20;
  const en=form!.dataset.locale==='en';
  const text=[en?`Hi ${form!.dataset.contact}, I’d like to enquire about this product:`:`Dia duit ${form!.dataset.contact}, ba mhaith liom fiosrú faoin táirge seo:`,form!.dataset.name,form!.dataset.url,`Quantity / Cainníocht: ${quantity}`,data.get('finish')&&`Finish / Bailchríoch: ${data.get('finish')}`,form!.dataset.dimensions&&form!.dataset.dimensions.split(' × ').every(v=>Number(v)>0)&&`Design size / Toisí: ${form!.dataset.dimensions} mm (W × H × D)`,data.get('location')&&`Location / Suíomh: ${data.get('location')}`,data.get('notes')&&`Notes / Nótaí: ${data.get('notes')}`,form!.dataset.example==='true'?'I understand this is an example design and any displayed price is illustrative.':'',en?'Please confirm the specification, final price, delivery and installation before an order is agreed.':'Deimhnigh na sonraí, an praghas deiridh, seachadadh agus suiteáil sula n-aontaítear ordú.'].filter(Boolean).join('\n');
  link.href=`https://wa.me/${form!.dataset.whatsapp}?text=${encodeURIComponent(text)}`;link.setAttribute('aria-disabled',String(!valid));error.hidden=valid;return valid;
 }
 form.addEventListener('input',update);form.addEventListener('change',update);
 link.addEventListener('click',event=>{if(!form!.reportValidity()||!update())event.preventDefault();});
 form.addEventListener('submit',event=>{event.preventDefault();if(form!.reportValidity()&&update())link.click();});
 update();
}
const stage=document.querySelector<HTMLElement>('[data-model-stage]');
const launch=stage?.querySelector<HTMLButtonElement>('[data-load-model]');
if(stage&&launch) launch.addEventListener('click',async()=>{
 const en=stage.dataset.locale==='en';const status=stage.querySelector<HTMLElement>('.model-status')!;launch.disabled=true;status.hidden=false;status.textContent=en?'Loading your 3D view…':'Amharc 3T á luchtú…';
 let viewer:HTMLElement|undefined;
 try {
  await import('@google/model-viewer');
  viewer=document.createElement('model-viewer');
  viewer.setAttribute('src',stage.dataset.src!);viewer.setAttribute('alt',stage.dataset.alt!);viewer.setAttribute('camera-controls','');viewer.setAttribute('touch-action','pan-y');viewer.setAttribute('shadow-intensity','1');viewer.setAttribute('camera-orbit','-25deg 75deg auto');viewer.setAttribute('loading','eager');viewer.setAttribute('interaction-prompt','none');
  if(stage.dataset.poster)viewer.setAttribute('poster',stage.dataset.poster);
  const ready=new Promise<void>((resolve,reject)=>{const timeout=window.setTimeout(()=>reject(new Error('timeout')),45000);viewer!.addEventListener('load',()=>{clearTimeout(timeout);resolve();},{once:true});viewer!.addEventListener('error',()=>{clearTimeout(timeout);reject(new Error('model'));},{once:true});});
  stage.append(viewer);await ready;status.hidden=true;launch.hidden=true;viewer.focus();
 }catch{viewer?.remove();status.textContent=en?'The 3D view could not load. You can still enquire using the image, or try again.':'Níor lódáil an t-amharc 3T. Is féidir fiosrú leis an íomhá nó triail arís.';launch.disabled=false;launch.textContent=en?'Retry 3D view':'Triail 3T arís';}
});
