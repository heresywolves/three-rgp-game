import hoeImg from './items/hoe.png'
import * as THREE from 'three'

const Item = (name, img) => {
  const id = 1;
  const selected = true;
  return {name, img, id, selected}
}

export default Item