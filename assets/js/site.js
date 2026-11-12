(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,IO='IntersectionObserver' in window;
window.__site=true;

// Reveal on scroll. Content is only hidden while <html> has .js, set in the page head.
const rv=[...document.querySelectorAll('.rv')];
if(reduce||!IO)rv.forEach(e=>e.classList.add('in'));
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});rv.forEach(e=>io.observe(e));}

// Mobile menu: Escape closes it and returns focus to the toggle.
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape')return;
  const m=document.querySelector('.nav .menu[open]');
  if(m){m.open=false;m.querySelector('summary').focus();}
});

// Lightbox: a modal <dialog>. Focus moves into it, Escape closes it, focus returns to the image.
const box=document.getElementById('lbx');
if(box&&box.showModal){
  const im=box.querySelector('img');let from=null;
  document.querySelectorAll('.zoom').forEach(b=>b.addEventListener('click',()=>{
    const s=b.querySelector('img');im.src=s.currentSrc||s.src;im.alt=s.alt;from=b;
    box.showModal();document.body.style.overflow='hidden';
  }));
  const done=()=>{document.body.style.overflow='';if(from){const f=from;from=null;f.focus();}};
  const shut=()=>{if(box.open)box.close();done();};
  box.addEventListener('click',shut);
  box.addEventListener('cancel',e=>{e.preventDefault();shut();});
  box.addEventListener('close',done);
}

// Hero video: plays while on screen unless the visitor paused it or prefers reduced motion.
const hv=document.querySelector('.hero-vid'),ctl=document.querySelector('.vctl');
if(hv&&ctl){
  let paused=reduce,visible=false;
  const sync=()=>{ctl.classList.toggle('paused',paused);ctl.setAttribute('aria-label',paused?'Play animation':'Pause animation');};
  const go=()=>{if(!paused&&visible){const p=hv.play();if(p&&p.catch)p.catch(()=>{});}};
  ctl.addEventListener('click',()=>{paused=!paused;sync();paused?hv.pause():go();});
  if(IO)new IntersectionObserver(es=>es.forEach(e=>{visible=e.isIntersecting;visible?go():hv.pause();}),{threshold:.2}).observe(hv);
  else{visible=true;go();}
  // Some browsers block autoplay until the first interaction; retry then, but never against a pause.
  ['pointerdown','keydown','touchstart'].forEach(t=>addEventListener(t,go,{passive:true,once:true}));
  sync();
}
})();
