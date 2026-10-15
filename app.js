
let S={best:{},xp:0,days:[],st:{w:[0,0],s:[0,0],c:[0,0]},start:0,placed:0};
try{S=Object.assign(S,JSON.parse(localStorage.getItem('ep2')||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem('ep2',JSON.stringify(S))}catch(e){}};
const app=document.getElementById('app');
const sh=a=>[...a].sort(()=>Math.random()-.5);
const say=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.85;speechSynthesis.speak(u)}catch(e){}};
const open=i=>i<=(S.start||0)||(S.best[i-1]||0)>=70;
const track=(k,ok)=>{if(k=='p')return;if(S.st[k]){S.st[k][1]++;if(ok)S.st[k][0]++}if(ok)S.xp+=10;const d=new Date().toDateString();if(!S.days.includes(d))S.days.push(d);save()};
const streak=()=>{let n=0,d=new Date();while(S.days.includes(d.toDateString())){n++;d.setDate(d.getDate()-1)}return n};
const fa=n=>String(n).replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]);

function home(){
 const td=new Date().toDateString();if(!S.xd||S.xd.d!=td){S.xd={d:td,b:S.xp};save()}
 const dx=Math.min(50,S.xp-S.xd.b),wk=[...Array(7)].filter((_,k)=>{const d=new Date();d.setDate(d.getDate()-k);return S.days.includes(d.toDateString())}).length;
 const done=L.filter((_,i)=>(S.best[i]||0)>=70).length;
 app.innerHTML=`<h1>از صفر تا حرفه‌ای،<br>قدم‌به‌قدم</h1>
 <p class="mut">هفت مرحله از A0 تا C2. هر مرحله کلمه، آزمونک، جمله‌سازی و مکالمه دارد. با نمره ۷۰٪ در آزمون نهایی، مرحله بعد باز می‌شود.</p>
 <div class="bar"><i style="width:${done/L.length*100}%"></i></div><p class="mut">${fa(done)} از ${fa(L.length)} مرحله تمام شده · ${fa(S.xp)} امتیاز · ${fa(streak())} روز متوالی</p>
 <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="pl">${S.placed?'آزمون تعیین سطح':'شروع با آزمون تعیین سطح'}</button><button class="btn alt" id="pg">پیشرفت و گواهی</button><button class="btn alt" id="ro">موقعیت‌های واقعی</button><button class="btn alt" id="tc">معلم انگلیسی</button><button class="btn alt" id="cm">نقشه دوره</button><button class="btn alt" id="vc">واژگان</button><button class="btn alt" id="gr">گرامر</button><button class="btn alt" id="rv">مرور کلمه‌ها (${fa(Object.values(S.rv||{}).filter(r=>r.d<=Date.now()).length)})</button></div>
 <div class="card" style="margin:10px 0"><p>هدف امروز: <b>${fa(dx)}</b> از ${fa(50)} امتیاز</p><div class="bar"><i style="width:${dx*2}%"></i></div><p>هدف هفته: <b>${fa(wk)}</b> از ${fa(4)} روز فعال</p><div class="bar"><i style="width:${Math.min(100,wk/4*100)}%"></i></div></div>
 ${recHtml()}
 <p class="mut" style="margin-top:10px">سطح شروع: <select id="sl" style="font:inherit">${L.map((l,i)=>`<option value="${i}" ${i==(S.start||0)?'selected':''}>${l.c}</option>`).join('')}</select></p>
 ${done==L.length?'<div class="card good" style="margin:10px 0"><b>تبریک! دوره را کامل کردی. حالا زبان انگلیسی‌ات در سطح حرفه‌ای است.</b></div>':''}
 ${L.map((l,i)=>{const b=S.best[i]||0,ok=b>=70;return `<button class="lv ${ok?'done':''}" data-i="${i}" ${open(i)?'':'disabled'}><span class="code">${ok?'✓':l.c}</span><span><b>${l.n} (${l.c})</b><span class="mut" style="display:block;font-size:.8rem">${fa(Math.ceil(l.w.length/10))} درس · ${fa(l.w.length)} کلمه · ${fa(l.s.length)} جمله · ${fa(l.d.length)} مکالمه · سختی ${'★'.repeat(L.indexOf(l)+1)}</span><span class="mut">${open(i)?(b?'بهترین نمره آزمون: '+fa(b)+'٪':'آماده شروع'):'قفل؛ مرحله قبل را قبول شو'}</span></span></button>`}).join('')}`;
 app.querySelectorAll('.lv').forEach(b=>b.onclick=()=>level(+b.dataset.i,'a'));
 document.getElementById('pl').onclick=placement;document.getElementById('pg').onclick=progress;document.getElementById('rv').onclick=review;document.getElementById('vc').onclick=vocabs;document.getElementById('cm').onclick=curriculum;document.getElementById('gr').onclick=grams;document.getElementById('tc').onclick=teacher;document.getElementById('ro').onclick=role;
 document.getElementById('sl').onchange=e=>{S.start=+e.target.value;save();home()};
}

const T=[['a','نقشه درس'],['b','الفبا'],['w','کلمه‌ها'],['g','گرامر'],['q','آزمونک'],['s','جمله‌سازی'],['j','جای خالی'],['c','مکالمه'],['o','تلفظ'],['p','گفتن'],['m','آزمون گرامر'],['h','تکلیف'],['n','گوش دادن به متن'],['f','گفتار آزاد'],['r','خواندن'],['l','شنیداری'],['x','نوشتن'],['k','آزمون مهارت‌ها'],['e','آزمون نهایی']];
var CU=0;
function level(i,t,u=0){
 CU=u;const F=L[i];
 const l=u<0||F.w.length<=10?F:{...F,w:F.w.slice(u*10,u*10+10),s:F.s.slice(u*3,u*3+3),d:F.d.slice(u*3,u*3+3)};
 app.innerHTML=`<button class="back" id="bk">‹ همه مرحله‌ها</button><h2>${l.n} (${l.c})</h2>
 <div class="tabs" role="tablist">${T.filter(x=>x[0]!='b'||i==0).map(x=>`<button class="tab" role="tab" aria-selected="${x[0]==t}" data-t="${x[0]}">${x[1]}</button>`).join('')}</div>
 ${F.w.length>10&&'wqslcpj'.includes(t)?`<div class="tabs">${[['درس ۱',0],['درس ۲',1],['درس ۳',2],['درس ۴',3],['درس ۵',4],['درس ۶',5],['همه',-1]].filter(x=>x[1]<Math.ceil(F.w.length/10)).map(x=>`<button class="tab" aria-selected="${x[1]==u}" data-u="${x[1]}">${x[0]}</button>`).join('')}</div><p class="mut">موضوع: ${(TT[i]||[])[u]||'همه درس‌ها'}</p>`:''}<div id="box" class="card"></div>`;
 document.getElementById('bk').onclick=home;
 app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>level(i,b.dataset.t,u));
 app.querySelectorAll('[data-u]').forEach(b=>b.onclick=()=>level(i,t,+b.dataset.u));
 const box=document.getElementById('box');
 if(t=='w')words(l,box);
 if(t=='g')gram(i,box);
 if(t=='r')read(i,box);
 if(t=='h')hw(i,box);
 if(t=='a')lmap(i,box);
 if(t=='j')fill(l,i,box);
 if(t=='b')alpha(box);
 if(t=='k')skills(i,box);
 if(t=='n')lisP(i,box);
 if(t=='f')free(i,box);
 if(t=='m')quiz(GQ[i].map(x=>({k:'g',q:x[0],l:1,o:x[1],a:x[1][0],ol:1})),box,(s,n)=>end(box,s,n,()=>level(i,'m'),'دوباره'));
 if(t=='p')speak(l,i,box);
 if(t=='o')pron(i,box);
 if(t=='l')lis(l,i,box);
 if(t=='x')writ(i,box);
 if(t=='q')quiz(vq(l).slice(0,8),box,(s,n)=>end(box,s,n,()=>level(i,'q',CU),'دوباره'));
 if(t=='s')build(l,box);
 if(t=='c')quiz(cq(l),box,(s,n)=>end(box,s,n,()=>level(i,'c',CU),'دوباره'));
 if(t=='e')intro(i,box);
}

