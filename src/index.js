import './styles.css'
import * as THREE from 'three'
import PlayerAnimation from './PlayerAnimation';
import LevelController from './levelController';
import UI from './ui';
import Materials from './Materials';
import DevUIController from './devUI';
import Plant from './Plant';
import hoeImg from './items/hoe.png'
import Item from './Item';
import { toolbelt } from './Toolbelt';


// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 15, 3);


// Adding renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const mapSize = 60;

const playerAnimation = PlayerAnimation(scene);
const player = playerAnimation.player;

const levelController = LevelController(scene);
levelController.render('home');

// Add UI
UI.itemBar.show();
const devUI = DevUIController(player, scene, camera, renderer);

// Add a click event listener to the renderer
renderer.domElement.addEventListener('click', onDocumentClick, false);

const groundPlanes = levelController.HomeMapObj.groundPlanes;

function onDocumentClick(event) {

  // Calculate mouse coordinates
  let mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Raycasting
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Check for intersections with the planes
  const intersects = raycaster.intersectObjects(groundPlanes);

  // If there is an intersection
  if (intersects.length > 0) {
    const clickedPlane = intersects[0].object;

    // Variables to check proximity to the player
    const playerPosition = player.position.clone();
    const planePosition = clickedPlane.position.clone();
    const distance = planePosition.distanceTo(playerPosition);

    // Change the material to the clicked texture if the distance is within
    // allowed poximity
    if (distance < 3) {
      clickedPlane.material = Materials.dirtMaterial;
    }
  }

}

// Smoothness for lerping 
const smoothness = 0.1 // 0 to 1 only

const runningSpeed = 1;

function moveCamera () {
  let cameraTargetPosition = camera.position.clone();
  let playerViewportPosition = getViewportPosition(player, camera);
  if (playerViewportPosition.x < 300) {
    cameraTargetPosition.x -= runningSpeed;
  }
  if (playerViewportPosition.x > window.innerWidth - 300) {
    cameraTargetPosition.x += runningSpeed;
  }
  if (playerViewportPosition.y < 250) {
    cameraTargetPosition.z -= runningSpeed;
  }
  if (playerViewportPosition.y > window.innerHeight - 350) {
    cameraTargetPosition.z += runningSpeed;
  }
  camera.position.lerp(cameraTargetPosition, smoothness);
}

function movePlayer(keyMap) {
  let targetPosition = player.position.clone();
  if (keyMap['a'] === true && targetPosition.x > -(mapSize / 2 - 1)) {
    targetPosition.x -= runningSpeed;
    playerAnimation.changeDirection('left');
  }
  if (keyMap['d'] === true && targetPosition.x < (mapSize / 2 - 1)) {
    targetPosition.x += runningSpeed;
    playerAnimation.changeDirection('right');
  }
  if (keyMap['w'] === true && targetPosition.z > -(mapSize / 2 - 1)) {
    targetPosition.z -= runningSpeed;
  }
  if (keyMap['s'] === true && targetPosition.z < (mapSize / 2 - 1)) {
    targetPosition.z += runningSpeed;
  }
  player.position.lerp(targetPosition, smoothness);
  moveCamera();
}

function getViewportPosition(mesh, camera) {
  // Get the position of the mesh in world coordinates
  let meshPosition = new THREE.Vector3();
  mesh.getWorldPosition(meshPosition);

  // Project the world coordinates into screen coordinates
  let screenPosition = meshPosition.clone().project(camera);

  // Convert the screen coordinates to viewport coordinates
  let viewportPosition = new THREE.Vector2(
      (screenPosition.x + 1) / 2 * window.innerWidth,
      (-screenPosition.y + 1) / 2 * window.innerHeight
  );
  return viewportPosition
}

// Making plants and tools

let plant1 = Plant('carrot');
plant1.sprite.position.set(1.5, 0.5, 1.5);
scene.add(plant1.sprite);

let hoe = Item('Hoe', hoeImg); 

toolbelt.push(hoe);
console.log(toolbelt);

UI.itemBar.refresh();

// --

let keyMap = {};

const clock = new THREE.Clock();

function animate() {
  devUI.stats.begin();
  devUI.stats2.begin();

  let deltaTime = clock.getDelta();
  requestAnimationFrame( animate );
  
  document.onkeydown = onkeyup = function(e) {
    // console.log(keyMap)
    keyMap[e.key] = e.type == 'keydown';
  }

  movePlayer(keyMap);

  playerAnimation.update(deltaTime);

	renderer.render( scene, camera );
  devUI.stats2.end();
  devUI.stats.end();
}
animate();