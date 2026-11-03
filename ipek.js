// Giriş bölümündeki ipek arka plan. Bağımlılığı yok; WebGL yoksa .silk içindeki CSS renk geçişi görünür kalır.
(() => {
'use strict';
const canvas=document.querySelector('.silk canvas');if(!canvas)return;
const MAX_PIXELS=360000,FRAME_MS=1000/30,STILL_TIME=38;
const vertex='attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
// Marka renkleri: zemin --bg (#14241f), kıvrım ışığı açık yeşil, parlama --accent (#c9a96a). Parlaklık yazı kontrastı için sınırlı.
const fragment=`#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;uniform float t;
float fold(vec2 q){
 q.x+=.35*sin(q.y*1.3+t*.11);
 q.y+=.25*sin(q.x*.9-t*.07);
 float f=sin(q.x*1.6+q.y*.7+t*.09);
 f+=.5*sin(q.x*3.1-q.y*1.2-t*.06+f*.9);
 return f+.25*sin(q.x*5.7+q.y*2.3+t*.05+f*1.4);
}
void main(){
 vec2 q=gl_FragCoord.xy/r.y*2.2;
 float a=fold(q),e=.012;
 vec3 n=normalize(vec3(-(fold(q+vec2(e,0.))-a)/e*.35,-(fold(q+vec2(0.,e))-a)/e*.35,1.));
 vec3 l=normalize(vec3(-.5,.7,.6));
 float d=max(dot(n,l),0.),s=pow(max(reflect(-l,n).z,0.),18.);
 vec3 bg=vec3(.078,.141,.122);
 vec3 c=mix(bg*.8,vec3(.15,.26,.215),smoothstep(.45,.98,d)*.62)+vec3(.788,.663,.416)*s*.075;
 c=mix(bg,c,.42+.58*smoothstep(.05,.6,gl_FragCoord.x/r.x));
 float g=fract(52.9829189*fract(dot(gl_FragCoord.xy,vec2(.06711056,.00583715))));
 gl_FragColor=vec4(c+(g-.5)/255.,1.);
}`;
function build(gl){
 const program=gl.createProgram();
 for(const [type,source] of [[gl.VERTEX_SHADER,vertex],[gl.FRAGMENT_SHADER,fragment]]){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))return null;gl.attachShader(program,shader)}
 gl.linkProgram(program);return gl.getProgramParameter(program,gl.LINK_STATUS)?program:null;
}
function start(){
 let gl=null;try{gl=canvas.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'low-power'})}catch{}
 const program=gl&&build(gl);if(!program){canvas.remove();return}
 gl.useProgram(program);
 gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
 const uPos=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(uPos);gl.vertexAttribPointer(uPos,2,gl.FLOAT,false,0,0);
 const uRes=gl.getUniformLocation(program,'r'),uTime=gl.getUniformLocation(program,'t');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)'),small=matchMedia('(max-width:700px)');
 let raf=0,last=0,time=STILL_TIME,visible=true,slow=0,tooSlow=false,dead=false;
 const draw=()=>{gl.uniform1f(uTime,time);gl.drawArrays(gl.TRIANGLES,0,3)};
 const size=()=>{const box=canvas.getBoundingClientRect();if(!box.width||!box.height)return;const scale=Math.min(1,Math.sqrt(MAX_PIXELS/(box.width*box.height)));canvas.width=Math.round(box.width*scale);canvas.height=Math.round(box.height*scale);gl.viewport(0,0,canvas.width,canvas.height);gl.uniform2f(uRes,canvas.width,canvas.height);draw()};
 // Telefonda hareket yok: size() içindeki tek kare sabit görsel olarak kalır.
 const canRun=()=>!dead&&visible&&!tooSlow&&!reduce.matches&&!small.matches&&!document.hidden;
 const frame=now=>{
  raf=0;if(!canRun())return;raf=requestAnimationFrame(frame);
  const gap=now-last;if(gap<FRAME_MS-2)return;
  // Zayıf cihazda animasyon durur, son kare ekranda kalır.
  slow=gap>70&&gap<1000?slow+1:Math.max(0,slow-1);if(slow>45){tooSlow=true;return}
  time+=Math.min(gap,100)/1000;last=now;
  if(!document.body.classList.contains('modal-open'))draw();
 };
 const sync=()=>{if(canRun()){if(!raf){last=performance.now();raf=requestAnimationFrame(frame)}}else if(raf){cancelAnimationFrame(raf);raf=0}};
 canvas.addEventListener('webglcontextlost',()=>{dead=true;sync();canvas.classList.remove('on')});
 reduce.addEventListener('change',()=>{if(reduce.matches)time=STILL_TIME;draw();sync()});
 small.addEventListener('change',sync);
 document.addEventListener('visibilitychange',sync);
 document.querySelector('#project-dialog')?.addEventListener('close',()=>sync());
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()}).observe(canvas);
 new ResizeObserver(size).observe(canvas);
 size();canvas.classList.add('on');sync();
}
if(document.readyState==='complete')start();else addEventListener('load',start,{once:true});
})();
