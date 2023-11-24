import * as THREE from 'three'
import groundTextureImport from './maptextures/ground-texture.jpg'

const HomeMap = (scene) => {

  // Load ground texture
  const textureLoader = new THREE.TextureLoader();
  const groundTexture = textureLoader.load(groundTextureImport);
  
  const size = 200;
  const tiles = [];
  let offsetX = 0.5 - (size / 2);
  let offsetY = 0.5 - (size / 2);

  for (let k = 0; k < size; k++, offsetY++) {
    for (let i = 0; i < size; i++, offsetX++) {

      // Create a plane geometry
      const planeGeometry = new THREE.PlaneGeometry(1, 1); // You can adjust the size of the plane
      const planeMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);

      // Rotate the plane to make it horizontal
      const layer = 0.01;
      plane.position.set(offsetX,layer,offsetY);
      plane.scale.set(1,1,1);
      plane.rotation.x = -Math.PI / 2;

      tiles.push({object: plane, row: i, col: 1});
    }
    offsetX = 0.5 - (size / 2);
  }


  return {tiles}
};


export default HomeMap;