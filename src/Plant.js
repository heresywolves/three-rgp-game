import plantImg from './plants/plant.png'
import * as THREE from 'three'

const Plant = (name) => {
  const map = new THREE.TextureLoader().load(plantImg);
  map.magFilter = THREE.NearestFilter; // sharper pixels
  const plantMat= new THREE.SpriteMaterial({map: map});
  const sprite = new THREE.Sprite(plantMat);
  sprite.center.set(0.5, 0.5);

  return {name, sprite}
}

export default Plant