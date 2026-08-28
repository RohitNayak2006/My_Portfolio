// ═══════════════════════════════════════════════════════════════
//  GALLERY.JS — Vanilla JS port of ThreeUI "Vantrix" Gallery
//  16 curved cylindrical image panels, auto-rotating with drift.
//  Fixed: portrait-ratio panels + Raycaster click detection.
// ═══════════════════════════════════════════════════════════════

import * as THREE from "three";

const GALLERY_IMAGES = [
  "/gallery/gallery-1.jpg",
  "/gallery/gallery-4.jpg",
  "/gallery/gallery-2.jpg",
  "/gallery/gallery-3.jpg",
  "/gallery/gallery-5.jpg",
];

// How many images map to a project (1:1 with PORTFOLIO.projects order)
const NUM_PROJECTS = GALLERY_IMAGES.length;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Initialises the 3D gallery inside `host` using `canvas`.
 * Returns a cleanup function — call it to dispose all GPU resources.
 *
 * @param {HTMLElement}      host    - sized container element
 * @param {HTMLCanvasElement} canvas - the <canvas> to render into
 * @param {object}  [opts]
 * @param {number}  [opts.speed=1]
 * @param {number}  [opts.scale=1]
 * @param {number}  [opts.opacity=1]
 * @param {function} [opts.onProjectClick] - called with projectIndex when a panel is clicked
 * @returns {() => void}  cleanup / dispose
 */
export function initGallery(host, canvas, opts = {}) {
  const { speed = 1, scale = 1, opacity = 1, onProjectClick } = opts;

  // ── Renderer ─────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // ── Scene + Camera ───────────────────────────────────────────
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.z = 14;

  // ── Gallery group ─────────────────────────────────────────────
  const gallery = new THREE.Group();
  scene.add(gallery);

  // ── Geometry — adjusted for better aspect ratio ──────────────
  const PANEL_H   = 2.8;
  const PANEL_ARC = Math.PI * 0.25; 
  const RADIUS    = 5;
  const SPACING   = 2.2;              // vertical gap between panel centres
  const NUM_PANELS = 16;

  const geometry = new THREE.CylinderGeometry(
    RADIUS, RADIUS, PANEL_H, 64, 1, true, 0, PANEL_ARC
  );

  // ── Textures ─────────────────────────────────────────────────
  const loader = new THREE.TextureLoader();
  let disposed = false;

  const textures = GALLERY_IMAGES.map((url) => {
    const tex = loader.load(url, () => {
      if (!disposed) renderer.render(scene, camera);
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return tex;
  });

  // ── Panels ───────────────────────────────────────────────────
  const panels = [];

  for (let i = 0; i < NUM_PANELS; i++) {
    const projectIdx = i % NUM_PROJECTS;
    const mat = new THREE.MeshBasicMaterial({
      map: textures[projectIdx],
      opacity: 0.92,
      side: THREE.DoubleSide,   // Reverted to DoubleSide for transparent cylinder effect
      toneMapped: false,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, mat);
    // Stack vertically, each panel rotated around Y to spiral around the cylinder
    mesh.position.y  = (i - 8) * SPACING;
    mesh.rotation.y  = (i / 16) * Math.PI * 4; // 2 full rotations

    // Store project index for click detection
    mesh.userData.projectIdx = projectIdx;

    gallery.add(mesh);
    panels.push(mesh);
  }

  // ── Raycaster — click detection ──────────────────────────────
  const raycaster  = new THREE.Raycaster();
  const pointer    = new THREE.Vector2();

  const getCanvasCoords = (e) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x =  ((e.clientX - rect.left)  / rect.width)  * 2 - 1;
    pointer.y = -((e.clientY - rect.top)   / rect.height) * 2 + 1;
  };

  const onCanvasClick = (e) => {
    if (disposed) return;
    getCanvasCoords(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(panels);
    if (hits.length > 0) {
      const idx = hits[0].object.userData.projectIdx;
      if (typeof onProjectClick === 'function') onProjectClick(idx);
    }
  };

  // Hover cursor — show pointer when hovering a panel
  const onCanvasMove = (e) => {
    if (disposed) return;
    getCanvasCoords(e);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(panels);
    canvas.style.cursor = hits.length > 0 ? 'pointer' : 'default';
  };

  canvas.addEventListener('click',     onCanvasClick, { passive: true });
  canvas.addEventListener('mousemove', onCanvasMove,  { passive: true });

  // ── Animation loop ───────────────────────────────────────────
  let frame     = 0;
  let elapsed   = 0;
  let prevTime  = 0;
  let hostVisible  = true;
  let docVisible   = !document.hidden;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = (time = performance.now()) => {
    const safeSpeed = clamp(speed, 0, 3);
    const safeScale = clamp(scale, 0.7, 1.35);
    if (prevTime) elapsed += Math.min((time - prevTime) / 1000, 0.05) * safeSpeed;
    prevTime = time;

    gallery.rotation.y  = elapsed * 0.15;        // gentle auto-spin
    gallery.position.y  = Math.sin(elapsed * 0.4) * 0.8;  // subtle bob
    gallery.scale.setScalar(safeScale);
    renderer.render(scene, camera);
  };

  const tick = (time) => {
    if (disposed || !hostVisible || !docVisible) {
      frame    = 0;
      prevTime = 0;
      return;
    }
    render(time);
    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (reducedMotion) { render(0); return; }
    if (!frame && hostVisible && docVisible) frame = requestAnimationFrame(tick);
  };

  const stop = () => {
    if (frame) cancelAnimationFrame(frame);
    frame    = 0;
    prevTime = 0;
  };

  // ── Resize ───────────────────────────────────────────────────
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    const w = Math.max(1, Math.round(width));
    const h = Math.max(1, Math.round(height));
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    render();
  };

  // ── Observers ────────────────────────────────────────────────
  const resizeObs    = new ResizeObserver(resize);
  const intersectObs = new IntersectionObserver(([entry]) => {
    hostVisible = entry?.isIntersecting ?? true;
    hostVisible ? start() : stop();
  });

  const onVisibility = () => {
    docVisible = !document.hidden;
    docVisible ? start() : stop();
  };

  resizeObs.observe(host);
  intersectObs.observe(host);
  document.addEventListener('visibilitychange', onVisibility);

  resize();
  start();

  canvas.style.opacity = String(clamp(opacity, 0.05, 1));

  // ── Cleanup / dispose ────────────────────────────────────────
  return () => {
    disposed = true;
    stop();
    canvas.removeEventListener('click',     onCanvasClick);
    canvas.removeEventListener('mousemove', onCanvasMove);
    resizeObs.disconnect();
    intersectObs.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    panels.forEach(p => { p.geometry.dispose(); p.material.dispose(); });
    geometry.dispose();
    textures.forEach(t => t.dispose());
    renderer.dispose();
  };
}
