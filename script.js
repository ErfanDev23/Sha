/* ============================================================
   SAFE LOCALSTORAGE
============================================================ */
function safeGet(k, f) {
  try {
    const r = localStorage.getItem(k);
    if (!r) return f;
    const p = JSON.parse(r);
    return (p === null || p === undefined) ? f : p;
  } catch (e) {
    console.warn('⚠️ داده خراب پاک شد:', k);
    try { localStorage.removeItem(k); } catch (x) {}
    return f;
  }
}

function safeSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
}

/* ============================================================
   DEFAULTS
============================================================ */
const DC = [
  { id: 1, icon: '📚', title: 'دوره جامع زیست پایه', desc: 'از صفر تا صد زیست دهم و یازدهم.', price: 2500000, unit: 'تومان', status: 'active', students: 1240 },
  { id: 2, icon: '🧬', title: 'زیست دوازدهم پیشرفته', desc: 'مباحث تخصصی زیست دوازدهم.', price: 4800000, unit: 'تومان', status: 'active', students: 980 },
  { id: 3, icon: '🎯', title: 'مشاوره خصوصی زیست', desc: 'جلسات خصوصی برنامه‌ریزی.', price: 800000, unit: 'تومان', status: 'active', students: 320 },
  { id: 4, icon: '💎', title: 'پکیج ویژه الماس', desc: 'همه دوره‌ها + مشاوره + جزوه + VIP.', price: 9900000, unit: 'تومان', status: 'active', students: 450 },
  { id: 5, icon: '📝', title: 'آزمون‌های آزمایشی', desc: 'آزمون استاندارد با کارنامه.', price: 500000, unit: 'تومان', status: 'active', students: 2100 },
  { id: 6, icon: '📖', title: 'کتاب‌های زیست کنکور', desc: 'کتاب تالیفی با تست‌های طبقه‌بندی.', price: 350000, unit: 'تومان', status: 'active', students: 3400 }
];

const DV = [
  { id: 1, title: 'زیست دهم — فصل ۱: دنیای زنده', grade: 'دهم', duration: '۲۵:۳۰', locked: false, isNew: true, views: 1240, desc: 'معرفی دنیای زنده.' },
  { id: 2, title: 'زیست دهم — فصل ۲: گوارش', grade: 'دهم', duration: '۴۵:۱۲', locked: false, isNew: false, views: 980, desc: 'دستگاه گوارش.' },
  { id: 3, title: 'زیست یازدهم — تنظیم عصبی', grade: 'یازدهم', duration: '۳۸:۲۰', locked: true, isNew: true, views: 720, desc: 'نورون‌ها.' },
  { id: 4, title: 'زیست یازدهم — دستگاه حرکتی', grade: 'یازدهم', duration: '۵۲:۱۰', locked: true, isNew: false, views: 650, desc: 'استخوان‌ها.' },
  { id: 5, title: 'زیست دوازدهم — مولکول‌های اطلاعاتی', grade: 'دوازدهم', duration: '۵۵:۴۰', locked: true, isNew: true, views: 1580, desc: 'DNA و RNA.' },
  { id: 6, title: 'زیست دوازدهم — تغییر اطلاعات وراثتی', grade: 'دوازدهم', duration: '۴۸:۱۵', locked: true, isNew: false, views: 890, desc: 'جهش.' },
  { id: 7, title: 'جمع‌بندی ژنتیک', grade: 'جمع‌بندی', duration: '۱:۱۵:۰۰', locked: true, isNew: true, views: 2100, desc: 'مرور ژنتیک.' },
  { id: 8, title: 'تکنیک‌های تست‌زنی زیست', grade: 'جمع‌بندی', duration: '۴۲:۳۰', locked: false, isNew: false, views: 3200, desc: 'تکنیک تست‌زنی.' }
];

const DP = [
  { id: 1, title: 'خلاصه زیست دهم — فصل ۱ تا ۴', grade: 'دهم', type: 'خلاصه', size: '2.5 MB', pages: 45, downloads: 1240, locked: false, desc: 'خلاصه فصول ۱ تا ۴.' },
  { id: 2, title: 'تست‌های زیست دهم', grade: 'دهم', type: 'تست', size: '4.8 MB', pages: 120, downloads: 890, locked: false, desc: '+۵۰۰ تست.' },
  { id: 3, title: 'خلاصه زیست یازدهم', grade: 'یازدهم', type: 'خلاصه', size: '3.2 MB', pages: 60, downloads: 720, locked: true, desc: 'خلاصه یازدهم.' },
  { id: 4, title: 'جزوه ژنتیک دوازدهم', grade: 'دوازدهم', type: 'خلاصه', size: '5.5 MB', pages: 85, downloads: 1580, locked: true, desc: 'جزوه ژنتیک.' },
  { id: 5, title: 'تست‌های ژنتیک کنکور', grade: 'دوازدهم', type: 'تست', size: '6.2 MB', pages: 150, downloads: 2100, locked: true, desc: 'تست ژنتیک.' },
  { id: 6, title: 'خلاصه جمع‌بندی کنکور', grade: 'جمع‌بندی', type: 'خلاصه', size: '8.5 MB', pages: 200, downloads: 3400, locked: true, desc: 'خلاصه کنکور.' }
];

const DQ = [
  { id: 1, title: 'آزمون زیست دهم — فصل ۱', grade: 'دهم', time: 10, questions: [
    { q: 'کدام یک ویژگی موجودات زنده نیست؟', opts: ['تنفس', 'رشد', 'تحرک ارادی', 'تولید مثل'], correct: 2 },
    { q: 'واحد ساختاری موجودات زنده چیست؟', opts: ['بافت', 'سلول', 'اندام', 'مولکول'], correct: 1 },
    { q: 'حامل اطلاعات وراثتی کدام است؟', opts: ['پروتئین', 'DNA', 'لیپید', 'کربوهیدرات'], correct: 1 },
    { q: 'فتوسنتز در کدام اندامک؟', opts: ['میتوکندری', 'کلروپلاست', 'ریبوزوم', 'هسته'], correct: 1 },
    { q: 'کدام یوکاریوت است؟', opts: ['باکتری', 'قارچ', 'آرکی', 'ویروس'], correct: 1 }
  ]},
  { id: 2, title: 'آزمون ژنتیک دوازدهم', grade: 'دوازدهم', time: 15, questions: [
    { q: 'DNA در کدام بخش سلول؟', opts: ['سیتوپلاسم', 'هسته', 'میتوکندری', 'گلژی'], correct: 1 },
    { q: 'در همانندسازی چه آنزیمی؟', opts: ['لیگاز', 'پلیمراز', 'هلیکاز', 'همه'], correct: 3 },
    { q: 'کدام باز با گوانین جفت؟', opts: ['آدنین', 'تیمین', 'سیتوزین', 'اوراسیل'], correct: 2 },
    { q: 'جهش در کدام مرحله؟', opts: ['رونویسی', 'ترجمه', 'همانندسازی', 'همه'], correct: 3 },
    { q: 'کدون چیست؟', opts: ['سه نوکلئوتید', 'یک نوکلئوتید', 'دو نوکلئوتید', 'چهار نوکلئوتید'], correct: 0 }
  ]}
];

const DB = [
  { id: 1, title: '۵ تکنیک طلایی تست‌زنی زیست', cat: 'تکنیک', emoji: '🧬', views: 1240, date: '۱۴۰۳/۰۹/۱۵', excerpt: 'تکنیک‌های سریع تست‌زنی.' },
  { id: 2, title: 'چطور زیست را ۱۰۰ بزنیم؟', cat: 'مطالعه', emoji: '📚', views: 2100, date: '۱۴۰۳/۰۹/۱۲', excerpt: 'روش مطالعه صحیح.' },
  { id: 3, title: 'جمع‌بندی ژنتیک در ۷ روز', cat: 'جمع‌بندی', emoji: '🧪', views: 980, date: '۱۴۰۳/۰۹/۱۰', excerpt: 'برنامه ۷ روزه.' }
];

const DM = [
  { id: 1, name: 'سارا محمدی', subject: 'ثبت‌نام', text: 'دوره دوازدهم کی شروع می‌شه؟', date: '۱۴۰۳/۰۹/۱۵', status: 'pending' },
  { id: 2, name: 'علی رضایی', subject: 'مشاوره', text: 'برای مشاوره وقت خالی دارید؟', date: '۱۴۰۳/۰۹/۱۴', status: 'pending' }
];

const DCP = [
  { id: 1, code: 'BIO20', discount: 20, uses: 0, max: 100, status: 'active' },
  { id: 2, code: 'KONKUR30', discount: 30, uses: 5, max: 50, status: 'active' },
  { id: 3, code: 'AHMADIAN50', discount: 50, uses: 2, max: 20, status: 'active' }
];

const DN = [
  { id: 1, text: '🎉 به آکادمی دکتر علیرضا احمدیان خوش آمدید!', time: 'الان', unread: true },
  { id: 2, text: '📚 دوره جدید زیست دوازدهم اضافه شد', time: '۲ ساعت پیش', unread: true }
];

