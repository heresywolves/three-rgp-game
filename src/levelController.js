import * as THREE from 'three'
import HomeMap from './homeMap';

const LevelController = (scene) => {
  const HomeMapObj = HomeMap(scene);

  function render(level) {
    if (level === 'home') {
      for (let i = 0; i < HomeMapObj.tiles.length; i++) {
        scene.add(HomeMapObj.tiles[i].object);
      }
    }
  }
  return {render, HomeMapObj};
};


export default LevelController;