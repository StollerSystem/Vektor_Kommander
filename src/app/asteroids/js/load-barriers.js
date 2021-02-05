import Barrier from './Barrier'

export default function loadBarrier(e, x, y, vx, size) {
  let blocks = [];
  let randomHeight = e.round(e.random(4, size/4))

  for (let i = 0; i < randomHeight; i++) {
    for (let j = 0; j < (size/randomHeight); j++) {
      const newBarrierBlock = new Barrier(e, x - (j * 20), y - (i * 20), vx)
      blocks.push(newBarrierBlock)
    }
  }

  console.log(blocks.length)
  return blocks
}