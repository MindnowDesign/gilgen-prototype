import * as THREE from "three";

import type { ConfiguratorColorId } from "@/components/configurator/configurator-colors";

const GLASS_MATERIAL_NAMES = ["Translucent_Glass_Gray"] as const;

const FRAME_BODY_MATERIAL_NAMES = new Set(["0035_Tan", "material"]);

type FrameColorPreset = {
  metalness: number;
  roughness: number;
  edgeMultiplier: number;
  colorBoost: number;
  emissiveStrength: number;
};

const FRAME_COLOR_PRESETS: Record<string, FrameColorPreset> = {
  "#c6c8ca": {
    metalness: 0.28,
    roughness: 0.58,
    edgeMultiplier: 0.95,
    colorBoost: 1.14,
    emissiveStrength: 0.07,
  },
  "#2f3136": {
    metalness: 0.42,
    roughness: 0.52,
    edgeMultiplier: 0.8,
    colorBoost: 1.04,
    emissiveStrength: 0.015,
  },
  "#f6f6f4": {
    metalness: 0.08,
    roughness: 0.68,
    edgeMultiplier: 0.98,
    colorBoost: 1.18,
    emissiveStrength: 0.09,
  },
  "#a7adb3": {
    metalness: 0.38,
    roughness: 0.48,
    edgeMultiplier: 0.93,
    colorBoost: 1.12,
    emissiveStrength: 0.06,
  },
};

const DEFAULT_PRESET = FRAME_COLOR_PRESETS["#c6c8ca"];

const GLASS_TINT = new THREE.Color(0.68, 0.78, 0.94);

function isGlassMaterial(material: THREE.Material) {
  if (!(material instanceof THREE.MeshStandardMaterial)) return true;

  if (GLASS_MATERIAL_NAMES.includes(material.name as (typeof GLASS_MATERIAL_NAMES)[number])) {
    return true;
  }

  return material.transparent || material.opacity < 0.99;
}

function cloneMeshMaterials(model: THREE.Object3D) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    if (Array.isArray(child.material)) {
      child.material = child.material.map((material) => material.clone());
      return;
    }

    child.material = child.material.clone();
  });
}

function getFramePreset(hex: string) {
  return FRAME_COLOR_PRESETS[hex.toLowerCase()] ?? DEFAULT_PRESET;
}

function getDisplayFrameColor(hex: string, boost: number) {
  const color = new THREE.Color(hex);

  color.r = Math.min(1, color.r * boost);
  color.g = Math.min(1, color.g * boost);
  color.b = Math.min(1, color.b * boost);

  return color;
}

function applyGlassAppearance(model: THREE.Object3D) {
  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => {
      if (!(material instanceof THREE.MeshStandardMaterial)) return;
      if (!isGlassMaterial(material)) return;

      material.color.copy(GLASS_TINT);
      material.transparent = true;
      material.opacity = 0.22;
      material.metalness = 0.04;
      material.roughness = 0.14;
      material.needsUpdate = true;
    });
  });
}

export function prepareModelMaterials(model: THREE.Object3D) {
  cloneMeshMaterials(model);
  applyGlassAppearance(model);
}

export function applyFrameColor(
  model: THREE.Object3D,
  hex: string,
  colorId?: ConfiguratorColorId
) {
  if (colorId === "custom") return;

  const preset = getFramePreset(hex);
  const frameColor = getDisplayFrameColor(hex, preset.colorBoost);
  const edgeColor = frameColor.clone().multiplyScalar(preset.edgeMultiplier);

  model.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const materials = Array.isArray(child.material)
      ? child.material
      : [child.material];

    materials.forEach((material) => {
      if (!(material instanceof THREE.MeshStandardMaterial)) return;
      if (isGlassMaterial(material)) return;

      const isEdge = material.name.toLowerCase().startsWith("edge_color");
      const isFrameBody = FRAME_BODY_MATERIAL_NAMES.has(material.name);

      if (!isEdge && !isFrameBody) return;

      material.color.copy(isEdge ? edgeColor : frameColor);
      material.metalness = preset.metalness;
      material.roughness = preset.roughness;
      material.emissive.copy(frameColor).multiplyScalar(preset.emissiveStrength);
      material.emissiveIntensity = 1;
      material.needsUpdate = true;
    });
  });
}
