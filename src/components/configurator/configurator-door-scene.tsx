"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import type { ConfiguratorColorId } from "@/components/configurator/configurator-colors";
import {
  applyFrameColor,
  prepareModelMaterials,
} from "@/components/configurator/configurator-frame-materials";
import { createConfiguratorSceneGrid } from "@/components/configurator/configurator-scene-grid";
import { cn } from "@/lib/utils";

const MODEL_PATH = "/models/sliding-door.glb";
const TARGET_HEIGHT = 2.53;
const DISPLAY_SCALE = 0.98 * 0.8;
const DEFAULT_CAMERA_DIRECTION = new THREE.Vector3(3.8, 2.4, 4.6).normalize();
const DEFAULT_VERTICAL_FRAME = -0.1;
const HORIZONTAL_VIEW_SHIFT = -0.03;

function getModelScreenCenter(
  model: THREE.Object3D,
  camera: THREE.PerspectiveCamera
) {
  const box = new THREE.Box3().setFromObject(model);
  const corners = [
    new THREE.Vector3(box.min.x, box.min.y, box.min.z),
    new THREE.Vector3(box.min.x, box.min.y, box.max.z),
    new THREE.Vector3(box.min.x, box.max.y, box.min.z),
    new THREE.Vector3(box.min.x, box.max.y, box.max.z),
    new THREE.Vector3(box.max.x, box.min.y, box.min.z),
    new THREE.Vector3(box.max.x, box.min.y, box.max.z),
    new THREE.Vector3(box.max.x, box.max.y, box.min.z),
    new THREE.Vector3(box.max.x, box.max.y, box.max.z),
  ];

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const corner of corners) {
    const projected = corner.clone().project(camera);
    minX = Math.min(minX, projected.x);
    maxX = Math.max(maxX, projected.x);
    minY = Math.min(minY, projected.y);
    maxY = Math.max(maxY, projected.y);
  }

  return {
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };
}

function applyViewCentering(
  camera: THREE.PerspectiveCamera,
  model: THREE.Object3D,
  width: number,
  height: number,
  pixelRatio: number,
  expanded: boolean,
  viewCenter: { x: number; y: number }
) {
  camera.clearViewOffset();
  camera.updateMatrixWorld(true);

  const { x, y } = getModelScreenCenter(model, camera);
  viewCenter.x = x;
  viewCenter.y = y;

  applyViewOffsetForSize(
    camera,
    width,
    height,
    pixelRatio,
    expanded,
    viewCenter
  );
}

function applyViewOffsetForSize(
  camera: THREE.PerspectiveCamera,
  width: number,
  height: number,
  pixelRatio: number,
  expanded: boolean,
  viewCenter: { x: number; y: number }
) {
  const fullWidth = Math.round(width * pixelRatio);
  const fullHeight = Math.round(height * pixelRatio);
  const horizontalShift = expanded
    ? 0
    : Math.round(HORIZONTAL_VIEW_SHIFT * fullWidth);

  camera.setViewOffset(
    fullWidth,
    fullHeight,
    Math.round(-viewCenter.x * fullWidth * 0.5) - horizontalShift,
    Math.round(viewCenter.y * fullHeight * 0.5),
    fullWidth,
    fullHeight
  );
  camera.updateProjectionMatrix();
}

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

function getDefaultCameraTarget(model?: THREE.Object3D) {
  const target = new THREE.Vector3(0, 1.05 * DISPLAY_SCALE, 0);

  if (!model) return target;

  const fittedBox = new THREE.Box3().setFromObject(model);
  const center = fittedBox.getCenter(new THREE.Vector3());
  const size = fittedBox.getSize(new THREE.Vector3());

  target.copy(center);
  target.y += size.y * DEFAULT_VERTICAL_FRAME;

  return target;
}

function applyModelView(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  model: THREE.Object3D | undefined,
  width: number,
  height: number,
  pixelRatio: number,
  expanded: boolean,
  viewCenter: { x: number; y: number }
) {
  applyDefaultCameraView(camera, controls, getDefaultCameraTarget(model));
  if (model) {
    applyViewCentering(
      camera,
      model,
      width,
      height,
      pixelRatio,
      expanded,
      viewCenter
    );
  }
}

function updateLayoutForResize(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  width: number,
  height: number,
  pixelRatio: number,
  expanded: boolean,
  viewCenter: { x: number; y: number },
  baselineHeight: { current: number }
) {
  if (width === 0 || height === 0) return;

  if (baselineHeight.current === 0) {
    baselineHeight.current = height;
  }

  camera.aspect = width / height;
  camera.zoom = baselineHeight.current / height;
  renderer.setSize(width, height);
  applyViewOffsetForSize(
    camera,
    width,
    height,
    pixelRatio,
    expanded,
    viewCenter
  );
}