function words(l,box){
 box.innerHTML=l.w.map((w,k)=>`<div class="w"><span class="en" dir="ltr">${w[0]}</span><span class="fa">${xd(w)}</span><button class="sp" data-k="${k}" aria-label="تلفظ ${w[0]}">🔊</button></div>`).join('')+'<p class="mut" style="margin-top:10px">روی بلندگو بزن و تلفظ را بشنو. بعد از یاد گرفتن، سراغ آزمونک برو.</p>';
 box.querySelectorAll('.sp').forEach(b=>b.onclick=()=>say(l.w[b.dataset.k][0]));
}

function gram(i,box){const g=G[i];box.innerHTML=`<h2>${g[0]}</h2><p>${g[1]}</p><div class="q" dir="ltr">${g[2]}</div><p><b>مثال‌ها</b></p><p dir="ltr">${g[3]}</p><p class="badc" dir="ltr"><b>اشتباه رایج:</b> ${g[4]}</p><p class="mut">حالا برو سراغ جمله‌سازی و آزمونک تا تمرین کنی.</p>`}
function read(i,box){const r=[R[i],R2[i],R3[i]][Math.floor(Math.random()*3)];const qs=r.slice(1).map(x=>({k:'r',q:`<p dir="ltr" style="font-weight:400;font-size:1rem;margin:0 0 10px">${r[0]}</p><b>${x[0]}</b>`,l:1,o:x.slice(1),a:x[1],ol:1}));quiz(qs,box,(s,n)=>end(box,s,n,()=>level(i,'r'),'دوباره'))}
function lis(l,i,box){const qs=sh(l.s).slice(0,5).map(([e])=>({k:'s',q:`<button class="sp" data-t="${e}" onclick="say(this.dataset.t)" aria-label="پخش">🔊</button> جمله را بشنو و همان را انتخاب کن`,o:[e,...sh(l.s.filter(x=>x[0]!=e)).slice(0,3).map(x=>x[0])],a:e,ol:1}));qs.length=Math.min(qs.length,4);qs.push(...sh(l.d).slice(0,3).map(d=>({k:'c',q:`<button class="sp" data-t="${d[0]}" onclick="say(this.dataset.t)" aria-label="پخش">🔊</button> گوش بده و بهترین جواب را انتخاب کن`,o:d.slice(1),a:d[1],ol:1})));quiz(qs,box,(s,n)=>end(box,s,n,()=>level(i,'l',CU),'دوباره'))}
function writ(i,box){const w=[Math.random()<.5?W[i][0]:W2[i],...W[i].slice(1)];S.wr=S.wr||{};
 box.innerHTML=`<p>${w[0]}</p><p class="mut">حداقل ${fa(w[1])} کلمه به انگلیسی</p><textarea id="tx" dir="ltr" rows="8" style="width:100%;font:inherit;border:2px solid var(--line);border-radius:12px;padding:10px;background:var(--card);color:var(--ink)">${S.wr[i]||''}</textarea><button class="btn" id="fbk">بررسی نوشته</button><div id="fb"></div>`;
 document.getElementById('fbk').onclick=()=>{const t=document.getElementById('tx').value.trim();S.wr[i]=t;const n=t?t.split(/\s+/).length:0;
  const cs=[[n>=w[1],'طول متن: '+fa(n)+' از '+fa(w[1])+' کلمه'],[/^[A-Z]/.test(t),'جمله اول با حرف بزرگ شروع شود'],[/[.!?]$/.test(t),'متن با نقطه یا علامت سؤال تمام شود'],...w[2].map(r=>[r[0].test(t),r[1]])];
  const ok=cs.every(c=>c[0]);if(ok&&!S.wr['d'+i]){S.xp+=15;S.wr['d'+i]=1}save();
  document.getElementById('fb').innerHTML=cs.map(c=>`<p class="${c[0]?'good':'badc'}">${c[0]?'✓':'✗'} ${c[1]}</p>`).join('')+`<p class="mut">${ok?'آفرین! همه موارد رعایت شده. متنت را یک بار بلند بخوان.':'موارد ✗ را اصلاح کن و دوباره بررسی کن. متن ذخیره شده است.'}</p>`}}
const srs=(e,m,ok)=>{S.rv=S.rv||{};const r=S.rv[e]||{b:0};r.b=ok?Math.min(r.b+1,4):0;r.d=Date.now()+[0,1,3,7,14][r.b]*864e5;r.m=m;S.rv[e]=r;save()};
function review(){const due=Object.entries(S.rv||{}).filter(([,r])=>r.d<=Date.now());
 app.innerHTML='<button class="back" onclick="home()">‹ بازگشت</button><h2>مرور امروز</h2>'+srsHtml()+'<div id="box" class="card" style="margin-top:10px"></div>';
 const box=document.getElementById('box'),all=L.flatMap(l=>l.w);
 if(!due.length){box.innerHTML='<div class="res"><p>الان کلمه‌ای برای مرور نداری. بعد از آزمونک‌ها، کلمه‌ها به برنامه مرور اضافه می‌شوند و در زمان مناسب برمی‌گردند.</p></div>';return}
 const qs=sh(due).slice(0,10).map(([e,r])=>({k:'w',q:e,l:1,o:[r.m,...sh(all.filter(x=>x[1]!=r.m)).slice(0,3).map(x=>x[1])],a:r.m,f:ok=>srs(e,r.m,ok)}));
 quiz(qs,box,(s,n)=>end(box,s,n,review,'مرور بعدی'))}
