// Node harness: run search parts against a data.js snapshot.
const fs=require('fs'),vm=require('vm');
const dataFile=process.argv[2]||'/workspace/icu-quickref/data.js';
const ctx={window:{},document:{querySelector:()=>null,querySelectorAll:()=>[]},localStorage:{getItem:()=>null,setItem(){},removeItem(){}},console};
ctx.window.window=ctx.window; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(dataFile,'utf8'),ctx);
ctx.window.ICU_DATA=ctx.window.ICU_DATA; 
const parts=['01-core.js','02-data.js','03-search-aliases.js','04-search.js'].map(f=>fs.readFileSync('/workspace/v2-build/parts/'+f,'utf8')).join('\n');
vm.runInContext('var window=this.window;'+parts+'\nthis.__search=search;',ctx);
const cases=[['PE','pe'],['vtach',/unstable-tachy|cardiac-arrest/],['heart attack','acs-mi'],['GIB','gi-bleed'],['levophed',/shock|sepsis/],['anaphylxis','anaphylaxis'],
['vfib','cardiac-arrest'],['sz','status-epilepticus'],['MI','acs-mi'],['afib','afib-rvr'],['K','hyperkalemia'],['hyperkalaemia','hyperkalemia'],['DKA','dka'],['ICP','ich-icp'],['ICH','ich-icp'],['CVA','ischemic-stroke'],['stroke','ischemic-stroke'],['OD','overdose'],['ETOH','alcohol-withdrawal'],['DTs','alcohol-withdrawal'],['PTX','tension-pneumothorax'],['pneumo','tension-pneumothorax'],['code','cardiac-arrest'],['CPR','cardiac-arrest'],['pulseless','cardiac-arrest'],['arrest','cardiac-arrest'],['STEMI','acs-mi'],['ACS','acs-mi'],['RVR','afib-rvr'],['AF','afib-rvr'],['seizure','status-epilepticus'],['norepinephrine',/shock|sepsis/],['potassium','hyperkalemia'],['pea','cardiac-arrest'],['timer','tool:timer'],['gcs','tool:gcs'],['sbar','tool:sbar'],['hypoglycaemia','hypoglycemia'],['k+','hyperkalemia'],['v-tach',/unstable-tachy|cardiac-arrest/],['rsi','resp-failure-intubation'],['epi',null],['chest pain','acs-mi'],['narcan','overdose'],['sepsis','sepsis'],['anaphlaxis','anaphylaxis'],['pulmonary embolus','pe'],['tia','ischemic-stroke'],['HHS','hhs'],['tbi','severe-tbi'],['dissection','aortic-dissection'],['chf','pulm-edema-adhf'],['asthma','asthma-copd'],['copd','asthma-copd'],['trach','airway-emergency'],['cabg','post-cardiac-surgery'],['transfusion reaction','transfusion-reaction'],['liver failure','acute-liver-failure'],['delirium','delirium-agitation'],['hyponatremia','sodium-emergencies'],['spinal','spinal-cord-injury'],['htn','hypertensive-emergency'],['epipen','anaphylaxis']];
let fail=0;
for(const [q,exp] of cases){const r=ctx.__search(q,'All');const top=r[0]?r[0].id:'(none)';
 const ok=exp===null?true:(exp instanceof RegExp?exp.test(top):top===exp); if(!ok)fail++;
 console.log((ok?'ok  ':'FAIL')+' '+q.padEnd(16)+' -> '+r.slice(0,4).map(e=>e.id).join(', ')+'  ('+r.length+')');}
console.log(fail?fail+' FAILED':'all passed'); process.exit(fail?1:0);
