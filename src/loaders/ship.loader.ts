import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const loader = new GLTFLoader();

async function shipLoader(shipPath: string, handleLoadingProgress?: (e: ProgressEvent) => void) {

  // Load a glTF resource
  const gltf = await loader.loadAsync(
    // 'models/ship/ship.gltf',
    shipPath,
    handleLoadingProgress
  );

  // Make all components (Sails, ship parts, etc) cast shadow
  gltf.scene.traverse(function (node) {
    node.castShadow = true;
    // node.receiveShadow = true;
  });

  const ship = gltf.scene
  return ship;
}

export default shipLoader;