export default function Splash() {

  this.render = function(g) {
    g.push()
    g.fill(255)
    g.strokeWeight(g.random(1, 2))
    g.stroke(255)
    g.textSize(100)
    g.textAlign(g.CENTER)
    g.textFont('Montserrat')
    g.text('EUCLID COMMANDER', g.width/2, g.height/2)
    g.pop()
  }

}