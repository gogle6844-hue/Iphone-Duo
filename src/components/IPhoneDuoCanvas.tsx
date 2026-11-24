import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { PhoneColorId } from '../types.ts';

export type CameraPresetId = 'official' | 'front' | 'rear' | 'hinge' | 'top';

interface IPhoneDuoCanvasProps {
  colorId: PhoneColorId;
  foldAngle: number; // 0 (folded) .. 180 (unfolded)
  cameraPreset: CameraPresetId;
  cameraPresetTick: number;
  autoRotate: boolean;
  onModelLoaded?: () => void;
}

const CAMERA_PRESETS: Record<
  CameraPresetId,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  official: { pos: [1.18, 0.30, -2.82], target: [0, 0, 0] },
  front: { pos: [0, 0.06, -3.15], target: [0, 0, 0] },
  rear: { pos: [-1.15, 0.22, 2.85], target: [0, 0, 0] },
  hinge: { pos: [2.45, 0.36, 1.35], target: [0, 0, 0] },
  top: { pos: [0, 2.85, -1.25], target: [0, 0, 0] },
};

// Inverse smoothstep (3u^2 - 2u^3) matching the baked Blender fold curve (t = 0..2s)
function foldAngleToClipTime(foldAngle: number): number {
  const clamped = Math.max(0, Math.min(180, foldAngle));
  if (clamped >= 180) return 0;
  if (clamped <= 0) return 2.0;
  const y = (180 - clamped) / 180;
  const u = 0.5 - Math.cos((Math.acos(1 - 2 * y) + Math.PI) / 3);
  return 2.0 * u;
}

// Reusable color helpers outside render loop (zero GC)
const _targetCamPos = new THREE.Vector3();
const _targetCamLook = new THREE.Vector3();
const _tmpColor = new THREE.Color();

