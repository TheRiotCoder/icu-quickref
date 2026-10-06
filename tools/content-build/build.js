// Builds /workspace/icu-quickref/data.js from data-orig.js + tools.js + conds/*.js
const fs=require('fs'),vm=require('vm'),path=require('path');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(fs.readFileSync(__dirname+'/data-orig.js','utf8'),ctx);
const O=JSON.parse(JSON.stringify(ctx.window.ICU_DATA));
const top=require('./top.js');
const order=require('./order.js');
const conds=[];
for(const id of order){
  const f=path.join(__dirname,'conds',id+'.js');
  let c;
  if(fs.existsSync(f)){delete require.cache[require.resolve(f)];c=require(f);}
  else{const o=O.conditions.find(x=>x.id===id); if(!o) continue;
    c=Object.assign({},o,{_unrevised:true,actions:o.actions.map(t=>['RN',t]),monitor:o.monitor.map(t=>['RN',t])});}
  const mk=(arr,p)=>arr.map((x,i)=>({id:`${c.id}-${p}${i+1}`,t:x[1],s:x[0]}));
  const out={id:c.id,name:c.name,category:c.category,emergency:!!c.emergency,
    keywords:Array.isArray(c.keywords)?c.keywords:String(c.keywords||'').split(/\s+/).filter(Boolean),
    warnings:c.warnings||[],glance:c.glance,recognize:c.recognize,
    actions:mk(c.actions,'a'),monitor:mk(c.monitor,'m'),meds:c.meds,escalate:c.escalate};
  if(c._unrevised) out._unrevised=true;
  conds.push(out);
}
const D=Object.assign({},top,{tools:require('./tools.js'),conditions:conds});
// ---- pretty printer
const isId=k=>/^[A-Za-z_$][\w$]*$/.test(k);
function ser(v,ind){
  const pad='  '.repeat(ind),pad1='  '.repeat(ind+1);
  if(Array.isArray(v)){
    if(!v.length) return '[]';
    const inl='['+v.map(x=>ser(x,0)).join(', ')+']';
    if(!inl.includes('\n')&&inl.length+pad.length<110&&!v.some(x=>x&&typeof x==='object'&&!Array.isArray(x))) return inl;
    return '[\n'+v.map(x=>pad1+ser(x,ind+1)).join(',\n')+'\n'+pad+']';
  }
  if(v&&typeof v==='object'){
    const ks=Object.keys(v);
    const inl='{ '+ks.map(k=>(isId(k)?k:JSON.stringify(k))+': '+ser(v[k],0)).join(', ')+' }';
    if(!inl.includes('\n')&&(('id' in v&&'t' in v)||inl.length<100)) return inl;
    return '{\n'+ks.map(k=>pad1+(isId(k)?k:JSON.stringify(k))+': '+ser(v[k],ind+1)).join(',\n')+'\n'+pad+'}';
  }
  return JSON.stringify(v);
}
const header=fs.readFileSync(__dirname+'/header.txt','utf8');
fs.writeFileSync('/workspace/icu-quickref/data.js',header+'window.ICU_DATA = '+ser(D,0)+';\n');
console.log('built',conds.length,'conditions; unrevised:',conds.filter(c=>c._unrevised).map(c=>c.id).join(' ')||'none');
