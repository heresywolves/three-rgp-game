import * as THREE from 'three'

const SpriteFlipbook = (spriteTexture, tilesHoriz, scene) => {
  const map = new THREE.TextureLoader().load(spriteTexture);
  map.repeat.set(1/tilesHoriz, 1);
  map.magFilter = THREE.NearestFilter; // sharper pixels
  const playerMaterial = new THREE.SpriteMaterial({map: map});
  const sprite = new THREE.Sprite(playerMaterial);
  sprite.center.set(0.5, 0.5);


  //Create a container for the sprite
  const container = new THREE.Object3D();
  
  container.add(sprite);
  sprite.position.y = 1.5;
  scene.add(container);

  // scene.add(sprite);
  
  let currentTile = 0;
  let playSpriteIndices = [];
  let runningTileArrayIndex = 1;
  let maxDiplayTime = 0;
  let elapsedTime = 0;

  function loop(playSpriteIndicesAttr, totalDuration) {
    playSpriteIndices = playSpriteIndicesAttr;
    runningTileArrayIndex = 0;
    currentTile = playSpriteIndices[runningTileArrayIndex];
    maxDiplayTime = totalDuration / playSpriteIndices.length;
  }
 
  
  function update(delta) {
    elapsedTime += delta;
    
    if (maxDiplayTime > 0 && elapsedTime >= maxDiplayTime) {
      elapsedTime = 0;
      runningTileArrayIndex = (runningTileArrayIndex + 1) % playSpriteIndices.length;
      currentTile = playSpriteIndices[runningTileArrayIndex];
      const offsetX = (currentTile % tilesHoriz) / tilesHoriz;
      map.offset.x = offsetX;
      console.log('keyframe:', currentTile);
    }
  }

  return { update, loop, sprite }
};


export default SpriteFlipbook;

