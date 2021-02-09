import Star from '../effects/star.js'

export default function loadStars(g) {
  let stars = [];
  for (let i = 0; i < 100; i++) {
    let randomX = g.round(g.random(0, g.width))
    let randomY = g.random(0, g.height)
    let randomSize = g.random(0.1, 7)
  
    stars[i] = new Star(randomX, randomY, randomSize, g);
  }
  return stars
}