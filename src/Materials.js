import * as THREE from 'three'
import dirtTextureImport from './maptextures/dirt-texture.jpg'
import groundTextureImport from './maptextures/ground-texture.jpg'

const Materials = ((scene) => {
  const textureLoader = new THREE.TextureLoader();
  const dirtTexture = textureLoader.load(dirtTextureImport);
  const groundTexture = textureLoader.load(groundTextureImport);

  return { dirtTexture, groundTexture }
})();


export default Materials;