function speak(l,i,box){let k=0;const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
 const step=()=>{if(k>=l.s.length){box.innerHTML='<div class="res"><div class="n good">🎤</div><p>تمرین گفتن تمام شد.</p><button class="btn" id="ag">دوباره</button></div>';document.getElementById('ag').onclick=()=>{k=0;step()};return}
  const e=l.s[k][0];
  box.innerHTML=`<p class="cnt">بشنو و تکرار کن (${fa(k+1)} از ${fa(l.s.length)})</p><div class="q" dir="ltr">${e}</div><button class="sp" id="pl2" aria-label="پخش">🔊</button> <button class="btn" id="mc">${SR?'🎤 بگو':'من گفتم'}</button><div id="fb"></div><button class="btn alt" id="nx2">بعدی</button>`;
  document.getElementById('pl2').onclick=()=>say(e);
  document.getElementById('nx2').onclick=()=>{k++;step()};
  document.getElementById('mc').onclick=()=>{
   if(!SR){S.xp+=5;save();document.getElementById('fb').innerHTML='<p class="good">آفرین! ادامه بده.</p>';return}
   const r=new SR();r.lang='en-US';
   r.onresult=ev=>{const tr=ev.results[0][0].transcript,cl=x=>x.toLowerCase().replace(/[^a-z' ]/g,'').split(' '),t=cl(tr),w=cl(e),p=Math.round(w.filter(x=>t.includes(x)).length/w.length*100);if(p>=70){S.xp+=10;save()}
    document.getElementById('fb').innerHTML=`<p class="${p>=70?'good':'badc'}" dir="ltr">${tr}</p><p class="${p>=70?'good':'badc'}">تطابق ${fa(p)}٪${p>=70?'، عالی!':'، دوباره امتحان کن.'}</p>`};
   r.onerror=()=>{document.getElementById('fb').innerHTML='<p class="badc">میکروفون در دسترس نیست. اجازه میکروفون را بررسی کن.</p>'};
   try{r.start()}catch(x){}}};step()}
const RU=[
[/\bI is\b/i,'با I باید am بیاید: I am.',0],[/\b(he|she|it) (are|am)\b/i,'با he/she/it از is استفاده کن: she is.',0],[/\b(you|we|they) (is|am)\b/i,'با you/we/they از are استفاده کن: they are.',0],
[/\bI am agree\b/i,'agree خودش فعل است و نیازی به am ندارد. بگو: I agree.',1],
[/\b(he|she|it) (go|work|like|have|do|want|live|play|study|eat|need|watch)\b/i,'در Present Simple برای he/she/it به فعل s می‌چسبد: she works.',1],
[/\b(doesn't|does not) \w+s\b/i,'بعد از doesn\'t فعل ساده و بدون s می‌آید: he doesn\'t work.',1],
[/\b(I|you|we|they) has\b/i,'با I/you/we/they از have استفاده کن.',1],
[/\bmore (cheap|big|small|fast|easy|old|long|short)\b/i,'برای صفت کوتاه از er استفاده کن: cheaper، bigger.',1],
[/\b(a) (apple|egg|hour|orange|umbrella|idea|answer)\b/i,'قبل از صدای مصوت از an استفاده کن: an apple.',1],
[/\bmuch (people|friends|books|cars)\b/i,'برای اسم قابل‌شمارش جمع از many استفاده کن: many people.',1],
[/\bI have \d+ years?\b/i,'سن را با am می‌گوییم: I am 20 years old.',1],
[/\b(have|has) (went|ate|saw|did|wrote|took|began)\b/i,'بعد از have/has باید اسم‌مفعول بیاید: gone، eaten، seen، done، written، taken، begun.',2],
[/\bdiscuss about\b/i,'discuss خودش مفعول می‌گیرد، بدون about: discuss the plan.',3],
[/\bif (I|you|we|they|he|she|it) would\b/i,'بعد از if معمولاً would نمی‌آید: If I had time, I would go.',3],
[/\bwould (have )?\w+ if (I|you|we|they|he|she|it) (would have)\b/i,'در شرطی نوع سوم بعد از if از had + اسم‌مفعول استفاده کن: If I had known…',4]];
function teacher(){
 app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>معلم انگلیسی</h2><p class="mut">یک جمله یا یک کلمه انگلیسی بنویس. اشتباه‌های رایج را پیدا می‌کنم و دلیلش را توضیح می‌دهم. این معلم داخل خود فایل کار می‌کند و فقط خطاهای رایج را می‌شناسد.</p>
 <textarea id="tt" dir="ltr" rows="3" style="width:100%;font:inherit;border:2px solid var(--line);border-radius:12px;padding:10px;background:var(--card);color:var(--ink)"></textarea><button class="btn" id="tb">بررسی</button><div id="tr" class="card" style="margin-top:12px;display:none"></div>`;
 document.getElementById('tb').onclick=()=>{const t=document.getElementById('tt').value.trim(),o=document.getElementById('tr');o.style.display='block';
  if(!t){o.innerHTML='<p class="badc">اول یک جمله بنویس.</p>';return}
  if(!/\s/.test(t)){const w=L.flatMap((l,i)=>l.w.map(x=>[...x,l.c])).find(x=>x[0].toLowerCase()==t.toLowerCase());
   o.innerHTML=w?`<p dir="ltr"><b>${w[0]}</b> (${w[2]})</p><p>${w[1]}</p>`:'<p>این کلمه در درس‌ها نیست. یک جمله کامل بنویس تا بررسی کنم.</p>';return}
  const is=RU.filter(r=>r[0].test(t)),extra=[];
  if(/^[a-z]/.test(t))extra.push('جمله باید با حرف بزرگ شروع شود.');
  if(!/[.!?]$/.test(t))extra.push('آخر جمله نقطه یا علامت سؤال بگذار.');
  const rec=[...new Set(is.map(r=>r[2]))].map(k=>L[k].c).join('، ');
  o.innerHTML=(is.length||extra.length)?`<p class="badc"><b>پیدا شد:</b></p>${[...is.map(r=>r[1]),...extra].map(x=>`<p>• ${x}</p>`).join('')}${rec?`<p class="mut">پیشنهاد: بخش گرامر سطح ${rec} را مرور کن.</p>`:''}`:'<p class="good"><b>خطای رایجی پیدا نشد. آفرین!</b></p><p class="mut">برای مطمئن‌شدن، جمله را بلند بخوان.</p>';
  if(!is.length&&!extra.length){S.xp+=5;save()}}}
function vocabs(){
 app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>واژگان</h2>
 <p><select id="vl" style="font:inherit"><option value="-1">همه سطح‌ها</option>${L.map((l,i)=>`<option value="${i}">${l.c}</option>`).join('')}</select> <input id="vs" dir="ltr" placeholder="جستجو" style="font:inherit;border:2px solid var(--line);border-radius:10px;padding:4px 10px;background:var(--card);color:var(--ink)"></p><div id="box" class="card"></div>`;
 const draw=()=>{const v=+document.getElementById('vl').value,q=document.getElementById('vs').value.trim().toLowerCase();
  const ws=L.flatMap((l,i)=>l.w.map(x=>[...x,l.c,i])).filter(x=>(v<0||x[3]==v)&&(!q||x[0].toLowerCase().includes(q)||x[1].includes(q)));
  document.getElementById('box').innerHTML=ws.map((w,k)=>`<div class="w"><span class="en" dir="ltr">${w[0]}</span><span class="fa">${w[1]}</span><span class="mut" dir="ltr">${w[2]}</span><button class="sp" data-t="${w[0]}" onclick="say(this.dataset.t)" aria-label="تلفظ">🔊</button><button class="sp" data-e="${w[0]}" data-m="${w[1]}" data-v="1" aria-label="این کلمه را می‌دانم">✓</button><button class="sp" data-e="${w[0]}" data-m="${w[1]}" data-v="0" aria-label="این کلمه را نمی‌دانم">✗</button></div>`).join('')||'<p class="mut">کلمه‌ای پیدا نشد.</p>';document.getElementById('box').querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{srs(b.dataset.e,b.dataset.m,b.dataset.v=='1');b.textContent='✔'})};
 document.getElementById('vl').onchange=draw;document.getElementById('vs').oninput=draw;draw()}
function grams(){
 app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>گرامر از A0 تا C2</h2><div style="margin-top:10px">${G.map((g,i)=>`<details class="card" style="margin:8px 0"><summary><b>${L[i].c}</b> ${g[0]}</summary><p>${g[1]}</p><div class="q" dir="ltr">${g[2]}</div><p dir="ltr">${g[3]}</p><p class="badc" dir="ltr">${g[4]}</p></details>`).join('')}</div>`}
const gt=g=>`<h2>${g[0]}</h2><p>${g[1]}</p><div class="q" dir="ltr">${g[2]}</div><p><b>مثال‌ها</b></p><p dir="ltr">${g[3]}</p><p class="badc" dir="ltr"><b>اشتباه رایج:</b> ${g[4]}</p>`;
function gram(i,box){box.innerHTML=gt(G[i])+'<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">'+gt(G2[i])+(typeof G3!='undefined'?'<hr style="border:0;border-top:1px solid var(--line);margin:16px 0">'+gt(G3[i]):'')+'<p class="mut">حالا برو سراغ جمله‌سازی و آزمونک تا تمرین کنی.</p>'}
function grams(){
 app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>گرامر از A0 تا C2</h2><div style="margin-top:10px">${G.map((g,i)=>`<details class="card" style="margin:8px 0"><summary><b>${L[i].c}</b> ${g[0]} و ${G2[i][0]}</summary>${gt(g)}<hr>${gt(G2[i])}${typeof G3!='undefined'?'<hr>'+gt(G3[i]):''}</details>`).join('')}</div>`}
function hw(i,box){S.lc=S.lc||{};const key=i+'-'+CU,done=S.lc[key];
 box.innerHTML=`<p><b>${O[i]}</b></p><p class="badc" dir="ltr"><b>اشتباه رایج:</b> ${G[i][4]}</p><p><b>تکلیف:</b> پنج کلمه همین درس را در جمله‌های خودت بنویس و بخش نوشتن را انجام بده. بعد ۱۰ کلمه را در مرور کلمه‌ها تمرین کن.</p><button class="btn" id="fin">${done?'این درس تمام شده ✓':'پایان درس'}</button><p class="mut">درس‌های تمام‌شده: ${fa(Object.keys(S.lc).length)}</p>`;
 document.getElementById('fin').onclick=()=>{if(!S.lc[key]){S.lc[key]=1;S.xp+=20;save();hw(i,box)}}}
RU.push(
[/\bI am (go|come|work|study|live)\b/i,'بعد از am فعل ساده نمی‌آید. برای کار همین الان از -ing استفاده کن: I am going.',1],
[/\b(he|she|it) don't\b/i,'با he/she/it از doesn\'t استفاده کن.',1],
[/\bI didn't (went|saw|ate|did|took)\b/i,'بعد از didn\'t فعل ساده می‌آید: I didn\'t go.',1],
[/\bmore (better|good)\b/i,'better خودش comparative است و more نمی‌خواهد.',2],
[/\bI look forward to (see|meet|hear)\b/i,'بعد از look forward to فعل با -ing می‌آید: look forward to seeing.',3],
[/\bI want that you\b/i,'ساختار درست: I want you to…',3],
[/\bin the other hand\b/i,'عبارت درست on the other hand است.',3],
[/\bdepend of\b/i,'درست: depend on.',3],
[/\bexplain me\b/i,'درست: explain it to me.',3],
[/\bsuggest (me )?to\b/i,'بعد از suggest از to + مصدر استفاده نمی‌کنیم: suggest going یا suggest that we go.',4]);
function role(){app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>موقعیت‌های واقعی</h2><p class="mut">یک موقعیت انتخاب کن و جواب مناسب را بده.</p>${SC.map((x,k)=>`<button class="lv" data-k="${k}"><span class="code">💬</span><span><b>${x[0]}</b></span></button>`).join('')}<div id="box" class="card" style="margin-top:10px;display:none"></div>`;
 app.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const box=document.getElementById('box');box.style.display='block';const k=+b.dataset.k;quiz(SC[k][1].map(d=>({k:'c',q:d[0],l:1,c:1,o:d.slice(1),a:d[1],ol:1})),box,(s,n)=>end(box,s,n,role,'موقعیت دیگر'))})}
const sayS=t=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=.5;speechSynthesis.speak(u)}catch(e){}};
function pron(i,box){box.innerHTML=PR[i].map(x=>`<div class="w"><span class="fa" style="flex:1"><b dir="ltr">${x[0]}</b><br>${x[1]}</span><button class="sp" data-t="${x[0].split(': ').pop()}" onclick="say(this.dataset.t)" aria-label="پخش عادی">🔊</button><button class="sp" data-t="${x[0].split(': ').pop()}" onclick="sayS(this.dataset.t)" aria-label="پخش آهسته">🐢</button></div>`).join('')+'<p class="mut" style="margin-top:10px">هر مورد را یک بار عادی و یک بار آهسته بشنو، بعد بلند تکرار کن.</p>'}
const xd=w=>{const e=EX[w[0]];if(!e)return w[1];const a=e.split('|');return `${w[1]} <span class="mut" dir="ltr">(${a[0]})</span><br><small dir="ltr">${a[1]}</small>${a[2]?`<br><small>مترادف: <span dir="ltr">${a[2]}</span></small>`:''}`};
function free(i,box){const SR=window.SpeechRecognition||window.webkitSpeechRecognition,p=SP[i][Math.floor(Math.random()*3)];
 box.innerHTML=`<p class="cnt">انگلیسی صحبت کن؛ حداقل ${fa(MW[i])} کلمه</p><div class="q" dir="ltr">${p}</div>${SR?'<button class="btn" id="st2">🎤 شروع صحبت</button>':'<p class="badc">مرورگرت تشخیص گفتار ندارد. موضوع را بلند بگو یا بخش نوشتن را انجام بده.</p>'}<div id="fb"></div><button class="btn alt" id="nw">موضوع دیگر</button>`;
 document.getElementById('nw').onclick=()=>free(i,box);
 if(!SR)return;
 document.getElementById('st2').onclick=()=>{const r=new SR();r.lang='en-US';r.continuous=true;let tx='';
  r.onresult=ev=>{tx=[...ev.results].map(x=>x[0].transcript).join(' ');document.getElementById('fb').innerHTML=`<p dir="ltr">${tx}</p>`};
  r.onend=()=>{const n=tx.trim()?tx.trim().split(/\s+/).length:0,ok=n>=MW[i];if(ok)S.xp+=15;save();document.getElementById('fb').innerHTML+=`<p class="${ok?'good':'badc'}">${fa(n)} کلمه از ${fa(MW[i])}${ok?'. آفرین!':'. کمی بیشتر صحبت کن.'}</p>`;document.getElementById('st2').textContent='🎤 دوباره'};
  r.onerror=()=>{document.getElementById('fb').innerHTML='<p class="badc">میکروفون در دسترس نیست.</p>'};
  try{r.start()}catch(x){}setTimeout(()=>{try{r.stop()}catch(x){}},25000)}}
function lisP(i,box){const r=[R[i],R2[i],R3[i]][Math.floor(Math.random()*3)],lg=i>=5?'en-GB':'en-US';
 box.innerHTML='<p class="mut">متن را گوش بده؛ متن نمایش داده نمی‌شود. هر چند بار بخواهی می‌توانی دوباره پخش کنی.'+(i>=5?' در این سطح لهجه بریتانیایی هم می‌شنوی.':'')+'</p><button class="btn" id="pp">🔊 پخش متن</button> <button class="btn alt" id="pq">شروع سؤال‌ها</button>';
 document.getElementById('pp').onclick=()=>{try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(r[0]);u.lang=lg;u.rate=i<2?.7:.9;speechSynthesis.speak(u)}catch(e){}};
 document.getElementById('pq').onclick=()=>quiz(r.slice(1).map(x=>({k:'r',q:x[0],l:1,o:x.slice(1),a:x[1],ol:1})),box,(s,n)=>end(box,s,n,()=>level(i,'n'),'متن دیگر'))}
function profile(){app.innerHTML=`<h2>پروفایل</h2><p class="mut">اسمت روی گواهی چاپ می‌شود.</p><input id="pn" value="${(S.name||'').replace(/"/g,'&quot;')}" placeholder="اسم" style="font:inherit;border:2px solid var(--line);border-radius:10px;padding:8px 12px;background:var(--card);color:var(--ink);width:100%"><button class="btn" id="ps">ذخیره</button><p class="mut">ظاهر برنامه</p><select id="th" style="font:inherit;padding:6px"><option value="">خودکار</option><option value="light" ${S.theme=='light'?'selected':''}>روشن</option><option value="dark" ${S.theme=='dark'?'selected':''}>تیره</option></select><hr style="border:0;border-top:1px solid var(--line);margin:18px 0"><p class="mut">پاک‌کردن همه پیشرفت‌ها در این مرورگر</p><button class="btn alt" id="pr">پاک‌کردن پیشرفت</button>`;
 document.getElementById('th').onchange=e=>{S.theme=e.target.value;save();if(S.theme)document.documentElement.setAttribute('data-theme',S.theme);else document.documentElement.removeAttribute('data-theme')};
 document.getElementById('ps').onclick=()=>{S.name=document.getElementById('pn').value.trim();save();home()};
 document.getElementById('pr').onclick=()=>{if(confirm('همه پیشرفت‌ها پاک شود؟')){try{localStorage.removeItem('ep')}catch(e){}location.reload()}}}
