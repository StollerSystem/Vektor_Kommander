import Entity from '../entity/entity.js';
import * as p5 from 'p5';

export default function LaserEnergy(state, g, pos, windowWidth, laserPowerUp) {
  this.w = windowWidth / 1800;
  this.r = 15 * this.w
  this.b = Math.sqrt(Math.pow(this.r, 2) - Math.pow(this.r / 2, 2))


  Entity.call(this, pos.x, pos.y, this.r, g, null)

  this.vel = g.createVector(g.random(-.5, -2), g.random(1.5, -1.5))

  Entity.prototype.setRotation.call(this, g.random(-0.2, 0.2));

  // HITBOX
  this.vertices = function () {
    var barrierVertices = [
      p5.Vector.add(g.createVector(0, -this.r * 1.50), this.pos),
      p5.Vector.add(g.createVector(-this.b * 1.50, this.r / 2 * 1.50), this.pos),
      p5.Vector.add(g.createVector(this.b * 1.50, this.r / 2 * 1.50), this.pos),
    ]
    return barrierVertices;
  }

  this.powerUp = function ( points) {
    // laserPowerUp(state, points);
    state.score += points;
    state.laserOverHeat = false;
    state.laserCharge = 2000;
  }

  this.render = function () {
    g.push()
    g.translate(this.pos.x, this.pos.y);
    g.translate(g.random(-1.5, 1.5), g.random(-1.5, 1.5))
    g.rotate(this.heading);
    g.fill(`rgba(${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},.5)`)
    g.stroke(`rgba(${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},.5)`)
    g.strokeWeight(g.random(1, 10))
    g.triangle(0, -this.r, -this.b, this.r / 2, this.b, this.r / 2)
    g.pop()

    g.push()
    g.translate(this.pos.x, this.pos.y);
    g.translate(g.random(-2, 2), g.random(-2, 2))
    g.rotate(this.heading);
    g.fill(`rgba(${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},1)`)
    g.stroke(`rgba(${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},${Math.round(g.random(0, 254))},1)`)
    g.strokeWeight(g.random(1, 3))
    g.triangle(0, -this.r, -this.b, this.r / 2, this.b, this.r / 2)
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