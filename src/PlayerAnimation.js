
import * as THREE from 'three'
import SpriteFlipbook from './SpriteFlipbook';
import playerTextureRight from './player-sprite-right.png'
import playerTextureLeft from './player-sprite-left.png'
import Materials from './Materials';

const PlayerAnimation = (scene) => {

  const spriteScale = [1.5,2,1.5]; 

  const boundingBox = new THREE.Box3Helper(new THREE.Box3(), 0xffff00);
  boundingBox.position.y = 2;
  let player = boundingBox;

  // Sprite right
  let playerSpriteRight = SpriteFlipbook(playerTextureRight, 8, scene);
  playerSpriteRight.loop([0,1,2,3,4,5,6,7], 0.6);
  let playerRight = playerSpriteRight.sprite;
  playerRight.position.y = 1;
  playerRight.scale.set(...spriteScale); 

  // Sprite right
  let playerSpriteLeft = SpriteFlipbook(playerTextureLeft, 8, scene);
  playerSpriteLeft.loop([0,1,2,3,4,5,6,7], 0.6);
  let playerLeft = playerSpriteLeft.sprite;
  playerLeft.position.y = 1;
  playerLeft.scale.set(...spriteScale); 

  // Create a box geometry
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true});
  // const box = new THREE.Mesh(boxGeometry, Materials.boxMaterial);
  // let player = box;
  // player.position.y = 1.5;
  // player.scale.set(1.5,2,2);
  // scene.add(box);
  scene.add(boundingBox)


  function update (deltaTime) {
    playerLeft.position.set(...player.position);
    playerRight.position.set(...player.position);
    playerSpriteRight.update(deltaTime);
    playerSpriteLeft.update(deltaTime);
  }

  function changeDirection(direction) {
    if (direction === 'left') {
      playerRight.visible = false;
      playerLeft.visible = true;
    } else if (direction === 'right') {
      playerRight.visible = true;
      playerLeft.visible = false;
    }
  }

  return { update, player, changeDirection }
};


export default PlayerAnimation;

