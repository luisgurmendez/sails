const stats = new Stats()
stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

class Game {

  static loop(render: () => void, update: () => void) {
    return function () {
      stats.begin()
      update();
      render();
      stats.end()
      requestAnimationFrame(Game.loop(render, update));
    }
  }
}


export default Game;