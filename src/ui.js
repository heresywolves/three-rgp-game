import * as THREE from 'three'

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
    

    function show() {
      console.log('show itembar')
    }
    return {show}
  })();

  return { itemBar }
})();


export default UI;