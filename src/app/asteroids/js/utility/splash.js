import Star from '../effects/star.js'

export default function Splash() {

  const colorArray = ['red', 'blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple', 'cyan']

  this.render = function(g, stars) {

    for (let i = 0; i < stars.length; i++) {
      stars[i].move(1.25)
      if (stars[i].x <= 0) {
        let windowX = g.width
        let randomY = g.random(0, g.height)
        let randomSize = g.random(0.1, 7)
        const newStar = new Star(windowX, randomY, randomSize, g);
        stars.push(newStar)
        stars.splice(i, 1)
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].show()
    }

      const centerX = g.width/2
      const centerY = g.height/2


      g.push()
      g.fill(255)
      g.strokeWeight(g.random(1, 3))
      g.stroke(255)
      g.textSize(100)
      g.textAlign(g.CENTER)
      g.textFont('Montserrat')
      g.text('EUCLID COMMANDER', centerX, centerY*.85)
      g.pop()

      g.push()
      g.fill(255)
      g.strokeWeight(g.random(.5, 3))
      g.stroke(255)
      g.textAlign(g.CENTER)
      g.textSize(35)
      g.textFont('Montserrat')
      g.text('PRESS <ENTER> TO START', centerX, centerY)
      g.pop()

      g.push()
      g.fill(255)
      g.strokeWeight(g.random(.5, 2))
      g.stroke(255)
      g.textSize(20)
      g.textFont('Montserrat')
      g.textAlign(g.RIGHT)
      g.text('⇧', centerX/1.075, centerY/.70)
      g.text('⇩', centerX/1.075, centerY/.675)
      g.text('⇦ ⇨', centerX/1.075, centerY/.65)
      g.text('⎵', centerX/1.075, centerY/.625)
      g.textAlign(g.LEFT)
      g.text('FORWARD THRUST', centerX, centerY/.70)
      g.text('REVERSE THRUST', centerX, centerY/.675)
      g.text('ROTATIONAL THRUST', centerX, centerY/.65)
      g.text('FIRE BLASTER', centerX, centerY/.625)
      g.pop()
  }

}