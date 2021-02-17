import Star from './star.js'

export default function hyperDrive(g, stars, easeInStars, beginGameSequence) {
  for (let i = 0; i < stars.length; i++) {
    if (g.frameCount-beginGameSequence < 100) {
    easeInStars = easeInStars/Math.pow(1.000008, g.frameCount-beginGameSequence)
    } 
    else {
    easeInStars += (g.frameCount-beginGameSequence)/1000000
      if (easeInStars >= 1.25) {
        easeInStars = 1.25
      }
    }
    stars[i].move(easeInStars)
    if (stars[i].x <= 0) {
      let windowX = g.width
      let randomY = g.random(0, g.height)
      let randomSize = g.random(.1, 25)
      const newStar = new Star(windowX, randomY, randomSize, g);
      stars.push(newStar)
      stars.splice(i, 1)
    }
  }
  return stars
}