const DF = [
  { id: 1, q: 'چطور در دوره‌ها ثبت‌نام کنم؟', a: 'از منوی «دوره‌ها» دوره رو انتخاب کن، به سبد اضافه کن و بعد از خرید، دسترسی فعال می‌شه.' },
  { id: 2, q: 'دوره‌ها آنلاین برگزار می‌شوند؟', a: 'بله، با دسترسی همیشگی.' },
  { id: 3, q: 'گواهی پایان دوره چطور صادر می‌شود؟', a: 'بعد از تکمیل ۱۰۰٪ دوره، از پنل کاربری بخش گواهی.' },
  { id: 4, q: 'بازگشت وجه وجود دارد؟', a: 'بله، تا ۷ روز پس از خرید.' },
  { id: 5, q: 'چطور پشتیبانی بگیرم؟', a: 'از چت آنلاین یا ایمیل info@ahmadian.com.' },
  { id: 6, q: 'کد تخفیف را کجا وارد کنم؟', a: 'در صفحه تسویه حساب، بخش کد تخفیف.' },
  { id: 7, q: 'پرداخت قسطی دارید؟', a: 'برای دوره‌های بالای ۵ میلیون تومان بله.' },
  { id: 8, q: 'روی چند دستگاه می‌توانم استفاده کنم؟', a: 'روی ۲ دستگاه به‌طور همزمان.' }
];

/* ============================================================
   STATE
============================================================ */
let courses = safeGet('bc', DC);
let videos = safeGet('bv', DV);
let pdfs = safeGet('bp', DP);
let quizzes = safeGet('bq', DQ);
let blog = safeGet('bb', DB);
let messages = safeGet('bm', DM);
let coupons = safeGet('bcp', DCP);
let users = safeGet('bu', []);
let curUser = safeGet('bcu', null);
let notifs = safeGet('bn', DN);
let faqs = safeGet('bf', DF);
let orders = safeGet('bo', []);
let newsletter = safeGet('bnl', []);
let cart = safeGet('bcart', []);

if (!Array.isArray(courses)) courses = DC;
if (!Array.isArray(videos)) videos = DV;
if (!Array.isArray(pdfs)) pdfs = DP;
if (!Array.isArray(quizzes)) quizzes = DQ;
if (!Array.isArray(blog)) blog = DB;
if (!Array.isArray(messages)) messages = DM;
if (!Array.isArray(coupons)) coupons = DCP;
if (!Array.isArray(users)) users = [];
if (!Array.isArray(notifs)) notifs = DN;
if (!Array.isArray(faqs)) faqs = DF;
if (!Array.isArray(orders)) orders = [];
if (!Array.isArray(newsletter)) newsletter = [];
if (!Array.isArray(cart)) cart = [];

function save() {
  saveLocalOnly();
  if (isAdmin()) {
    api('/admin/state', { method: 'PUT', body: JSON.stringify({ courses, videos, pdfs, quizzes, blog, messages, coupons, notifs, faqs }) })
      .catch(e => console.warn('ذخیره روی سرور انجام نشد:', e.message));
  }
}

/* ============================================================
   UTILITIES
============================================================ */
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fa(n) {
  return Number(n || 0).toLocaleString('fa-IR');
}

function faP(n) {
  return fa(n) + ' تومان';
}

function gId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function gOrd() {
  const d = new Date();
  return 'ORD-' +
    String(d.getFullYear()).slice(-2) +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') + '-' +
    String(Math.floor(Math.random() * 9999)).padStart(4, '0');
}

/* ============================================================
   AUTH
============================================================ */
const API_BASE = window.location.protocol === 'file:' ? 'http://localhost:3000/api' : '/api';
let authToken = safeGet('authToken', null);
let authRole = safeGet('authRole', null);

async function api(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (authToken) headers.Authorization = 'Bearer ' + authToken;
  const res = await fetch(API_BASE + path, { ...options, headers });
  let body = {};
  try { body = await res.json(); } catch (_) {}
  if (!res.ok) throw new Error(body.error || 'خطا در ارتباط با سرور');
  return body;
}

function isAdmin() { return authRole === 'admin' && !!authToken; }
function isLogged() { return curUser !== null && !!authToken; }

async function hydrateFromServer() {
  try {
    const d = await api('/public/state');
    if (Array.isArray(d.courses)) courses = d.courses;
    if (Array.isArray(d.videos)) videos = d.videos;
    if (Array.isArray(d.pdfs)) pdfs = d.pdfs;
    if (Array.isArray(d.quizzes)) quizzes = d.quizzes;
    if (Array.isArray(d.blog)) blog = d.blog;
    if (Array.isArray(d.messages)) messages = d.messages;
    if (Array.isArray(d.coupons)) coupons = d.coupons;
    if (Array.isArray(d.notifs)) notifs = d.notifs;
    if (Array.isArray(d.faqs)) faqs = d.faqs;
    if (Array.isArray(d.orders) && isAdmin()) orders = d.orders;
    saveLocalOnly();
  } catch (e) { console.warn('Server sync failed:', e.message); }
}

function saveLocalOnly() {
  safeSet('bc', courses); safeSet('bv', videos); safeSet('bp', pdfs); safeSet('bq', quizzes);
  safeSet('bb', blog); safeSet('bm', messages); safeSet('bcp', coupons); safeSet('bn', notifs);
  safeSet('bf', faqs); safeSet('bo', orders); safeSet('bnl', newsletter); safeSet('bcart', cart);
  if (curUser) safeSet('bcu', curUser); else try { localStorage.removeItem('bcu'); } catch(e) {}
}

function authClick() {
  if (isAdmin()) goPage('admin');
  else if (isLogged()) goPage('user');
  else goPage('login');
}

function updAuth() {
  const b = document.getElementById('abtn');
  if (!b) return;
  if (isAdmin()) {
    b.textContent = '👨‍🏫 پنل ادمین';
    b.style.background = 'var(--ne)';
    b.style.color = '#0a0616';
  } else if (isLogged()) {
    b.textContent = '👤 ' + (curUser.name || 'کاربر').split(' ')[0];
    b.style.background = 'transparent';
    b.style.color = 'var(--ne)';
  } else {
    b.textContent = '🔐 ورود';
    b.style.background = 'transparent';
    b.style.color = 'var(--ne)';
  }
  if (typeof updateMobUserBtn === 'function') updateMobUserBtn();
}

function swAuth(t) {
  const isL = t === 'login';
  document.getElementById('tLogin').classList.toggle('active', isL);
  document.getElementById('tReg').classList.toggle('active', !isL);
  document.getElementById('loginF').style.display = isL ? 'block' : 'none';
  document.getElementById('regF').style.display = isL ? 'none' : 'block';
  document.getElementById('aTitle').textContent = isL ? 'ورود به حساب' : 'ثبت‌نام';
  document.getElementById('aSub').textContent = isL ? 'خوش آمدید! لطفاً وارد شوید.' : 'حساب جدید بسازید.';
  document.getElementById('lerr').classList.remove('show');
}

function showErr(m) {
  const e = document.getElementById('lerr');
  if (!e) return;
  e.textContent = m;
  e.classList.add('show');
  clearTimeout(showErr._t);
  showErr._t = setTimeout(() => e.classList.remove('show'), 3500);
}

async function doLogin(e) {
  e.preventDefault();
  const u = document.getElementById('lu').value.trim();
  const p = document.getElementById('lp').value.trim();
  try {
    const r = await api('/auth/login', { method:'POST', body:JSON.stringify({ username:u, password:p }) });
    authToken = r.token; authRole = r.user.role || 'user'; curUser = r.user;
    safeSet('authToken', authToken); safeSet('authRole', authRole); saveLocalOnly();
    document.getElementById('lerr').classList.remove('show');
    document.getElementById('lu').value=''; document.getElementById('lp').value='';
    updAuth(); addN('🎉 ' + (r.user.name || 'کاربر') + ' عزیز، خوش آمدی!');
    toast('✓ خوش آمدید ' + (r.user.name || '') + '!');
    setTimeout(() => goPage(authRole === 'admin' ? 'admin' : 'user'), 400);
  } catch (err) { showErr('❌ ' + err.message); }
}

async function doReg(e) {
  e.preventDefault();
  const n=document.getElementById('rn').value.trim(), u=document.getElementById('ru').value.trim();
  const em=document.getElementById('re').value.trim(), p=document.getElementById('rp').value.trim();
  try {
    const r=await api('/auth/register',{method:'POST',body:JSON.stringify({name:n,username:u,email:em,password:p})});
    authToken=r.token; authRole='user'; curUser=r.user;
    safeSet('authToken',authToken); safeSet('authRole',authRole); saveLocalOnly(); updAuth();
    toast('✓ ثبت‌نام با موفقیت انجام شد'); setTimeout(()=>goPage('user'),400);
  } catch(err){ showErr('❌ '+err.message); }
}

async function logout() {
  try { if (authToken) await api('/auth/logout',{method:'POST'}); } catch(e) {}
  authToken=null; authRole=null; curUser=null;
  try { localStorage.removeItem('authToken'); localStorage.removeItem('authRole'); localStorage.removeItem('bcu'); localStorage.removeItem('ba'); } catch(e) {}
  updAuth(); goPage('home'); toast('👋 با موفقیت خارج شدید');
}

/* ============================================================
   NAVIGATION
============================================================ */
const VP = ['home', 'courses', 'videos', 'pdfs', 'quizzes', 'blog', 'stats', 'faq', 'about', 'contact', 'login', 'user', 'admin', 'checkout', 'success'];

