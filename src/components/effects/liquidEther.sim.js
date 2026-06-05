/**
 * [INPUT]: 依赖 three（WebGL 流体模拟），依赖 ./liquidEther.glsl 的 GLSL 着色器字符串
 * [OUTPUT]: 导出 Common · Mouse 模块单例，makePaletteTexture · AutoDriver · WebGLManager
 * [POS]: effects 层的 Navier-Stokes 流体模拟引擎，被 LiquidEther.jsx 唯一消费
 *        注意：Common / Mouse 是模块级单例，同页面只支持一个 LiquidEther 实例
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import * as THREE from 'three'
import {
  face_vert, line_vert, mouse_vert,
  advection_frag, color_frag, divergence_frag,
  externalForce_frag, poisson_frag, pressure_frag, viscous_frag,
} from './liquidEther.glsl'

// ── 公共 WebGL 上下文单例 ──────────────────────────────────────────────────────
export class CommonClass {
  constructor() {
    this.width = 0; this.height = 0; this.aspect = 1; this.pixelRatio = 1;
    this.isMobile = false; this.breakpoint = 768;
    this.fboWidth = null; this.fboHeight = null;
    this.time = 0; this.delta = 0;
    this.container = null; this.renderer = null; this.clock = null;
  }
  init(container) {
    this.container = container;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.autoClear = false;
    this.renderer.setClearColor(new THREE.Color(0x000000), 0);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.style.cssText = 'width:100%;height:100%;display:block';
    this.clock = new THREE.Clock();
    this.clock.start();
  }
  resize() {
    if (!this.container) return;
    const rect = this.container.getBoundingClientRect();
    this.width = Math.max(1, Math.floor(rect.width));
    this.height = Math.max(1, Math.floor(rect.height));
    this.aspect = this.width / this.height;
    if (this.renderer) this.renderer.setSize(this.width, this.height, false);
  }
  update() {
    this.delta = this.clock.getDelta();
    this.time += this.delta;
  }
}
export const Common = new CommonClass()

// ── 鼠标/触摸输入状态单例 ─────────────────────────────────────────────────────
export class MouseClass {
  constructor() {
    this.mouseMoved = false;
    this.coords = new THREE.Vector2();
    this.coords_old = new THREE.Vector2();
    this.diff = new THREE.Vector2();
    this.timer = null; this.container = null;
    this.docTarget = null; this.listenerTarget = null;
    this.isHoverInside = false; this.hasUserControl = false;
    this.isAutoActive = false; this.autoIntensity = 2.0;
    this.takeoverActive = false; this.takeoverStartTime = 0;
    this.takeoverDuration = 0.25;
    this.takeoverFrom = new THREE.Vector2();
    this.takeoverTo = new THREE.Vector2();
    this.onInteract = null;
    this._onMouseMove = this.onDocumentMouseMove.bind(this);
    this._onTouchStart = this.onDocumentTouchStart.bind(this);
    this._onTouchMove = this.onDocumentTouchMove.bind(this);
    this._onTouchEnd = this.onTouchEnd.bind(this);
    this._onDocumentLeave = this.onDocumentLeave.bind(this);
  }
  init(container) {
    this.container = container;
    this.docTarget = container.ownerDocument || null;
    const win = (this.docTarget?.defaultView) ?? (typeof window !== 'undefined' ? window : null);
    if (!win) return;
    this.listenerTarget = win;
    win.addEventListener('mousemove', this._onMouseMove);
    win.addEventListener('touchstart', this._onTouchStart, { passive: true });
    win.addEventListener('touchmove', this._onTouchMove, { passive: true });
    win.addEventListener('touchend', this._onTouchEnd);
    if (this.docTarget) this.docTarget.addEventListener('mouseleave', this._onDocumentLeave);
  }
  dispose() {
    if (this.listenerTarget) {
      this.listenerTarget.removeEventListener('mousemove', this._onMouseMove);
      this.listenerTarget.removeEventListener('touchstart', this._onTouchStart);
      this.listenerTarget.removeEventListener('touchmove', this._onTouchMove);
      this.listenerTarget.removeEventListener('touchend', this._onTouchEnd);
    }
    if (this.docTarget) this.docTarget.removeEventListener('mouseleave', this._onDocumentLeave);
    this.listenerTarget = null; this.docTarget = null; this.container = null;
  }
  isPointInside(clientX, clientY) {
    if (!this.container) return false;
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return false;
    return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
  }
  updateHoverState(clientX, clientY) {
    this.isHoverInside = this.isPointInside(clientX, clientY);
    return this.isHoverInside;
  }
  setCoords(x, y) {
    if (!this.container) return;
    if (this.timer) window.clearTimeout(this.timer);
    const rect = this.container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = (x - rect.left) / rect.width;
    const ny = (y - rect.top) / rect.height;
    this.coords.set(nx * 2 - 1, -(ny * 2 - 1));
    this.mouseMoved = true;
    this.timer = window.setTimeout(() => { this.mouseMoved = false; }, 100);
  }
  setNormalized(nx, ny) { this.coords.set(nx, ny); this.mouseMoved = true; }
  onDocumentMouseMove(event) {
    if (!this.updateHoverState(event.clientX, event.clientY)) return;
    if (this.onInteract) this.onInteract();
    if (this.isAutoActive && !this.hasUserControl && !this.takeoverActive) {
      if (!this.container) return;
      const rect = this.container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = (event.clientX - rect.left) / rect.width;
      const ny = (event.clientY - rect.top) / rect.height;
      this.takeoverFrom.copy(this.coords);
      this.takeoverTo.set(nx * 2 - 1, -(ny * 2 - 1));
      this.takeoverStartTime = performance.now();
      this.takeoverActive = true; this.hasUserControl = true; this.isAutoActive = false;
      return;
    }
    this.setCoords(event.clientX, event.clientY);
    this.hasUserControl = true;
  }
  onDocumentTouchStart(event) {
    if (event.touches.length !== 1) return;
    const t = event.touches[0];
    if (!this.updateHoverState(t.clientX, t.clientY)) return;
    if (this.onInteract) this.onInteract();
    this.setCoords(t.clientX, t.clientY);
    this.hasUserControl = true;
  }
  onDocumentTouchMove(event) {
    if (event.touches.length !== 1) return;
    const t = event.touches[0];
    if (!this.updateHoverState(t.clientX, t.clientY)) return;
    if (this.onInteract) this.onInteract();
    this.setCoords(t.clientX, t.clientY);
  }
  onTouchEnd() { this.isHoverInside = false; }
  onDocumentLeave() { this.isHoverInside = false; }
  update() {
    if (this.takeoverActive) {
      const t = (performance.now() - this.takeoverStartTime) / (this.takeoverDuration * 1000);
      if (t >= 1) {
        this.takeoverActive = false;
        this.coords.copy(this.takeoverTo);
        this.coords_old.copy(this.coords);
        this.diff.set(0, 0);
      } else {
        const k = t * t * (3 - 2 * t);
        this.coords.copy(this.takeoverFrom).lerp(this.takeoverTo, k);
      }
    }
    this.diff.subVectors(this.coords, this.coords_old);
    this.coords_old.copy(this.coords);
    if (this.coords_old.x === 0 && this.coords_old.y === 0) this.diff.set(0, 0);
    if (this.isAutoActive && !this.takeoverActive) this.diff.multiplyScalar(this.autoIntensity);
  }
}
export const Mouse = new MouseClass()

// ── 调色板纹理构建 ─────────────────────────────────────────────────────────────
export function makePaletteTexture(stops) {
  const arr = (!stops || stops.length === 0) ? ['#ffffff', '#ffffff']
    : stops.length === 1 ? [stops[0], stops[0]]
    : stops;
  const data = new Uint8Array(arr.length * 4);
  arr.forEach((hex, i) => {
    const c = new THREE.Color(hex);
    data[i * 4] = Math.round(c.r * 255);
    data[i * 4 + 1] = Math.round(c.g * 255);
    data[i * 4 + 2] = Math.round(c.b * 255);
    data[i * 4 + 3] = 255;
  });
  const tex = new THREE.DataTexture(data, arr.length, 1, THREE.RGBAFormat);
  tex.magFilter = tex.minFilter = THREE.LinearFilter;
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

// ── 自动漂移控制器 ─────────────────────────────────────────────────────────────
export class AutoDriver {
  constructor(mouse, manager, opts) {
    this.mouse = mouse; this.manager = manager;
    this.enabled = opts.enabled; this.speed = opts.speed;
    this.resumeDelay = opts.resumeDelay || 3000;
    this.rampDurationMs = (opts.rampDuration || 0) * 1000;
    this.active = false;
    this.current = new THREE.Vector2(0, 0);
    this.target = new THREE.Vector2();
    this.lastTime = performance.now();
    this.activationTime = 0; this.margin = 0.2;
    this._tmpDir = new THREE.Vector2();
    this.pickNewTarget();
  }
  pickNewTarget() {
    const r = Math.random;
    this.target.set((r() * 2 - 1) * (1 - this.margin), (r() * 2 - 1) * (1 - this.margin));
  }
  forceStop() { this.active = false; this.mouse.isAutoActive = false; }
  update() {
    if (!this.enabled) return;
    const now = performance.now();
    const idle = now - this.manager.lastUserInteraction;
    if (idle < this.resumeDelay || this.mouse.isHoverInside) {
      if (this.active) this.forceStop();
      return;
    }
    if (!this.active) {
      this.active = true;
      this.current.copy(this.mouse.coords);
      this.lastTime = now; this.activationTime = now;
    }
    this.mouse.isAutoActive = true;
    let dtSec = Math.min((now - this.lastTime) / 1000, 0.2);
    if (dtSec > 0.2) dtSec = 0.016;
    this.lastTime = now;
    const dir = this._tmpDir.subVectors(this.target, this.current);
    const dist = dir.length();
    if (dist < 0.01) { this.pickNewTarget(); return; }
    dir.normalize();
    const ramp = this.rampDurationMs > 0
      ? (() => { const t = Math.min(1, (now - this.activationTime) / this.rampDurationMs); return t * t * (3 - 2 * t); })()
      : 1;
    this.current.addScaledVector(dir, Math.min(this.speed * dtSec * ramp, dist));
    this.mouse.setNormalized(this.current.x, this.current.y);
  }
}

// ── Shader Passes ─────────────────────────────────────────────────────────────
class ShaderPass {
  constructor(props) {
    this.props = props || {};
    this.uniforms = this.props.material?.uniforms;
    this.scene = null; this.camera = null;
    this.material = null; this.geometry = null; this.plane = null;
  }
  init() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    if (this.uniforms) {
      this.material = new THREE.RawShaderMaterial(this.props.material);
      this.geometry = new THREE.PlaneGeometry(2.0, 2.0);
      this.plane = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.plane);
    }
  }
  update() {
    Common.renderer.setRenderTarget(this.props.output || null);
    Common.renderer.render(this.scene, this.camera);
    Common.renderer.setRenderTarget(null);
  }
}

class Advection extends ShaderPass {
  constructor(simProps) {
    super({
      material: {
        vertexShader: face_vert, fragmentShader: advection_frag,
        uniforms: {
          boundarySpace: { value: simProps.cellScale },
          px: { value: simProps.cellScale },
          fboSize: { value: simProps.fboSize },
          velocity: { value: simProps.src.texture },
          dt: { value: simProps.dt },
          isBFECC: { value: true },
        },
      },
      output: simProps.dst,
    });
    this.uniforms = this.props.material.uniforms;
    this.init();
    const boundaryG = new THREE.BufferGeometry();
    boundaryG.setAttribute('position', new THREE.BufferAttribute(
      new Float32Array([-1,-1,0,-1,1,0,-1,1,0,1,1,0,1,1,0,1,-1,0,1,-1,0,-1,-1,0]), 3
    ));
    this.line = new THREE.LineSegments(boundaryG, new THREE.RawShaderMaterial({
      vertexShader: line_vert, fragmentShader: advection_frag, uniforms: this.uniforms,
    }));
    this.scene.add(this.line);
  }
  update({ dt, isBounce, BFECC }) {
    this.uniforms.dt.value = dt;
    this.line.visible = isBounce;
    this.uniforms.isBFECC.value = BFECC;
    super.update();
  }
}

class ExternalForce extends ShaderPass {
  constructor(simProps) {
    super({ output: simProps.dst });
    this.init();
    const mouseM = new THREE.RawShaderMaterial({
      vertexShader: mouse_vert, fragmentShader: externalForce_frag,
      blending: THREE.AdditiveBlending, depthWrite: false,
      uniforms: {
        px: { value: simProps.cellScale },
        force: { value: new THREE.Vector2(0, 0) },
        center: { value: new THREE.Vector2(0, 0) },
        scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) },
      },
    });
    this.mouse = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mouseM);
    this.scene.add(this.mouse);
  }
  update(props) {
    const forceX = (Mouse.diff.x / 2) * props.mouse_force;
    const forceY = (Mouse.diff.y / 2) * props.mouse_force;
    const cursorSizeX = props.cursor_size * props.cellScale.x;
    const cursorSizeY = props.cursor_size * props.cellScale.y;
    const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
    const uniforms = this.mouse.material.uniforms;
    uniforms.force.value.set(forceX, forceY);
    uniforms.center.value.set(
      clamp(Mouse.coords.x, -1 + cursorSizeX + props.cellScale.x * 2, 1 - cursorSizeX - props.cellScale.x * 2),
      clamp(Mouse.coords.y, -1 + cursorSizeY + props.cellScale.y * 2, 1 - cursorSizeY - props.cellScale.y * 2)
    );
    uniforms.scale.value.set(props.cursor_size, props.cursor_size);
    super.update();
  }
}

class Viscous extends ShaderPass {
  constructor(simProps) {
    super({
      material: {
        vertexShader: face_vert, fragmentShader: viscous_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          velocity: { value: simProps.src.texture },
          velocity_new: { value: simProps.dst_.texture },
          v: { value: simProps.viscous },
          px: { value: simProps.cellScale },
          dt: { value: simProps.dt },
        },
      },
      output: simProps.dst, output0: simProps.dst_, output1: simProps.dst,
    });
    this.init();
  }
  update({ viscous, iterations, dt }) {
    this.uniforms.v.value = viscous;
    let fbo_in, fbo_out;
    for (let i = 0; i < iterations; i++) {
      fbo_in = i % 2 === 0 ? this.props.output0 : this.props.output1;
      fbo_out = i % 2 === 0 ? this.props.output1 : this.props.output0;
      this.uniforms.velocity_new.value = fbo_in.texture;
      this.props.output = fbo_out;
      this.uniforms.dt.value = dt;
      super.update();
    }
    return fbo_out;
  }
}

class Divergence extends ShaderPass {
  constructor(simProps) {
    super({
      material: {
        vertexShader: face_vert, fragmentShader: divergence_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          velocity: { value: simProps.src.texture },
          px: { value: simProps.cellScale },
          dt: { value: simProps.dt },
        },
      },
      output: simProps.dst,
    });
    this.init();
  }
  update({ vel }) { this.uniforms.velocity.value = vel.texture; super.update(); }
}

class Poisson extends ShaderPass {
  constructor(simProps) {
    super({
      material: {
        vertexShader: face_vert, fragmentShader: poisson_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          pressure: { value: simProps.dst_.texture },
          divergence: { value: simProps.src.texture },
          px: { value: simProps.cellScale },
        },
      },
      output: simProps.dst, output0: simProps.dst_, output1: simProps.dst,
    });
    this.init();
  }
  update({ iterations }) {
    let p_in, p_out;
    for (let i = 0; i < iterations; i++) {
      p_in = i % 2 === 0 ? this.props.output0 : this.props.output1;
      p_out = i % 2 === 0 ? this.props.output1 : this.props.output0;
      this.uniforms.pressure.value = p_in.texture;
      this.props.output = p_out;
      super.update();
    }
    return p_out;
  }
}

class Pressure extends ShaderPass {
  constructor(simProps) {
    super({
      material: {
        vertexShader: face_vert, fragmentShader: pressure_frag,
        uniforms: {
          boundarySpace: { value: simProps.boundarySpace },
          pressure: { value: simProps.src_p.texture },
          velocity: { value: simProps.src_v.texture },
          px: { value: simProps.cellScale },
          dt: { value: simProps.dt },
        },
      },
      output: simProps.dst,
    });
    this.init();
  }
  update({ vel, pressure }) {
    this.uniforms.velocity.value = vel.texture;
    this.uniforms.pressure.value = pressure.texture;
    super.update();
  }
}

// ── 流体模拟编排器 ─────────────────────────────────────────────────────────────
class Simulation {
  constructor(options) {
    this.options = {
      iterations_poisson: 32, iterations_viscous: 32,
      mouse_force: 20, resolution: 0.5, cursor_size: 100,
      viscous: 30, isBounce: false, dt: 0.014,
      isViscous: false, BFECC: true,
      ...options,
    };
    this.fbos = {
      vel_0: null, vel_1: null, vel_viscous0: null, vel_viscous1: null,
      div: null, pressure_0: null, pressure_1: null,
    };
    this.fboSize = new THREE.Vector2();
    this.cellScale = new THREE.Vector2();
    this.boundarySpace = new THREE.Vector2();
    this.init();
  }
  getFloatType() {
    return /(iPad|iPhone|iPod)/i.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType;
  }
  createAllFBO() {
    const opts = {
      type: this.getFloatType(), depthBuffer: false, stencilBuffer: false,
      minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter,
      wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping,
    };
    for (const key in this.fbos) {
      this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts);
    }
  }
  createShaderPass() {
    const { dt, cursor_size, viscous } = this.options;
    this.advection = new Advection({ cellScale: this.cellScale, fboSize: this.fboSize, dt, src: this.fbos.vel_0, dst: this.fbos.vel_1 });
    this.externalForce = new ExternalForce({ cellScale: this.cellScale, cursor_size, dst: this.fbos.vel_1 });
    this.viscous = new Viscous({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, viscous, src: this.fbos.vel_1, dst: this.fbos.vel_viscous1, dst_: this.fbos.vel_viscous0, dt });
    this.divergence = new Divergence({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src: this.fbos.vel_viscous0, dst: this.fbos.div, dt });
    this.poisson = new Poisson({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src: this.fbos.div, dst: this.fbos.pressure_1, dst_: this.fbos.pressure_0 });
    this.pressure = new Pressure({ cellScale: this.cellScale, boundarySpace: this.boundarySpace, src_p: this.fbos.pressure_0, src_v: this.fbos.vel_viscous0, dst: this.fbos.vel_0, dt });
  }
  calcSize() {
    const width = Math.max(1, Math.round(this.options.resolution * Common.width));
    const height = Math.max(1, Math.round(this.options.resolution * Common.height));
    this.cellScale.set(1.0 / width, 1.0 / height);
    this.fboSize.set(width, height);
  }
  init() { this.calcSize(); this.createAllFBO(); this.createShaderPass(); }
  resize() {
    this.calcSize();
    for (const key in this.fbos) this.fbos[key].setSize(this.fboSize.x, this.fboSize.y);
  }
  update() {
    if (this.options.isBounce) this.boundarySpace.set(0, 0);
    else this.boundarySpace.copy(this.cellScale);
    this.advection.update({ dt: this.options.dt, isBounce: this.options.isBounce, BFECC: this.options.BFECC });
    this.externalForce.update({ cursor_size: this.options.cursor_size, mouse_force: this.options.mouse_force, cellScale: this.cellScale });
    let vel = this.fbos.vel_1;
    if (this.options.isViscous) {
      vel = this.viscous.update({ viscous: this.options.viscous, iterations: this.options.iterations_viscous, dt: this.options.dt });
    }
    this.divergence.update({ vel });
    const pressure = this.poisson.update({ iterations: this.options.iterations_poisson });
    this.pressure.update({ vel, pressure });
  }
}

// ── 输出渲染器：将速度场着色输出到 canvas ──────────────────────────────────────
class Output {
  constructor(paletteTex, bgVec4) {
    this.paletteTex = paletteTex;
    this.bgVec4 = bgVec4;
    this.simulation = new Simulation();
    this.scene = new THREE.Scene();
    this.camera = new THREE.Camera();
    this.output = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.RawShaderMaterial({
        vertexShader: face_vert, fragmentShader: color_frag,
        transparent: true, depthWrite: false,
        uniforms: {
          velocity: { value: this.simulation.fbos.vel_0.texture },
          boundarySpace: { value: new THREE.Vector2() },
          palette: { value: this.paletteTex },
          bgColor: { value: this.bgVec4 },
        },
      })
    );
    this.scene.add(this.output);
  }
  resize() { this.simulation.resize(); }
  render() { Common.renderer.setRenderTarget(null); Common.renderer.render(this.scene, this.camera); }
  update() { this.simulation.update(); this.render(); }
}

// ── WebGL 生命周期管理器 ───────────────────────────────────────────────────────
export class WebGLManager {
  constructor(props) {
    this.props = props;
    this.isVisible = true;
    this._raf = null;
    Common.init(props.$wrapper);
    Mouse.init(props.$wrapper);
    Mouse.autoIntensity = props.autoIntensity;
    Mouse.takeoverDuration = props.takeoverDuration;
    this.lastUserInteraction = performance.now();
    Mouse.onInteract = () => {
      this.lastUserInteraction = performance.now();
      if (this.autoDriver) this.autoDriver.forceStop();
    };
    this.autoDriver = new AutoDriver(Mouse, this, {
      enabled: props.autoDemo, speed: props.autoSpeed,
      resumeDelay: props.autoResumeDelay, rampDuration: props.autoRampDuration,
    });
    props.$wrapper.style.position = props.$wrapper.style.position || 'relative';
    props.$wrapper.style.overflow = props.$wrapper.style.overflow || 'hidden';
    this.output = new Output(props.paletteTex, props.bgVec4);
    props.$wrapper.prepend(Common.renderer.domElement);
    this._loop = this.loop.bind(this);
    this._resize = this.resize.bind(this);
    window.addEventListener('resize', this._resize);
    this._onVisibility = () => {
      if (document.hidden) this.pause();
      else if (this.isVisible) this.start();
    };
    document.addEventListener('visibilitychange', this._onVisibility);
    this.running = false;
  }
  resize() { Common.resize(); this.output.resize(); }
  render() {
    if (this.autoDriver) this.autoDriver.update();
    Mouse.update(); Common.update(); this.output.update();
  }
  loop() {
    if (!this.running) return;
    this.render();
    this._raf = requestAnimationFrame(this._loop);
  }
  start() {
    if (this.running) return;
    this.running = true;
    this._loop();
  }
  pause() {
    this.running = false;
    if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
  }
  dispose() {
    try {
      this.pause();
      window.removeEventListener('resize', this._resize);
      document.removeEventListener('visibilitychange', this._onVisibility);
      Mouse.dispose();
      if (Common.renderer) {
        const canvas = Common.renderer.domElement;
        if (canvas?.parentNode) canvas.parentNode.removeChild(canvas);
        Common.renderer.dispose();
        Common.renderer.forceContextLoss();
        Common.renderer = null;
      }
    } catch { void 0; }
  }
}
