import * as p5 from 'p5';
import Entity from './entity.js';

export default function Boss(g, color, windowWidth, addDust, level) {

  var r = 200 + (50 * level);
  var pos = g.createVector(g.width + r * 2, g.random(r, g.height - r));

  Entity.call(this, pos.x, pos.y, r, g);

  Entity.prototype.setRotation.call(this, -.01);

  this.vel = g.createVector(-.5, g.random(-.5, .5))
  this.rmax = r - 30;
  this.onScreen = false;
  this.destroyed = false;
  this.hp = 10 + (2 * level);
  this.coreHitFlash = false;
  this.brokenParts = [];

  // randomize some features
  var e = g.random(.70, 1.25)
  var a = g.random(.8, 1.20)
  // var i = -(a - 1) + 1;  
  var i = a * 1.25;
  var scope = this;

  this.vertices = function (x, y, n) {
    let heading = scope.destroyed ? scope.brokenParts[n].heading : scope.heading;
    let pos = scope.destroyed ? scope.brokenParts[n].pos : scope.pos;
    let c = g.cos(heading);
    let s = g.sin(heading)
    let vertices = [
      p5.Vector.add(g.createVector(
        (x / 12 * a * i * c) - (y * a * s),
        (x / 12 * a * i * s) + (y * a * c)
      ), pos),
      p5.Vector.add(g.createVector(
        (x / 12 * i * c) - (y / 3 * s),
        (x / 12 * i * s) + (y / 3 * c)
      ), pos),
      p5.Vector.add(g.createVector(
        (x / 3 * c) - (y / 12 * i * s),
        (x / 3 * s) + (y / 12 * i * c)
      ), pos),
      p5.Vector.add(g.createVector(
        (x * a * c) - (y / 12 * a * i * s),
        (x * a * s) + (y / 12 * a * i * c)
      ), pos),
      p5.Vector.add(g.createVector(
        (x / 3 * e * c) - (y / 3 * e * s),
        (x / 3 * e * s) + (y / 3 * e * c)
      ), pos),
    ]
    return vertices;
  }

  this.quad1 = {
    pos: scope.pos,
    vertices: function () {
      let hitBox = scope.vertices(-scope.r, scope.r, 0)
      return hitBox;
    }
  }

  this.quad2 = {
    pos: scope.pos,
    vertices: function () {
      let hitBox = scope.vertices(scope.r, scope.r, 1)
      return hitBox;
    }
  }

  this.quad3 = {
    pos: scope.pos,
    vertices: function () {
      let hitBox = scope.vertices(-scope.r, -scope.r, 2)
      return hitBox;
    }
  }

  this.quad4 = {
    pos: scope.pos,
    vertices: function () {
      let hitBox = scope.vertices(scope.r, -scope.r, 3)
      return hitBox;
    }
  }

  this.update = function () {
    Entity.prototype.update.call(this);
    this.core.pos = this.pos;
    this.edges();
    if (this.pos.x < this.g.width - this.rmax) {
      this.onScreen = true;
    }
    if (this.destroyed) {
      for (let i = 0; i < this.brokenParts.length; i++) {
        this.brokenParts[i].pos.add(this.brokenParts[i].vel);;
        this.brokenParts[i].heading += this.brokenParts[i].rot;
      }
    }
  }

  this.edges = function () {
    if (this.onScreen && this.pos.x >= this.g.width - this.rmax) {
      this.vel.x = -this.vel.x

    } else if (this.pos.x <= + this.rmax) {
      this.vel.x = -this.vel.x
    }
    if (this.pos.y >= this.g.height - this.rmax) {
      this.vel = g.createVector(this.vel.x, -this.vel.y);

    } else if (this.pos.y <= +this.rmax) {
      this.vel = g.createVector(this.vel.x, -this.vel.y);
    }
  }

  this.core = {
    pos: this.pos,
    rmin2: 6500,
    vertices: function () {
      let c = g.cos(scope.heading);
      let s = g.sin(scope.heading)
      let r = scope.r
      var hitBox = [
        p5.Vector.add(g.createVector(
          (0 * c) - (r / 3 * s),
          (0 * s) + (r / 3 * c)
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (r / 3 * c) - (0 * s),
          (r / 3 * s) + (0 * c)
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (0 * c) - (-r / 3 * s),
          (0 * s) + (-r / 3 * c)
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-r / 3 * c) - (0 * s),
          (-r / 3 * s) + (0 * c)
        ), scope.pos),
      ]
      return hitBox;
    }
  }

  this.coreHit = function (laserCharge) {
    let damage = laserCharge > 0 ? laserCharge / 3 : 1;
    scope.hp -= damage;
    scope.coreHitFlash = true;
    if (scope.hp <= 0 && !scope.destroyed) {
      scope.destroyed = true;
      this.destroy();
    }
    setTimeout(function () {
      scope.coreHitFlash = false;
    }, 200)
  }

  this.destroy = function () {
    addDust(this.pos, this.vel, 30, .001, color, 10, g);
    for (let i = 0; i < 4; i++) {
      scope.brokenParts[i] = {
        pos: this.pos.copy(),
        vel: this.vel.copy().add(p5.Vector.random2D().mult(g.random(2, 3))),
        heading: this.heading,
        rot: g.random(-0.005, -0.015)
      }
    }
  }

  this.render = function () {
    // BLADES
    let quads = [
      this.quad1.vertices(),
      this.quad2.vertices(),
      this.quad3.vertices(),
      this.quad4.vertices(),
    ]
    g.push();
    g.stroke(`rgba(${color[2]},${color[0]},${color[1]},${1})`);
    g.strokeWeight(g.random(1, 2));
    g.fill(0);
    for (let i = 0; i < quads.length; i++) {
      g.beginShape();
      g.vertex(quads[i][0].x, quads[i][0].y);
      g.vertex(quads[i][1].x, quads[i][1].y);
      g.vertex(quads[i][2].x, quads[i][2].y);
      g.vertex(quads[i][3].x, quads[i][3].y);
      g.vertex(quads[i][4].x, quads[i][4].y);
      g.endShape(g.CLOSE);
    }
    g.pop();

    // CORE
    if (!this.destroyed) {
      g.push();
      g.translate(this.pos.x, this.pos.y);
      let coreColor = this.coreHitFlash ? `rgba(${color[1]},${color[2]},${color[0]},${g.random(.5, .9)})` : `rgba(${color[0]},${color[1]},${color[2]},${g.random(.5, .9)})`;
      g.stroke(coreColor);
      let hpMult = this.hp / 10
      g.strokeWeight(g.random(this.r / 3 * hpMult, this.r / 2 * hpMult));
      g.point(0, 0);
      g.pop();
    }
  }
}

Boss.prototype = Object.create(Entity.prototype);