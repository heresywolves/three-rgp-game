import * as THREE from 'three'
import dirtTextureImport from './maptextures/dirt-texture.jpg'
import groundTextureImport from './maptextures/ground-texture.jpg'

const Materials = ((scene) => {
  const textureLoader = new THREE.TextureLoader();
  const dirtTexture = textureLoader.load(dirtTextureImport);
  const dirtMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: dirtTexture});
  const groundTexture = textureLoader.load(groundTextureImport);
  const groundMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: groundTexture});

  return { dirtMaterial, groundMaterial }
})();


export default Materials;