function skills(i,box){S.sk=S.sk||{};const sk=S.sk[i]||{},l=L[i];
 const opt=(e,pool)=>[e,...sh(pool.filter(x=>x[0]!=e)).slice(0,3).map(x=>x[0])];
 const pl=t=>`<button class="sp" data-t="${t}" onclick="say(this.dataset.t)" aria-label="پخش">🔊</button>`;
 const run=key=>{const qs=key=='l'?[...sh(l.s).slice(0,3).map(([e])=>({k:'s',q:pl(e)+' بشنو و جمله را انتخاب کن',o:opt(e,l.s),a:e,ol:1})),...sh(l.d).slice(0,3).map(d=>({k:'c',q:pl(d[0])+' بشنو و جواب مناسب را انتخاب کن',o:d.slice(1),a:d[1],ol:1}))]
  :key=='r'?[R[i],R2[i],R3[i]].flatMap(r=>r.slice(1).map(x=>({k:'r',q:`<p dir="ltr" style="font-weight:400;font-size:1rem;margin:0 0 10px">${r[0]}</p><b>${x[0]}</b>`,l:1,o:x.slice(1),a:x[1],ol:1})))
  :[...GQ[i].map(x=>({k:'g',q:x[0],l:1,o:x[1],a:x[1][0],ol:1})),...sh(l.s).slice(0,2).map(([e,f])=>({k:'s',q:f,o:opt(e,l.s),a:e,ol:1}))];
  quiz(qs,box,(s2,n)=>{const p=Math.round(s2/n*100);S.sk[i]={...sk,[key]:Math.max(sk[key]||0,p)};save();end(box,s2,n,()=>skills(i,box),'بازگشت به آزمون‌های مهارت')})};
 const nm={l:'شنیداری',r:'خواندن',g:'گرامر'};
 box.innerHTML=Object.keys(nm).map(k=>`<div class="w"><span class="fa" style="flex:1"><b>آزمون ${nm[k]}</b><br><span class="mut">بهترین نمره: ${sk[k]!=null?fa(sk[k])+'٪':'—'}</span></span><button class="btn" style="margin:0" data-k="${k}">شروع</button></div>`).join('')+`<p class="mut" style="margin-top:10px">نوشتن: ${S.wr&&S.wr['d'+i]?'انجام شد ✓':'هنوز انجام نشده'}. گفتن را در بخش‌های «گفتن» و «گفتار آزاد» تمرین کن.</p>`;
 box.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>run(b.dataset.k))}