function goPage(p, push) {
  if (push === undefined) push = true;
  if (!VP.includes(p)) p = 'home';

  if (p === 'user' && isAdmin()) p = 'admin';
  if (p === 'admin' && !isAdmin()) p = 'login';
  if ((p === 'user' || p === 'checkout') && !isLogged() && !isAdmin()) p = 'login';

  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  const t = document.getElementById('page-' + p);
  if (t) t.classList.add('active');

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === p);
  });

  if (push && location.hash !== '#' + p) {
    try { history.pushState({ p }, '', '#' + p); } catch (e) { location.hash = p; }
  }
  window.scrollTo({ top: 0, behavior: 'auto' });
  const n = document.getElementById('nav');
  if (n) n.classList.remove('open');

  const ti = {
    home: 'خانه', courses: 'دوره‌ها', videos: 'ویدیوها', pdfs: 'جزوه‌ها',
    quizzes: 'آزمون‌ها', blog: 'وبلاگ', stats: 'آمار زنده', faq: 'سوالات',
    about: 'درباره', contact: 'تماس', login: 'ورود', user: 'پنل کاربری',
    admin: 'پنل ادمین', checkout: 'تکمیل خرید', success: 'پرداخت موفق'
  };
  document.title = 'دکتر علیرضا احمدیان | ' + (ti[p] || 'خانه');

  if (p === 'videos') renderVideos();
  if (p === 'pdfs') renderPDFs();
  if (p === 'quizzes') renderQuizzes();
  if (p === 'courses') renderCourses();
  if (p === 'blog') renderBlog();
  if (p === 'faq') renderFAQs();
  if (p === 'admin') renderAdmin();
  if (p === 'user') renderUser();
  if (p === 'checkout') renderCheckout();
  initRev();

  if (typeof updateMobNav === 'function') updateMobNav(p);
}

function loadHash() {
  const h = (location.hash || '').replace('#', '') || 'home';
  const p = VP.includes(h) ? h : 'home';
  const c = document.querySelector('.page.active');
  if (c && c.id === 'page-' + p) return;
  goPage(p, false);
}

function tglMenu() {
  document.getElementById('nav').classList.toggle('open');
}

/* ============================================================
   LIVE CHAT (گف‌تینو)
============================================================ */
function openLiveChat() {
  try {
    if (window.Goftino && typeof window.Goftino.open === 'function') {
      window.Goftino.open();
    } else {
      toast('💬 دکمه چت پایین راست رو بزن');
    }
  } catch (e) {
    toast('💬 دکمه چت پایین راست رو بزن');
  }
}

/* ============================================================
   NOTIFICATIONS
============================================================ */
function toggleNotif() {
  document.getElementById('np').classList.toggle('show');
}

function renderN() {
  const l = document.getElementById('nlist');
  if (!l) return;
  if (!notifs.length) {
    l.innerHTML = '<div class="ne2">اعلانی نیست</div>';
    return;
  }
  l.innerHTML = notifs.slice(0, 15).map(n =>
    '<div class="ni ' + (n.unread ? 'un' : '') + '" onclick="markR(' + n.id + ')">' +
    '<div>' + esc(n.text) + '</div><p>' + esc(n.time || '') + '</p></div>'
  ).join('');
  const hu = notifs.some(n => n.unread);
  const d = document.getElementById('ndot');
  if (d) d.style.display = hu ? 'block' : 'none';
}

function addN(t) {
  notifs.unshift({ id: gId(), text: t, time: 'الان', unread: true });
  save();
  renderN();
}

function markR(id) {
  const n = notifs.find(x => x.id === id);
  if (n) n.unread = false;
  save();
  renderN();
}

document.addEventListener('click', e => {
  const p = document.getElementById('np');
  if (!p) return;
  const b = e.target.closest('button[onclick="toggleNotif()"]');
  if (!p.contains(e.target) && !b) p.classList.remove('show');
});

/* ============================================================
   SEARCH
============================================================ */
function openSearch() {
  document.getElementById('so').classList.add('show');
  setTimeout(() => document.getElementById('si').focus(), 100);
}

function closeSearch() {
  document.getElementById('so').classList.remove('show');
  document.getElementById('si').value = '';
  document.getElementById('sr').innerHTML = '<div class="se">شروع به تایپ کنید...</div>';
}

function doSearch() {
  const q = document.getElementById('si').value.trim().toLowerCase();
  const r = document.getElementById('sr');
  if (!q) {
    r.innerHTML = '<div class="se">شروع به تایپ کنید...</div>';
    return;
  }
  const res = [];
  courses.forEach(c => {
    if ((c.title || '').toLowerCase().includes(q) || (c.desc || '').toLowerCase().includes(q))
      res.push({ ic: '📚', t: c.title, s: 'دوره', p: 'courses' });
  });
  videos.forEach(v => {
    if ((v.title || '').toLowerCase().includes(q))
      res.push({ ic: '🎬', t: v.title, s: 'ویدیو', p: 'videos' });
  });
  pdfs.forEach(p => {
    if ((p.title || '').toLowerCase().includes(q))
      res.push({ ic: '📄', t: p.title, s: 'جزوه', p: 'pdfs' });
  });
  quizzes.forEach(z => {
    if ((z.title || '').toLowerCase().includes(q))
      res.push({ ic: '📝', t: z.title, s: 'آزمون', p: 'quizzes' });
  });
  blog.forEach(b => {
    if ((b.title || '').toLowerCase().includes(q))
      res.push({ ic: '📖', t: b.title, s: 'مقاله', p: 'blog' });
  });

  r.innerHTML = res.length
    ? res.slice(0, 25).map(x =>
        '<div class="sri" onclick="closeSearch();goPage(\'' + x.p + '\')">' +
        '<div class="sic">' + x.ic + '</div>' +
        '<div class="sin"><h5>' + esc(x.t) + '</h5><p>' + x.s + '</p></div></div>'
      ).join('')
    : '<div class="se">نتیجه‌ای یافت نشد</div>';
}

/* ============================================================
   TOAST
============================================================ */
let toastT;
function toast(m, t) {
  t = t || '';
  const e = document.getElementById('toast');
  if (!e) return;
  e.textContent = m;
  e.className = 'toast show ' + t;
  clearTimeout(toastT);
  toastT = setTimeout(() => e.classList.remove('show'), 2800);
}

/* ============================================================
   THEME
============================================================ */
function tglTheme() {
  const b = document.body;
  const btn = document.getElementById('tbtn');
  const c = b.getAttribute('data-theme');
  const n = c === 'dark' ? 'light' : 'dark';
  b.setAttribute('data-theme', n);
  if (btn) btn.textContent = n === 'dark' ? '🌙' : '☀️';
  try { localStorage.setItem('bt', n); } catch (e) {}
}

