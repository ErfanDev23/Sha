const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');
// Minimal .env loader (no external dependency)
const ENV_FILE = path.join(__dirname, '.env');
if (fs.existsSync(ENV_FILE)) {
  for (const line of fs.readFileSync(ENV_FILE, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const DB_FILE = path.join(ROOT, 'data', 'db.json');
const FRONT = ROOT;
const sessions = new Map();

function readDB(){ return JSON.parse(fs.readFileSync(DB_FILE,'utf8')); }
function writeDB(db){ const tmp=DB_FILE+'.tmp'; fs.writeFileSync(tmp, JSON.stringify(db,null,2),'utf8'); fs.renameSync(tmp,DB_FILE); }
function json(res,status,data){ const body=JSON.stringify(data); res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,DELETE,OPTIONS'}); res.end(body); }
function readBody(req){ return new Promise((resolve,reject)=>{let s=''; req.on('data',c=>{s+=c;if(s.length>2e6) reject(new Error('payload too large'));});req.on('end',()=>{try{resolve(s?JSON.parse(s):{});}catch(e){reject(new Error('JSON نامعتبر'));}});req.on('error',reject);}); }
function hash(p,s=crypto.randomBytes(16).toString('hex')){return {salt:s,hash:crypto.scryptSync(p,s,64).toString('hex')}}
function verify(p,u){return crypto.timingSafeEqual(Buffer.from(hash(p,u.salt).hash,'hex'),Buffer.from(u.passwordHash,'hex'))}
function token(){return crypto.randomBytes(32).toString('hex')}
function auth(req,db,role){const h=req.headers.authorization||''; const t=h.startsWith('Bearer ')?h.slice(7):null; const uid=t&&sessions.get(t); if(!uid)return null; const u=db.users.find(x=>String(x.id)===String(uid)); if(!u|| (role&&u.role!==role))return null; return u;}
function pubUser(u){if(!u)return null; const {passwordHash,salt,...safe}=u; return safe;}
function seedAdmin(db){if(!db.users.some(u=>u.role==='admin')){const h=hash(process.env.ADMIN_PASSWORD||'change-me-now');db.users.push({id:1,role:'admin',name:'مدیر سایت',username:process.env.ADMIN_USERNAME||'admin',email:process.env.ADMIN_EMAIL||'admin@example.com',passwordHash:h.hash,salt:h.salt,courses:[],favorites:[],quizResults:[],points:0,createdAt:new Date().toISOString()});writeDB(db);}}

async function handle(req,res){
 if(req.method==='OPTIONS'){res.writeHead(204,{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type, Authorization','Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,DELETE,OPTIONS'});return res.end();}
 const p=url.parse(req.url).pathname; const db=readDB(); seedAdmin(db);
 try{
  if(req.method==='GET' && p==='/api/health') return json(res,200,{ok:true,time:new Date().toISOString()});
  if(req.method==='GET' && p==='/api/public/state'){
    return json(res,200,{courses:db.courses,videos:db.videos,pdfs:db.pdfs,quizzes:db.quizzes,blog:db.blog,messages:db.messages.filter(m=>m.status==='active'),coupons:db.coupons,notifs:db.notifs,faqs:db.faqs});
  }
  if(req.method==='POST' && p==='/api/auth/register'){
    const b=await readBody(req); if(!b.name||!b.username||!b.email||!b.password) return json(res,400,{error:'همه فیلدها الزامی است'}); if(b.password.length<6)return json(res,400,{error:'رمز عبور باید حداقل ۶ کاراکتر باشد'});
    if(db.users.some(u=>u.username.toLowerCase()===b.username.toLowerCase()))return json(res,409,{error:'این نام کاربری قبلاً ثبت شده است'});
    if(db.users.some(u=>u.email.toLowerCase()===b.email.toLowerCase()))return json(res,409,{error:'این ایمیل قبلاً ثبت شده است'});
    const h=hash(b.password),u={id:Date.now(),role:'user',name:b.name.trim(),username:b.username.trim(),email:b.email.trim(),passwordHash:h.hash,salt:h.salt,courses:[],favorites:[],quizResults:[],points:0,createdAt:new Date().toISOString()};db.users.push(u);writeDB(db);const t=token();sessions.set(t,u.id);return json(res,201,{token:t,user:pubUser(u)});
  }
  if(req.method==='POST' && p==='/api/auth/login'){
    const b=await readBody(req); const u=db.users.find(x=>x.username.toLowerCase()===String(b.username||'').toLowerCase()); if(!u||!verify(String(b.password||''),u))return json(res,401,{error:'نام کاربری یا رمز عبور اشتباه است'});const t=token();sessions.set(t,u.id);return json(res,200,{token:t,user:pubUser(u)});
  }
  if(req.method==='POST' && p==='/api/auth/logout'){const h=req.headers.authorization||'';if(h.startsWith('Bearer '))sessions.delete(h.slice(7));return json(res,200,{ok:true});}
  if(req.method==='GET' && p==='/api/me'){const u=auth(req,db);if(!u)return json(res,401,{error:'نیاز به ورود'});return json(res,200,{user:pubUser(u)});}
  if(req.method==='PATCH' && p==='/api/me'){
    const u=auth(req,db);if(!u)return json(res,401,{error:'نیاز به ورود'});const b=await readBody(req);if(b.name)u.name=b.name.trim();if(b.email)u.email=b.email.trim();if(b.password){const h=hash(b.password);u.passwordHash=h.hash;u.salt=h.salt;}writeDB(db);return json(res,200,{user:pubUser(u)});
  }
  if(req.method==='POST' && p==='/api/orders'){
    const u=auth(req,db);if(!u)return json(res,401,{error:'ابتدا وارد شوید'});const b=await readBody(req);if(!Array.isArray(b.items)||!b.items.length)return json(res,400,{error:'سبد خرید خالی است'});
    const items=[];let subtotal=0;for(const it of b.items){const c=db.courses.find(x=>x.id===it.id&&x.status==='active');if(!c)continue;const qty=Math.max(1,Math.min(99,Number(it.qty)||1));items.push({id:c.id,type:'course',icon:c.icon,title:c.title,price:c.price,qty});subtotal+=c.price*qty;}if(!items.length)return json(res,400,{error:'هیچ محصول معتبری در سبد نیست'});
    let discount=0,couponCode=null;if(b.couponCode){const c=db.coupons.find(x=>x.code.toUpperCase()===String(b.couponCode).toUpperCase()&&x.status==='active');if(c&&c.uses<c.max){discount=Math.round(subtotal*c.discount/100);couponCode=c.code;c.uses=(c.uses||0)+1;}}
    const order={id:Date.now(),orderNumber:'ORD-'+Date.now(),userId:u.id,name:b.name,email:b.email,phone:b.phone,items,subtotal,discount,total:subtotal-discount,couponCode,paymentMethod:b.paymentMethod||'zarinpal',status:'pending',date:new Date().toISOString()};db.orders.push(order);for(const it of items){if(!u.courses.includes(it.id))u.courses.push(it.id);const c=db.courses.find(x=>x.id===it.id);if(c)c.students=(c.students||0)+1;}writeDB(db);return json(res,201,{order});
  }
  if(req.method==='GET' && p==='/api/my/orders'){const u=auth(req,db);if(!u)return json(res,401,{error:'نیاز به ورود'});return json(res,200,{orders:db.orders.filter(o=>o.userId===u.id)});}
  if(req.method==='PUT' && p==='/api/admin/state'){
    const u=auth(req,db,'admin');if(!u)return json(res,403,{error:'دسترسی مدیر لازم است'});const b=await readBody(req);for(const k of ['courses','videos','pdfs','quizzes','blog','messages','coupons','notifs','faqs'])if(Array.isArray(b[k]))db[k]=b[k];writeDB(db);return json(res,200,{ok:true});
  }
  if(req.method==='GET' && p==='/api/admin/users'){const u=auth(req,db,'admin');if(!u)return json(res,403,{error:'دسترسی مدیر لازم است'});return json(res,200,{users:db.users.map(pubUser)});}
  if(req.method==='GET' && p==='/api/admin/orders'){const u=auth(req,db,'admin');if(!u)return json(res,403,{error:'دسترسی مدیر لازم است'});return json(res,200,{orders:db.orders});}
  if(req.method==='GET' && p==='/api/admin/stats'){const u=auth(req,db,'admin');if(!u)return json(res,403,{error:'دسترسی مدیر لازم است'});return json(res,200,{courses:db.courses.length,videos:db.videos.length,pdfs:db.pdfs.length,quizzes:db.quizzes.length,users:db.users.filter(x=>x.role==='user').length,orders:db.orders.length,revenue:db.orders.reduce((s,o)=>s+(o.total||0),0),messages:db.messages.filter(m=>m.status==='pending').length});}
  if(req.method==='DELETE' && p.startsWith('/api/admin/users/')){const u=auth(req,db,'admin');if(!u)return json(res,403,{error:'دسترسی مدیر لازم است'});const id=Number(p.split('/').pop());db.users=db.users.filter(x=>x.id!==id||x.role==='admin');writeDB(db);return json(res,200,{ok:true});}
  if(req.method==='GET' && p==='/api/admin/export'){const u=auth(req,db,'admin');if(!u)return json(res,403,{error:'دسترسی مدیر لازم است'});return json(res,200,db);}
  return json(res,404,{error:'مسیر پیدا نشد'});
 }catch(e){console.error(e);return json(res,500,{error:'خطای داخلی سرور'});}
}

const server=http.createServer((req,res)=>{
 const p=url.parse(req.url).pathname;
 if(p.startsWith('/api/')) return handle(req,res);
 let file=p==='/'?'/index.html':p; const fp=path.join(FRONT,file); if(!fp.startsWith(FRONT)||!fs.existsSync(fp)||fs.statSync(fp).isDirectory())return json(res,404,{error:'Not found'});const ext=path.extname(fp);const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'};res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});fs.createReadStream(fp).pipe(res);
});
server.listen(PORT,()=>console.log(`Academy server running: http://localhost:${PORT}`));
