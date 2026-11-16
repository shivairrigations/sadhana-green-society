(function(){
var header=document.querySelector('header'),btn=document.querySelector('.menubtn'),nav=document.getElementById('nav');
function setMenu(o){nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',String(o));btn.setAttribute('aria-label',o?'Close menu':'Open menu')}
btn.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
var dds=[].slice.call(document.querySelectorAll('.dd'));
function closeDD(except){dds.forEach(function(d){if(d!==except){d.classList.remove('open');d.querySelector('.ddbtn').setAttribute('aria-expanded','false')}})}
dds.forEach(function(d){var b=d.querySelector('.ddbtn');b.addEventListener('click',function(e){e.stopPropagation();var o=!d.classList.contains('open');closeDD(d);d.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o))})});
document.addEventListener('click',function(e){if(!e.target.closest('.dd'))closeDD()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeDD();setMenu(false)}});
function onScroll(){header.classList.toggle('scrolled',window.scrollY>8)}onScroll();window.addEventListener('scroll',onScroll,{passive:true});
var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
/* counters + bars */
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function fmt(n){return n.toLocaleString('en-IN')}
function run(el){var end=+el.dataset.count;if(reduce){el.textContent=fmt(end);return}var t0=null,dur=1600;function step(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(end*e));if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
var cs=[].slice.call(document.querySelectorAll('[data-count]')),bs=[].slice.call(document.querySelectorAll('.meter i'));
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);if(el.dataset.count)run(el);else el.style.width=el.dataset.pct+'%'})},{threshold:.35});cs.concat(bs).forEach(function(el){io.observe(el)})}
else{cs.forEach(function(el){el.textContent=fmt(+el.dataset.count)});bs.forEach(function(el){el.style.width=el.dataset.pct+'%'})}
/* contact form */
var form=document.getElementById('contact-form'),err=document.getElementById('err');
if(form)form.addEventListener('submit',function(e){e.preventDefault();
var n=form.name,m=form.email,t=form.message,bad=[];
[n,m,t].forEach(function(f){f.classList.remove('bad')});
if(!n.value.trim())bad.push(n);
if(!/^\S+@\S+\.\S+$/.test(m.value.trim()))bad.push(m);
if(!t.value.trim())bad.push(t);
if(bad.length){bad.forEach(function(f){f.classList.add('bad')});err.textContent='Please fill in your name, a valid email address and a message.';err.hidden=false;bad[0].focus();return}
err.hidden=true;var s=form.subject.value;
var body='Name: '+n.value.trim()+'\nEmail: '+m.value.trim()+'\nEnquiry type: '+s+'\n\nMessage:\n'+t.value.trim();
window.location.href='mailto:info@sadanagreensociety.com,raghubhaskar4@gmail.com?subject='+encodeURIComponent('Website enquiry: '+s)+'&body='+encodeURIComponent(body)});
})();
/* scroll reveal */
(function(){
var els=[].slice.call(document.querySelectorAll('.tile,.sp,.kpi,.panel,.plist li,.plantrow,.vals>div,.callout,.trow'));
if(!('IntersectionObserver' in window)||(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches))return;
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
els.forEach(function(el,i){el.classList.add('rv');el.style.transitionDelay=(i%3)*80+'ms';io.observe(el)});
})();


/* Homepage real-photo carousel */
(function(){
 var hero=document.querySelector('.photo-hero');
 if(!hero)return;
 var slides=[].slice.call(hero.querySelectorAll('.hero-slide'));
 var dots=[].slice.call(hero.querySelectorAll('.hero-progress i'));
 if(slides.length<2)return;
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 var current=0;
 function show(n){
   slides[current].classList.remove('active'); if(dots[current])dots[current].classList.remove('active');
   current=n%slides.length;
   slides[current].classList.add('active'); if(dots[current])dots[current].classList.add('active');
 }
 if(dots[0])dots[0].classList.add('active');
 if(!reduce)window.setInterval(function(){show(current+1)},8000);
})();

/* Background photo rotation for homepage and new plantation application */
(function(){
 var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 function rotate(selector, interval){
  var slides=[].slice.call(document.querySelectorAll(selector)); if(slides.length<2||reduce)return;
  var current=slides.findIndex(function(el){return el.classList.contains('active')});if(current<0)current=0;
  window.setInterval(function(){slides[current].classList.remove('active');current=(current+1)%slides.length;slides[current].classList.add('active')},interval);
 }
 rotate('.application-hero .application-slide',6500);
})();
