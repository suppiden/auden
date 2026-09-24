import type { LogoScene } from './auden-logo-scene';

const SESSION_KEY = 'auden:intro-3d:v3';

export function startAudenIntro() {
  const root = document.documentElement;
  const wordmark = document.querySelector<HTMLElement>('#hero-wordmark-frame');
  const slot = document.querySelector<HTMLElement>('#hero-u-slot');
  const scroller = document.getElementById('scroll-container');
  const intro = document.getElementById('auden-intro');
  const mark = intro?.querySelector<HTMLElement>('[data-intro-mark]');
  if (!wordmark || !slot || !scroller || wordmark.dataset.initialized) return;
  wordmark.dataset.initialized = 'true';

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  const lifecycle = new AbortController();
  const { signal } = lifecycle;
  const host = document.createElement('div');
  host.className = 'auden-logo-canvas auden-logo-interactive';
  host.setAttribute('aria-hidden', 'true');
  let scene: LogoScene | undefined;
  let stopped = false;
  let frame = 0;
  let revealed = false;
  let introComplete = false;
  let loadTimer: ReturnType<typeof setTimeout>;
  let pulseTimer: ReturnType<typeof setTimeout>;
  let revealTimer: ReturnType<typeof setTimeout>;
  let fallbackTimer: ReturnType<typeof setTimeout>;
  let animation: Animation | undefined;
  let yaw = 0;
  let pitch = 0;
  let drag: { id: number; x: number; y: number; yaw: number; pitch: number; touch: boolean } | undefined;
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'auden-logo-control';
  control.hidden = true;
  const es = root.lang.startsWith('es');
  control.setAttribute('aria-label', es ? 'Girar la U de Auden en 3D' : 'Rotate the Auden U in 3D');
  control.title = es ? 'Arrastra para girar · Flechas para orientar · Pulsa para reiniciar' : 'Drag to rotate · Arrow keys to turn · Click to reset';
  control.setAttribute('aria-description', control.title);
  slot.removeAttribute('aria-hidden');
  slot.append(control);
  let themeObserver: MutationObserver | undefined;
  let resizeObserver: ResizeObserver | undefined;
  let resolveIntro!: () => void;
  const introDone = new Promise<void>(resolve => { resolveIntro = resolve; });

  function finishIntro() {
    if (introComplete) return;
    introComplete = true;
    clearTimeout(pulseTimer);
    clearTimeout(fallbackTimer);
    animation?.cancel();
    root.classList.remove('auden-intro-pending');
    intro?.remove();
    mark?.remove();
    wordmark!.classList.remove('intro-u-arriving');
    wordmark!.dataset.logoState = 'static';
    try { sessionStorage.setItem(SESSION_KEY, 'seen'); } catch { /* Optional storage. */ }
    performance.mark('auden:intro-complete');
    resolveIntro();
  }

  function restoreLetters() {
    wordmark!.classList.remove('has-3d-u');
    control.hidden = true;
  }

  function drawLogo() {
    frame = 0;
    if (!scene || stopped || document.hidden) return;
    // The canvas lives in the letter slot and scrolls with the wordmark itself.
    // Keep a fixed backing buffer; only its CSS scale changes on responsive layouts.
    host.style.transform = `translate(-50%, -50%) scale(${slot!.clientWidth * 1.5 / 256})`;
    scene.render(yaw, pitch, 1, .035);
    wordmark!.classList.toggle('has-3d-u', revealed);
    control.hidden = !revealed;
    wordmark!.dataset.logoState = 'interactive';
  }

  function requestDraw() {
    if (scene && !frame && !document.hidden && !stopped) frame = requestAnimationFrame(drawLogo);
  }

  function cleanup() {
    if (stopped) return;
    stopped = true;
    finishIntro();
    clearTimeout(loadTimer);
    clearTimeout(revealTimer);
    cancelAnimationFrame(frame);
    lifecycle.abort();
    themeObserver?.disconnect();
    resizeObserver?.disconnect();
    scene?.dispose();
    host.remove();
    restoreLetters();
    control.remove();
    slot!.setAttribute('aria-hidden', 'true');
    delete wordmark!.dataset.initialized;
    delete wordmark!.dataset.logoState;
  }

  if (reduced.matches || connection?.saveData) { cleanup(); return; }

  // The first impression uses an inline vector, not a network/GPU-dependent frame.
  // Its compositor animation ends on time even if Three.js or the GLB is still loading.
  if (root.classList.contains('auden-intro-pending') && mark && !document.hidden) {
    const age = performance.now() - Number(root.dataset.audenIntroStarted || performance.now());
    wordmark.dataset.logoState = 'signal';
    pulseTimer = setTimeout(() => {
      if (introComplete || stopped) return;
      const from = mark.getBoundingClientRect();
      const to = slot.getBoundingClientRect();
      document.body.append(mark);
      mark.classList.add('is-flying');
      mark.style.cssText = `position:fixed;inset:auto;left:0;top:0;width:${from.width}px;height:${from.height}px;z-index:100000;transform-origin:0 0;`;
      wordmark.classList.add('intro-u-arriving');
      intro?.classList.add('is-leaving');
      wordmark.dataset.logoState = 'flying';
      animation = mark.animate([
        { transform: `translate3d(${from.left}px,${from.top}px,0) scale(1)` },
        { transform: `translate3d(${to.left}px,${to.top}px,0) scale(${to.width / from.width})` },
      ], { duration: 1250, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });
      animation.finished.then(finishIntro).catch(() => {});
    }, Math.max(0, 800 - age));
    fallbackTimer = setTimeout(finishIntro, Math.max(0, 2500 - age));
  } else finishIntro();

  intro?.querySelector('button')?.addEventListener('click', finishIntro, { signal });
  document.addEventListener('keydown', e => {
    if (!introComplete && (e.key === 'Escape' || e.key === 'Tab')) finishIntro();
  }, { signal });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { finishIntro(); cancelAnimationFrame(frame); frame = 0; }
    else requestDraw();
  }, { signal });
  scroller.addEventListener('scroll', () => { if (!introComplete) finishIntro(); }, { signal, passive: true });
  window.addEventListener('resize', () => { finishIntro(); requestDraw(); }, { signal, passive: true });
  window.addEventListener('pagehide', cleanup, { signal });
  document.addEventListener('astro:before-swap', cleanup, { signal });
  reduced.addEventListener('change', () => { if (reduced.matches) cleanup(); }, { signal });
  let moved = false;
  control.addEventListener('pointerdown', e => {
    if (!e.isPrimary || e.button !== 0 || !revealed) return;
    moved = false;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, yaw, pitch, touch: e.pointerType === 'touch' };
    control.setPointerCapture(e.pointerId);
    control.classList.add('is-dragging');
  }, { signal });
  control.addEventListener('pointermove', e => {
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 4) moved = true;
    const sensitivity = Math.PI / Math.max(slot.clientWidth, 64);
    yaw = drag.yaw + dx * sensitivity;
    // Vertical touch gestures remain native page scrolling.
    pitch = drag.touch ? drag.pitch : Math.max(-.65, Math.min(.65, drag.pitch + dy * sensitivity * .5));
    requestDraw();
  }, { signal });
  function endDrag() {
    drag = undefined;
    control.classList.remove('is-dragging');
  }
  control.addEventListener('lostpointercapture', endDrag, { signal });
  control.addEventListener('pointercancel', endDrag, { signal });
  control.addEventListener('pointerup', e => {
    if (control.hasPointerCapture(e.pointerId)) control.releasePointerCapture(e.pointerId);
    endDrag();
  }, { signal });
  control.addEventListener('click', e => {
    if (moved && e.detail !== 0) return;
    yaw = pitch = 0;
    requestDraw();
  }, { signal });
  control.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home'].includes(e.key)) return;
    e.preventDefault();
    if (e.key === 'Home') yaw = pitch = 0;
    if (e.key === 'ArrowLeft') yaw -= .2;
    if (e.key === 'ArrowRight') yaw += .2;
    if (e.key === 'ArrowUp') pitch = Math.max(-.65, pitch - .1);
    if (e.key === 'ArrowDown') pitch = Math.min(.65, pitch + .1);
    requestDraw();
  }, { signal });
  themeObserver = new MutationObserver(requestDraw);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['class'] });
  resizeObserver = new ResizeObserver(requestDraw);
  resizeObserver.observe(slot);
  resizeObserver.observe(scroller);

  const bytes = fetch('/models/auden-u.glb', { signal }).then(response => {
    if (!response.ok) throw new Error('Logo unavailable');
    return response.arrayBuffer();
  });
  loadTimer = setTimeout(cleanup, 10000);
  void Promise.all([import('./auden-logo-scene'), bytes, introDone]).then(async ([{ mountLogo }, data]) => {
    // Let the landing paint before allocating the GPU environment or compiling shaders.
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    if (signal.aborted) return;
    host.style.opacity = '0';
    slot.append(host);
    scene = await mountLogo(host, signal, cleanup, data);
    if (signal.aborted) { scene.dispose(); return; }
    clearTimeout(loadTimer);
    drawLogo();
    requestAnimationFrame(() => { if (!stopped) host.style.opacity = '1'; });
    revealTimer = setTimeout(() => { revealed = true; wordmark.classList.remove('intro-u-arriving'); requestDraw(); }, 240);
    performance.mark('auden:3d-ready');
  }).catch(() => {
    clearTimeout(loadTimer);
    scene?.dispose();
    host.remove();
    restoreLetters();
    // Preserve the short vector intro and the original letters if 3D is unavailable.
  });
}
