export interface ShaderContext {
  gl: WebGLRenderingContext
  locs: Record<string, WebGLUniformLocation | null>
}

const VERT = `attribute vec2 a_pos; void main(){gl_Position=vec4(a_pos,0,1);}`

export function createShader(
  canvas: HTMLCanvasElement,
  fragSrc: string,
  extraUniforms: string[] = []
): ShaderContext | null {
  const gl = (
    canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl')
  ) as WebGLRenderingContext | null
  if (!gl) return null

  function compile(type: number, src: string): WebGLShader {
    const s = gl!.createShader(type)!
    gl!.shaderSource(s, src)
    gl!.compileShader(s)
    return s
  }

  const prog = gl.createProgram()!
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragSrc))
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  )

  const pos = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(pos)
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

  const locs: Record<string, WebGLUniformLocation | null> = {
    u_res: gl.getUniformLocation(prog, 'u_res'),
    u_time: gl.getUniformLocation(prog, 'u_time'),
  }
  extraUniforms.forEach(k => {
    locs[k] = gl.getUniformLocation(prog, k)
  })

  function resize() {
    // Cap pixel ratio at 1 — retina was doubling render cost for no benefit
    const dpr = Math.min(devicePixelRatio, 1)
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    gl!.viewport(0, 0, canvas.width, canvas.height)
  }
  resize()
  new ResizeObserver(resize).observe(canvas)

  return { gl, locs }
}

// ─── HERO SHADER ─────────────────────────────────────────
export const HERO_FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float noise(vec3 p) {
  vec3 i=floor(p); vec3 f=fract(p);
  f=f*f*(3.-2.*f);
  float n=i.x+i.y*157.+113.*i.z;
  return mix(mix(mix(fract(sin(n+0.)*43758.5),fract(sin(n+1.)*43758.5),f.x),
                 mix(fract(sin(n+157.)*43758.5),fract(sin(n+158.)*43758.5),f.x),f.y),
             mix(mix(fract(sin(n+113.)*43758.5),fract(sin(n+114.)*43758.5),f.x),
                 mix(fract(sin(n+270.)*43758.5),fract(sin(n+271.)*43758.5),f.x),f.y),f.z);
}
float fbm(vec3 p) {
  float v=0.,a=.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=p*2.1+vec3(1.7,9.2,4.3); a*=.5; }
  return v;
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_res)/min(u_res.x,u_res.y);
  float t=u_time*.18;
  vec3 p=vec3(uv*2.,t);
  float f=fbm(p+fbm(p+fbm(p)));
  float r1=.6+.4*fbm(p+vec3(f,f*.7,t*.3));
  float r2=fbm(p*1.3+vec3(t*.4,f,0.));
  vec3 col1=vec3(.165,.095,.035);
  vec3 col2=vec3(.776,.545,.227);
  vec3 col3=vec3(.113,.074,.024);
  vec3 col=mix(col1,col2,clamp(r1*1.2,0.,1.));
  col=mix(col,col3,clamp(r2*.8,0.,1.));
  float vign=1.-smoothstep(.4,1.2,length(uv));
  col*=vign*.9+.1;
  col+=vec3(.18,.12,.04)*(1.-smoothstep(.5,.8,length(uv)))*.4;
  gl_FragColor=vec4(col,1.);
}`

// ─── COFFEE SURFACE SHADER ───────────────────────────────
export function buildCoffeeFrag(tint: [number, number, number], speed: number): string {
  return `
precision mediump float;
uniform vec2 u_res; uniform float u_time;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<3;i++){v+=a*noise(p);p*=2.1;a*=.5;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float t=u_time*${speed.toFixed(2)};
  vec2 q=vec2(fbm(uv+t*.2),fbm(uv+1.));
  vec2 r=vec2(fbm(uv+q+vec2(1.7,9.2)+.15*t),fbm(uv+q+vec2(8.3,2.8)+.12*t));
  float f=fbm(uv+r);
  vec3 c1=vec3(${tint[0]},${tint[1]},${tint[2]});
  vec3 c2=c1*3.;
  vec3 col=mix(c1,c2,clamp(f*2.,0.,1.));
  float vign=1.-smoothstep(.3,1.,length(uv-.5)*1.4);
  col*=vign*.8+.3;
  gl_FragColor=vec4(col,1.);
}`
}

// ─── MAP SHADER ──────────────────────────────────────────
export const MAP_FRAG = `
precision mediump float;
uniform vec2 u_res; uniform float u_time;
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  vec2 grid=fract(uv*12.)-.5;
  float lines=smoothstep(.48,.45,abs(grid.x))+smoothstep(.48,.45,abs(grid.y));
  lines*=.4;
  float t=u_time*.3;
  float pulse=.5+.5*sin(uv.x*8.+t)*sin(uv.y*8.+t*.7);
  vec3 base=vec3(.17,.10,.04);
  vec3 gridCol=vec3(.78,.55,.23);
  vec3 col=mix(base,gridCol,lines*.6+pulse*.05);
  float vign=1.-smoothstep(.4,1.,length(uv-.5)*1.6);
  col*=vign*.7+.3;
  float pinDist=length(uv-vec2(.6,.5));
  float pin=smoothstep(.04,.02,pinDist);
  float ring=smoothstep(.09,.07,pinDist)-smoothstep(.06,.04,pinDist);
  col=mix(col,gridCol,pin+ring*.6);
  gl_FragColor=vec4(col,1.);
}`