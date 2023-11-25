import './styles.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import PlayerAnimation from './PlayerAnimation';
import LevelController from './levelController';
import * as STATS from 'stats.js';
import UI from './ui';
import Materials from './Materials';
import dirtTextureImport from './maptextures/dirt-texture.jpg'

// Set up Stats
const stats = new STATS();
stats.showPanel(0); // 0: FPS, 1: ms, 2: MB, 3+: custom
document.body.appendChild(stats.dom);

const stats2 = new STATS();
stats2.showPanel(2); // 0: FPS, 1: ms, 2: MB, 3+: custom
stats2.dom.style.position = 'absolute';
stats2.dom.style.top = '48px';
document.body.appendChild(stats2.dom);

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 15, 3);


// Add grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Axis helper guide initiation. 5 represents the length of the axis
const axesHelper = new THREE.AxesHelper(1);
scene.add(axesHelper);


// Adding renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create Orbit control instance
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();


const mapSize = 60;


const playerAnimation = PlayerAnimation(scene);
const player = playerAnimation.player;


const levelController = LevelController(scene);
levelController.render('home');

// Add UI
UI.itemBar.show();

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

    // Change the material to the clicked texture
    clickedPlane.material = Materials.dirtMaterial;
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
  
let keyMap = {};

const clock = new THREE.Clock();

function animate() {
  stats.begin();
  stats2.begin();

  let deltaTime = clock.getDelta();
  requestAnimationFrame( animate );
  
  document.onkeydown = onkeyup = function(e) {
    // console.log(keyMap)
    keyMap[e.key] = e.type == 'keydown';
  }

  movePlayer(keyMap);

  playerAnimation.update(deltaTime);


	renderer.render( scene, camera );
  stats2.end();
  stats.end();
}
animate();