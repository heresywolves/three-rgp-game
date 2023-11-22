import './styles.css'
import * as THREE from 'three'
import { Face } from 'three/addons/math/ConvexHull.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

// Setup scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 10, 3);


const geometry = new THREE.PlaneGeometry( 30, 30 );
const material = new THREE.MeshBasicMaterial( {color: 0xF4E4E0, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.rotation.x = -0.5 * Math.PI;


// Add grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Axis helper guide initiation. 5 represents the length of the axis
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// Adding renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Create Orbit control instance
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();


// Create a box
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00});
const player = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(player);
player.position.set(0, 0.5 ,0);
console.log(player.position.x);

// Smoothness for lerping 
const smoothness = 0.1 // 0 to 1 only

function moveCamera () {
  let cameraTargetPosition = camera.position.clone();
  let playerViewportPosition = getViewportPosition(player, camera);
  if (playerViewportPosition.x < 200) {
    cameraTargetPosition.x -= 2;
  }
  if (playerViewportPosition.x > window.innerWidth - 200) {
    cameraTargetPosition.x += 2;
  }
  if (playerViewportPosition.y < 150) {
    cameraTargetPosition.z -= 2;
  }
  if (playerViewportPosition.y > window.innerHeight - 150) {
    cameraTargetPosition.z += 2;
  }
  camera.position.lerp(cameraTargetPosition, smoothness);
}

function movePlayer(keyMap) {
  let targetPosition = player.position.clone();
  if (keyMap['a'] === true) {
    targetPosition.x -= 2;
  }
  if (keyMap['d'] === true) {
    targetPosition.x += 2;
  }
  if (keyMap['w'] === true) {
    targetPosition.z -= 2;
  }
  if (keyMap['s'] === true) {
    targetPosition.z += 2;
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

function animate() {
  requestAnimationFrame( animate );
  
  document.onkeydown = onkeyup = function(e) {
    // console.log(keyMap)
    keyMap[e.key] = e.type == 'keydown';
  }

  movePlayer(keyMap);

	renderer.render( scene, camera );
}
animate();