function lmap(i,box){
 const P2=[['عنوان درس',null,(TT[i]||[])[Math.max(CU,0)]||'همه درس‌ها'],['هدف‌ها',null,O[i]],['توضیح و مثال‌ها','g'],['واژگان','w'],['تلفظ','o'],['گرامر','g'],['شنیداری','l'],['گفتن','p'],['خواندن','r'],['نوشتن','x'],['تمرین‌های تعاملی','s'],['کوییز','q'],['اشتباه‌های رایج','h'],['مثال‌های دنیای واقعی','c'],['مرور و آزمون مهارت‌ها','k'],['تکلیف','h'],['پایان درس','h']];
 box.innerHTML=P2.map((p,k)=>`<div class="w"><span class="en" style="min-width:28px">${fa(k+1)}</span><span class="fa" style="flex:1">${p[0]}${p[2]?`<br><small>${p[2]}</small>`:''}</span>${p[1]?`<button class="tab" data-g="${p[1]}">برو</button>`:''}</div>`).join('')+'<p class="mut" style="margin-top:10px">هر درس را به همین ترتیب بخوان و تمرین کن. در پایان، «پایان درس» را بزن.</p>';
 box.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>level(i,b.dataset.g,CU))}
function alpha(box){const w='apple ball cat dog egg fish girl hat ice juice key lion milk name orange pen queen rain sun tea umbrella van water box yes zoo'.split(' ');
 box.innerHTML='<p class="mut">روی هر حرف بزن تا نام حرف و یک کلمه نمونه را بشنوی.</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px" dir="ltr">'+w.map((x,k)=>{const c=String.fromCharCode(65+k);return `<button class="chip" data-t="${c}. ${x}" onclick="say(this.dataset.t)"><b>${c}${c.toLowerCase()}</b> ${x}</button>`}).join('')+'</div>'}
