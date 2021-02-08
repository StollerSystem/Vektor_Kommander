export default function Splash() {

  const colorArray = ['red', 'blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple', 'cyan']

  this.render = function(g) {

      const centerX = g.width/2
      const centerY = g.height/2


      g.push()
      g.fill(255)
      g.strokeWeight(g.random(1, 3))
      g.stroke(255)
      g.textSize(100)
      g.textAlign(g.CENTER)
      g.textFont('Montserrat')
      g.text('EUCLID COMMANDER', centerX, centerY)
      g.pop()

      g.push()
      g.fill(255)
      g.strokeWeight(g.random(.5, 3))
      g.stroke(255)
      g.textAlign(g.CENTER)
      g.textSize(35)
      g.textFont('Montserrat')
      g.text('PRESS <ENTER> TO START', centerX, centerY/.85)
      g.pop()

      g.push()
      g.fill(255)
      g.strokeWeight(g.random(.5, 2))
      g.stroke(255)
      g.textSize(25)
      g.textFont('Montserrat')
      g.text('⇧', centerX/1.25, centerY/.70)
      g.text('⇩', centerX/1.25, centerY/.675)
      g.text('⇦ ⇨', centerX/1.25, centerY/.65)
      g.text('⎵', centerX/1.25, centerY/.625)
      g.text('REAR THRUST', centerX, centerY/.70)
      g.text('FORWARD THRUST', centerX, centerY/.675)
      g.text('ROTATIONAL THRUST', centerX, centerY/.65)
      g.text('FIRE BLASTER', centerX, centerY/.625)
      g.pop()

  }

}