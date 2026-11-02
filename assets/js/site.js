(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,IO='IntersectionObserver' in window;
const rv=[...document.querySelectorAll('.rv')];
if(reduce||!IO)rv.forEach(e=>e.classList.add('in'));
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});rv.forEach(e=>io.observe(e));}
// workflow
const flow=document.querySelector('.flow');
if(flow){const steps=[...flow.querySelectorAll('.fstep')],nodes=[...flow.querySelectorAll('.node')],peeks=[...flow.querySelectorAll('.peek')],prog=flow.querySelector('.prog'),N=steps.length;
  const set=i=>{steps.forEach((s,j)=>s.classList.toggle('on',j===i));nodes.forEach((n,j)=>{n.classList.toggle('on',j===i);n.classList.toggle('done',j<i);});peeks.forEach((p,j)=>p.hidden=j!==i);prog.style.width=(75*i/(N-1))+'%';};
  set(0);
  if(IO){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)set(steps.indexOf(e.target));}),{rootMargin:'-45% 0px -45% 0px'});steps.forEach(s=>so.observe(s));}
  nodes.forEach((n,i)=>n.addEventListener('click',()=>{set(i);const r=steps[i].getBoundingClientRect();window.scrollTo({top:window.scrollY+r.top-innerHeight*.4,behavior:reduce?'auto':'smooth'});}));}
// publish table: a row opens its detail
const pt=document.querySelector('.pt');
if(pt){const rows=[...pt.querySelectorAll('.row')],dets=[...pt.querySelectorAll('.pdet')];
  const open=k=>{rows.forEach((r,j)=>r.classList.toggle('on',j===k));dets.forEach((d,j)=>d.hidden=j!==k);pt.classList.toggle('open',k>=0);};
  rows.forEach((r,k)=>r.addEventListener('click',()=>open(r.classList.contains('on')?-1:k)));open(-1);}
// manage excerpt
const mg=document.querySelector('.mg');
if(mg){const items=[...mg.querySelectorAll('.it')],t=[];let played=false;
  const reset=()=>{t.forEach(clearTimeout);t.length=0;mg.classList.remove('open','assigned');items.forEach(x=>x.classList.remove('on'));};
  const play=()=>{reset();const d=reduce?0:1;t.push(setTimeout(()=>{items[0].classList.add('on');mg.classList.add('open');},900*d));t.push(setTimeout(()=>mg.classList.add('assigned'),3000*d));};
  mg.querySelector('[data-assign]').addEventListener('click',()=>{if(mg.classList.contains('open'))mg.classList.add('assigned');});
  items.forEach(x=>x.addEventListener('click',()=>{t.forEach(clearTimeout);items.forEach(y=>y.classList.remove('on'));x.classList.add('on');mg.classList.add('open');mg.classList.remove('assigned');}));
  document.querySelector('[data-replay]').addEventListener('click',play);
  if(IO){const mo=new IntersectionObserver(es=>{if(es[0].isIntersecting&&!played){played=true;play();}},{threshold:.45});mo.observe(mg);}else play();}
// watch the demo
const modal=document.getElementById('watch');
if(modal){document.querySelectorAll('[data-watch]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();modal.hidden=false;document.body.style.overflow='hidden';}));
  const close=()=>{modal.hidden=true;document.body.style.overflow='';};
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-close]'))close();});
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)close();});}
})();
