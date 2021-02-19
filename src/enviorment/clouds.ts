import { Object3D } from 'three/src/core/Object3D';
import { SphereGeometry } from 'three/src/geometries/SphereGeometry';
import { BufferGeometry } from 'three/src/core/BufferGeometry';
import { MeshLambertMaterial } from 'three/src/materials/MeshLambertMaterial';
import { Mesh } from 'three/src/objects/Mesh';
import { BufferGeometryUtils } from '../threejs/utils';
import { Vector3 } from 'three/src/math/Vector3';
import { BufferAttribute } from 'three/src/core/BufferAttribute';


// WIP
class Cloud {

  object: Object3D;

  constructor() {

    const tuft1 = new SphereGeometry(20, 30, 30)
    tuft1.translate(-30, 0, 0)

    const tuft2 = new SphereGeometry(20, 30, 30)
    tuft2.translate(30, 0, 0)

    const tuft3 = new SphereGeometry(30, 30, 30)
    tuft3.translate(0, 0, 0)


    const geo = BufferGeometryUtils.mergeBufferGeometries([tuft1, tuft2, tuft3]);


    const map = (val: number, smin: number, smax: number, emin: number, emax: number) => (emax - emin) * (val - smin) / (smax - smin) + emin
    //randomly displace the x,y,z coords by the `per` value
    const jitter = (geo: BufferGeometry, per: number) => {

      const positions = geo.attributes.position.clone();
      const tempFloat32Array = new Float32Array(positions.array);
      for (let i = 0; i < positions.count; i++) {
        if (i % 3 === 1) {
          tempFloat32Array[i] = Math.max(positions.array[i], -5);
        } else {
          // tempFloat32Array[i] += map(Math.random(), 0, 10, -per, per)
        }
      }
      // const vector = new Vector3();

      // geo.vertices.forEach(v => {
      //   v.x += map(Math.random(), 0, 1, -per, per)
      //   v.y += map(Math.random(), 0, 1, -per, per)
      //   v.z += map(Math.random(), 0, 1, -per, per)
      // })

      geo.setAttribute('position', new BufferAttribute(tempFloat32Array, 3));
    }

    jitter(geo, 20)

    const cloud = new Mesh(
      geo,
      new MeshLambertMaterial({
        color: 'white',
        flatShading: true,
      })
    )

    cloud.castShadow = true;

    this.object = cloud;


  }

}

export default Cloud;