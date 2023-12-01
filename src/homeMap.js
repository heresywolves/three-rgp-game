import * as THREE from 'three'
import Materials from './Materials';

const HomeMap = (scene) => {

  // Load ground texture
  // const textureLoader = new THREE.TextureLoader();
  // const groundTexture = textureLoader.load(groundTextureImport);
  
  const size = 60;
  const tiles = [];
  const groundPlanes = [];
  let offsetX = 0.5 - (size / 2);
  let offsetY = 0.5 - (size / 2);

  for (let k = 0; k < size; k++, offsetY++) {
    for (let i = 0; i < size; i++, offsetX++) {

      // Create a plane geometry
      const planeGeometry = new THREE.PlaneGeometry(1, 1); // You can adjust the size of the plane
      const plane = new THREE.Mesh(planeGeometry, Materials.groundMaterial);

      // Rotate the plane to make it horizontal
      const layer = 0.01;
      plane.position.set(offsetX,layer,offsetY);
      plane.scale.set(1,1,1);
      plane.rotation.x = -Math.PI / 2;

      tiles.push({object: plane, row: i, col: 1});
      groundPlanes.push(plane);
    }
    offsetX = 0.5 - (size / 2);
  }


  return {tiles, groundPlanes}
};


export default HomeMap;