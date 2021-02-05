import Entity from './entity';
import * as p5 from 'p5';

export default function Barrier(g, x, y, vx, vy) {

  var pos = g.createVector(x,y)
  const colorArray = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'pink']


  Entity.call(this, pos.x, pos.y, 20, g)

  this.vel = g.createVector(vx,vy) // SET VELOCITY
  this.rotation = 1

  // Entity.prototype.setRotation.call(this, g.random(-0.03, 0.03));

  this.render = function() {
    g.push()
    g.noFill()
    g.stroke(255);
    g.strokeWeight(g.random(.5, .75));
    g.rect(this.pos.x, this.pos.y, this.r, this.r)
    g.pop()
  }

  this.vertices = function () {
    var barrierVertices = [
      p5.Vector.add(g.createVector(-this.r/2, this.r/2), this.pos),
      p5.Vector.add(g.createVector(this.r/2, this.r/2), this.pos),
      p5.Vector.add(g.createVector(-this.r/2, -this.r/2), this.pos),
      p5.Vector.add(g.createVector(-this.r/2, -this.r/2), this.pos),
    ]
    return barrierVertices;
  }

  this.offscreen = function () {
    if (this.pos.x > g.width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > g.height || this.pos.y < 0) {
      return true;
    }
    return false;
  }

}

Barrier.prototype = Object.create(Entity.prototype)