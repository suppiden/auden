import { ACESFilmicToneMapping, Box3, Color, DirectionalLight, Group, HemisphereLight, Mesh, MeshStandardMaterial, OrthographicCamera, PMREMGenerator, Scene, Vector3, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export interface LogoScene {
  render: (yaw: number, pitch: number, docked: number, accent?: number, nav?: number) => void;
  resize: () => void;
  dispose: () => void;
}

/** One canvas stays inside the interactive wordmark. No idle animation loop. */
export async function mountLogo(host: HTMLElement, signal: AbortSignal, onLost: () => void, modelData?: ArrayBuffer): Promise<LogoScene> {
  let data = modelData;
  if (!data) {
    const response = await fetch('/models/auden-u.glb', { signal });
    if (!response.ok) throw new Error('Auden logo unavailable');
    data = await response.arrayBuffer();
  }
  const gltf = await new GLTFLoader().parseAsync(data, '');
  const model = gltf.scene;
  const releaseModel = () => model.traverse(object => {
    if (!(object instanceof Mesh)) return;
    object.geometry.dispose();
    (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => m.dispose());
  });
  if (signal.aborted) { releaseModel(); throw new DOMException('Aborted', 'AbortError'); }
  let renderer: WebGLRenderer;
  try { renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch (error) { releaseModel(); throw error; }
  let disposed = false;
  let environment: ReturnType<PMREMGenerator['fromScene']> | undefined;
  let observer: ResizeObserver | undefined;
  const scene = new Scene();
  const materials: MeshStandardMaterial[] = [];
  const graphite = new Color('#626771');
  const ink = new Color();
  const pivot = new Group();
  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3());
  model.position.sub(box.getCenter(new Vector3()));
  pivot.add(model);
  scene.add(pivot);
  // Canvas extends 25% beyond the exact glyph on each side for rotation.
  const camera = new OrthographicCamera(-size.x * .75, size.x * .75, size.y * .75, -size.y * .75, .1, 40);
  camera.position.set(0, 0, 12);
  camera.lookAt(0, 0, 0);
  let pose = { yaw: 0, pitch: 0, docked: 1, accent: 0, nav: 0 };
  function render(yaw: number, pitch: number, docked: number, accent = 0, nav = 0) {
    if (disposed) return;
    pose = { yaw, pitch, docked, accent, nav };
    pivot.rotation.set(pitch, yaw, 0);
    ink.set(document.documentElement.classList.contains('dark') ? '#f0efeb' : '#191b20').lerp(new Color('#f0efeb'), nav);
    materials.forEach(m => { m.color.copy(graphite).lerp(ink, docked); m.metalness = .55 - .25 * docked; m.emissive.set('#ff4d00'); m.emissiveIntensity = accent; });
    renderer.render(scene, camera);
    host.dataset.yaw = yaw.toFixed(3);
  }
  function resize() {
    if (disposed) return;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(Math.max(host.clientWidth, 1), Math.max(host.clientHeight, 1), false);
    render(pose.yaw, pose.pitch, pose.docked, pose.accent, pose.nav);
  }
  function contextLost(event: Event) { event.preventDefault(); onLost(); }
  function dispose() {
    if (disposed) return;
    disposed = true;
    observer?.disconnect();
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    releaseModel();
    environment?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  }
  try {
    renderer.setClearColor(0, 0);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    host.append(renderer.domElement);
    const room = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    try { environment = pmrem.fromScene(room, .04, .1, 100, { size: 128 }); }
    finally { room.dispose(); pmrem.dispose(); }
    scene.environment = environment.texture;
    scene.environmentIntensity = 1.5;
    model.traverse(object => {
      if (!(object instanceof Mesh)) return;
      (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => {
        if (m instanceof MeshStandardMaterial) { m.roughness = .3; materials.push(m); }
      });
    });
    scene.add(new HemisphereLight(0xe5edff, 0x303039, 2));
    const key = new DirectionalLight(0xffffff, 3);
    key.position.set(-3, 4, 5); scene.add(key);
    const rim = new DirectionalLight(0xff7645, 1.6);
    rim.position.set(4, 1, -2); scene.add(rim);
    resize();
    observer = new ResizeObserver(resize);
    observer.observe(host);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    return { render, resize, dispose };
  } catch (error) { dispose(); throw error; }
}
