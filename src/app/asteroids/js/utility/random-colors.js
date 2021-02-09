export default function randomColors(g) {
  let ran1 = Math.round(g.random(1, 3))
  let c1x = ran1 === 3 ? 255 : 0;
  let c1y = ran1 === 1 ? 255 : 0;
  let c1z = ran1 === 2 ? 255 : 0;
  let c1a = ran1 === 1 ? 0 : 240;
  let c1b = ran1 === 2 ? 0 : 240;
  let c1c = ran1 === 3 ? 0 : 240;
  const c1 = [Math.round(g.random(c1x, c1a)), Math.round(g.random(c1y, c1b)), Math.round(g.random(c1z, c1c))]
  let c2x = ran1 === 2 ? 255 : 0;
  let c2y = ran1 === 3 ? 255 : 0;
  let c2z = ran1 === 1 ? 255 : 0;
  let c2a = ran1 === 3 ? 0 : 255;
  let c2b = ran1 === 1 ? 0 : 255;
  let c2c = ran1 === 2 ? 0 : 255;
  const c2 = [Math.round(g.random(c2x, c2a)), Math.round(g.random(c2y, c2b)), Math.round(g.random(c2z, c2c))]
  let c3x = ran1 === 1 ? 255 : 0;
  let c3y = ran1 === 2 ? 255 : 0;
  let c3z = ran1 === 3 ? 255 : 0;
  let c3a = ran1 === 2 ? 0 : 255;
  let c3b = ran1 === 3 ? 0 : 255;
  let c3c = ran1 === 1 ? 0 : 255;
  const c3 = [Math.round(g.random(c3x, c3a)), Math.round(g.random(c3y, c3b)), Math.round(g.random(c3z, c3c))]
  let c4x = ran1 === 2 ? 255 : 0;
  let c4y = ran1 === 1 ? 255 : 0;
  let c4z = ran1 === 3 ? 255 : 0;
  let c4a = ran1 === 1 ? 0 : 255;
  let c4b = ran1 === 3 ? 0 : 255;
  let c4c = ran1 === 2 ? 0 : 255;
  const c4 = [Math.round(g.random(c4x, c4a)), Math.round(g.random(c4y, c4b)), Math.round(g.random(c4z, c4c))]
  let c5a = ran1 === 1 ? 0 : 255;
  let c5b = ran1 === 3 ? 0 : 255;
  let c5c = ran1 === 2 ? 0 : 255;
  const c5 = [Math.round(g.random(0, c5a)), Math.round(g.random(0, c5b)), Math.round(g.random(0, c5c))]
  return [c1,c2,c3,c4,c5]
}