// Cursor
const cur=document.getElementById('cur'),cring=document.getElementById('cring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*.09;ry+=(my-ry)*.09;cring.style.left=rx+'px';cring.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.pcard,.rcard,.tcard,.kyd-step,.wp,.tl-item,.fseg,.breed-card,.prom-card,.diff-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cring.style.width='56px';cring.style.height='56px';cring.style.borderColor='rgba(92,61,30,.6)'});
  el.addEventListener('mouseleave',()=>{cring.style.width='36px';cring.style.height='36px';cring.style.borderColor='rgba(92,61,30,.35)'});
});

// Nav
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('on',scrollY>60));

// Scroll reveal
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}}),{threshold:.09});
document.querySelectorAll('.sr').forEach(el=>obs.observe(el));

// Product filter
function filterProd(type,btn){
  document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.pcard[data-type]').forEach(c=>{
    if(type==='all'||c.dataset.type===type||c.dataset.type==='both'){
      c.style.display='';
    } else {
      c.style.display='none';
    }
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}});
});

// Product image lightbox (click to expand)
(function(){
  const lb=document.getElementById('lightbox'),lbImg=lb.querySelector('img'),lbCap=lb.querySelector('.lb-cap'),lbClose=lb.querySelector('.lb-close');
  function openLB(src,cap){lbImg.src=src;lbImg.alt=cap||'';lbCap.textContent=cap||'';lb.classList.add('open');document.body.style.overflow='hidden'}
  function closeLB(){lb.classList.remove('open');document.body.style.overflow='';setTimeout(()=>{lbImg.src=''},300)}
  document.querySelectorAll('.pcard-img.has-photo').forEach(box=>{
    const img=box.querySelector('img');if(!img)return;
    box.addEventListener('click',()=>{
      const card=box.closest('.pcard'),name=card?card.querySelector('.pcard-name'):null;
      openLB(img.currentSrc||img.src, name?name.textContent.trim():img.alt);
    });
  });
  lb.addEventListener('click',e=>{if(e.target===lb||e.target===lbClose)closeLB()});
  lbClose.addEventListener('click',closeLB);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&lb.classList.contains('open'))closeLB()});
})();

// Mobile menu
(function(){
  const burger=document.getElementById('navBurger'),menu=document.getElementById('mobileMenu');
  if(!burger||!menu)return;
  function setMenu(open){
    menu.classList.toggle('open',open);
    burger.classList.toggle('active',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
    document.body.style.overflow=open?'hidden':'';
  }
  burger.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open'))setMenu(false)});
  window.addEventListener('resize',()=>{if(window.innerWidth>900&&menu.classList.contains('open'))setMenu(false)});
})();
