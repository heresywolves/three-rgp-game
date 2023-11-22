import * as THREE from 'three'

const SpriteFlipbook = (spriteTexture, tilesHoriz, tilesVert, scene) => {
  let currentTile = 0;
  const map = new THREE.TextureLoader().load(spriteTexture);
  map.repeat.set(1/tilesHoriz, 1/tilesVert);
  map.magFilter = THREE.NearestFilter; // sharper pixels
  const playerMaterial = new THREE.SpriteMaterial({map: map});
  const sprite = new THREE.Sprite(playerMaterial);
  
  sprite.position.y = 1.5;
  console.log(sprite);
  scene.add(sprite);

  let playSpriteIndices = [];
  let runningTileArrayIndex = 0;
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
      const offsetY = (tilesVert - Math.floor(currentTile / tilesHoriz) - 1) / tilesVert;
      map.offset.x = offsetX;
      map.offset.y = offsetY;
    }

  }

  return { update, loop, sprite }
};

export default SpriteFlipbook;

