// Preloader — typewriter → logo crossfade
(function(){
  var pl=document.getElementById('preloader');if(!pl)return;
  var textEl=document.getElementById('pl-text');
  var wrap=document.getElementById('pl-text-wrap');
  var logo=document.getElementById('pl-logo');
  var navImg=document.querySelector('.logo img');
  if(navImg&&logo)logo.src=navImg.src;
  var str='Pure & Healthy',i=0;
  textEl.textContent='';
  var t=setInterval(function(){
    if(i<str.length){textEl.textContent+=str[i];i++}
    else{clearInterval(t);setTimeout(function(){
      wrap.classList.add('out');logo.classList.add('in');
      setTimeout(function(){
        logo.classList.add('zoom');
        setTimeout(function(){
          pl.classList.add('done');
          pl.addEventListener('transitionend',function(){pl.remove()});
        },1000);
      },600);
    },400)}
  },80);
})();



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

// Inquiry Button
(function(){
  const btn = document.createElement("a");
  btn.href = "https://forms.gle/J4tyr92naKPhqfNT8";
  btn.target = "_blank";
  btn.textContent = " Inquiry / Message";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    background: "#C19A5B",
    color: "#1C1812",
    padding: "0.9rem 1.4rem",
    borderRadius: "30px",
    textDecoration: "none",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "600",
    fontSize: "0.95rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: "1000",
    transition: "transform 0.3s",
    letterSpacing: "0.05em"
  });
  btn.onmouseover = function() {
    this.style.transform = "translateY(-3px)";
  };
  btn.onmouseout = function() {
    this.style.transform = "translateY(0)";
  };
  // Responsive sizing
  if(window.innerWidth < 600) {
    btn.style.bottom = "15px";
    btn.style.left = "15px";
    btn.style.padding = "0.7rem 1.1rem";
    btn.style.fontSize = "0.85rem";
  }
  document.body.appendChild(btn);
})();
