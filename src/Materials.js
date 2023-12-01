import * as THREE from 'three'
import dirtTextureImport from './maptextures/dirt-texture.png'
import groundTextureImport from './maptextures/ground-texture.png'

const Materials = ((scene) => {
  const textureLoader = new THREE.TextureLoader();
  const dirtTexture = textureLoader.load(dirtTextureImport);
  const dirtMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: dirtTexture});
  const groundTexture = textureLoader.load(groundTextureImport);
  const groundMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, map: groundTexture});

  const boxMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 1,
    });

  return { dirtMaterial, groundMaterial, boxMaterial }
})();


export default Materials;