function applyDefaultCameraView(
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls,
  target: THREE.Vector3
) {
  camera.position
    .copy(target)
    .add(DEFAULT_CAMERA_DIRECTION.clone().multiplyScalar(controls.maxDistance));
  controls.target.copy(target);
  controls.update();
}

type ConfiguratorDoorSceneProps = {
  frameColor?: string;
  colorId?: ConfiguratorColorId;
  sidebarOpen?: boolean;
  expanded?: boolean;
};

export function ConfiguratorDoorScene({
  frameColor = "#C6C8CA",
  colorId = "natural-aluminium",
  sidebarOpen = true,
  expanded = false,
}: ConfiguratorDoorSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const frameColorRef = useRef(frameColor);
  const colorIdRef = useRef(colorId);
  const expandedRef = useRef(expanded);
  const relayoutRef = useRef<(() => void) | null>(null);
  const recenterRef = useRef<(() => void) | null>(null);

  frameColorRef.current = frameColor;
  colorIdRef.current = colorId;
  expandedRef.current = expanded;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvasHost = canvasHostRef.current;
    if (!wrapper || !canvasHost) return;

    let disposed = false;
    let frameId = 0;

    const width = canvasHost.clientWidth;
    const height = canvasHost.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);

    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.88);
    scene.add(ambient);

    const hemisphere = new THREE.HemisphereLight(0xffffff, 0xb8bcc4, 0.42);
    scene.add(hemisphere);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
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

    const fillLight = new THREE.DirectionalLight(0xf4f6f8, 0.55);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    scene.add(createConfiguratorSceneGrid());

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 3.2;
    controls.maxDistance = 8.5;
    controls.minPolarAngle = Math.PI * 0.15;
    controls.maxPolarAngle = Math.PI * 0.48;

    const viewCenter = { x: 0, y: 0 };
    const baselineHeight = { current: 0 };

    applyModelView(
      camera,
      controls,
      undefined,
      width,
      height,
      pixelRatio,
      expandedRef.current,
      viewCenter
    );

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        if (disposed) return;

        const model = gltf.scene;
        fitModelToScene(model);
        enableShadows(model);
        prepareModelMaterials(model);
        applyFrameColor(model, frameColorRef.current, colorIdRef.current);
        modelRef.current = model;
        scene.add(model);

        applyModelView(
          camera,
          controls,
          model,
          canvasHost.clientWidth,
          canvasHost.clientHeight,
          pixelRatio,
          expandedRef.current,
          viewCenter
        );
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

    let resizeFrame = 0;

    const handleResize = () => {
      const nextWidth = canvasHost.clientWidth;
      const nextHeight = canvasHost.clientHeight;
      if (nextWidth === 0 || nextHeight === 0) return;

      if (modelRef.current) {
        updateLayoutForResize(
          camera,
          renderer,
          nextWidth,
          nextHeight,
          pixelRatio,
          expandedRef.current,
          viewCenter,
          baselineHeight
        );
        return;
      }

      if (baselineHeight.current === 0) {
        baselineHeight.current = nextHeight;
      }
      camera.aspect = nextWidth / nextHeight;
      camera.zoom = baselineHeight.current / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
      camera.clearViewOffset();
    };

    const recenterView = () => {
      if (!modelRef.current) return;

      applyViewCentering(
        camera,
        modelRef.current,
        canvasHost.clientWidth,
        canvasHost.clientHeight,
        pixelRatio,
        expandedRef.current,
        viewCenter
      );
    };

    const scheduleResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(handleResize);
    };

    relayoutRef.current = scheduleResize;
    recenterRef.current = recenterView;
    handleResize();

    const observer = new ResizeObserver(scheduleResize);
    observer.observe(canvasHost);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(resizeFrame);
      observer.disconnect();
      controls.dispose();
      canvasHost.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.LineSegments
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  useEffect(() => {
    recenterRef.current?.();
  }, [expanded]);

  useEffect(() => {
    if (!modelRef.current) return;
    applyFrameColor(modelRef.current, frameColor, colorId);
  }, [frameColor, colorId]);

  return (
    <div
      ref={wrapperRef}
      className="relative h-full min-h-[368px] w-full overflow-visible"
    >
      <div
        ref={canvasHostRef}
        className={cn(
          "absolute top-0 left-1/2 h-full -translate-x-1/2 cursor-grab active:cursor-grabbing",
          "transition-[width] duration-500 ease-out motion-reduce:transition-none",
          sidebarOpen ? "w-[140%]" : "w-full"
        )}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-surface via-surface/70 to-transparent"
      />
    </div>
  );
}