function applyColorFinishToModel(root: THREE.Object3D, colorId: PhoneColorId) {
  const isStarWhite = colorId === 'starwhite';

  const palette = isStarWhite
    ? {
        frostedGlass: '#f3f4f6',
        tintedGlass: '#e2e5ea',
        titanium: '#e6e8ec',
        titaniumMetalness: 0.94,
        titaniumRoughness: 0.15,
        metalTint: '#dcdfe4',
        plasticAntena: '#cbd5e1',
        screw: '#94a3b8',
        displayFrame: '#121316',
        rubber: '#111215',
      }
    : {
        frostedGlass: '#11192c',
        tintedGlass: '#17233b',
        titanium: '#1f2b42',
        titaniumMetalness: 0.90,
        titaniumRoughness: 0.19,
        metalTint: '#1a253a',
        plasticAntena: '#26344d',
        screw: '#475569',
        displayFrame: '#090b10',
        rubber: '#090a0d',
      };

  root.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

    mats.forEach((mat) => {
      if (!mat || !(mat instanceof THREE.MeshStandardMaterial)) return;
      const name = mat.name;

      if (name === 'Frosted glass') {
        _tmpColor.set(palette.frostedGlass);
        mat.color.copy(_tmpColor);
        mat.transparent = false;
        mat.opacity = 1;
        mat.depthWrite = true;
        mat.roughness = isStarWhite ? 0.38 : 0.42;
        mat.metalness = isStarWhite ? 0.05 : 0.1;
        mat.envMapIntensity = 1.2;
        mat.needsUpdate = true;
      } else if (name === 'Tinted glass') {
        _tmpColor.set(palette.tintedGlass);
        mat.color.copy(_tmpColor);
        mat.transparent = false;
        mat.opacity = 1;
        mat.depthWrite = true;
        mat.roughness = 0.04;
        mat.metalness = isStarWhite ? 0.08 : 0.14;
        mat.envMapIntensity = 1.4;
        mat.needsUpdate = true;
      } else if (name === 'Titanium') {
        _tmpColor.set(palette.titanium);
        mat.color.copy(_tmpColor);
        mat.metalness = palette.titaniumMetalness;
        mat.roughness = palette.titaniumRoughness;
        if (mat instanceof THREE.MeshPhysicalMaterial) {
          mat.anisotropy = 0.75;
        }
        mat.envMapIntensity = 1.35;
        mat.needsUpdate = true;
      } else if (name === 'Metal tint') {
        _tmpColor.set(palette.metalTint);
        mat.color.copy(_tmpColor);
        mat.metalness = 0.88;
        mat.roughness = 0.14;
        mat.envMapIntensity = 1.3;
        mat.needsUpdate = true;
      } else if (name === 'Plastic antena') {
        _tmpColor.set(palette.plasticAntena);
        mat.color.copy(_tmpColor);
        mat.roughness = 0.25;
        mat.needsUpdate = true;
      } else if (name === 'Metal Screw') {
        _tmpColor.set(palette.screw);
        mat.color.copy(_tmpColor);
        mat.metalness = 0.92;
        mat.roughness = 0.16;
        mat.needsUpdate = true;
      } else if (name === 'Display Frame') {
        _tmpColor.set(palette.displayFrame);
        mat.color.copy(_tmpColor);
        mat.roughness = 0.24;
        mat.needsUpdate = true;
      } else if (name === 'Rubber') {
        _tmpColor.set(palette.rubber);
        mat.color.copy(_tmpColor);
        mat.needsUpdate = true;
      } else if (name === 'OLED IN' || name === 'OLED') {
        mat.emissiveIntensity = 1.15;
        mat.roughness = 0.06;
        mat.envMapIntensity = 0.9;
        mat.needsUpdate = true;
      }
    });
  });
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 122);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.58)');
    grad.addColorStop(0.45, 'rgba(0, 0, 0, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export const IPhoneDuoCanvas: React.FC<IPhoneDuoCanvasProps> = ({
  colorId,
  foldAngle,
  cameraPreset,
  cameraPresetTick,
  autoRotate,
  onModelLoaded,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Mutable refs for live state without re-initializing WebGL
  const colorIdRef = useRef<PhoneColorId>(colorId);
  const targetFoldTimeRef = useRef<number>(foldAngleToClipTime(foldAngle));
  const autoRotateRef = useRef<boolean>(autoRotate);
  const onModelLoadedRef = useRef(onModelLoaded);

  const modelRootRef = useRef<THREE.Object3D | null>(null);
  const requestRenderRef = useRef<(() => void) | null>(null);
  const cameraTransitionRef = useRef<{
    active: boolean;
    targetPos: THREE.Vector3;
    targetLook: THREE.Vector3;
  }>({
    active: false,
    targetPos: new THREE.Vector3(...CAMERA_PRESETS.official.pos),
    targetLook: new THREE.Vector3(...CAMERA_PRESETS.official.target),
  });

  useEffect(() => {
    onModelLoadedRef.current = onModelLoaded;
  }, [onModelLoaded]);

  useEffect(() => {
    colorIdRef.current = colorId;
    if (modelRootRef.current) {
      applyColorFinishToModel(modelRootRef.current, colorId);
      requestRenderRef.current?.();
    }
  }, [colorId]);

  useEffect(() => {
    targetFoldTimeRef.current = foldAngleToClipTime(foldAngle);
    requestRenderRef.current?.();
  }, [foldAngle]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
    requestRenderRef.current?.();
  }, [autoRotate]);

  useEffect(() => {
    const preset = CAMERA_PRESETS[cameraPreset];
    if (!preset) return;
    cameraTransitionRef.current.targetPos.set(...preset.pos);
    cameraTransitionRef.current.targetLook.set(...preset.target);
    cameraTransitionRef.current.active = true;
    requestRenderRef.current?.();
  }, [cameraPreset, cameraPresetTick]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL cleanly and free probe context
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 2. Scene, Camera & Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(...CAMERA_PRESETS.official.pos);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.outline = 'none';
    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // 4. Studio Lighting Rig (Warm key + cool fill + rim + optional softbox RectAreaLights)
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x0f172a, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(3.2, 4.8, 4.2);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.camera.left = -2.5;
    keyLight.shadow.camera.right = 2.5;
    keyLight.shadow.camera.top = 2.5;
    keyLight.shadow.camera.bottom = -2.5;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 1.35);
    rimLight.position.set(-3.5, 2.5, -3.5);
    scene.add(rimLight);

    const rectLights: THREE.RectAreaLight[] = [];
    if (!isSoftwareGl) {
      RectAreaLightUniformsLib.init();
      const softboxLeft = new THREE.RectAreaLight(0xffffff, 2.2, 3.5, 4.5);
      softboxLeft.position.set(-3.2, 1.8, 2.8);
      softboxLeft.lookAt(0, 0, 0);
      scene.add(softboxLeft);
      rectLights.push(softboxLeft);

      const softboxTop = new THREE.RectAreaLight(0xe0f2fe, 1.8, 4.5, 2.5);
      softboxTop.position.set(0.5, 4.0, 0.5);
      softboxTop.lookAt(0, 0, 0);
      scene.add(softboxTop);
      rectLights.push(softboxTop);
    }

    // 5. Contact Shadow Plane (grounded feel)
    const shadowTex = createContactShadowTexture();
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.28;
    scene.add(shadowPlane);

    // 6. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.minDistance = 1.55;
    controls.maxDistance = 6.2;
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.target.set(0, 0, 0);

    // Cancel scripted camera transition when user interacts manually
    const onControlsStart = () => {
      cameraTransitionRef.current.active = false;
    };
    controls.addEventListener('start', onControlsStart);

    // 7. Animation & Coalesced On-Demand Render Loop
    let mixer: THREE.AnimationMixer | null = null;
    let foldAction: THREE.AnimationAction | null = null;
    let currentFoldTime = targetFoldTimeRef.current;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let disposed = false;
    let lastTimestamp = performance.now();

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const requestRender = () => {
      if (disposed) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        if (disposed) return;
        renderDirty = false;

        const delta = Math.min(0.05, Math.max(0.001, (now - lastTimestamp) / 1000));
        lastTimestamp = now;

        let needsMoreFrames = false;

        // Smooth fold animation damping
        if (mixer && foldAction) {
          const diff = Math.abs(targetFoldTimeRef.current - currentFoldTime);
          if (diff > 0.0005) {
            currentFoldTime = THREE.MathUtils.damp(
              currentFoldTime,
              targetFoldTimeRef.current,
              7.5,
              delta
            );
            foldAction.time = currentFoldTime;
            mixer.update(0);
            needsMoreFrames = true;
          } else if (diff > 0) {
            currentFoldTime = targetFoldTimeRef.current;
            foldAction.time = currentFoldTime;
            mixer.update(0);
          }
        }

        // Smooth camera preset transition
        if (cameraTransitionRef.current.active) {
          const posDist = camera.position.distanceTo(cameraTransitionRef.current.targetPos);
          const lookDist = controls.target.distanceTo(cameraTransitionRef.current.targetLook);

          if (posDist > 0.01 || lookDist > 0.01) {
            const alpha = 1 - Math.exp(-6.5 * delta);
            _targetCamPos.copy(cameraTransitionRef.current.targetPos);
            _targetCamLook.copy(cameraTransitionRef.current.targetLook);
            camera.position.lerp(_targetCamPos, alpha);
            controls.target.lerp(_targetCamLook, alpha);
            needsMoreFrames = true;
          } else {
            camera.position.copy(cameraTransitionRef.current.targetPos);
            controls.target.copy(cameraTransitionRef.current.targetLook);
            cameraTransitionRef.current.active = false;
          }
        }

        // Optional turntable auto-rotate (disabled on software WebGL)
        controls.autoRotate = !isSoftwareGl && autoRotateRef.current;
        controls.autoRotateSpeed = 1.6;
        const controlsMoved = controls.update();
        if (controlsMoved || controls.autoRotate) {
          needsMoreFrames = true;
        }

        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (!disposed && (renderDirty || needsMoreFrames)) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    };

    requestRenderRef.current = requestRender;

    const onControlsChange = () => {
      requestRender();
    };
    controls.addEventListener('change', onControlsChange);

    // 8. Load the user-provided iPhone Ultra9.glb model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const loader = new GLTFLoader();
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    loader.load(
      '/models/iphone_duo.glb',
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;
        modelRootRef.current = model;

        // Setup textures & shadows
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = !isSoftwareGl;
            mesh.receiveShadow = !isSoftwareGl;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              if (!m) return;
              const std = m as THREE.MeshStandardMaterial;
              if (std.map) std.map.anisotropy = maxAnisotropy;
              if (std.normalMap) std.normalMap.anisotropy = maxAnisotropy;
              if (std.roughnessMap) std.roughnessMap.anisotropy = maxAnisotropy;
            });
          }
        });

        // Apply active Night Sky / Star White finish
        applyColorFinishToModel(model, colorIdRef.current);

        // Setup folding skeletal animation clip
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          foldAction = mixer.clipAction(gltf.animations[0]);
          foldAction.play();
          foldAction.paused = true;
          foldAction.time = 0; // Measure unfolded bounding box first
          mixer.update(0);
        }

        // Compute normalized scale and center pivot cleanly
        model.updateMatrixWorld(true);
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const targetSize = 2.25;
        const scale = targetSize / maxDim;

        model.scale.setScalar(scale);
        model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        modelGroup.add(model);

        // Position contact shadow directly under phone
        const scaledHeight = size.y * scale;
        shadowPlane.position.y = -(scaledHeight / 2) - 0.16;

        // Snap to initial requested fold time
        if (mixer && foldAction) {
          currentFoldTime = targetFoldTimeRef.current;
          foldAction.time = currentFoldTime;
          mixer.update(0);
        }

        // Pre-warm shaders once on hardware GPU
        if (!isSoftwareGl) {
          renderer.compile(scene, camera);
        }

        setIsLoaded(true);
        onModelLoadedRef.current?.();
        requestRender();
      },
      (progress) => {
        if (progress.total > 0) {
          setLoadProgress(Math.round((progress.loaded / progress.total) * 100));
        }
      },
      (error) => {
        console.error('Failed to load GLB model:', error);
        if (!disposed) {
          setLoadError('3D 모델을 불러오지 못했습니다.');
        }
      }
    );

    // 9. ResizeObserver for responsive viewport
    const handleResize = () => {
      if (!container || disposed) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      requestRender();
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initial render
    requestRender();

    // 10. Proper Cleanup on Unmount
    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlsStart);
      controls.removeEventListener('change', onControlsChange);
      controls.dispose();

      if (modelRootRef.current) {
        modelRootRef.current.traverse((obj) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            mesh.geometry?.dispose();
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              if (!m) return;
              const std = m as THREE.MeshStandardMaterial;
              std.map?.dispose();
              std.normalMap?.dispose();
              std.roughnessMap?.dispose();
              std.metalnessMap?.dispose();
              std.emissiveMap?.dispose();
              m.dispose();
            });
          }
        });
      }

      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      envTarget.dispose();
      rectLights.forEach((l) => l.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Isolated WebGL Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="iPhone Duo 3D 모델 뷰어"
      />

      {/* Loading Indicator (no backdrop-blur over WebGL) */}
      {!isLoaded && !loadError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ backgroundColor: 'rgba(6, 8, 12, 0.72)' }}
        >
          <div className="w-44 h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-sky-400 transition-all duration-200"
              style={{ width: `${Math.max(12, loadProgress)}%` }}
            />
          </div>
          <p className="text-xs font-medium text-neutral-300 tracking-wide">
            3D 하드웨어 모델 로딩 중... {loadProgress > 0 ? `${loadProgress}%` : ''}
          </p>
        </div>
      )}

      {/* Error State */}
      {loadError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/90 text-rose-400 text-xs">
          {loadError}
        </div>
      )}
    </div>
  );
};
