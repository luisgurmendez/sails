import { PlaneGeometry } from 'three/src/geometries/PlaneGeometry';
import { Mesh } from 'three/src/objects/Mesh';
import { DoubleSide, RepeatWrapping, ShaderMaterial, TextureLoader, UniformsLib, UniformsUtils, Vector2, Vector3 } from 'three';
import fragmentShader from './fragment.glsl';
import vertexShader from './vertexShader.glsl';
import Enviorment from '../../enviorment/enviorment';
import Stepable from '../../objects/Stepable';

class Ocean implements Stepable {

  object: Mesh;

  uniforms: any;
  // TODO: currents & waves

  constructor() {
    const geometry = new PlaneGeometry(1000, 1000, 2000, 2000);
    // const material = new MeshStandardMaterial({ color: 0x006994, side: DoubleSide });
    const uniforms = UniformsUtils.merge([
      // UniformsLib.directionalShadowMap,
      UniformsLib.lights,
      // UniformsLib.ambient,
      { time: { type: "f", value: 1.0 } }])

    this.uniforms = uniforms;

    const material = new ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      side: DoubleSide,
      lights: true,
      wireframe: false
    });


    geometry.computeVertexNormals();
    material.flatShading = true;
    const ocean = new Mesh(geometry, material);


    ocean.receiveShadow = true;
    material.flatShading = true;

    // Make ocean horizontal
    ocean.rotateX(-Math.PI * 0.5);
    this.object = ocean;
  }

  step(env: Enviorment, t: number, dt: number) {
    this.uniforms['time'].value = t;
  }

}

export default Ocean;