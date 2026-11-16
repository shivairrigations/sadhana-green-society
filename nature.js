/* Sadana Green Society - natural hero landscape.
   Hazy hills, patchwork farm fields, shaded trees, swaying grass.
   Light follows the visitor's local time. Test: index.html?hour=17 */
(function(){
var cv=document.getElementById('nature');if(!cv||!cv.getContext)return;
var ctx=cv.getContext('2d'),hero=cv.parentElement,W=0,H=0,D=1,PI=Math.PI,sin=Math.sin,cos=Math.cos;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var qh=new URLSearchParams(location.search).get('hour');
function hourNow(){if(qh!==null&&qh!==''&&!isNaN(+qh))return +qh;var d=new Date(),t=d.getHours()+d.getMinutes()/60;return Math.min(16.5,Math.max(8,t))}
function lerp(a,b,t){return a+(b-a)*t}
function mix(a,b,t){return[lerp(a[0],b[0],t),lerp(a[1],b[1],t),lerp(a[2],b[2],t)]}
function rgb(c,a){return'rgba('+(c[0]|0)+','+(c[1]|0)+','+(c[2]|0)+','+(a==null?1:a)+')'}
function hex(h){return[parseInt(h.substr(1,2),16),parseInt(h.substr(3,2),16),parseInt(h.substr(5,2),16)]}
function rng(s){return function(){s=s*16807%2147483647;return(s-1)/2147483646}}
function cl(v){return Math.max(0,Math.min(1,v))}
var KEYS=[[0,'#06121f','#10283e'],[5,'#1b2c4d','#d9926a'],[6.5,'#6f9bd0','#f8cf96'],[9,'#5aa3dc','#c4e5ef'],[15,'#58a2de','#d3ecf3'],[17.5,'#5a8cc8','#f7d29a'],[19,'#2c3168','#ea8a60'],[20.5,'#0a1830','#1a3552'],[24,'#06121f','#10283e']].map(function(k){return[k[0],hex(k[1]),hex(k[2])]});
function sky(h){for(var i=0;i<KEYS.length-1;i++){var a=KEYS[i],b=KEYS[i+1];if(h>=a[0]&&h<=b[0]){var t=(h-a[0])/(b[0]-a[0]);return[mix(a[1],b[1],t),mix(a[2],b[2],t)]}}return[KEYS[0][1],KEYS[0][2]]}
function nightF(h){if(h<5)return 1;if(h<6.5)return 1-(h-5)/1.5;if(h<19)return 0;if(h<20.5)return(h-19)/1.5;return 1}
var N=0,GR=[255,255,255],HORD=[208,230,238];
function grade(h){var gold=Math.max(0,1-Math.abs(h-7.2)/1.7,1-Math.abs(h-17.8)/1.7);return mix(mix([255,255,255],[255,208,156],gold*.6),[74,96,146],nightF(h)*.86)}
function gt(c){return[c[0]*GR[0]/255,c[1]*GR[1]/255,c[2]*GR[2]/255]}
function mk(w,h){var c=document.createElement('canvas');c.width=Math.ceil(w*D);c.height=Math.ceil(h*D);var x=c.getContext('2d');x.setTransform(D,0,0,D,0,0);return[c,x]}
function tinted(src,w,h){var a=mk(w,h),x=a[1];x.drawImage(src,0,0,w,h);x.globalCompositeOperation='multiply';x.fillStyle=rgb(GR);x.fillRect(0,0,w,h);x.globalCompositeOperation='destination-in';x.drawImage(src,0,0,w,h);return a[0]}
/* terrain */
var RB=[.50,.565,.625],RA=[.08,.055,.035],RF=[[.0021,.0047,.011,1.3],[.0028,.0063,.014,3.1],[.0035,.0081,.017,5.2]];
function ridge(x,l){var f=RF[l];return H*(RB[l]-RA[l]*(sin(x*f[0]+f[3])+.5*sin(x*f[1]+f[3]*2)+.25*sin(x*f[2]+f[3]*3))/1.75)}
var VX=0,VY=0,K=1,Y0=0,Y1=0;
function rowY(v){return Y0+(Y1-Y0)*Math.pow(v,1.7)}
function fx(u,y){return VX+u*(y-VY)*K}
var PAL=[[112,170,78],[150,186,88],[202,182,94],[160,122,80],[90,152,78],[132,176,184],[122,176,92]];
var PX=0,PT=0,AN=[],landDay,land,spr,trees,blades,clouds,stars,flocks,bfs,parts,flies,lastG=-99;
function buildLand(){var a=mk(W,H),x=a[1],r=rng(7),l,i,j,k;landDay=a[0];
var hz=[.62,.4,.2],col=[[142,170,170],[96,142,112],[66,118,78]];
for(l=0;l<3;l++){x.fillStyle=rgb(mix(col[l],HORD,hz[l]*.5));x.beginPath();x.moveTo(0,H);for(i=0;i<=W+6;i+=6)x.lineTo(i,ridge(i,l));x.lineTo(W,H);x.fill()}
var n=10,u,ua,ub,ya,yb,c,v,cnt,xa,xb,xc,xd;
for(k=0;k<n;k++){v=k/n;ya=rowY(v);yb=rowY((k+1)/n+.004);u=-3.4;
while(u<3.4){ua=u;ub=u+.5+r()*.9;u=ub;c=PAL[(r()*PAL.length)|0];
var hz2=mix(c,HORD,.42*(1-v)),sh=mix(hz2,[30,60,30],.06);
x.fillStyle=rgb(sh);x.beginPath();x.moveTo(fx(ua,ya),ya);x.lineTo(fx(ub,ya),ya);x.lineTo(fx(ub,yb),yb);x.lineTo(fx(ua,yb),yb);x.fill();
if(c!==PAL[5]){x.strokeStyle='rgba(20,52,24,'+(.1+.12*v)+')';x.lineWidth=.6+v*1.1;cnt=Math.max(2,Math.round((fx(ub,ya)-fx(ua,ya))/(5+v*7)));x.beginPath();for(j=1;j<cnt;j++){var q=ua+(ub-ua)*j/cnt;x.moveTo(fx(q,ya),ya);x.lineTo(fx(q,yb),yb)}x.stroke()}
else{var g=x.createLinearGradient(0,ya,0,yb);g.addColorStop(0,'rgba(255,255,255,.28)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fill()}
x.strokeStyle='rgba(236,226,190,'+(.14+.2*v)+')';x.lineWidth=.8+v*1.4;x.beginPath();x.moveTo(fx(ua,ya),ya);x.lineTo(fx(ua,yb),yb);x.stroke()}}
var g2=x.createLinearGradient(0,Y0-H*.02,0,Y0+H*.1);g2.addColorStop(0,rgb(HORD,.55));g2.addColorStop(1,rgb(HORD,0));x.fillStyle=g2;x.fillRect(0,Y0-H*.02,W,H*.12)}
function tree(s,haze,sd,v){var w=s*1.5,h=s*1.6,a=mk(w,h),x=a[1],r=rng(sd),cx=w/2,cy=h-s*.98,rx=s*.66,ry=s*.46,i,k,pal=v%4;
function H_(c){return mix(c,HORD,haze)}
if(pal===3){/* coconut / palm */
var tx=cx+s*.12,ty=h-s*1.18,bark=H_([112,88,62]),bd=H_([70,54,38]);
var tg=x.createLinearGradient(cx-s*.05,0,cx+s*.08,0);tg.addColorStop(0,rgb(H_([150,122,88])));tg.addColorStop(1,rgb(bd));
x.strokeStyle=tg;x.lineCap='round';x.lineWidth=Math.max(2,s*.075);x.beginPath();x.moveTo(cx,h);x.quadraticCurveTo(cx+s*.02,h-s*.65,tx,ty);x.stroke();
x.strokeStyle=rgb(bd,.55);x.lineWidth=Math.max(1,s*.012);for(i=1;i<14;i++){var q=i/14,px=cx+(tx-cx)*q*q+s*.02*q*(1-q)*2,py=h+(ty-h)*q;x.beginPath();x.moveTo(px-s*.04,py);x.lineTo(px+s*.04,py-s*.012);x.stroke()}
var fr=[[-2.9,.55],[-2.5,.62],[-2.0,.5],[-1.55,.4],[-1.1,.5],[-.65,.62],[-.2,.55],[.15,.4],[-3.2,.38]];
fr.forEach(function(f,fi){var ang=f[0],len=s*f[1],ex=tx+cos(ang)*len,ey=ty+sin(ang)*len*.7+len*.38,mx=tx+cos(ang)*len*.55,my=ty+sin(ang)*len*.7-len*.12;
x.strokeStyle=rgb(H_([58,98,44]));x.lineWidth=Math.max(1,s*.014);x.beginPath();x.moveTo(tx,ty);x.quadraticCurveTo(mx,my,ex,ey);x.stroke();
for(var j=2;j<=16;j++){var u=j/17,bx=(1-u)*(1-u)*tx+2*(1-u)*u*mx+u*u*ex,by=(1-u)*(1-u)*ty+2*(1-u)*u*my+u*u*ey,ll=len*.2*(1-u*.55);
x.strokeStyle=rgb(H_(r()<.5?[74,126,52]:[100,150,64]),.95);x.lineWidth=Math.max(.8,s*.009);x.beginPath();x.moveTo(bx,by);x.lineTo(bx+ll*.35,by+ll);x.moveTo(bx,by);x.lineTo(bx-ll*.35,by+ll*.95);x.stroke()}});
x.fillStyle=rgb(H_([90,70,40]));[[-.03,.05],[.03,.07],[0,.03]].forEach(function(p){x.beginPath();x.arc(tx+p[0]*s,ty+p[1]*s,s*.025,0,2*PI);x.fill()});
return{c:a[0],w:w,h:h}}
var P=[[[40,92,48],[104,158,70],[22,58,32]],[[44,100,66],[96,156,96],[24,64,42]],[[62,104,42],[134,166,70],[34,66,28]]][pal],base=H_(P[0]),lt=H_(P[1]),dk=H_(P[2]);
/* trunk + branches */
var tg2=x.createLinearGradient(cx-s*.07,0,cx+s*.07,0);tg2.addColorStop(0,rgb(H_([120,92,66])));tg2.addColorStop(.6,rgb(H_([78,58,42])));tg2.addColorStop(1,rgb(H_([46,34,26])));
x.fillStyle=tg2;x.beginPath();x.moveTo(cx-s*.06,h);x.quadraticCurveTo(cx-s*.03,h-s*.45,cx-s*.025,cy+ry*.4);x.lineTo(cx+s*.025,cy+ry*.4);x.quadraticCurveTo(cx+s*.035,h-s*.45,cx+s*.065,h);x.fill();
x.strokeStyle=rgb(H_([70,52,38]));x.lineCap='round';x.lineWidth=Math.max(1,s*.03);x.beginPath();x.moveTo(cx,h-s*.5);x.lineTo(cx-s*.32,cy+ry*.05);x.moveTo(cx,h-s*.56);x.lineTo(cx+s*.34,cy);x.moveTo(cx,h-s*.62);x.lineTo(cx+s*.02,cy-ry*.5);x.stroke();
/* canopy clusters with volume */
var cl=[];for(k=0;k<8;k++){var an=r()*2*PI,rd=Math.sqrt(r())*.78;cl.push([cx+cos(an)*rd*rx,cy+sin(an)*rd*ry*.95,s*(.2+r()*.14)])}
cl.sort(function(p,q){return q[1]-p[1]});
cl.forEach(function(c){var g=x.createRadialGradient(c[0]-c[2]*.35,c[1]-c[2]*.4,c[2]*.1,c[0],c[1],c[2]);g.addColorStop(0,rgb(lt));g.addColorStop(.55,rgb(base));g.addColorStop(1,rgb(dk));x.fillStyle=g;x.beginPath();x.arc(c[0],c[1],c[2],0,2*PI);x.fill()});
/* leaf texture */
var n=Math.round(150+s*.9);
for(i=0;i<n;i++){var c2=cl[(r()*cl.length)|0],an2=r()*2*PI,rd2=Math.sqrt(r())*c2[2]*.95,lx=c2[0]+cos(an2)*rd2,ly=c2[1]+sin(an2)*rd2,up=(c2[1]-ly)/c2[2],t=r();
x.fillStyle=rgb(t<.34?lt:t<.7?base:dk,.55+.3*r());if(up>.25&&r()<.5)x.fillStyle=rgb(mix(lt,[255,248,200],.25),.6);
x.beginPath();x.ellipse(lx,ly,s*(.014+r()*.026),s*(.01+r()*.016),r()*3,0,2*PI);x.fill()}
x.globalCompositeOperation='source-atop';
var g3=x.createLinearGradient(cx-rx,cy-ry,cx+rx*.7,cy+ry);g3.addColorStop(0,'rgba(255,240,190,.22)');g3.addColorStop(.5,'rgba(255,240,190,0)');g3.addColorStop(1,'rgba(8,26,14,.34)');x.fillStyle=g3;x.fillRect(0,0,w,h);
x.globalCompositeOperation='source-over';
return{c:a[0],w:w,h:h}}

function build(){var r=rng(11),i,k;VX=W*.5;VY=H*.40;Y0=H*.66;Y1=H*.885;K=W/(1.45*H);
buildLand();
var NOM=[64,120,300],HZ=[.5,.2,0];spr=[];for(i=0;i<3;i++){spr.push([]);for(k=0;k<4;k++)spr[i].push(0)}
trees=[];
for(i=0;i<46;i++){var x=r()*W;trees.push({c:0,v:(r()*4)|0,x:x,y:ridge(x,2)+H*.006,s:H*(.028+r()*.026),sd:r()*9})}
for(i=0;i<28;i++){var v=r()*.8,y=rowY(v),uu=-3+r()*6;trees.push({c:1,v:(r()*4)|0,x:fx(uu,y),y:y,s:H*(.05+.13*v+r()*.02),sd:r()*9})}
[[.84,.94,.32],[.96,.91,.26],[.70,.9,.19],[.60,.885,.12]].forEach(function(q){trees.push({c:2,v:(r()*4)|0,x:W*q[0],y:H*q[1],s:H*q[2],sd:r()*9})});
trees.forEach(function(t){t.nom=NOM[t.c]});trees.sort(function(a,b){return a.y-b.y});
blades=[];var nb=Math.round(W/3);for(i=0;i<nb;i++){var yy=H*(.9+r()*.1),c=(yy/H-.9)/.1;blades.push({x:r()*W,y:yy,h:H*(.03+.07*c*(.5+r())),ph:r()*6.28,sh:(r()*3)|0,fl:r()<.06?(r()<.5?0:1):-1,tx:0,ty:0})}
clouds=[];for(i=0;i<6;i++){var cs=H*(.06+r()*.07),o=[];for(k=0;k<7;k++)o.push([(k-3)*.8+(r()-.5)*.4,-r()*.28,.55+r()*.45]);clouds.push({x:r()*W,y:H*(.06+r()*.2),s:cs,v:3+r()*6,o:o})}
stars=[];for(i=0;i<90;i++)stars.push({x:r()*W,y:r()*H*.45,p:r()*9,s:r()<.2?2:1});
flocks=[];[[7,.17,24,1,.012],[4,.29,14,-1,.009],[5,.1,18,1,.016],[4,.4,36,1,.011,[64,164,70]]].forEach(function(c){var f={y:H*c[1],speed:c[2],dir:c[3],s:H*c[4],sx:r()*W,ph:r()*9,col:c[5],m:[]};for(var j=0;j<c[0];j++){var row=Math.ceil(j/2),side=j%2?1:-1;f.m.push({dx:-row*f.s*3.2*f.dir,dy:j?side*row*f.s*1.6:0,ph:r()*6})}flocks.push(f)});
var BC=[[240,140,40],[250,215,70],[245,245,235],[235,120,60]];bfs=[];for(i=0;i<5;i++)bfs.push({bx:r()*W,by:H*(.8+r()*.12),ph:r()*20,c:BC[i%4],s:H*.01+r()*.005,sp:.6+r()*.8});
parts=[];for(i=0;i<28;i++)parts.push({x:r()*W,y:H*(.25+r()*.6),sp:.4+r(),sz:.7+r()*1.1,ph:r()*9});
flies=[];for(i=0;i<22;i++)flies.push({x:r()*W,y:H*(.6+r()*.35),ph:r()*20});
AN=[];[[0,.84,.46,1,7],[1,.87,.64,-1,9],[2,.835,.4,1,12],[3,.875,.8,-1,10],[0,.86,.33,1,8],[2,.85,.9,-1,11]].forEach(function(q,ix){var yy=H*q[1],sc=H*(.07+(q[1]-.82)*.9);AN.push({k:q[0],x:W*q[2],y:yy,s:sc*(q[0]>1?.62:1),dir:q[3],sp:q[4],ph:r()*9,gait:2.6+r()*.8})});AN.sort(function(a,b){return a.y-b.y});
lastG=-99}
function regrade(h){GR=grade(h);land=tinted(landDay,W,H);var NOM=[64,120,300],HZ=[.5,.2,0];
for(var i=0;i<3;i++)for(var k=0;k<4;k++){var s=tree(NOM[i],HZ[i],31*i+k*7+3,k);spr[i][k]={c:tinted(s.c,s.w,s.h),w:s.w,h:s.h}}}
function blob(x,y,r,c,a){ctx.fillStyle=rgb(c,a);ctx.beginPath();ctx.arc(x,y,r,0,2*PI);ctx.fill()}
function bird(bx,by,s,fl,dir,col,a){var wy=-fl*s*.95;ctx.save();ctx.globalAlpha=a;ctx.fillStyle=ctx.strokeStyle=col;
ctx.beginPath();ctx.ellipse(bx,by+s*.05,s*.3,s*.1,0,0,2*PI);ctx.fill();
ctx.beginPath();ctx.arc(bx+dir*s*.3,by+s*.02,s*.075,0,2*PI);ctx.fill();
ctx.beginPath();ctx.moveTo(bx-dir*s*.28,by+s*.05);ctx.lineTo(bx-dir*s*.52,by+s*.02);ctx.lineTo(bx-dir*s*.5,by+s*.12);ctx.fill();
[-1,1].forEach(function(sd){ctx.beginPath();ctx.moveTo(bx+dir*s*.08,by);ctx.quadraticCurveTo(bx+sd*s*.5,by-s*.42-fl*s*.4,bx+sd*s*1.15,by+wy*.6+s*.1);ctx.quadraticCurveTo(bx+sd*s*.62,by+wy*.12+s*.2,bx-dir*s*.02,by+s*.1);ctx.fill()});
ctx.restore()}
function birds(t){if(N>.9)return;var dk=rgb(gt([30,40,36]));
flocks.forEach(function(f){var L=W+300,fxx=((f.sx+t*f.speed*f.dir)%L+L)%L-150,s=f.s,c=f.col?rgb(gt(f.col)):dk;
f.m.forEach(function(m){var bx=fxx+m.dx,by=f.y+sin(t*.6+f.ph)*H*.012+m.dy,fl=sin(t*(7+(m.ph|0)%3)+m.ph);bird(bx,by,s,fl,f.dir,c,1-N)})});
/* soaring kites */
[[.7,.2,.16,.07,.032,0],[.3,.26,.11,.05,.026,2.4]].forEach(function(k){var ang=t*.09+k[5],bx=W*k[0]+cos(ang)*W*k[2],by=H*k[1]+sin(ang*2)*H*k[3],dr=-Math.sin(ang)>0?1:-1;bird(bx,by,H*k[4],.12+sin(t*.5+k[5])*.1,dr,rgb(gt([62,44,34])),1-N)})}

function butter(t){if(N>.8)return;bfs.forEach(function(b){var L=W+120,x=((b.bx+t*9*b.sp)%L+L)%L-60+40*sin(t*.5+b.ph)+14*sin(t*1.7+b.ph*2),y=b.by+20*sin(t*.8+b.ph*1.3)+7*sin(t*2.3+b.ph),f=.25+.75*Math.abs(sin(t*9+b.ph)),s=b.s;
ctx.save();ctx.translate(x,y);ctx.rotate(.35*cos(t*.5+b.ph));ctx.globalAlpha=1-N;ctx.fillStyle=rgb(b.c);
[-1,1].forEach(function(sd){ctx.beginPath();ctx.ellipse(sd*s*.55*f,-s*.3,s*.55*f,s*.7,sd*.5,0,2*PI);ctx.fill();ctx.beginPath();ctx.ellipse(sd*s*.4*f,s*.45,s*.38*f,s*.45,-sd*.4,0,2*PI);ctx.fill()});
ctx.fillStyle='#2a2a22';ctx.fillRect(-s*.06,-s*.6,s*.12,s*1.3);ctx.restore()})}

var AC=[[[246,242,232],[74,56,46]],[[150,100,64],[236,226,206]],[[214,192,158],[250,246,236]],[[70,62,56],[220,214,204]]];
function animal(a,t,dt){var s=a.s,c=AC[a.k],goat=a.k>1;a.x+=a.dir*a.sp*dt;if(a.dir>0&&a.x>W+s*3)a.x=-s*3;if(a.dir<0&&a.x<-s*3)a.x=W+s*3;
var g=t*a.gait+a.ph,bob=Math.abs(sin(g))*s*.014,leg=gt([46,38,32]),body=gt(c[0]),patch=gt(c[1]),gd=.5+.5*sin(t*.32+a.ph),hd=Math.max(0,gd*1.6-.35);
ctx.save();ctx.translate(a.x,a.y);ctx.scale(a.dir,1);
ctx.fillStyle='rgba(18,38,18,.24)';ctx.beginPath();ctx.ellipse(0,0,s*.52,s*.07,0,0,2*PI);ctx.fill();
ctx.lineCap='round';ctx.strokeStyle=rgb(leg);ctx.lineWidth=s*(goat?.045:.06);
[[-.32,0],[-.2,Math.PI],[.2,0],[.32,Math.PI]].forEach(function(l){var sw=sin(g+l[1])*s*.07;ctx.beginPath();ctx.moveTo(l[0]*s,-s*.34);ctx.lineTo(l[0]*s+sw,-s*.02);ctx.stroke()});
ctx.strokeStyle=rgb(body);ctx.lineWidth=s*.04;ctx.beginPath();ctx.moveTo(-s*.5,-s*.55-bob);ctx.quadraticCurveTo(-s*.62+sin(t*1.6+a.ph)*s*.05,-s*.5,-s*.6+sin(t*1.6+a.ph)*s*.08,-s*(goat?.62:.3));ctx.stroke();
ctx.fillStyle=rgb(body);ctx.beginPath();ctx.ellipse(0,-s*.46-bob,s*.5,s*.22,0,0,2*PI);ctx.fill();
ctx.fillStyle=rgb(patch);if(a.k===0){ctx.beginPath();ctx.ellipse(-s*.12,-s*.5-bob,s*.16,s*.1,.3,0,2*PI);ctx.ellipse(s*.2,-s*.42-bob,s*.12,s*.09,-.2,0,2*PI);ctx.fill()}else{ctx.beginPath();ctx.ellipse(0,-s*.36-bob,s*.42,s*.09,0,0,PI);ctx.fill()}
var nx=s*.4,ny=-s*.56-bob,hx=s*(.58+hd*.1),hy=-s*(goat?.62:.58)+hd*s*.4;
ctx.strokeStyle=rgb(body);ctx.lineWidth=s*.15;ctx.beginPath();ctx.moveTo(nx,ny);ctx.lineTo(hx-s*.04,hy);ctx.stroke();
ctx.fillStyle=rgb(body);ctx.save();ctx.translate(hx,hy);ctx.rotate(.45+hd*.5);ctx.beginPath();ctx.ellipse(s*.04,0,s*.13,s*.075,0,0,2*PI);ctx.fill();
ctx.fillStyle=rgb(gt(a.k===0?[40,32,28]:[60,48,40]));ctx.beginPath();ctx.ellipse(s*.15,0,s*.04,s*.05,0,0,2*PI);ctx.fill();
ctx.strokeStyle=rgb(leg);ctx.lineWidth=s*.03;ctx.beginPath();if(goat){ctx.moveTo(-s*.02,-s*.06);ctx.quadraticCurveTo(-s*.14,-s*.16,-s*.2,-s*.1)}else{ctx.moveTo(-s*.02,-s*.06);ctx.lineTo(-s*.1,-s*.14)}ctx.stroke();
ctx.restore();ctx.restore()}
function grass(t,w){var SC=[[44,104,52],[74,140,66],[118,176,84]],k,i,b,g=ctx.createLinearGradient(0,H*.87,0,H);
g.addColorStop(0,rgb(gt([62,120,60]),0));g.addColorStop(.25,rgb(gt([40,88,46])));g.addColorStop(1,rgb(gt([20,52,30])));ctx.fillStyle=g;ctx.fillRect(-80,H*.86,W+160,H*.14);ctx.lineCap='round';
for(k=0;k<3;k++){ctx.strokeStyle=rgb(gt(SC[k]));ctx.lineWidth=1+k*.45;ctx.beginPath();
for(i=0;i<blades.length;i++){b=blades[i];if(b.sh!=k)continue;var lean=(sin(b.x*.012+t*1.5)*.55+.35*w+sin(t*3+b.ph)*.12)*b.h*.5;b.tx=b.x+lean;b.ty=b.y-b.h*.95;ctx.moveTo(b.x,b.y);ctx.quadraticCurveTo(b.x+lean*.25,b.y-b.h*.6,b.tx,b.ty)}ctx.stroke()}
for(i=0;i<blades.length;i++){b=blades[i];if(b.fl>=0)blob(b.tx,b.ty,Math.max(1.5,H*.0042),gt(b.fl?[255,255,245]:[255,214,90]))}}
function draw(t,dt){PX+=(PT-PX)*Math.min(1,dt*3+.02);var par=PX+sin(t*.12)*.25;var h=hourNow(),s=sky(h),w=.6+.4*sin(t*.4)+.2*sin(t*1.1),i,k,g;N=nightF(h);
if(Math.abs(t-lastG)>25||lastG<0){regrade(h);lastG=t}
g=ctx.createLinearGradient(0,0,0,H*.7);g.addColorStop(0,rgb(s[0]));g.addColorStop(1,rgb(s[1]));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
if(N>.05){ctx.fillStyle='#fff';for(i=0;i<stars.length;i++){var st=stars[i];ctx.globalAlpha=N*(.35+.65*(.5+.5*sin(t*1.5+st.p)));ctx.fillRect(st.x,st.y,st.s,st.s)}ctx.globalAlpha=1}
var sx,sy,fr,warm;
if(h>=5.8&&h<=18.2){fr=(h-6)/12;sx=W*(.5+.4*fr);sy=H*.5-sin(PI*fr)*H*.36;warm=mix([255,247,214],[255,168,92],1-Math.pow(Math.max(0,sin(PI*cl(fr))),.6));
g=ctx.createRadialGradient(sx,sy,0,sx,sy,H*.55);g.addColorStop(0,rgb(warm,.55));g.addColorStop(.35,rgb(warm,.16));g.addColorStop(1,rgb(warm,0));ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
if(N<.4){ctx.fillStyle='rgba(255,246,208,'+(.05*(1-N))+')';for(k=0;k<6;k++){var a=.7+k*.26+sin(t*.2+k)*.04,L=H*1.3;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+cos(a-.045)*L,sy+sin(a-.045)*L);ctx.lineTo(sx+cos(a+.045)*L,sy+sin(a+.045)*L);ctx.fill()}}
blob(sx,sy,H*.034,[255,252,236],.95)}
if(N>.02){fr=((h<18?h+24:h)-18)/12;sx=W*(.5+.4*fr);sy=H*.5-sin(PI*fr)*H*.34;g=ctx.createRadialGradient(sx,sy,0,sx,sy,H*.28);g.addColorStop(0,'rgba(215,226,255,'+.32*N+')');g.addColorStop(1,'rgba(215,226,255,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);ctx.globalAlpha=N;blob(sx,sy,H*.026,[240,244,252]);ctx.globalAlpha=1}
var cc=mix([255,255,255],[60,75,105],N*.85);
clouds.forEach(function(c){c.x+=c.v*dt;if(c.x>W+c.s*4)c.x=-c.s*4;c.o.forEach(function(o){var cx=c.x+o[0]*c.s,cy=c.y+o[1]*c.s,r=o[2]*c.s,q=ctx.createRadialGradient(cx,cy,0,cx,cy,r);q.addColorStop(0,rgb(cc,.62-.3*N));q.addColorStop(1,rgb(cc,0));ctx.fillStyle=q;ctx.fillRect(cx-r,cy-r,r*2,r*2)})});
birds(t);ctx.drawImage(land,-14+par*-8,-6,W+28,H+10);
trees.forEach(function(tr){var sp=spr[tr.c][tr.v%4],sc=tr.s/tr.nom,tw=sp.w*sc,th=sp.h*sc;if(tr.c>0){ctx.fillStyle='rgba(10,32,14,'+(.2*(1-N))+')';ctx.beginPath();ctx.ellipse(tr.x+par*[0,14,34][tr.c]+tw*.12,tr.y,tw*.3,tw*.045,0,0,2*PI);ctx.fill()}ctx.save();ctx.translate(tr.x+par*[6,14,34][tr.c],tr.y);ctx.rotate(sin(t*1.1+tr.sd)*.009*w*(1+tr.c*.5));ctx.drawImage(sp.c,-tw/2,-th,tw,th);ctx.restore()});
ctx.save();ctx.translate(par*20,0);AN.forEach(function(a){animal(a,t,dt)});ctx.restore();ctx.save();ctx.translate(par*30,0);grass(t,w);ctx.restore();butter(t);
if(N<.9){ctx.fillStyle='rgba(255,252,214,'+.34*(1-N)+')';parts.forEach(function(p){p.x+=(p.sp*14+w*22)*dt;p.y+=sin(t*.8+p.ph)*6*dt;if(p.x>W+10){p.x=-10;p.y=H*(.25+Math.random()*.6)}ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,2*PI);ctx.fill()})}
if(N>.1){ctx.globalCompositeOperation='lighter';flies.forEach(function(f){var x=f.x+sin(t*.3+f.ph)*40+sin(t*.9+f.ph)*10,y=f.y+sin(t*.4+f.ph*2)*20,a=Math.pow(.5+.5*sin(t*1.8+f.ph*3),2)*N;if(a<.02)return;var q=ctx.createRadialGradient(x,y,0,x,y,9);q.addColorStop(0,'rgba(200,255,120,'+a+')');q.addColorStop(1,'rgba(200,255,120,0)');ctx.fillStyle=q;ctx.fillRect(x-9,y-9,18,18)});ctx.globalCompositeOperation='source-over'}}
var raf=0,vis=true,last=0,T0=0;
function frame(now){raf=0;if(!vis||document.hidden)return;if(!T0)T0=now;var t=(now-T0)/1000+20,dt=last?Math.min(.05,t-last):0;last=t;draw(t,dt);raf=requestAnimationFrame(frame)}
function start(){if(!raf&&!reduce){last=0;raf=requestAnimationFrame(frame)}}
function size(){var r=hero.getBoundingClientRect();D=Math.min(window.devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*D;cv.height=H*D;ctx.setTransform(D,0,0,D,0,0);build();draw(20,0)}
hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();PT=((e.clientX-r.left)/r.width-.5)*2});hero.addEventListener('pointerleave',function(){PT=0});size();var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(size,150)});
if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting;if(vis)start()}).observe(hero);
document.addEventListener('visibilitychange',function(){if(!document.hidden)start()});
start();
})();
