const fs = require('fs');
const path = require('path');
const app = fs.readFileSync(path.join(__dirname, '..','src','app','app.component.ts'),'utf8');
const en = JSON.parse(fs.readFileSync(path.join(__dirname,'..','src','assets','i18n','en.json'),'utf8'));
const ru = JSON.parse(fs.readFileSync(path.join(__dirname,'..','src','assets','i18n','ru.json'),'utf8'));

const titles = [];
const re = /\{\s*title:\s*'([^']+)'/g;
let m;
while((m = re.exec(app))){
  titles.push(m[1]);
}

autoKeyExists = (obj, key)=>{
  if(obj.hasOwnProperty(key)) return true;
  // try dot path
  if(key.indexOf('.')===-1) return false;
  const parts = key.split('.');
  let cur = obj;
  for(const p of parts){
    if(cur && typeof cur === 'object' && cur.hasOwnProperty(p)) cur = cur[p];
    else return false;
  }
  return true;
}

const missing = {en:[], ru:[]};
for(const t of titles){
  if(!autoKeyExists(en,t)) missing.en.push(t);
  if(!autoKeyExists(ru,t)) missing.ru.push(t);
}
console.log('Found titles:', titles.length);
console.log('Missing in en.json:', missing.en);
console.log('Missing in ru.json:', missing.ru);
process.exit(0);
