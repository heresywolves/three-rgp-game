import * as THREE from 'three'
import { toolbelt } from './Toolbelt';

const UI = ((scene) => {
  const uiDomElement = document.querySelector('#ui-section');

  const itemBar = (() => {

    const itemBarDomContainer = document.createElement('div');
    itemBarDomContainer.classList.add('itembar-container');
    const itemBarElement = document.createElement('div');
    itemBarElement.classList.add('item-bar');

    for (let i = 0; i < 12; i++) {
      const itemCellElement = document.createElement('div');
      itemCellElement.classList.add('item-cell');
      itemBarElement.appendChild(itemCellElement);

    }

    itemBarDomContainer.appendChild(itemBarElement);
    uiDomElement.appendChild(itemBarDomContainer);

    function refresh() {
      const cells = itemBarElement.childNodes;
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (toolbelt[i]){
          const img = document.createElement('img');
          img.width = 50;
          img.height = 50;
          img.src = toolbelt[i].img;
          console.log('adding cell')
          
          cell.appendChild(img);
        }
      }
      console.log(cells);
    }
    

    // showing and hiding toolbelt logic
    function show() {
      console.log('show itembar')
    }
    return {show, refresh}
  })();

  return { itemBar }
})();


export default UI;