/* ============================================================
   REVEAL
============================================================ */
let revObs = null;
if ('IntersectionObserver' in window) {
  revObs = new IntersectionObserver(en => {
    en.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('on');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
}

function initRev() {
  const n = document.querySelectorAll('.rev:not(.on)');
  if (!revObs) { n.forEach(e => e.classList.add('on')); return; }
  n.forEach(e => revObs.observe(e));
}

/* ============================================================
   MODAL
============================================================ */
function openModal(id) {
  const e = document.getElementById(id);
  if (!e) return;
  e.classList.add('show');
  document.body.classList.add('modal-open');
}

function closeModal(id) {
  const e = document.getElementById(id);
  if (!e) return;
  e.classList.remove('show');
  if (!document.querySelector('.mod.show')) document.body.classList.remove('modal-open');
}

/* ============================================================
   MOBILE BOTTOM NAV
============================================================ */
function updateMobNav(page) {
  document.querySelectorAll('.mn-btn[data-mob]').forEach(btn => {
    const key = btn.dataset.mob;
    if (key === 'user') {
      btn.classList.toggle('active', page === 'user' || page === 'admin');
    } else {
      btn.classList.toggle('active', key === page);
    }
  });
}

function updateMobUserBtn() {
  const icon = document.getElementById('mobUserIcon');
  const label = document.getElementById('mobUserLabel');
  if (!icon || !label) return;
  if (isAdmin()) {
    icon.textContent = '👨‍🏫';
    label.textContent = 'پنل ادمین';
  } else if (isLogged()) {
    icon.textContent = '👤';
    const firstName = (curUser.name || 'کاربر').split(' ')[0];
    label.textContent = firstName;
  } else {
    icon.textContent = '👤';
    label.textContent = 'ورود';
  }
}

function updateMobCartBadge() {
  const b = document.getElementById('mobCartBadge');
  if (!b) return;
  const t = cart.reduce((s, x) => s + (x.qty || 1), 0);
  if (t > 0) {
    b.style.display = 'flex';
    b.textContent = fa(t);
  } else {
    b.style.display = 'none';
  }
}

/* ============================================================
   COURSES
============================================================ */
function renderCourses() {
  const g = document.getElementById('coursesGrid');
  if (!g) return;
  const act = courses.filter(c => c.status === 'active');
  if (!act.length) {
    g.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--mu);padding:40px">دوره‌ای نیست.</p>';
    return;
  }
  g.innerHTML = act.map(c => {
    const enr = isLogged() && Array.isArray(curUser.courses) && curUser.courses.includes(c.id);
    const inC = cart.some(x => x.id === c.id && x.type === 'course');
    return '<div class="card rev">' +
      '<div class="ci">' + esc(c.icon || '📚') + '</div>' +
      '<h3>' + esc(c.title) + '</h3>' +
      '<p>' + esc(c.desc || '') + '</p>' +
      '<p style="color:var(--mu);font-size:.78rem;margin-bottom:8px">👥 ' + fa(c.students || 0) + ' دانشجو</p>' +
      '<div class="price">' + faP(c.price) + '</div>' +
      '<div class="pc">' +
      '<button class="btn bg bsm" onclick="openCourse(' + c.id + ')">📄 جزئیات</button>' +
      (enr
        ? '<button class="btn bs bsm" disabled>✓ خریداری شده</button>'
        : inC
          ? '<button class="btn bw bsm" onclick="rmCart(' + c.id + ',\'course\')">🗑 حذف</button>'
          : '<button class="btn bp bsm" onclick="addCart(' + c.id + ',\'course\')">🛒 افزودن</button>') +
      '</div></div>';
  }).join('');
  initRev();
}

function openCourse(id) {
  const c = courses.find(x => x.id === id);
  if (!c) return;
  const enr = isLogged() && Array.isArray(curUser.courses) && curUser.courses.includes(id);
  const inC = cart.some(x => x.id === id && x.type === 'course');
  document.getElementById('cc').innerHTML =
    '<h3 style="padding-left:45px;margin-bottom:20px">' + esc(c.icon || '📚') + ' ' + esc(c.title) + '</h3>' +
    '<div style="background:var(--gl);border:1px solid var(--bd);border-radius:14px;padding:20px;margin-bottom:18px">' +
    '<p style="color:var(--mu);line-height:1.9">' + esc(c.desc || '') + '</p></div>' +
    '<h4 style="margin-bottom:12px">✨ امکانات:</h4>' +
    '<ul class="al" style="margin-bottom:20px">' +
    '<li>دسترسی دائمی به ویدیوها</li><li>جزوه PDF اختصاصی</li>' +
    '<li>آزمون آنلاین و کارنامه</li><li>پشتیبانی مستقیم</li><li>گواهی پایان دوره</li></ul>' +
    '<div class="csb tt" style="margin-bottom:20px"><span>قیمت:</span>' +
    '<span class="tp" style="font-size:1.2rem">' + faP(c.price) + '</span></div>' +
    (enr
      ? '<button class="btn bs bbl" disabled>✓ قبلاً خریداری کرده‌اید</button>'
      : inC
        ? '<button class="btn bw bbl" onclick="closeCourse();openCart()">🛒 در سبد - مشاهده</button>'
        : '<button class="btn bp bbl" onclick="addCart(' + c.id + ',\'course\');closeCourse()">🛒 افزودن به سبد</button>');
  openModal('mCourse');
}

function closeCourse() { closeModal('mCourse'); }

/* ============================================================
   VIDEOS
============================================================ */
let vFil = 'all';
function filterVideos(g, el) {
  vFil = g;
  document.querySelectorAll('#page-videos .chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderVideos();
}

function renderVideos() {
  const g = document.getElementById('videosGrid');
  if (!g) return;
  const s = (document.getElementById('vSearch') ? document.getElementById('vSearch').value : '').toLowerCase();
  const f = videos.filter(v => (vFil === 'all' || v.grade === vFil) && (!s || ((v.title || '') + ' ' + (v.desc || '')).toLowerCase().includes(s)));
  if (!f.length) {
    g.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--mu);padding:40px">ویدیویی یافت نشد.</p>';
    return;
  }
  g.innerHTML = f.map(v =>
    '<div class="card rev" style="padding:15px">' +
    '<div class="vt" onclick="openVideo(' + v.id + ')">' +
    (v.isNew ? '<span class="bn">جدید</span>' : '') +
    (v.locked ? '<span class="blk">🔒 قفل</span>' : '<span class="bfr">رایگان</span>') +
    '</div><h3 style="font-size:1.02rem">' + esc(v.title) + '</h3>' +
    '<p style="font-size:.82rem">' + esc(v.desc || '') + '</p>' +
    '<div class="vm"><span>⏱ ' + esc(v.duration || '') + '</span><span>👁 ' + fa(v.views) + '</span></div></div>'
  ).join('');
  initRev();
}

function openVideo(id) {
  const v = videos.find(x => x.id === id);
  if (!v) return;
  if (v.locked) { toast('🔒 این ویدیو قفل است', 'warning'); return; }
  v.views = (v.views || 0) + 1;
  save();
  document.getElementById('vc').innerHTML =
    '<h3 style="padding-left:45px;margin-bottom:15px">' + esc(v.title) + '</h3>' +
    '<div class="vp"><div><div style="font-size:3rem;margin-bottom:12px">🎬</div>' +
    '<p>پلیر ویدیو — لینک واقعی را اینجا بگذارید</p></div></div>' +
    '<p style="color:var(--mu);font-size:.9rem;margin-top:14px">' + esc(v.desc || '') + '</p>' +
    '<div class="vm" style="margin-top:14px"><span>👁 ' + fa(v.views) + '</span>' +
    '<span>⏱ ' + esc(v.duration || '') + '</span><span>🎓 ' + esc(v.grade || '') + '</span></div>' +
    '<div style="margin-top:18px;display:flex;gap:8px;flex-wrap:wrap">' +
    '<button class="btn bp bsm" onclick="tglFav(\'video\',' + v.id + ')">❤️ ذخیره</button>' +
    '<button class="btn bg bsm" onclick="copyLink()">🔗 اشتراک</button></div>';
  openModal('mVideo');
}

function closeVideo() { closeModal('mVideo'); }

/* ============================================================
   PDFS
============================================================ */
let pFil = 'all';
function filterPDFs(g, el) {
  pFil = g;
  document.querySelectorAll('#page-pdfs .chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderPDFs();
}

function renderPDFs() {
  const g = document.getElementById('pdfsGrid');
  if (!g) return;
  const s = (document.getElementById('pSearch') ? document.getElementById('pSearch').value : '').toLowerCase();
  const f = pdfs.filter(p => (pFil === 'all' || p.grade === pFil || p.type === pFil) && (!s || (p.title || '').toLowerCase().includes(s)));
  if (!f.length) {
    g.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--mu);padding:40px">جزوه‌ای یافت نشد.</p>';
    return;
  }
  g.innerHTML = f.map(p =>
    '<div class="pdfc rev"><div class="pdfi">📄</div><div class="pfin">' +
    '<h4>' + esc(p.title) + '</h4><p>' + esc(p.desc || '') + '</p>' +
    '<div class="pfm"><span>📁 ' + esc(p.size || '') + '</span><span>📖 ' + fa(p.pages) + '</span>' +
    '<span>⬇ ' + fa(p.downloads) + '</span><span>' + (p.locked ? '🔒' : '✓') + '</span></div>' +
    '<div class="pfa">' +
    '<button class="btn bp bsm" onclick="openPDF(' + p.id + ')">👁 مشاهده</button>' +
    '<button class="btn bg bsm" onclick="dlPDF(' + p.id + ')">⬇ دانلود</button>' +
    '</div></div></div>'
  ).join('');
  initRev();
}

function openPDF(id) {
  const p = pdfs.find(x => x.id === id);
  if (!p) return;
  if (p.locked) { toast('🔒 این جزوه قفل است', 'warning'); return; }
  document.getElementById('pc').innerHTML =
    '<h3 style="padding-left:45px;margin-bottom:15px">' + esc(p.title) + '</h3>' +
    '<p style="color:var(--mu);margin-bottom:18px">' + esc(p.desc || '') + '</p>' +
    '<div style="background:rgba(0,0,0,.4);padding:55px 20px;border-radius:14px;text-align:center;border:2px dashed var(--bd)">' +
    '<div style="font-size:3.5rem;margin-bottom:12px">📄</div><p style="color:var(--mu)">پیش‌نمایش PDF</p></div>' +
    '<div class="pfm" style="margin-top:18px"><span>📁 ' + esc(p.size || '') + '</span>' +
    '<span>📖 ' + fa(p.pages) + '</span><span>⬇ ' + fa(p.downloads) + '</span></div>' +
    '<div style="margin-top:18px"><button class="btn bp" onclick="dlPDF(' + p.id + ')">⬇ دانلود</button></div>';
  openModal('mPdf');
}

function closePDF() { closeModal('mPdf'); }

function dlPDF(id) {
  const p = pdfs.find(x => x.id === id);
  if (!p) return;
  if (p.locked) { toast('🔒 قفل است', 'warning'); return; }
  p.downloads = (p.downloads || 0) + 1;
  if (isLogged()) curUser.points = (curUser.points || 0) + 2;
  save();
  renderPDFs();
  toast('✓ دانلود شروع شد');
}

/* ============================================================
   QUIZZES
============================================================ */
function renderQuizzes() {
  const l = document.getElementById('quizzesList');
  if (!l) return;
  if (!quizzes.length) {
    l.innerHTML = '<p style="text-align:center;color:var(--mu);padding:40px">آزمونی نیست.</p>';
    return;
  }
  l.innerHTML = quizzes.map(q =>
    '<div class="qc rev"><h3>📝 ' + esc(q.title) + '</h3>' +
    '<div class="qi"><span>🎓 ' + esc(q.grade || '') + '</span>' +
    '<span>❓ ' + fa((q.questions || []).length) + ' سوال</span>' +
    '<span>⏱ ' + fa(q.time) + ' دقیقه</span></div>' +
    '<button class="btn bp bbl" onclick="startQuiz(' + q.id + ')">شروع آزمون</button></div>'
  ).join('');
  initRev();
}

let cq = null, qi = 0, ua = [], qTimer = null, qtl = 0;

function startQuiz(id) {
  const q = quizzes.find(x => x.id === id);
  if (!q) return;
  if (!Array.isArray(q.questions) || !q.questions.length) {
    toast('سوالی ندارد', 'warning');
    return;
  }
  cq = q;
  qi = 0;
  ua = new Array(q.questions.length).fill(null);
  qtl = Math.max(1, Number(q.time) || 10) * 60;
  renderQ();
  openModal('mQuiz');
  clearInterval(qTimer);
  qTimer = setInterval(() => {
    qtl--;
    updQT();
    if (qtl <= 0) { clearInterval(qTimer); finishQ(); }
  }, 1000);
}

function updQT() {
  const el = document.getElementById('qTimer');
  if (!el) return;
  const m = Math.max(0, Math.floor(qtl / 60));
  const s = Math.max(0, qtl % 60);
  el.textContent = '⏱ ' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  el.classList.toggle('wn', qtl < 60);
}

function renderQ() {
  const q = cq.questions[qi];
  const tot = cq.questions.length;
  const pr = ((qi + 1) / tot) * 100;
  document.getElementById('qc').innerHTML =
    '<div class="qh"><h2>' + esc(cq.title) + '</h2><div class="qt" id="qTimer">⏱ --:--</div></div>' +
    '<div class="qpr"><div class="qpb" style="width:' + pr + '%"></div></div>' +
    '<div class="qcnt">سوال ' + fa(qi + 1) + ' از ' + fa(tot) + '</div>' +
    '<div class="qq">' + esc(q.q) + '</div>' +
    '<div class="qo">' + q.opts.map((o, i) =>
      '<div class="qop ' + (ua[qi] === i ? 'sel' : '') + '" onclick="selA(' + i + ')">' +
      '<div class="qon">' + ['۱','۲','۳','۴'][i] + '</div><span>' + esc(o) + '</span></div>'
    ).join('') + '</div>' +
    '<div class="qn">' +
    '<button class="btn bg" onclick="prevQ()" ' + (qi === 0 ? 'disabled' : '') + '>→ قبلی</button>' +
    (qi === tot - 1
      ? '<button class="btn bs" onclick="finishQ()">✓ پایان</button>'
      : '<button class="btn bp" onclick="nextQ()">بعدی ←</button>') +
    '</div>';
  updQT();
}

function selA(i) { ua[qi] = i; renderQ(); }
function nextQ() { if (qi < cq.questions.length - 1) { qi++; renderQ(); } }
function prevQ() { if (qi > 0) { qi--; renderQ(); } }

function finishQ() {
  if (!cq) return;
  clearInterval(qTimer);
  const qid = cq.id;
  let c = 0, w = 0, b = 0;
  cq.questions.forEach((q, i) => {
    if (ua[i] === null || ua[i] === undefined) b++;
    else if (ua[i] === q.correct) c++;
    else w++;
  });
  const pc = Math.round((c / cq.questions.length) * 100);
  if (isLogged()) {
    if (!Array.isArray(curUser.quizResults)) curUser.quizResults = [];
    curUser.quizResults.push({
      quizId: qid, title: cq.title, score: pc,
      correct: c, wrong: w,
      date: new Date().toLocaleDateString('fa-IR')
    });
    curUser.points = (curUser.points || 0) + pc;
    save();
  }
  const rev = cq.questions.map((q, i) => {
    const u = ua[i], ok = u === q.correct;
    return '<div class="ri ' + (ok ? 'ok' : 'no') + '"><h5>س' + fa(i + 1) + ': ' + esc(q.q) + '</h5>' +
      '<div class="ra ' + (ok ? 'ok' : 'no') + '">پاسخ شما: ' +
      (u !== null && u !== undefined ? esc(q.opts[u]) : 'بدون پاسخ') + '</div>' +
      (!ok ? '<div class="ra ok">پاسخ درست: ' + esc(q.opts[q.correct]) + '</div>' : '') + '</div>';
  }).join('');
  document.getElementById('qc').innerHTML =
    '<div class="rb"><h2>🎯 نتیجه آزمون</h2>' +
    '<div class="rc" style="--p:' + pc + '"><span>' + pc + '%</span></div>' +
    '<div class="rs">' +
    '<div class="rs2"><h4 style="color:var(--ne)">' + fa(c) + '</h4><p>صحیح</p></div>' +
    '<div class="rs2"><h4 style="color:var(--dg)">' + fa(w) + '</h4><p>غلط</p></div>' +
    '<div class="rs2"><h4 style="color:var(--mu)">' + fa(b) + '</h4><p>بی‌پاسخ</p></div>' +
    '</div>' +
    '<h3 style="margin:18px 0 12px;text-align:right">📋 مرور پاسخ‌ها</h3>' +
    '<div style="text-align:right;max-height:320px;overflow-y:auto;padding-left:5px">' + rev + '</div>' +
    '<div style="margin-top:18px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">' +
    '<button class="btn bp" onclick="closeQuiz()">بستن</button>' +
    '<button class="btn bg" onclick="startQuiz(' + qid + ')">🔄 تلاش دوباره</button>' +
    '</div></div>';
}

function closeQuiz() {
  clearInterval(qTimer);
  closeModal('mQuiz');
  cq = null;
  ua = [];
}

/* ============================================================
   BLOG
============================================================ */
function renderBlog() {
  const g = document.getElementById('blogGrid');
  if (!g) return;
  if (!blog.length) {
    g.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:var(--mu);padding:40px">مقاله‌ای نیست.</p>';
    return;
  }
  g.innerHTML = blog.map(b =>
    '<div class="bc rev" onclick="toast(\'📖 در حال باز کردن...\')">' +
    '<div class="bt">' + esc(b.emoji || '📖') + '</div>' +
    '<div class="bb2"><h3>' + esc(b.title) + '</h3><p>' + esc(b.excerpt || '') + '</p>' +
    '<div class="bm"><span>🏷 ' + esc(b.cat || '') + '</span>' +
    '<span>👁 ' + fa(b.views) + '</span><span>📅 ' + esc(b.date || '') + '</span></div>' +
    '</div></div>'
  ).join('');
  initRev();
}

/* ============================================================
   FAQ
============================================================ */
function renderFAQs() {
  const l = document.getElementById('faqList');
  if (!l) return;
  l.innerHTML = faqs.map(f =>
    '<div class="fqi rev" id="fqi-' + f.id + '">' +
    '<div class="fqq" onclick="tglFaq(' + f.id + ')"><span>' + esc(f.q) + '</span>' +
    '<span class="fqic">+</span></div>' +
    '<div class="fqa">' + esc(f.a) + '</div></div>'
  ).join('');
  initRev();
}

function tglFaq(id) {
  const el = document.getElementById('fqi-' + id);
  if (!el) return;
  const w = el.classList.contains('open');
  document.querySelectorAll('.fqi.open').forEach(x => x.classList.remove('open'));
  if (!w) el.classList.add('open');
}

/* ============================================================
   CONTACT
============================================================ */
function subContact(e) {
  e.preventDefault();
  const f = e.target;
  const i = f.querySelectorAll('input,textarea');
  messages.unshift({
    id: gId(),
    name: i[0].value.trim(),
    email: i[1].value.trim(),
    subject: (i[2].value || '').trim() || 'بدون موضوع',
    text: i[3].value.trim(),
    date: new Date().toLocaleDateString('fa-IR'),
    status: 'pending'
  });
  save();
  const b = f.querySelector('button');
  const o = b.textContent;
  b.textContent = '✓ ارسال شد!';
  b.disabled = true;
  setTimeout(() => { b.textContent = o; b.disabled = false; f.reset(); }, 2000);
  toast('✓ پیام ارسال شد');
}

/* ============================================================
   NEWSLETTER
============================================================ */
function subNews(e) {
  e.preventDefault();
  const f = e.target;
  const em = f.querySelector('input').value.trim();
  if (!em) return;
  if (newsletter.find(n => n.email === em)) {
    toast('این ایمیل قبلاً ثبت شده', 'warning');
    return;
  }
  newsletter.push({ id: gId(), email: em, date: new Date().toLocaleDateString('fa-IR') });
  save();
  f.reset();
  toast('✓ عضویت انجام شد');
  addN('📬 عضویت در خبرنامه');
}

/* ============================================================
   CART
============================================================ */
function openCart() {
  document.getElementById('cartOv').classList.add('show');
  document.getElementById('cartSb').classList.add('show');
  renderCart();
}

function closeCart() {
  document.getElementById('cartOv').classList.remove('show');
  document.getElementById('cartSb').classList.remove('show');
}

function addCart(id, type) {
  if (!isLogged()) {
    toast('⚠️ ابتدا وارد شوید', 'warning');
    setTimeout(() => goPage('login'), 500);
    return;
  }
  let it = null;
  if (type === 'course') {
    const c = courses.find(x => x.id === id);
    if (!c) return;
    if (c.status !== 'active') { toast('این دوره غیرفعاله', 'warning'); return; }
    if (curUser.courses && curUser.courses.includes(id)) { toast('قبلاً خریدی', 'warning'); return; }
    it = { id: c.id, type: 'course', icon: c.icon || '📚', title: c.title, price: c.price, qty: 1 };
  }
  if (!it) return;
  const ex = cart.find(x => x.id === id && x.type === type);
  if (ex) { ex.qty = (ex.qty || 1) + 1; toast('✓ تعداد افزایش یافت'); }
  else { cart.push(it); toast('✓ به سبد اضافه شد'); }
  save();
  updBadge();
  renderCart();
  renderCourses();
  if (cart.length === 1) setTimeout(() => openCart(), 300);
}

function rmCart(id, type) {
  cart = cart.filter(x => !(x.id === id && x.type === type));
  save();
  updBadge();
  renderCart();
  renderCourses();
  renderCheckout();
  toast('🗑️ حذف شد');
}

function chgQty(id, type, d) {
  const it = cart.find(x => x.id === id && x.type === type);
  if (!it) return;
  it.qty = (it.qty || 1) + d;
  if (it.qty <= 0) { rmCart(id, type); return; }
  save();
  renderCart();
  renderCheckout();
}

function updBadge() {
  const b = document.getElementById('cartCount');
  const h = document.getElementById('cartHc');
  const t = cart.reduce((s, x) => s + (x.qty || 1), 0);
  if (b) {
    if (t > 0) { b.style.display = 'flex'; b.textContent = fa(t); }
    else b.style.display = 'none';
  }
  if (h) h.textContent = '(' + fa(t) + ' آیتم)';
  if (typeof updateMobCartBadge === 'function') updateMobCartBadge();
}

function getSub() {
  return cart.reduce((s, x) => s + (x.price || 0) * (x.qty || 1), 0);
}

function renderCart() {
  const ie = document.getElementById('cartItems');
  const fe = document.getElementById('cartFt');
  if (!ie || !fe) return;
  if (!cart.length) {
    ie.innerHTML =
      '<div class="cemp"><div class="eic">🛒</div><h4>سبد خرید خالی است</h4>' +
      '<p>دوره‌ای انتخاب نکرده‌اید</p>' +
      '<button class="btn bp bsm" onclick="closeCart();goPage(\'courses\')">📚 مشاهده دوره‌ها</button></div>';
    fe.style.display = 'none';
    return;
  }
  ie.innerHTML = cart.map(x =>
    '<div class="cit2">' +
    '<button class="cir" onclick="rmCart(' + x.id + ',\'' + x.type + '\')">✕</button>' +
    '<div class="cit2-i">' + esc(x.icon || '📦') + '</div>' +
    '<div class="cit2-f"><h4>' + esc(x.title) + '</h4>' +
    '<div class="cip">' + faP((x.price || 0) * (x.qty || 1)) + '</div>' +
    '<div class="cit2-c">' +
    '<button class="qbtn" onclick="chgQty(' + x.id + ',\'' + x.type + '\',-1)">−</button>' +
    '<span class="qv">' + fa(x.qty || 1) + '</span>' +
    '<button class="qbtn" onclick="chgQty(' + x.id + ',\'' + x.type + '\',1)">+</button>' +
    '</div></div></div>'
  ).join('');
  const s = getSub();
  document.getElementById('cartSub').textContent = faP(s);
  document.getElementById('cartTot').textContent = faP(s);
  fe.style.display = 'flex';
}

/* ============================================================
   CHECKOUT
============================================================ */
let appliedCp = null;

function goCheckout() {
  if (!isLogged()) {
    toast('⚠️ ابتدا وارد شوید', 'warning');
    setTimeout(() => goPage('login'), 500);
    return;
  }
  if (!cart.length) { toast('سبد خالیه', 'warning'); return; }
  closeCart();
  goPage('checkout');
}

function renderCheckout() {
  const ie = document.getElementById('ckItems');
  if (!ie) return;
  if (!cart.length) {
    ie.innerHTML = '<p style="color:var(--mu);text-align:center;padding:25px">سبد خالیه.</p>';
    return;
  }
  ie.innerHTML = cart.map(x =>
    '<div class="coit"><span class="coit-n">' + esc(x.icon || '') + ' ' + esc(x.title) + ' × ' + fa(x.qty || 1) + '</span>' +
    '<span class="coit-p">' + faP((x.price || 0) * (x.qty || 1)) + '</span></div>'
  ).join('');
  if (curUser) {
    const n = document.getElementById('ckName');
    const e = document.getElementById('ckEmail');
    if (n && !n.value) n.value = curUser.name || '';
    if (e && !e.value) e.value = curUser.email || '';
  }
  updCkTot();
}

function updCkTot() {
  const s = getSub();
  let d = 0;
  if (appliedCp) d = Math.round(s * (appliedCp.discount / 100));
  const t = s - d;
  document.getElementById('ckSub').textContent = faP(s);
  const dr = document.getElementById('ckDiscRow');
  if (d > 0) {
    dr.style.display = 'flex';
    document.getElementById('ckDisc').textContent = '- ' + faP(d);
  } else dr.style.display = 'none';
  document.getElementById('ckTot').textContent = faP(t);
}

function appCoupon() {
  const i = document.getElementById('cpIn');
  const c = i.value.trim().toUpperCase();
  const b = document.getElementById('cpBox');
  if (!c) { toast('کد را وارد کنید', 'warning'); return; }
  const f = coupons.find(x => x.code.toUpperCase() === c && x.status === 'active');
  if (!f) { toast('❌ کد نامعتبر', 'error'); return; }
  if (f.uses >= f.max) { toast('کد به حد مجاز رسیده', 'warning'); return; }
  appliedCp = f;
  i.value = '';
  b.innerHTML =
    '<div class="cpa"><div>کد اعمال شد: <span class="cpc2">' + esc(f.code) + '</span> (' + fa(f.discount) + '% تخفیف)</div>' +
    '<span class="cpr" onclick="rmCp()">✕</span></div>';
  updCkTot();
  toast('✓ کد اعمال شد');
}

function rmCp() {
  appliedCp = null;
  document.getElementById('cpBox').innerHTML = '';
  updCkTot();
}

function selPay(el) {
  document.querySelectorAll('.pmi').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  el.querySelector('input').checked = true;
}

async function doPay() {
  if (!cart.length) { toast('سبد خالیه','warning'); return; }
  const n=document.getElementById('ckName').value.trim(), e=document.getElementById('ckEmail').value.trim(), ph=document.getElementById('ckPhone').value.trim();
  if(!n||!e||!ph){toast('❌ نام، ایمیل و تلفن الزامی','error');return;}
  const pr=document.querySelector('input[name="pay"]:checked'); const pm=pr?pr.value:'zarinpal';
  try {
    const r=await api('/orders',{method:'POST',body:JSON.stringify({name:n,email:e,phone:ph,items:cart,paymentMethod:pm,couponCode:appliedCp?appliedCp.code:null})});
    orders.push(r.order); cart=[]; appliedCp=null; saveLocalOnly(); updBadge(); renderCart(); renderCheckout();
    toast('✓ سفارش ثبت شد: '+r.order.orderNumber); goPage('user');
  } catch(err){ toast('❌ '+err.message,'error'); }
}

function swUT(t, el) {
  ['courses', 'orders', 'favorites', 'quizzes', 'badges', 'cert', 'profile'].forEach(x => {
    const n = document.getElementById('ut-' + x);
    if (n) n.style.display = x === t ? 'block' : 'none';
  });
  if (el && el.parentElement) {
    el.parentElement.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    el.classList.add('active');
  }
}

function rmFav(id) {
  if (!isLogged()) return;
  curUser.favorites = (curUser.favorites || []).filter(f => f.id !== id);
  const i = users.findIndex(u => u.id === curUser.id);
  if (i > -1) users[i] = curUser;
  save();
  renderUser();
  toast('حذف شد');
}

async function savePr() {
  if (!curUser || !authToken) return;
  const name=document.getElementById('pn').value.trim(); const email=document.getElementById('pe').value.trim(); const password=document.getElementById('pp').value.trim();
  try {
    const r=await api('/me',{method:'PATCH',body:JSON.stringify({name,email,...(password?{password}: {})})});
    curUser=r.user; saveLocalOnly(); updAuth(); toast('✓ پروفایل ذخیره شد');
  } catch(e){ toast('❌ '+e.message,'error'); }
}

function printCert() {
  const c = document.getElementById('pCert');
  if (!c) return;
  const w = window.open('', '', 'width=900,height=650');
  w.document.write(
    '<html dir="rtl"><head><title>گواهی</title><style>' +
    'body{font-family:Tahoma,sans-serif;padding:40px;background:#f5f3ff}' +
    '.cert{background:linear-gradient(135deg,#1e1145,#2a1a5e);color:#eae6ff;border:3px double #00ffc6;border-radius:20px;padding:45px 35px;text-align:center}' +
    'h2{color:#00ffc6}.cnm{font-size:1.8rem;padding:15px 0;border-top:1px solid #333;border-bottom:1px solid #333;margin:15px 0}' +
    '.ccr{color:#a855f7;font-size:1.1rem;margin:15px 0}' +
    '.csl{display:inline-block;width:70px;height:70px;border-radius:50%;border:2px solid #00ffc6;line-height:70px;font-size:2rem;margin-top:15px}' +
    '.cdt{color:#a99fc7;font-size:.85rem;margin-top:20px}' +
    '.cst{color:#a99fc7;font-size:.8rem;margin-bottom:20px}' +
    '</style></head><body>' + c.outerHTML + '</body></html>'
  );
  w.document.close();
  setTimeout(() => w.print(), 500);
}

/* ============================================================
   ADMIN PANEL
============================================================ */
async function renderAdmin() {
  if (!isAdmin()) return renderAdminLocal();
  try {
    const [u, o] = await Promise.all([api('/admin/users'), api('/admin/orders')]);
    if (Array.isArray(u.users)) users = u.users;
    if (Array.isArray(o.orders)) orders = o.orders;
    renderAdminLocal();
  } catch (e) {
    console.warn('Admin sync failed:', e.message);
    renderAdminLocal();
  }
}

function renderAdminLocal() {
  const s = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = fa(v); };
  s('stC', courses.length);
  s('stV', videos.length);
  s('stP', pdfs.length);
  s('stQ', quizzes.length);
  s('stU', users.length);
  s('stO', orders.length);
  s('stRev', Math.round(orders.reduce((a, o) => a + (o.total || 0), 0) / 1000000));
  s('stM', messages.filter(m => m.status === 'pending').length);

  rTb('tbC', courses, c =>
    '<td>' + esc(c.icon || '') + ' ' + esc(c.title) + '</td>' +
    '<td>' + faP(c.price) + '</td>' +
    '<td><span class="sb ' + (c.status === 'active' ? 'sa' : 'si') + '">' + (c.status === 'active' ? 'فعال' : 'غیرفعال') + '</span></td>' +
    '<td><div class="aa">' +
    '<button class="btn bg bsm" onclick="tglCS(' + c.id + ')">' + (c.status === 'active' ? 'غیرفعال' : 'فعال') + '</button>' +
    '<button class="btn bd bsm" onclick="del(\'courses\',' + c.id + ')">حذف</button></div></td>');

  rTb('tbV', videos, v =>
    '<td>' + esc(v.title) + '</td>' +
    '<td>' + esc(v.grade || '') + '</td>' +
    '<td><span class="sb ' + (v.locked ? 'sp' : 'sa') + '">' + (v.locked ? '🔒' : '✓') + '</span></td>' +
    '<td><div class="aa">' +
    '<button class="btn bg bsm" onclick="tglLk(\'videos\',' + v.id + ')">' + (v.locked ? 'آزاد' : 'قفل') + '</button>' +
    '<button class="btn bd bsm" onclick="del(\'videos\',' + v.id + ')">حذف</button></div></td>');

  rTb('tbP', pdfs, p =>
    '<td>' + esc(p.title) + '</td>' +
    '<td>' + esc(p.grade || '') + '</td>' +
    '<td><span class="sb ' + (p.locked ? 'sp' : 'sa') + '">' + (p.locked ? '🔒' : '✓') + '</span></td>' +
    '<td><div class="aa">' +
    '<button class="btn bg bsm" onclick="tglLk(\'pdfs\',' + p.id + ')">' + (p.locked ? 'آزاد' : 'قفل') + '</button>' +
    '<button class="btn bd bsm" onclick="del(\'pdfs\',' + p.id + ')">حذف</button></div></td>');

  rTb('tbQ', quizzes, q =>
    '<td>' + esc(q.title) + '</td>' +
    '<td>' + esc(q.grade || '') + '</td>' +
    '<td>' + fa((q.questions || []).length) + '</td>' +
    '<td><button class="btn bd bsm" onclick="del(\'quizzes\',' + q.id + ')">حذف</button></td>');

  rTb('tbB', blog, b =>
    '<td>' + esc(b.title) + '</td>' +
    '<td>' + esc(b.cat || '') + '</td>' +
    '<td><button class="btn bd bsm" onclick="del(\'blog\',' + b.id + ')">حذف</button></td>');

  rTb('tbO', orders, o =>
    '<td style="font-family:monospace;color:var(--ne);font-size:.75rem">' + esc(o.orderNumber) + '</td>' +
    '<td>' + esc(o.name) + '</td>' +
    '<td>' + faP(o.total) + '</td>' +
    '<td>' + esc(o.date) + '</td>' +
    '<td><span class="sb ' + (o.status === 'paid' ? 'sa' : 'sp') + '">' + (o.status === 'paid' ? '✓ پرداخت' : '⏳') + '</span></td>' +
    '<td><div class="aa">' +
    '<button class="btn bg bsm" onclick="viewO(' + o.id + ')">مشاهده</button>' +
    '<button class="btn bd bsm" onclick="del(\'orders\',' + o.id + ')">حذف</button></div></td>');

  rTb('tbU', users, u =>
    '<td>' + esc(u.name) + '</td>' +
    '<td>' + esc(u.username) + '</td>' +
    '<td>' + esc(u.email) + '</td>' +
    '<td>' + fa(u.points || 0) + '</td>' +
    '<td>' + fa(orders.filter(o => o.userId === u.id).length) + '</td>' +
    '<td><button class="btn bd bsm" onclick="delU(' + u.id + ')">حذف</button></td>');

  rTb('tbM', messages, m =>
    '<td>' + esc(m.name) + '</td>' +
    '<td>' + esc(m.subject) + '</td>' +
    '<td style="max-width:230px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(m.text) + '</td>' +
    '<td><div class="aa">' +
    '<button class="btn bg bsm" onclick="tglMsg(' + m.id + ')">' + (m.status === 'pending' ? '✓ خوانده' : '↺') + '</button>' +
    '<button class="btn bd bsm" onclick="del(\'messages\',' + m.id + ')">حذف</button></div></td>');

  rTb('tbN', newsletter, n =>
    '<td>' + esc(n.email) + '</td>' +
    '<td>' + esc(n.date) + '</td>' +
    '<td><button class="btn bd bsm" onclick="del(\'newsletter\',' + n.id + ')">حذف</button></td>');

  renderCps();
  renderCharts();
}

