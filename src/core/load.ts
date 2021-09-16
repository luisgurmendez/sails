import { Group } from "three/src/objects/Group";
import shipLoader from "../loaders/ship.loader";

//@ts-ignore
import shipAsset from "../assets/models/ship/ship.gltf";

console.log(shipAsset);
interface Assets {
  ship: Group;
}

async function loadAssets(onProgress?: (progress: ProgressEvent) => void, onNextLoad?: (asset: string) => void): Promise<Assets> {
  onNextLoad && onNextLoad('ship');
  const shipMesh = await shipLoader(shipAsset, onProgress)
  return { ship: shipMesh };
}

export default loadAssets;