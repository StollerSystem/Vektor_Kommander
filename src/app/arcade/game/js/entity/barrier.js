import Entity from './entity.js';
import * as p5 from 'p5';

export default function Barrier(g, x, y, vx, vy, color, w) {

  var pos = g.createVector(x, y)
  var r = 30 * (w / 1800);

  Entity.call(this, pos.x, pos.y, r, g, null)

  this.vel = g.createVector(vx, vy)
  this.rmin2 = r * r;
  let ranNum = Math.round(g.random(1,10))
  this.powerSquare = ranNum === 1 ? true : false;  

  this.render = function () {
    g.push()
    g.noFill()
    if (this.powerSquare) {
      g.stroke(`rgba(${color[2]},${color[0]},${color[1]},${1})`);
      g.strokeWeight(g.random(1.75, 3.75));
    } else {
      g.stroke(`rgba(${color[0]},${color[1]},${color[2]},${1})`);
      g.strokeWeight(g.random(1, 1.75));
    }
    g.translate(this.pos.x, this.pos.y)
    g.rotate(this.heading)
    g.rectMode(g.CENTER)    
    g.rect(0, 0, this.r, this.r)
    g.pop()
  }

  this.vertices = function () {
    var barrierVertices = [
      p5.Vector.add(g.createVector(-this.r / 2, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r / 2, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(-this.r / 2, -this.r / 2), this.pos),
      p5.Vector.add(g.createVector(-this.r / 2, -this.r / 2), this.pos),
    ]
    return barrierVertices;
  }

  this.offscreen = function () {
    if (this.pos.x < 0) {
      return true;
    } else {
      return false;
    }
  }

}

Barrier.prototype = Object.create(Entity.prototype)