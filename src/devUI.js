import * as THREE from 'three'
import STATS from 'stats.js'
import { GUI } from 'dat.gui'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const DevUIController = (player, scene, camera, renderer) => {

  // Add grid helper
  const gridHelper = new THREE.GridHelper(60, 60);
  gridHelper.position.y = 0.2;
  scene.add(gridHelper);


  // Axis helper guide initiation. 5 represents the length of the axis
  const axesHelper = new THREE.AxesHelper(2);
  axesHelper.position.y = 0.3;
  scene.add(axesHelper);

  // Set up Stats
  const stats = new STATS();
  stats.showPanel(0); // 0: FPS, 1: ms, 2: MB, 3+: custom
  document.body.appendChild(stats.dom);

  const stats2 = new STATS();
  stats2.showPanel(2); // 0: FPS, 1: ms, 2: MB, 3+: custom
  stats2.dom.style.position = 'absolute';
  stats2.dom.style.top = '48px';
  document.body.appendChild(stats2.dom);

  // Create Orbit control instance
  const orbit = new OrbitControls(camera, renderer.domElement);
  orbit.update();
  orbit.enabled = false;
  // let orbitControlsEnabled = false;
  // orbit.enabled = orbitControlsEnabled;

  // Set up option controls

  let settings = {
    showBoundingBox: true,
    showGridHelper: true,
    orbitControl: false,
  }

  const gui = new GUI();
  gui.add(settings, 'showBoundingBox').name('Show Bounding Box').onChange(function(value) {
    if (player.visible) {
      player.visible = false;
    } else {
      player.visible = true;
    }
  });
  gui.add(settings, 'showGridHelper').name('Show Grid').onChange(function(value) {
    if (gridHelper.visible) {
      gridHelper.visible = false;
    } else {
      gridHelper.visible = true;
    }
  });
  gui.add(settings, 'orbitControl').name('Orbit Control').onChange(function(value) {
    if (orbit.enabled) {
      orbit.enabled = false;
    } else {
      orbit.enabled = true;
    }
  });


  function toggle() {

  }
  return { toggle, stats, stats2, gui, settings }
};


export default DevUIController;
