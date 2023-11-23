import * as THREE from 'three'
import HomeMap from './homeMap';

const LevelController = (scene) => {
  const HomeMapObj = HomeMap(scene);
  for (let i = 0; i < HomeMapObj.tiles.length; i++) {
    scene.add(HomeMapObj.tiles[i].object);
  }
};


export default LevelController;