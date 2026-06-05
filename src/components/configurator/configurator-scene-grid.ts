import * as THREE from "three";

const GRID_SIZE = 20;
const GRID_DIVISIONS = 40;
const GRID_CENTER_COLOR = 0x939393;
const GRID_LINE_COLOR = 0xc9c9c9;

export function createConfiguratorSceneGrid() {
  const grid = new THREE.GridHelper(
    GRID_SIZE,
    GRID_DIVISIONS,
    GRID_CENTER_COLOR,
    GRID_LINE_COLOR
  );

  const materials = Array.isArray(grid.material) ? grid.material : [grid.material];
  for (const material of materials) {
    material.transparent = true;
    material.opacity = 0.55;
    material.depthWrite = false;
  }

  grid.position.y = 0.001;
  grid.renderOrder = 1;

  return grid;
}
