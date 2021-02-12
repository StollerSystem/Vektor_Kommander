import * as p5 from 'p5';
import Entity from './entity.js';

export default function Asteroid(pos, r, size, g, color, windowWidth) {
  this.w = windowWidth / 1800;

  r = r != null ? r * 0.5 : g.random(80 * this.w, 105 * this.w);
  if (pos == null) {
    pos = g.createVector(g.width + r, g.random(g.height));
  }

  let windowMod = windowWidth < 1024 ? .999 : null;

  Entity.call(this, pos.x, pos.y, r, g, windowMod);

  this.vel = g.createVector(g.random(-1.5, -4), g.random(2, -2))
  this.total = g.floor(g.random(7, 15));

  //smaller asteroids go a bit faster
  this.size = size;
  switch (size) {
    case 2:      
      this.vel.mult(1.05); break;      
    case 1:
      this.vel.mult(1.1); break;
    case 0:
      this.vel.mult(1.15); break;
  }


  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = g.random(-this.r * 0.2, this.r * 0.5);
  }

  // Calculate minimum and maximum radii squared
  this.rmin = this.r + g.min(this.offset);
  this.rmin2 = this.rmin * this.rmin;
  this.rmax = this.r + g.max(this.offset);
  this.rmax2 = this.rmax * this.rmax;

  Entity.prototype.setRotation.call(this, g.random(-0.03, 0.03));

  this.render = function () {
    g.push();
    g.stroke(`rgba(${color[0]},${color[1]},${color[2]},1)`);
    g.strokeWeight(g.random(1, 1.5))
    g.fill(0)
    g.translate(this.pos.x, this.pos.y);
    g.rotate(this.heading);
    g.beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = g.map(i, 0, this.total, 0, g.TWO_PI);
      var r = this.r + this.offset[i];
      g.vertex(r * g.cos(angle), r * g.sin(angle));
    }
    g.endShape(g.CLOSE);
    g.pop();
  }

  this.playSoundEffect = function (soundArray) {
    soundArray[floor(random(0, soundArray.length))].play();
  }

  this.breakup = function () {
    if (size > 0)
      return [
        new Asteroid(this.pos, this.r, this.size - 1, g, color),
        new Asteroid(this.pos, this.r, this.size - 1, g, color)
      ];
    else
      return [];
  }

  this.vertices = function () {
    var vertices = []
    for (var i = 0; i < this.total; i++) {
      var angle = this.heading + g.map(i, 0, this.total, 0, g.TWO_PI);
      var r = this.r + this.offset[i];
      var vec = g.createVector(r * g.cos(angle), r * g.sin(angle));
      vertices.push(p5.Vector.add(vec, this.pos));
    }
    return vertices;
  }

  this.offscreen = function () {
    if (this.pos.x > g.width + this.rmax || this.pos.x < 0 - this.rmax) {
      return true;
    }
    if (this.pos.y > g.height + this.rmax || this.pos.y < 0 - this.rmax) {
      return true;
    }
    return false;
  }
}

Asteroid.prototype = Object.create(Entity.prototype);
