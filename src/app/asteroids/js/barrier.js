import Entity from './entity'

export default function Barrier(g) {

  var pos = g.createVector(g.width/3,g.height/3)
  const colorArray = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink']


  Entity.call(this, pos.x, pos.y, 5, g)

  this.render = function() {
    g.push()
    g.fill(colorArray[g.round(g.random(0, 6))])
    g.stroke(colorArray[g.round(g.random(0, 6))]);
    g.strokeWeight(g.random(1, 4));
    g.rect(this.pos.x, this.pos.y, this.r, this.r)
    g.pop()
  }
}

Barrier.prototype = Object.create(Entity.prototype)