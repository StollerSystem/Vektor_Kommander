import Barrier from './Barrier'

export default function loadBarrier(e, placement) {
  let barrier = [];
  for (let i = 0; i < 10; i++) {
    barrier[i] = new Barrier(((e.width / 4) + placement) - (i * 10), e.height - 200, 10, 10)
  }
  for (let j = 10; j < 20; j++) {
    barrier[j] = new Barrier(((e.width / 4) + placement) - ((j - 10) * 10), e.height - 211, 10, 10)
  }
  for (let j = 20; j < 30; j++) {
    barrier[j] = new Barrier(((e.width / 4) + placement) - ((j - 20) * 10), e.height - 222, 10, 10)
  }
  for (let j = 30; j < 40; j++) {
    barrier[j] = new Barrier(((e.width / 4) + placement) - ((j - 30) * 10), e.height - 233, 10, 10)
  }
  for (let j = 40; j < 50; j++) {
    barrier[j] = new Barrier(((e.width / 4) + placement) - ((j - 40) * 10), e.height - 244, 10, 10)
  }
  return barrier
}