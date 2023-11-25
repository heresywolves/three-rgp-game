import * as THREE from 'three'
import STATS from 'stats.js'
import { GUI } from 'dat.gui'
import PlayerAnimation from './PlayerAnimation';

const DevUI = (() => {

  // Set up Stats
  const stats = new STATS();
  stats.showPanel(0); // 0: FPS, 1: ms, 2: MB, 3+: custom
  document.body.appendChild(stats.dom);

  const stats2 = new STATS();
  stats2.showPanel(2); // 0: FPS, 1: ms, 2: MB, 3+: custom
  stats2.dom.style.position = 'absolute';
  stats2.dom.style.top = '48px';
  document.body.appendChild(stats2.dom);

  // Set up option controls

  let settings = {
    wireframeMode: true,
    orbitControl: true,
    transparency: 0,
  }

  const gui = new GUI();
  gui.add(settings, 'wireframeMode').name('Wireframe Mode');
  gui.add(settings, 'transparency', 0, 1).name('Transparency');
  // gui.add(settings, 'orbitControl').name('Orbit Controls');


  function toggle() {

  }
  return { toggle, stats, stats2, gui, settings }
})();


export default DevUI;
