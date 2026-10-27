/** Editable starter catalogue. The initial product and price are illustrative. */
export interface Product {
 id:string; slug:string; name:string; nameGa:string; summary:string; summaryGa:string;
 description:string; descriptionGa:string; priceCents:number|null; example:boolean;
 width:number; height:number; depth:number; finishes:string[]; poster:string; model:string;
 published:boolean; updated:string;
}
export const starterProducts:Product[]=[{
 id:'wardrobe-example',slug:'oak-and-ivory-wardrobe',name:'Oak & Ivory Wardrobe',nameGa:'Vardrús Darach agus Eabhair',
 summary:'A calm, full-height wardrobe concept with an oak frame, warm ivory doors and carefully arranged storage.',
 summaryGa:'Coincheap vardrúis lánairde le fráma darach, doirse eabhair agus stóráil eagraithe.',
 description:'An illustrative made-to-measure wardrobe design for a double bedroom. The concept combines hanging space, adjustable shelving and slim dark handles. Dimensions and price are examples, not a confirmed product specification or offer. Ask Ali Onder to adapt the design to your room and confirm materials, installation, delivery and the final quotation.',
 descriptionGa:'Dearadh samplach vardrúis de réir tomhais do sheomra leapa dúbailte, le spás crochta, seilfeanna agus hanlaí caola. Is samplaí iad na toisí agus an praghas. Iarr ar Ali Onder an dearadh a chur in oiriúint do do sheomra agus an luachan deiridh a dheimhniú.',
 priceCents:149000,example:true,width:1800,height:2200,depth:600,
 finishes:['Oak & warm ivory','Oak','Walnut effect'],poster:'/models/wardrobe.webp',model:'/models/wardrobe.glb',
 published:true,updated:'2026-10-27T00:00:00.000Z',
}];
