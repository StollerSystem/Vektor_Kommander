import Entity from '../entity/entity.js';
import * as p5 from 'p5';

export default function LaserEnergy(g, pos, windowWidth, laserPowerUp) {
  this.w = windowWidth / 1800;
  this.r = 15*this.w
  

  Entity.call(this, pos.x, pos.y, this.r, g, null)

  this.vel = g.createVector(g.random(-1.5, -2.5), g.random(1.5, -1.5))

  Entity.prototype.setRotation.call(this, g.random(-0.2, 0.2));

  this.vertices = function () {
    var barrierVertices = [
      p5.Vector.add(g.createVector(0, -this.r), this.pos),
      p5.Vector.add(g.createVector(-this.r, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r, this.r / 2), this.pos),      
    ]
    return barrierVertices;
  }

  this.powerUp = function () {
    // console.log("POWER UP")
    laserPowerUp();
  }

  this.render = function () {
    g.push()
    g.translate(this.pos.x, this.pos.y);
    g.rotate(this.heading);
    g.fill(`rgba(${Math.round(g.random(0,254))},${Math.round(g.random(0,254))},${Math.round(g.random(0,254))},1)`)
    // g.ellipse(0,0,20,40)
    g.triangle(0,-this.r,-this.r,this.r/2,this.r,this.r/2)
    g.pop()
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

LaserEnergy.prototype = Object.create(Entity.prototype)