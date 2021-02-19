import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { Mesh } from 'three/src/objects/Mesh';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
import { DoubleSide } from 'three/src/constants';
import { Object3D } from 'three/src/core/Object3D';

class Ocean {

  object: Object3D;

  constructor() {
    const geometry = new PlaneGeometry(100000, 100000, 20, 20);
    const material = new MeshStandardMaterial({ color: 0x006994, side: DoubleSide });
    geometry.computeVertexNormals();
    material.flatShading = true;
    const ocean = new Mesh(geometry, material);
    ocean.receiveShadow = true;
    material.flatShading = true;

    // Make ocean horizontal
    ocean.rotateX(-Math.PI * 0.5);
    this.object = ocean;
  }

}

export default Ocean;