import SimpleShip from './objects/ship/simpleShip';
import { handleShipControls } from './core/controls';
import { addControlHanlders, handleExternalControls } from './core/externalControls';
import loadAssets from './core/load';
import Game from './core/Game';

(async function () {

  // Load assets
  function handleProgress(ev: ProgressEvent) {
    const loadingDOM = document.getElementById('loading');
    if (loadingDOM !== null) {
      const assetLoad = (ev.loaded / ev.total);
      loadingDOM.innerHTML = `${assetLoad * 100}%`;
      if (assetLoad === 1) {
        loadingDOM.remove()
      }
    }
  }

  const { ship: shipMesh } = await loadAssets(handleProgress);

  const game = new Game();

  const simpleShip = new SimpleShip(shipMesh);
  game.addObject(simpleShip);

  addControlHanlders(game, simpleShip)

  function update() {
    handleShipControls(game, simpleShip);
    handleExternalControls(game, simpleShip);
    game.step();
  }

  const init = game.loop(update);
  init();

})()
