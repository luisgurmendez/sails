import { Group } from "three/src/objects/Group";
import shipLoader from "../loaders/ship.loader";

interface Assets {
  ship: Group;
}

async function loadAssets(onProgress?: (progress: ProgressEvent) => void, onNextLoad?: (asset: string) => void): Promise<Assets> {
  onNextLoad && onNextLoad('ship');
  const shipMesh = await shipLoader('models/ship/ship.gltf', onProgress)
  return { ship: shipMesh };
}

export default loadAssets;