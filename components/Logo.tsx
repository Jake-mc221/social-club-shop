'use client';
 
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
 
interface LogoProps {
  src?: string;
  width?: number;
  height?: number;
  autoRotateSpeed?: number;
  onLoad?: () => void;
}
 
export default function Logo({
  src = '/shield.glb',
  width = 400,
  height = 400,
  autoRotateSpeed = 10,
  onLoad,
}: LogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
 
    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
 
    // ── Scene ──
    const scene = new THREE.Scene();
    // No background — transparent so PixelBlast shows through
 
    // ── Environment map (critical for chrome/metallic reflections) ──
    // RoomEnvironment simulates an indoor studio — gives the model
    // something to reflect, making chrome look chrome instead of black
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;   // applies to ALL metallic materials
    scene.environmentIntensity = 0.8; // boost reflection strength
    pmremGenerator.dispose();
 
    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4);
 
    // ── Controls ──
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enableZoom = false;
    controls.enablePan = false;
 
    let idleTimer: ReturnType<typeof setTimeout>;
    const onStart = () => { controls.autoRotate = false; clearTimeout(idleTimer); };
    const onEnd   = () => { idleTimer = setTimeout(() => { controls.autoRotate = true; }, 3000); };
    controls.addEventListener('start', onStart);
    controls.addEventListener('end', onEnd);
 
    // ── Lighting ──
    // With an env map, you need less artificial lighting — let reflections do the work
    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(3, 5, 5);
    scene.add(key);
 
    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.5);
    fill.position.set(-4, 2, 2);
    scene.add(fill);
 
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(0, -2, -4);
    scene.add(rim);
 
    scene.add(new THREE.AmbientLight(0xffffff, 0.2));
 
    // ── Load GLB ──
    const loader = new GLTFLoader();
    loader.load(src, (gltf) => {
      onLoad?.();
      const model = gltf.scene;
 
      // Auto-center and scale
      const box    = new THREE.Box3().setFromObject(model);
      const size   = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const scale  = 2.5 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
 
      // Ensure all meshes are metallic so the env map kicks in
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
 
          // If the material isn't already metallic (AI tools sometimes export
        
        }
      });
 
      scene.add(model);
    });
 
    // ── Render loop ──
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
 
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(idleTimer);
      controls.removeEventListener('start', onStart);
      controls.removeEventListener('end', onEnd);
      controls.dispose();
      renderer.dispose();
    };
  }, [src, width, height, autoRotateSpeed]);
 
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ width, height }}
    />
  );
}