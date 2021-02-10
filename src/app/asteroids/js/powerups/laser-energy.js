import Entity from '../entity/entity.js';
import * as p5 from 'p5';

export default function LaserEnergy(g, pos, windowWidth) {
  this.w = windowWidth / 1800;
  this.r = 12
  console.log("POWER SQUARE OBJECT")

  Entity.call(this, pos.x, pos.y, this.r, g, null)

  this.vel = g.createVector(g.random(-1.5, -2.5), g.random(1.5, -1.5))

  Entity.prototype.setRotation.call(this, g.random(-0.2, 0.2));

  this.render = function () {
    g.push()
    g.translate(this.pos.x, this.pos.y);
    g.rotate(this.heading);
    g.fill(`rgba(${Math.round(g.random(0,254))},${Math.round(g.random(0,254))},${Math.round(g.random(0,254))},1)`)
    // g.ellipse(0,0,20,40)
    g.triangle(0,-this.r,-this.r,this.r/2,this.r,this.r/2)
    g.pop()
  }
}

LaserEnergy.prototype = Object.create(Entity.prototype)