function rTb(id, arr, fn) {
  const t = document.getElementById(id);
  if (!t) return;
  if (!arr.length) {
    t.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:18px">موردی نیست</td></tr>';
    return;
  }
  t.innerHTML = arr.map((x, i) => '<tr><td>' + fa(i + 1) + '</td>' + fn(x) + '</tr>').join('');
}

function renderCps() {
  const l = document.getElementById('cpList');
  if (!l) return;
  l.innerHTML = coupons.length
    ? coupons.map(c =>
        '<div class="cpi"><div><span class="cpc">' + esc(c.code) + '</span>' +
        '<p style="color:var(--mu);font-size:.78rem;margin-top:4px">' + fa(c.discount) + '% | ' + fa(c.uses) + '/' + fa(c.max) + '</p></div>' +
        '<button class="btn bd bsm" onclick="del(\'coupons\',' + c.id + ')">حذف</button></div>'
      ).join('')
    : '<p style="color:var(--mu);text-align:center;padding:18px">کدی نیست</p>';
}

function renderCharts() {
  const mc = (id, d, lbl, suf) => {
    const e = document.getElementById(id);
    if (!e) return;
    const mx = Math.max.apply(null, d) || 1;
    e.innerHTML = d.map((v, i) =>
      '<div class="bcol"><div class="bv">' + fa(v) + (suf || '') + '</div>' +
      '<div class="bfill" style="height:' + ((v / mx) * 100) + '%"></div>' +
      '<div class="bl2">' + lbl[i] + '</div></div>'
    ).join('');
  };
  mc('ch1', [320, 450, 380, 620, 540, 780, 690], ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']);
  mc('ch2', [12, 18, 15, 25, 22, 30, 28], ['فر', 'ار', 'خر', 'تی', 'مر', 'شه', 'مه'], 'M');
  mc('ch3', [5, 8, 12, 15, 10, 18, 22], ['فر', 'ار', 'خر', 'تی', 'مر', 'شه', 'مه']);
}

function swT(t, el) {
  document.querySelectorAll('.at2').forEach(x => x.classList.remove('active'));
  const tgt = document.getElementById('t-' + t);
  if (tgt) tgt.classList.add('active');
  document.querySelectorAll('.as ul li').forEach(x => x.classList.remove('active'));
  if (el) el.classList.add('active');
  if (t === 'reports') renderCharts();
}

function del(type, id) {
  if (!confirm('حذف بشه؟')) return;
  if (type === 'courses') courses = courses.filter(x => x.id !== id);
  if (type === 'videos') videos = videos.filter(x => x.id !== id);
  if (type === 'pdfs') pdfs = pdfs.filter(x => x.id !== id);
  if (type === 'quizzes') quizzes = quizzes.filter(x => x.id !== id);
  if (type === 'blog') blog = blog.filter(x => x.id !== id);
  if (type === 'messages') messages = messages.filter(x => x.id !== id);
  if (type === 'coupons') coupons = coupons.filter(x => x.id !== id);
  if (type === 'orders') orders = orders.filter(x => x.id !== id);
  if (type === 'newsletter') newsletter = newsletter.filter(x => x.id !== id);
  save();
  renderAdmin();
  if (type === 'courses') renderCourses();
  if (type === 'videos') renderVideos();
  if (type === 'pdfs') renderPDFs();
  if (type === 'quizzes') renderQuizzes();
  if (type === 'blog') renderBlog();
  toast('🗑️ حذف شد');
}

async function delU(id) {
  if (!confirm('کاربر حذف بشه؟')) return;
  try {
    await api('/admin/users/' + id, {method:'DELETE'});
    users = users.filter(x => x.id !== id);
    if (curUser && curUser.id === id) { curUser=null; authToken=null; authRole=null; }
    renderAdmin(); toast('🗑️ حذف شد');
  } catch(e) { toast('❌ '+e.message,'error'); }
}

function viewO(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  alert('🧾 سفارش ' + o.orderNumber + '\n\n' +
    '👤 نام: ' + o.name + '\n' +
    '📧 ایمیل: ' + o.email + '\n' +
    '📞 تلفن: ' + o.phone + '\n' +
    '📅 تاریخ: ' + o.date + '\n\n' +
    '📦 آیتم‌ها:\n' + o.items.map(it => '• ' + it.title + ' × ' + (it.qty || 1)).join('\n') + '\n\n' +
    '💰 جمع: ' + faP(o.subtotal) + '\n' +
    '🎁 تخفیف: ' + faP(o.discount) + '\n' +
    '💳 نهایی: ' + faP(o.total) + '\n' +
    (o.couponCode ? '🎟️ کد: ' + o.couponCode + '\n' : '') +
    '💳 روش: ' + o.paymentMethod);
}

function tglCS(id) {
  const c = courses.find(x => x.id === id);
  if (!c) return;
  c.status = c.status === 'active' ? 'inactive' : 'active';
  save();
  renderAdmin();
  renderCourses();
}

function tglLk(t, id) {
  const a = t === 'videos' ? videos : pdfs;
  const x = a.find(y => y.id === id);
  if (!x) return;
  x.locked = !x.locked;
  save();
  renderAdmin();
  if (t === 'videos') renderVideos(); else renderPDFs();
}

function tglMsg(id) {
  const m = messages.find(x => x.id === id);
  if (!m) return;
  m.status = m.status === 'pending' ? 'active' : 'pending';
  save();
  renderAdmin();
}

function addC() {
  const t = prompt('عنوان دوره:');
  if (!t) return;
  const d = prompt('توضیح:') || '';
  const p = parseInt(prompt('قیمت:', '1000000'), 10) || 0;
  courses.push({ id: gId(), icon: '📚', title: t.trim(), desc: d.trim(), price: p, unit: 'تومان', status: 'active', students: 0 });
  save();
  renderAdmin();
  renderCourses();
  toast('✓ اضافه شد');
}

function addV() {
  const t = prompt('عنوان ویدیو:');
  if (!t) return;
  const g = prompt('پایه:', 'دهم') || 'دهم';
  const d = prompt('مدت:', '۲۰:۰۰') || '۲۰:۰۰';
  const l = confirm('قفل باشد؟');
  videos.push({ id: gId(), title: t.trim(), grade: g.trim(), duration: d.trim(), locked: l, isNew: true, views: 0, desc: '' });
  save();
  renderAdmin();
  renderVideos();
  toast('✓ اضافه شد');
}

function addP() {
  const t = prompt('عنوان جزوه:');
  if (!t) return;
  const g = prompt('پایه:', 'دهم') || 'دهم';
  const ty = prompt('نوع:', 'خلاصه') || 'خلاصه';
  const s = prompt('حجم:', '2 MB') || '2 MB';
  const pg = parseInt(prompt('صفحه:', '50'), 10) || 50;
  const l = confirm('قفل باشد؟');
  pdfs.push({ id: gId(), title: t.trim(), grade: g.trim(), type: ty.trim(), size: s.trim(), pages: pg, locked: l, downloads: 0, desc: '' });
  save();
  renderAdmin();
  renderPDFs();
  toast('✓ اضافه شد');
}

function addQ() {
  const t = prompt('عنوان آزمون:');
  if (!t) return;
  const g = prompt('پایه:', 'دهم') || 'دهم';
  const tm = parseInt(prompt('زمان:', '10'), 10) || 10;
  const qz = { id: gId(), title: t.trim(), grade: g.trim(), time: tm, questions: [] };
  let aq = confirm('سوال اضافه می‌کنید؟');
  while (aq) {
    const qt = prompt('متن سوال:');
    if (!qt) break;
    const o1 = prompt('گزینه ۱:') || '';
    const o2 = prompt('گزینه ۲:') || '';
    const o3 = prompt('گزینه ۳:') || '';
    const o4 = prompt('گزینه ۴:') || '';
    const cr = parseInt(prompt('پاسخ درست (1-4):', '1'), 10) - 1;
    qz.questions.push({ q: qt.trim(), opts: [o1.trim(), o2.trim(), o3.trim(), o4.trim()], correct: Math.max(0, Math.min(3, cr)) });
    aq = confirm('سوال بعدی؟');
  }
  quizzes.push(qz);
  save();
  renderAdmin();
  renderQuizzes();
  toast('✓ اضافه شد');
}

function addB() {
  const t = prompt('عنوان مقاله:');
  if (!t) return;
  const c = prompt('دسته:', 'تکنیک') || 'تکنیک';
  const e = prompt('خلاصه:') || '';
  blog.push({
    id: gId(),
    title: t.trim(),
    cat: c.trim(),
    emoji: '📖',
    views: 0,
    date: new Date().toLocaleDateString('fa-IR'),
    excerpt: e.trim()
  });
  save();
  renderAdmin();
  renderBlog();
  toast('✓ اضافه شد');
}

function addCp() {
  const c = prompt('کد تخفیف:');
  if (!c) return;
  const d = parseInt(prompt('درصد تخفیف:', '20'), 10) || 20;
  const m = parseInt(prompt('حداکثر استفاده:', '100'), 10) || 100;
  coupons.push({ id: gId(), code: c.trim().toUpperCase(), discount: d, uses: 0, max: m, status: 'active' });
  save();
  renderAdmin();
  toast('✓ اضافه شد');
}

/* ============================================================
   COUNTDOWN
============================================================ */
const KT = (function () {
  const n = new Date();
  const y = n.getFullYear();
  let t = new Date(y, 5, 25, 8, 0, 0);
  if (t.getTime() <= n.getTime()) t = new Date(y + 1, 5, 25, 8, 0, 0);
  return t.getTime();
})();

(function () {
  const g = new Date(KT).getFullYear();
  const e = document.getElementById('klabel');
  if (e) e.textContent = 'تا کنکور ' + (g - 621).toLocaleString('fa-IR');
})();

function updCD() {
  const d = KT - Date.now();
  if (d <= 0) return;
  const dd = Math.floor(d / 864e5);
  const hh = Math.floor((d % 864e5) / 36e5);
  const mm = Math.floor((d % 36e5) / 6e4);
  const ss = Math.floor((d % 6e4) / 1000);
  const p = x => String(x).padStart(2, '0').replace(/\d/g, y => '۰۱۲۳۴۵۶۷۸۹'[y]);
  const a = document.getElementById('cd1');
  const b = document.getElementById('cd2');
  const c = document.getElementById('cd3');
  const e = document.getElementById('cd4');
  if (a) a.textContent = p(dd);
  if (b) b.textContent = p(hh);
  if (c) c.textContent = p(mm);
  if (e) e.textContent = p(ss);
}

/* ============================================================
   SCROLL
============================================================ */
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  const st = document.getElementById('stp');
  if (h) h.classList.toggle('sc', window.scrollY > 50);
  if (st) st.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

/* ============================================================
   KEYBOARD
============================================================ */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
  if (e.key === 'Escape') {
    closeSearch();
    closeVideo();
    closePDF();
    closeQuiz();
    closeCourse();
    closeCart();
    const np = document.getElementById('np');
    if (np) np.classList.remove('show');
  }
});

