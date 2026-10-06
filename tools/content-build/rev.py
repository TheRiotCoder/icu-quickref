import sys,re
n=int(sys.argv[1]); R='/workspace/reviews/'
def sect(f,start_pat,stop_pat,lo=0):
    L=open(R+f,encoding='utf8').read().split('\n')
    out=[];on=False
    for i,l in enumerate(L):
        if i<lo: continue
        if on and re.match(stop_pat,l): break
        if not on and re.match(start_pat,l): on=True
        if on: out.append(l)
    return out
def strip_why(lines):
    return [l for l in lines if not re.match(r'^- Why:',l)]
print("######## NURSE");print('\n'.join(strip_why(sect('01-icu-nurse.md',rf'^### 3\.{n} ',r'^(### |## )'))))
print("######## INTENSIVIST");print('\n'.join(sect('02-intensivist.md',rf'^### 5\.{n} ',r'^(### |## )')))
ph=['Cardiac arrest','Anaphylaxis','Tension pneumothorax','Status epilepticus','Acute MI / ACS','Cardiogenic shock','Atrial fibrillation with RVR','Unstable tachycardia','Symptomatic bradycardia','Acute respiratory failure / intubation','Ventilator alarms','ARDS','Pulmonary embolism','Sepsis / septic shock','Hemorrhagic shock','Acute ischemic stroke','ICH / increased ICP','DKA','Severe hypoglycemia','Hyperkalemia','AKI','GI bleed','Cardiac tamponade','Alcohol withdrawal','Overdose'][n-1]
print("######## PHARM");print('\n'.join(sect('03-pharmacist.md',r'^### '+re.escape(ph)+r'\s*$',r'^(### |## )',lo=450)))