function srsHtml(){const all=L.flatMap(l=>l.w).length,r=Object.values(S.rv||{}),ln=r.filter(x=>x.b==0).length,rv=r.filter(x=>x.b>=1&&x.b<3).length,ms=r.filter(x=>x.b>=3).length,due=r.filter(x=>x.d<=Date.now()).length;
 return `<div class="card st" style="margin:10px 0"><div><b>${fa(Math.max(0,all-r.length))}</b><span>جدید</span></div><div><b>${fa(ln)}</b><span>در حال یادگیری</span></div><div><b>${fa(rv)}</b><span>در حال مرور</span></div><div><b>${fa(ms)}</b><span>مسلط</span></div></div><p class="mut">امروز ${fa(due)} کلمه برای مرور داری.</p>`}
function fill(l,i,box){const ws=[...new Set(l.s.flatMap(x=>x[0].replace(/[.,;?!]/g,'').split(' ')))],cl=w=>w.replace(/[.,;?!]/g,'');
 const qs=sh(l.s).slice(0,6).map(([e,f])=>{const t=e.split(' ');const k=t.reduce((b,w,j)=>cl(w).length>cl(t[b]).length?j:b,0);const raw=t[k],core=cl(raw),tail=raw.slice(core.length);t[k]='_____'+tail;
  return {k:'s',q:`${t.join(' ')}<br><small>${f}</small>`,l:1,o:[core,...sh(ws.filter(w=>w.toLowerCase()!=core.toLowerCase())).slice(0,3)],a:core,ol:1}});
 quiz(qs,box,(s,n)=>end(box,s,n,()=>level(i,'j',CU),'دوباره'))}
const unitKeys=(a,u)=>{const n=CUR.find(l=>l[0]==a)[1][+u][1].length-2;return Array.from({length:n},(_,k)=>a+'-'+u+'-'+k)};
const ready=key=>{if(LES[key])return true;const [a,u,k]=key.split('-');return +k>=unitKeys(a,u).length&&unitKeys(a,u).every(x=>LES[x])};
function synth(key){const [a,u,k]=key.split('-'),ks=unitKeys(a,u).map(x=>LES[x]),test=+k==unitKeys(a,u).length+1,pool=sh(ks.flatMap(d=>d[5].split('|')));
 return [test?'نمره‌ات را در این واحد بسنج (حداقل ۷۰٪).':'مرور مهم‌ترین نکته‌های همه‌ی درس‌های این واحد.',test?'این آزمون از سؤال‌های همه‌ی درس‌های واحد ساخته شده است.':'مثال‌ها و واژگان هر درس را دوباره بخوان و بعد کوییز مرور را بزن.',ks.map(d=>d[2].split('|')[0]).join('|'),ks.map(d=>d[3].split('|').slice(0,2).join('|')).join('|'),ks[ks.length-1][4],pool.slice(0,test?10:6).join('|')]}
function lessonPage(key){const d=LES[key]||synth(key),[a,u,k]=key.split('-'),title=CUR.find(l=>l[0]==a)[1][+u][1][+k];
 const sp=(t)=>`<button class="sp" data-t="${t.replace(/"/g,'')}" onclick="say(this.dataset.t)" aria-label="پخش">🔊</button>`;
 const ex=d[2].split('|').map(x=>x.split('=')),vo=d[3].split('|').map(x=>x.split('=')),qs=d[5].split('|').map(x=>x.split('~'));
 app.innerHTML=`<button class="back" onclick="curriculum()">‹ نقشه دوره</button><h2 dir="ltr">${title}</h2>
 <div class="card" style="margin:10px 0"><p><b>هدف:</b> ${d[0]}</p><p>${d[1]}</p></div>
 <div class="card"><p><b>مثال‌ها</b></p>${ex.map(x=>`<div class="w"><span class="en" dir="ltr" style="min-width:0;flex:1">${x[0]}</span><span class="fa">${x[1]||''}</span>${sp(x[0])}</div>`).join('')}</div>
 <div class="card" style="margin:10px 0"><p><b>واژگان</b></p>${vo.map(x=>`<div class="w"><span class="en" dir="ltr">${x[0]}</span><span class="fa">${x[1]}</span>${sp(x[0])}</div>`).join('')}</div>
 <p class="badc">${d[4]}</p><p><b>کوییز درس</b></p><div id="box" class="card"></div>`;
 const box=document.getElementById('box');
 quiz(qs.map(q=>({k:'w',q:q[0],l:1,o:q.slice(1),a:q[1],ol:1})),box,(s,n)=>{const ok=s/n>=(+key.split('-')[2]==unitKeys(a,u).length+1?.7:.5);if(ok&&!S.cl[key]){S.cl[key]=1;S.xp+=20;save()}end(box,s,n,()=>lessonPage(key),'دوباره',ok?'<p class="good"><b>درس تمام شد و در نقشه دوره تیک خورد.</b></p>':'<p class="badc">برای تمام‌شدن درس جواب‌های درست کافی نیست؛ دوباره امتحان کن.</p>')})}