/* ============================================================
   INIT
============================================================ */
window.addEventListener('popstate', loadHash);
window.addEventListener('hashchange', loadHash);

window.addEventListener('load', () => {
  hydrateFromServer().then(() => { renderCourses(); renderVideos(); renderPDFs(); renderQuizzes(); renderBlog(); renderFAQ(); if (isAdmin()) renderAdmin(); });
  let theme = 'dark';
  try { theme = localStorage.getItem('bt') || 'dark'; } catch (e) {}
  document.body.setAttribute('data-theme', theme);
  const tb = document.getElementById('tbtn');
  if (tb) tb.textContent = theme === 'dark' ? '🌙' : '☀️';

  updAuth();
  renderN();
  updBadge();
  renderCart();
  loadHash();
  initRev();
  updCD();
  setInterval(updCD, 1000);

  setTimeout(() => {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
      const p = activePage.id.replace('page-', '');
      updateMobNav(p);
    }
    updateMobUserBtn();
    updateMobCartBadge();
  }, 500);

  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l) l.classList.add('hide');
  }, 900);

  console.log('%c✅ آکادمی دکتر علیرضا احمدیان آماده است!', 'color:#00ffc6;font-size:14px;font-weight:bold');
  console.log('%c🎟️ کدها: BIO20, KONKUR30, AHMADIAN50', 'color:#a855f7;font-size:12px');
  console.log('%c💬 چت آنلاین: Goftino', 'color:#00ffc6;font-size:12px');
});
