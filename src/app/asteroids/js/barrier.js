import Entity from './entity'

export default function Barrier(g, x, y, vx, vy) {

  var pos = g.createVector(x,y)
  const colorArray = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink']


  Entity.call(this, pos.x, pos.y, 5, g)

  this.vel = g.createVector(vx,vy) // SET VELOCITY
  // Entity.prototype.setRotation.call(this, g.random(-0.03, 0.03)); // SET ROTATION

  this.render = function() {
    g.push()
    g.fill(255)
    g.stroke(255);
    g.strokeWeight(g.random(1, 2));
    g.rect(this.pos.x, this.pos.y, this.r, this.r)
    g.pop()
  }

}

Barrier.prototype = Object.create(Entity.prototype)