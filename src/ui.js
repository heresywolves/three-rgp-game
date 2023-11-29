import * as THREE from 'three'
import { toolbelt } from './Toolbelt';
import Items from './Items';

const UI = ((scene) => {
  const uiDomElement = document.querySelector('#ui-section');

  function selectItem (e) {
    const id = e.target.getAttribute('class').split('-')[2];
    if (id) {
      for (const key in Items) {
        const item = Items[key];
        if (item.id == id) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      }
    }
    itemBar.refresh();
  }
  
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


    const cells = itemBarElement.childNodes;
    cells.forEach((cell) => {
      cell.addEventListener('click', selectItem);
    })

    function refresh() {
      const cells = itemBarElement.childNodes;

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell.firstChild) {
          cell.firstChild.remove();
        };
        if (toolbelt[i]){
          const img = document.createElement('img');
          img.width = 46;
          img.height = 46;
          img.src = toolbelt[i].img;
          img.classList.add(`item-id-${toolbelt[i].id}`)
          if (toolbelt[i].selected) {
            cell.classList.add('selected');
          } else {
            cell.classList.remove('selected');
          }
          
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