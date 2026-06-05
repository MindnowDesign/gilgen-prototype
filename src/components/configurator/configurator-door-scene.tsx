"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const MODEL_PATH = "/models/sliding-door.glb";
const TARGET_HEIGHT = 2.53;
const DISPLAY_SCALE = 0.98;

function fitModelToScene(model: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const scale = (TARGET_HEIGHT / size.y) * DISPLAY_SCALE;

  model.scale.setScalar(scale);
  model.updateMatrixWorld(true);

  const fittedBox = new THREE.Box3().setFromObject(model);
  const center = fittedBox.getCenter(new THREE.Vector3());

  model.position.set(-center.x, -fittedBox.min.y, -center.z);
}

function enableShadows(object: THREE.Object3D) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

export function ConfiguratorDoorScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvasHost = canvasHostRef.current;
    if (!wrapper || !canvasHost) return;

    let disposed = false;
    let frameId = 0;

    const width = wrapper.clientWidth;
    const height = wrapper.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(3.8, 2.4, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.72);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 18;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -1;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf4f6f8, 0.45);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const lookAtTarget = new THREE.Vector3(0, 1.05 * DISPLAY_SCALE, 0);
    camera.lookAt(lookAtTarget);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(lookAtTarget);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.update();

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;
        fitModelToScene(model);
        enableShadows(model);
        scene.add(model);

        const fittedBox = new THREE.Box3().setFromObject(model);
        lookAtTarget.y = fittedBox.getCenter(new THREE.Vector3()).y;
        controls.target.copy(lookAtTarget);
        controls.update();
      },
      undefined,
      (error) => {
        console.error("Failed to load door model:", error);
      }
    );

    const render = () => {
      frameId = requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      const nextWidth = wrapper.clientWidth;
      const nextHeight = wrapper.clientHeight;
      if (nextWidth === 0 || nextHeight === 0) return;
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(wrapper);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      observer.disconnect();
      controls.dispose();
      canvasHost.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative h-full max-h-[min(70vh,644px)] min-h-[368px] w-full cursor-grab active:cursor-grabbing"
    >
      <div ref={canvasHostRef} className="absolute inset-0" />
    </div>
  );
}
