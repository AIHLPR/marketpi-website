(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,IO='IntersectionObserver' in window;
const rv=[...document.querySelectorAll('.rv')];
if(reduce||!IO)rv.forEach(e=>e.classList.add('in'));
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -6% 0px'});rv.forEach(e=>io.observe(e));}
})();
