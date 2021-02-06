import Barrier from '../entity/barrier.js'

export default function loadBarrier(e, x, y, vx, size, color) {
  let blocks = [];
  let randomHeight = e.round(e.random(4, size/4))
  let bColor = color

  for (let i = 0; i < randomHeight; i++) {
    for (let j = 0; j < (size/randomHeight); j++) {
      const newBarrierBlock = new Barrier(e, x - (j * 30), y - (i * 30), vx,0, bColor)
      blocks.push(newBarrierBlock)
    }
  }
  // console.log(blocks.length)
  return blocks
}