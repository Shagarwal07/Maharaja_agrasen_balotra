import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RefreshCw } from 'lucide-react';
import type { Language } from '../data/translations';

interface Agrasen3DViewerProps {
  lang: Language;
  onOfferFlowers?: () => void;
}

const isWebGLAvailable = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
};

export const Agrasen3DViewer: React.FC<Agrasen3DViewerProps> = ({
  lang,
  onOfferFlowers
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglError] = useState(() => !isWebGLAvailable());
  const [loading, setLoading] = useState(true);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const haloRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const reqAnimRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  // Scroll animation target & current states for smooth lerping
  const scrollRotationRef = useRef<number>(0);
  const currentScrollRotationRef = useRef<number>(0);
  const scrollTiltRef = useRef<number>(0);
  const currentScrollTiltRef = useRef<number>(0);

  // Cinematic opening entrance state
  const entranceStartTimeRef = useRef<number | null>(null);
  const hasEnteredRef = useRef<boolean>(false);

  // Listen to window scroll for dynamic 3D animated movement
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // Smooth dynamic rotation based on scroll position
      scrollRotationRef.current = scrollY * 0.0028;
      scrollTiltRef.current = Math.sin(scrollY * 0.0018) * 0.12;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize and Render Scene
  useEffect(() => {
    if (webglError) {
      setLoading(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 440;
    const height = container.clientHeight || 440;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup - isometric durbar perspective matching the royal portrait
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    // Opening entrance starts slightly higher and back, gliding smoothly into target (0, 1.25, 4.80)
    camera.position.set(0, 1.48, 5.3);
    cameraRef.current = camera;

    // 3. Renderer with high performance & capped pixel ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Orbit Controls (Manual 360° Drag)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = false; // We animate primarily through organic float & scroll
    controls.minDistance = 3.2;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.06;
    controls.minPolarAngle = 0.25;
    controls.target.set(0, 0.52, 0); // Center of rotation focused on Maharaj Ji
    controlsRef.current = controls;

    // 5. Divine Vibrant Lighting System
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.8);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    mainKeyLight.position.set(3, 5, 4);
    mainKeyLight.castShadow = true;
    scene.add(mainKeyLight);

    const goldenRimLight = new THREE.DirectionalLight(0xdfbd74, 2.0);
    goldenRimLight.position.set(-3, 3, -3);
    scene.add(goldenRimLight);

    const frontFillLight = new THREE.PointLight(0xffedd5, 1.5, 8);
    frontFillLight.position.set(0, 1.0, 3.2);
    scene.add(frontFillLight);

    // 6. White Marble Royal Platform with Subtle Gold Inlays (Proportioned to cradle the throne)
    const pedestalGroup = new THREE.Group();

    // Generate Procedural White Makrana Marble with Inlaid Gold Geometries
    const marbleCanvas = document.createElement('canvas');
    marbleCanvas.width = 1024;
    marbleCanvas.height = 1024;
    const mCtx = marbleCanvas.getContext('2d');
    if (mCtx) {
      // Pristine White Marble Base
      mCtx.fillStyle = '#FAF9F6';
      mCtx.fillRect(0, 0, 1024, 1024);

      // Delicate Warm Grey Marble Veins
      mCtx.strokeStyle = 'rgba(215, 210, 200, 0.35)';
      mCtx.lineWidth = 2.0;
      mCtx.beginPath();
      mCtx.moveTo(120, 0);
      mCtx.bezierCurveTo(320, 350, 480, 600, 960, 1024);
      mCtx.stroke();

      mCtx.strokeStyle = 'rgba(230, 224, 214, 0.3)';
      mCtx.lineWidth = 2.5;
      mCtx.beginPath();
      mCtx.moveTo(900, 0);
      mCtx.bezierCurveTo(680, 420, 480, 720, 60, 1024);
      mCtx.stroke();

      // Outer Royal Gold Inlay Ring
      mCtx.strokeStyle = '#D4AF37';
      mCtx.lineWidth = 6;
      mCtx.beginPath();
      mCtx.arc(512, 512, 480, 0, Math.PI * 2);
      mCtx.stroke();

      // Thin Inner Gold Accent Ring
      mCtx.strokeStyle = 'rgba(223, 189, 116, 0.85)';
      mCtx.lineWidth = 2.5;
      mCtx.beginPath();
      mCtx.arc(512, 512, 460, 0, Math.PI * 2);
      mCtx.stroke();

      // Inner Sacred Royal Mandala Inlay
      mCtx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
      mCtx.lineWidth = 2.0;
      mCtx.beginPath();
      mCtx.arc(512, 512, 340, 0, Math.PI * 2);
      mCtx.stroke();

      // 8-Pointed Star Inlay Pattern
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        mCtx.beginPath();
        mCtx.moveTo(512 + Math.cos(angle) * 340, 512 + Math.sin(angle) * 340);
        mCtx.lineTo(512 + Math.cos(angle + Math.PI / 8) * 460, 512 + Math.sin(angle + Math.PI / 8) * 460);
        mCtx.stroke();
      }

      // Center Lotus Inlay Outline
      mCtx.strokeStyle = 'rgba(223, 189, 116, 0.45)';
      mCtx.lineWidth = 1.5;
      mCtx.beginPath();
      mCtx.arc(512, 512, 180, 0, Math.PI * 2);
      mCtx.stroke();
    }

    const marbleTexture = new THREE.CanvasTexture(marbleCanvas);
    marbleTexture.colorSpace = THREE.SRGBColorSpace;

    // Platform Material: White Polished Marble
    const marbleMat = new THREE.MeshStandardMaterial({
      map: marbleTexture,
      roughness: 0.22,
      metalness: 0.08
    });

    // Gold Trim Material for Bevels
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xdfbd74,
      metalness: 0.9,
      roughness: 0.2
    });

    // Sleek White Marble Platform (Proportioned so the entire dais is visible with zero cut)
    const daisGeo = new THREE.CylinderGeometry(1.50, 1.60, 0.07, 64);
    const daisMesh = new THREE.Mesh(daisGeo, marbleMat);
    daisMesh.position.y = -0.48;
    daisMesh.receiveShadow = true;
    pedestalGroup.add(daisMesh);

    // Beveled Gold Trim along the bottom & top rims
    const lowerGoldRing = new THREE.TorusGeometry(1.58, 0.015, 16, 64);
    const lowerGoldMesh = new THREE.Mesh(lowerGoldRing, goldTrimMat);
    lowerGoldMesh.rotation.x = Math.PI / 2;
    lowerGoldMesh.position.y = -0.515;
    pedestalGroup.add(lowerGoldMesh);

    const upperGoldRing = new THREE.TorusGeometry(1.50, 0.013, 16, 64);
    const upperGoldMesh = new THREE.Mesh(upperGoldRing, goldTrimMat);
    upperGoldMesh.rotation.x = Math.PI / 2;
    upperGoldMesh.position.y = -0.445;
    pedestalGroup.add(upperGoldMesh);

    // Realistic Soft Ambient Occlusion / Drop Shadow Plane right on the marble
    const shadowGeo = new THREE.PlaneGeometry(2.8, 2.8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const sGrad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 120);
      sGrad.addColorStop(0, 'rgba(30, 20, 10, 0.55)');
      sGrad.addColorStop(0.5, 'rgba(50, 35, 20, 0.28)');
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = sGrad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.44;
    pedestalGroup.add(shadowMesh);

    scene.add(pedestalGroup);

    // 7. Celestial Golden Aura / Halo behind Maharaj Ji
    const haloTextureCanvas = document.createElement('canvas');
    haloTextureCanvas.width = 512;
    haloTextureCanvas.height = 512;
    const hCtx = haloTextureCanvas.getContext('2d');
    if (hCtx) {
      const grad = hCtx.createRadialGradient(256, 256, 40, 256, 256, 250);
      grad.addColorStop(0, 'rgba(255, 235, 170, 0.95)');
      grad.addColorStop(0.35, 'rgba(223, 189, 116, 0.7)');
      grad.addColorStop(0.7, 'rgba(197, 160, 89, 0.35)');
      grad.addColorStop(1, 'rgba(101, 0, 21, 0)');
      hCtx.fillStyle = grad;
      hCtx.beginPath();
      hCtx.arc(256, 256, 250, 0, Math.PI * 2);
      hCtx.fill();

      // Sacred Radiance Rays
      hCtx.strokeStyle = 'rgba(255, 245, 210, 0.65)';
      hCtx.lineWidth = 2.5;
      for (let i = 0; i < 36; i++) {
        const angle = (i * Math.PI) / 18;
        hCtx.beginPath();
        hCtx.moveTo(256 + Math.cos(angle) * 70, 256 + Math.sin(angle) * 70);
        hCtx.lineTo(256 + Math.cos(angle) * 235, 256 + Math.sin(angle) * 235);
        hCtx.stroke();
      }
    }

    const haloTexture = new THREE.CanvasTexture(haloTextureCanvas);
    const haloGeo = new THREE.PlaneGeometry(2.8, 2.8);
    const haloMat = new THREE.MeshBasicMaterial({
      map: haloTexture,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.set(0, 0.82, -0.35);
    scene.add(haloMesh);
    haloRef.current = haloMesh;

    // 8. Floating Golden Blessing Particles
    const particleCount = 55;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 1.8;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = -0.5 + Math.random() * 2.8;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds[i] = 0.003 + Math.random() * 0.005;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const pGrad = pCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
      pGrad.addColorStop(0, 'rgba(255, 250, 210, 1)');
      pGrad.addColorStop(0.4, 'rgba(255, 195, 50, 0.8)');
      pGrad.addColorStop(1, 'rgba(255, 160, 0, 0)');
      pCtx.fillStyle = pGrad;
      pCtx.beginPath();
      pCtx.arc(32, 32, 30, 0, Math.PI * 2);
      pCtx.fill();
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);
    const pMat = new THREE.PointsMaterial({
      size: 0.12,
      map: pTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particles = new THREE.Points(particleGeo, pMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 9. Load Maharaja Agrasen 3D Model with Authentic Vibrant Colors
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Texture loader
    const textureLoader = new THREE.TextureLoader();

    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      '/models/maharaja_agrasen.glb',
      (gltf) => {
        const root = gltf.scene;

        // Auto-scale and center bounding box comfortably in frame (not too zoomed in)
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        const targetHeight = 2.38;
        const scale = targetHeight / Math.max(size.y, 0.001);
        root.scale.setScalar(scale);

        // Stand firmly atop the royal marble pedestal
        root.position.x = -center.x * scale;
        root.position.y = -box.min.y * scale - 0.47;
        const goldStatueMaterial = new THREE.MeshStandardMaterial({
          color: 0xe5c278,
          metalness: 0.85,
          roughness: 0.26,
          side: THREE.DoubleSide
        });

        // Check if authentic texture_diffuse.jpg exists
        textureLoader.load(
          '/models/texture_diffuse.jpg',
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.flipY = false; // GLTF native UV standard
            const colorfulMaterial = new THREE.MeshStandardMaterial({
              map: texture,
              roughness: 0.55,
              metalness: 0.1,
              side: THREE.DoubleSide
            });

            root.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh;
                m.castShadow = true;
                m.receiveShadow = true;
                m.material = colorfulMaterial;
              }
            });

            modelGroup.clear();
            modelGroup.add(root);
            entranceStartTimeRef.current = performance.now();
            setLoading(false);
          },
          undefined,
          () => {
            // Keep gold statue finish with clean native UVs until texture_diffuse.jpg is added
            root.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const m = child as THREE.Mesh;
                m.castShadow = true;
                m.receiveShadow = true;
                m.material = goldStatueMaterial;
              }
            });

            modelGroup.clear();
            modelGroup.add(root);
            entranceStartTimeRef.current = performance.now();
            setLoading(false);
          }
        );
      },
      undefined,
      (err) => {
        console.warn('GLB load error:', err);
        console.warn('GLB load error, using high-res visual:', err);
        // Fallback to high-res textured depth card
        textureLoader.load('/maharaja_agrasen_3d.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          const aspect = texture.image.width / texture.image.height;
          const meshHeight = 2.4;
          const meshWidth = meshHeight * aspect;

          const planeGeo = new THREE.PlaneGeometry(meshWidth, meshHeight);
          const planeMat = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            roughness: 0.4,
            metalness: 0.1,
            side: THREE.DoubleSide
          });
          const reliefMesh = new THREE.Mesh(planeGeo, planeMat);
          reliefMesh.position.set(0, meshHeight / 2 - 0.47, 0.02);

          modelGroup.clear();
          modelGroup.add(reliefMesh);
          entranceStartTimeRef.current = performance.now();
          setLoading(false);
        });
      }
    );

    // 10. IntersectionObserver to PAUSE rendering when scrolled out of view (0% CPU/GPU waste)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // 11. Animation Loop with Smooth Animated Scroll Rotation
    const clock = new THREE.Clock();
    const animate = () => {
      reqAnimRef.current = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp scroll rotation & tilt
      currentScrollRotationRef.current += (scrollRotationRef.current - currentScrollRotationRef.current) * 0.08;
      currentScrollTiltRef.current += (scrollTiltRef.current - currentScrollTiltRef.current) * 0.08;

      const now = performance.now();
      // Cool opening cinematic entrance swoop & elevation settle
      if (entranceStartTimeRef.current !== null) {
        const elapsedSec = (now - entranceStartTimeRef.current) / 1800; // 1.8s duration
        if (elapsedSec < 1) {
          // Smooth cubic ease out
          const ease = 1 - Math.pow(1 - elapsedSec, 3);

          // Smooth camera glide from initial (0, 1.48, 5.3) to target isometric durbar view (0, 1.25, 4.80)
          camera.position.y = 1.48 - (1.48 - 1.25) * ease;
          camera.position.z = 5.3 - (5.3 - 4.80) * ease;

          if (modelGroupRef.current) {
            modelGroupRef.current.position.y = (0.04 * (1 - ease)) + (Math.sin(elapsedTime * 1.5) * 0.025) * ease;
            modelGroupRef.current.rotation.y = currentScrollRotationRef.current;
            modelGroupRef.current.rotation.x = currentScrollTiltRef.current * ease;
          }

          // Celestial halo expands gently with radiant warmth
          if (haloRef.current) {
            const hScale = 0.65 + 0.35 * ease;
            haloRef.current.scale.set(hScale, hScale, 1);
          }
        } else {
          hasEnteredRef.current = true;
          entranceStartTimeRef.current = null;
          camera.position.y = 1.25;
          camera.position.z = 4.80;
          if (haloRef.current) haloRef.current.scale.set(1, 1, 1);
        }
      } else {
        // Normal post-entrance animation: continuous gentle breathing float + dynamic scroll rotation
        if (modelGroupRef.current) {
          modelGroupRef.current.position.y = Math.sin(elapsedTime * 1.5) * 0.025;
          modelGroupRef.current.rotation.y = currentScrollRotationRef.current;
          modelGroupRef.current.rotation.x = currentScrollTiltRef.current;
        }
      }

      // Slowly rotate celestial halo
      if (haloRef.current) {
        haloRef.current.rotation.z = elapsedTime * 0.12;
      }

      // Float golden blessing particles upward
      if (particlesRef.current) {
        const posAttr = particlesRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          arr[i * 3 + 1] += speeds[i];
          if (arr[i * 3 + 1] > 2.5) {
            arr[i * 3 + 1] = -0.5;
          }
        }
        posAttr.needsUpdate = true;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (reqAnimRef.current) {
        cancelAnimationFrame(reqAnimRef.current);
      }
      dracoLoader.dispose();
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [webglError]);

  return (
    <div
      className="agrasen-viewer-root"
      onDoubleClick={onOfferFlowers}
      title={lang === 'hi' ? 'श्रद्धांजलि अर्पित करने हेतु डबल-क्लिक करें ❤️ | 360° घुमाने हेतु ड्रैग करें' : 'Double-click to offer tribute ❤️ | Drag for 360° rotation'}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        overflow: 'visible'
      }}
    >
      {/* 3D WebGL Canvas Container with Seamless Feather Mask (Zero Cut Borders) */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          touchAction: 'none',
          WebkitMaskImage: 'radial-gradient(ellipse 94% 90% at 50% 48%, black 72%, transparent 98%)',
          maskImage: 'radial-gradient(ellipse 94% 90% at 50% 48%, black 72%, transparent 98%)'
        }}
      />

      {/* Subtle, non-intrusive 360° Darshan Indicator */}
      {!loading && !webglError && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            background: 'rgba(255, 255, 255, 0.78)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '20px',
            padding: '2px 10px',
            fontSize: '10px',
            fontWeight: 700,
            color: '#7C2D12',
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            userSelect: 'none',
            boxShadow: '0 2px 8px rgba(101, 0, 21, 0.08)',
            opacity: 0.92,
            transition: 'opacity 0.3s ease'
          }}
        >
          <span style={{ fontSize: '11px' }}>🔄</span>
          <span>{lang === 'hi' ? '360° दिव्य दर्शन • ड्रैग करें' : '360° Divine Darshan • Drag'}</span>
        </div>
      )}

      {/* Fallback if WebGL not supported */}
      {webglError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/maharaja_agrasen_3d.png"
            alt="Maharaja Agrasen 3D Darshan"
            style={{
              maxHeight: '360px',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 14px 28px rgba(101, 0, 21, 0.3))'
            }}
          />
        </div>
      )}

      {/* Loading Indicator */}
      {loading && !webglError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            color: '#650015',
            fontWeight: 800,
            fontSize: '13px',
            gap: '8px',
            zIndex: 10
          }}
        >
          <RefreshCw size={18} className="animate-spin" />
          <span>{lang === 'hi' ? '3D दर्शन लोड हो रहा है...' : 'Loading 3D Darshan...'}</span>
        </div>
      )}
    </div>
  );
};