function curriculum(){S.cl=S.cl||{};const key=(a,u,k)=>a+'-'+u+'-'+k;
 const tu=CUR.reduce((a,l)=>a+l[1].length,0),tl=CUR.reduce((a,l)=>a+l[1].reduce((b,u)=>b+u[1].length,0),0);
 app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>نقشه کامل دوره</h2><p class="mut">${fa(tu)} واحد و ${fa(tl)} درس. هر درسی را که تمام کردی تیک بزن. متن کامل همه‌ی درس‌ها هنوز ساخته نشده و در حال تکمیل است؛ درس‌های آماده در بخش «سطح‌ها» هستند.</p>`+CUR.map(l=>{const tot=l[1].reduce((b,u)=>b+u[1].length,0),dn=Object.keys(S.cl).filter(k=>k.startsWith(l[0]+'-')).length;
  return `<details class="card" style="margin:8px 0"><summary><b dir="ltr">${l[0]}</b> · ${fa(l[1].length)} واحد · ${fa(tot)} درس · ${fa(Math.round(dn/tot*100))}٪</summary>`+l[1].map((u,j)=>`<p style="margin:10px 0 2px"><b dir="ltr">Unit ${j+1} — ${u[0]}</b></p>`+u[1].map((t,k)=>`<div class="w"><label style="flex:1;cursor:pointer"><input type="checkbox" data-k="${key(l[0],j,k)}" ${S.cl[key(l[0],j,k)]?'checked':''}> <span dir="ltr">${k+1}. ${t}</span></label>${ready(key(l[0],j,k))?`<button class="sp" data-l="${key(l[0],j,k)}" aria-label="باز کردن درس">📘</button>`:''}</div>`).join('')).join('')+'</details>'}).join('');
 app.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>lessonPage(b.dataset.l));
 app.querySelectorAll('input[data-k]').forEach(c=>c.onchange=()=>{if(c.checked)S.cl[c.dataset.k]=1;else delete S.cl[c.dataset.k];save()})}
function vq(l){
 return sh(l.w).map(([e,f],k)=>{
  const o=sh(l.w.filter(x=>x[0]!=e)).slice(0,3);
  return k%2?{k:'w',q:'معنی «'+f+'» چیست؟',o:[e,...o.map(x=>x[0])],a:e,ol:1,f:ok=>srs(e,f,ok)}:{k:'w',q:e,l:1,o:[f,...o.map(x=>x[1])],a:f,f:ok=>srs(e,f,ok)}});
}
function sq(l){return sh(l.s).map(([e,f])=>({k:'s',q:f,o:[e,...sh(l.s.filter(x=>x[0]!=e)).slice(0,3).map(x=>x[0])],a:e,ol:1}))}
function cq(l){return l.d.map(d=>({k:'c',q:d[0],l:1,c:1,o:d.slice(1),a:d[1],ol:1}))}

function quiz(qs,box,onEnd){
 let i=0,sc=0;
 const step=()=>{
  if(i>=qs.length)return onEnd(sc,qs.length);
  const q=qs[i],o=sh(q.o);
  box.innerHTML=`<div class="prog"><i style="width:${i/qs.length*100}%"></i></div><p class="cnt">${fa(i+1)} از ${fa(qs.length)}</p><div class="q ${q.c?'bub':''}" dir="${q.l?'ltr':'rtl'}">${q.q}</div>`+o.map((x,k)=>`<button class="opt" data-k="${k}" dir="${q.ol?'ltr':'rtl'}">${x}</button>`).join('')+'<div id="fb"></div>';
  const bs=[...box.querySelectorAll('.opt')];
  bs.forEach(b=>b.onclick=()=>{
   const ok=o[b.dataset.k]==q.a;if(ok)sc++;track(q.k,ok);if(q.f)q.f(ok);
   bs.forEach(x=>{x.disabled=true;if(o[x.dataset.k]==q.a)x.classList.add('ok')});
   if(!ok)b.classList.add('no');
   document.getElementById('fb').innerHTML=`<p class="fb ${ok?'good':'badc'}">${ok?'درسته! 👏':'نادرست. جواب درست با رنگ سبز مشخص شد.'}</p><button class="btn" id="nx">${i+1<qs.length?'بعدی':'نتیجه'}</button>`;
   document.getElementById('nx').focus();
   document.getElementById('nx').onclick=()=>{i++;step()};
  });
 };step();
}

function end(box,s,n,again,label,extra){
 const p=Math.round(s/n*100);
 box.innerHTML=`<div class="res"><div class="n ${p>=70?'good':'badc'}">${fa(p)}٪</div><p>${fa(s)} پاسخ درست از ${fa(n)}</p>${extra||''}<button class="btn" id="ag">${label}</button></div>`;
 document.getElementById('ag').onclick=again;return p;
}

function intro(i,box){
 box.innerHTML=`<div class="res"><h2>آزمون نهایی ${L[i].c}</h2><p class="mut">۲۴ سؤال شامل کلمه، جمله و مکالمه. نمره قبولی ۷۰٪ است.</p>${S.best[i]?`<p>بهترین نمره تو: ${fa(S.best[i])}٪</p>`:''}<button class="btn" id="go">شروع آزمون</button></div>`;
 document.getElementById('go').onclick=()=>{
  const l=L[i],qs=sh([...vq(l).slice(0,12),...sq(l).slice(0,6),...cq(l)]);
  quiz(qs,box,(s,n)=>{
   const p=Math.round(s/n*100),pass=p>=70;
   if(p>(S.best[i]||0)){S.best[i]=p;save()}
   const last=i==L.length-1;
   const msg=pass?`<p class="good"><b>قبول شدی! ${last?'دوره کامل شد 🎓':'مرحله بعد باز شد.'}</b></p>`:'<p class="badc"><b>این بار قبول نشدی. کلمه‌ها را مرور کن و دوباره امتحان بده.</b></p>';
   end(box,s,n,()=>pass?(last?home():level(i+1,'w')):level(i,'w'),pass?(last?'بازگشت به صفحه اصلی':'رفتن به مرحله بعد'):'مرور کلمه‌ها',msg);
  });
 };
}

function build(l,box){
 let i=0;const n=l.s.length;
 const step=()=>{
  if(i>=n){box.innerHTML='<div class="res"><div class="n good">🎉</div><p>همه جمله‌ها را ساختی.</p><button class="btn" id="ag">دوباره</button></div>';document.getElementById('ag').onclick=()=>{i=0;step()};return}
  const [en,f]=l.s[i];let bank=sh(en.split(' ').map((w,k)=>({w,k}))),ans=[],done=false;
  const draw=()=>{
   box.innerHTML=`<p class="cnt">این جمله را به انگلیسی بساز (${fa(i+1)} از ${fa(n)})</p><div class="q">${f}</div>
   <div class="ans" dir="ltr">${ans.map(x=>`<button class="chip" data-a="${x.k}">${x.w}</button>`).join('')}</div>
   <div class="bank" dir="ltr">${bank.map(x=>`<button class="chip" data-b="${x.k}">${x.w}</button>`).join('')}</div><div id="fb"></div>
   <button class="btn" id="ck">${done?(i+1<n?'جمله بعدی':'پایان'):'بررسی'}</button>`;
   box.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{if(done)return;const x=bank.find(y=>y.k==b.dataset.b);bank=bank.filter(y=>y!=x);ans.push(x);draw()});
   box.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{if(done)return;const x=ans.find(y=>y.k==b.dataset.a);ans=ans.filter(y=>y!=x);bank.push(x);draw()});
   document.getElementById('ck').onclick=()=>{
    if(done){i++;step();return}
    const ok=ans.map(x=>x.w).join(' ')==en;
    if(ok){track('s',true);done=true;draw();document.getElementById('fb').innerHTML='<p class="fb good">عالی! جمله درست است.</p>';say(en)}
    else document.getElementById('fb').innerHTML=`<p class="fb badc">هنوز درست نیست. ترتیب را عوض کن.</p>`;
   };
  };draw();
 };step();
}
function placement(){
 app.innerHTML='<button class="back" onclick="home()">‹ بازگشت</button><p class="mut">۱۴ سؤال از آسان تا سخت. اگر جواب را نمی‌دانی، حدس بزن؛ نتیجه فقط یک پیشنهاد است.</p><div id="box" class="card"></div>';
 const box=document.getElementById('box'),hit={};
 const qs=P.map(p=>({k:'p',q:p[1],l:1,o:p.slice(2),a:p[2],ol:1,f:ok=>{if(ok)hit[p[0]]=(hit[p[0]]||0)+1}}));
 quiz(qs,box,()=>{let st=0;while(st<L.length&&(hit[st]||0)>=1)st++;st=Math.min(st,L.length-1);S.start=st;S.placed=1;save();
  box.innerHTML=`<div class="res"><h2>پیشنهاد ما: شروع از ${L[st].c}</h2><p class="mut">در صفحه اصلی می‌توانی سطح شروع را تغییر بدهی.</p><button class="btn" id="go">شروع یادگیری</button></div>`;
  document.getElementById('go').onclick=home});
}
const BG=[['اولین قدم',()=>S.xp>0],['۱۰۰ امتیاز',()=>S.xp>=100],['۵۰۰ امتیاز',()=>S.xp>=500],['سه روز پشت‌سرهم',()=>streak()>=3],['هفت روز پشت‌سرهم',()=>streak()>=7],['۵ درس تمام‌شده',()=>Object.keys(S.lc||{}).length>=5],['قبولی در یک سطح',()=>Object.values(S.best).some(v=>v>=70)],['نمره ۱۰۰٪',()=>Object.values(S.best).some(v=>v==100)],['فارغ‌التحصیل C2',()=>(S.best[6]||0)>=70]];
function progress(){
 const done=L.filter((_,i)=>(S.best[i]||0)>=70).length;
 const pc=k=>S.st[k][1]?Math.round(S.st[k][0]/S.st[k][1]*100):null;
 const nm={w:'کلمه‌ها',s:'جمله‌ها',c:'مکالمه'};
 const rows=Object.keys(nm).map(k=>{const p=pc(k);return `<div class="w"><span class="fa" style="color:var(--ink)">${nm[k]}</span><b>${p===null?'—':fa(p)+'٪'}</b></div>`}).join('');
 const weak=Object.keys(nm).filter(k=>S.st[k][1]>=5&&pc(k)<70).map(k=>nm[k]);
 const certs=L.map((l,i)=>(S.best[i]||0)>=70?`<button class="btn alt" data-c="${i}">گواهی ${l.c}</button>`:'').join(' ');
 app.innerHTML=`<button class="back" onclick="home()">‹ بازگشت</button><h2>پیشرفت من</h2>
 <div class="card" style="margin:10px 0"><p>امتیاز: <b>${fa(S.xp)}</b></p><p>روز متوالی: <b>${fa(streak())}</b></p><p>مرحله‌های تمام‌شده: <b>${fa(done)} از ${fa(L.length)}</b></p></div>
 <div class="card"><p class="mut">درصد پاسخ درست</p>${rows}</div>
 ${weak.length?`<p class="badc"><b>نقطه ضعف: ${weak.join('، ')}. قبل از ادامه، همین بخش را در آزمونک تمرین کن.</b></p>`:''}
 <div class="card" style="margin-top:12px"><p class="mut">نشان‌ها</p><p>${BG.map(b=>b[1]()?'🏅 '+b[0]:'<span class="mut">🔒 '+b[0]+'</span>').join('<br>')}</p></div>
 <div class="card" style="margin-top:12px"><p class="mut">فعالیت این هفته</p><div style="display:flex;gap:6px;text-align:center">${[6,5,4,3,2,1,0].map(k=>{const d=new Date();d.setDate(d.getDate()-k);const a=S.days.includes(d.toDateString());return `<div style="flex:1"><div style="height:36px;border-radius:8px;background:${a?'var(--pri)':'var(--line)'}"></div><span class="mut" style="font-size:.75rem">${d.toLocaleDateString('fa-IR',{weekday:'short'})}</span></div>`}).join('')}</div></div>
 <div class="card" style="margin-top:12px"><p class="mut">بهترین نمره آزمون هر سطح</p>${L.map((l,i)=>`<div class="w"><span class="en" dir="ltr">${l.c}</span><span class="fa">${l.n}</span><b>${S.best[i]?fa(S.best[i])+'٪':'—'}</b></div>`).join('')}</div>
 <div style="margin-top:12px">${certs||'<p class="mut">با قبول شدن در آزمون نهایی هر مرحله، گواهی همان مرحله اینجا ظاهر می‌شود.</p>'}</div>`;
 app.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>cert(+b.dataset.c));
}
function cert(i){
 app.innerHTML=`<button class="back" onclick="progress()">‹ بازگشت</button><div class="card" style="text-align:center;padding:40px 16px;margin:10px 0;border:3px double var(--pri)"><p class="mut">گواهی پایان دوره</p><h1 id="nm">${S.name||'نام شما'}</h1><p>دوره انگلیسی سطح <b dir="ltr">${L[i].c}</b> را با نمره ${fa(S.best[i])}٪ به پایان رساند.</p><p class="mut">این گواهی مخصوص همین سایت است و گواهی رسمی CEFR نیست.</p></div>
 <p><label class="mut">نام روی گواهی: <input id="in" value="${S.name||''}" style="font:inherit"></label> <button class="btn" onclick="window.print()">چاپ</button></p>`;
 document.getElementById('in').oninput=e=>{S.name=e.target.value;save();document.getElementById('nm').textContent=S.name||'نام شما'};
}
function recHtml(){const nx=L.findIndex((l,i)=>(S.best[i]||0)<70&&open(i)),nm={w:'کلمه‌ها',s:'جمله‌سازی',c:'مکالمه'};
 const ws=Object.entries(S.st).filter(([k,v])=>v[1]>=5&&v[0]/v[1]<.7).sort((a,b)=>a[1][0]/a[1][1]-b[1][0]/b[1][1])[0];
 return `<div class="card" style="margin:10px 0"><p>${nx>=0?`درس پیشنهادی: <b dir="ltr">${L[nx].c}</b> <button class="btn" style="margin:0 8px;padding:4px 14px" onclick="level(${nx},'a')">ادامه</button>`:'همه سطح‌ها را تمام کرده‌ای.'}</p>${ws?`<p class="badc">در بخش «${nm[ws[0]]||ws[0]}» ضعیف‌تری. قبل از رفتن جلوتر، همان بخش را بیشتر تمرین کن.</p>`:''}</div>`}
try{if(S.theme)document.documentElement.setAttribute('data-theme',S.theme)}catch(e){}
(()=>{const nv=document.getElementById('nv'),it=[['🏠','خانه',()=>home()],['📖','واژگان',()=>vocabs()],['✍️','گرامر',()=>grams()],['🔁','مرور',()=>review()],['🎓','معلم',()=>teacher()],['📈','پیشرفت',()=>progress()],['👤','پروفایل',()=>profile()]];
 nv.innerHTML=it.map((x,k)=>`<button data-n="${k}"><span>${x[0]}</span>${x[1]}</button>`).join('');
 nv.querySelectorAll('button').forEach(b=>b.onclick=()=>{window.scrollTo(0,0);it[b.dataset.n][2]()})})();
home();
