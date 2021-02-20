import * as p5 from 'p5';
import Entity from './entity.js';
import Laser from './laser.js';
import { addDust } from '../utility/entity-utility.js';

export default function Enemy(state, r, g, color1, color2) {

  this.w = state.windowWidth / 1800;  

  var outOfBounds = [
    g.createVector(g.random(g.width), -r),
    g.createVector(g.width + r, g.random(g.height)),
    g.createVector(g.random(g.width), g.height + r),
    g.createVector(-r, g.random(g.height))
  ]
  var r = r;
  var pos = outOfBounds[g.floor(g.random(0, 4))]
  var radius = r*this.w;
  let windowMod = state.windowWidth < 1024 ? .99 : .999;
  Entity.call(this, pos.x, pos.y, radius, g, windowMod)
  
  this.crazyness = g.random(1, 2 + state.level / 4);
  this.shotThresh = g.random(1, 1.5 + state.level / 5);
  this.point = g.random(1, 2);
  this.vel = p5.Vector.random2D();
  this.vel.mult(4);
  this.rotation = g.random(.03, .1);
  this.recentlyEdged = 100;
  var scope = this;

  this.update = function () {
    Entity.prototype.update.call(this);
    this.recentlyEdged -= 1;
    this.edges();
    var changeCourse = g.random(1, 100)
    var shoot = g.random(1, 25)

    // ENEMY "AI"
    if (changeCourse <= this.crazyness && this.recentlyEdged <= 0) {
      this.recentlyEdged = 100;
      this.setAccel(1)
      this.vel = p5.Vector.random2D();
      this.vel.mult(4);
    } else {
      this.setAccel(0)
    }
    if (shoot <= this.shotThresh) {
      this.shootLaser();
    }
  }
  
  this.shootLaser = function () {
    var laser = new Laser(scope.pos, scope.vel, scope.heading, g, color2, true, 0, this.w);
    var dustVel = laser.vel.copy();
    addDust(state, scope.pos, dustVel.mult(.5), 4, .045, color2, 5, g);
    state.lasers.push(laser);
  }

  this.render = function () {
    g.push();
    g.translate(this.pos.x, this.pos.y);
    g.rotate(this.heading);
    g.stroke(`rgba(${color1[0]},${color1[1]},${color1[2]},${1})`);
    g.strokeWeight(g.random(1, 2.5))
    g.fill(0);
    g.beginShape();
    g.vertex(this.r / 2, this.r / 2)
    g.vertex(this.r * this.point, 0)
    g.vertex(this.r / 2, -this.r / 2)
    g.vertex(0, -this.r * this.point)
    g.vertex(-this.r / 2, -this.r / 2)
    g.vertex(-this.r * this.point, 0)
    g.vertex(-this.r / 2, this.r / 2) 
    g.vertex(0, this.r * this.point)
    g.endShape(g.CLOSE);

    g.push()
    g.stroke(`rgba(${color1[2]},${color1[0]},${color1[1]},${1})`)
    g.strokeWeight(g.random(.5,3))
    g.ellipse(0, 0, this.r, this.r)
    g.pop()

    g.pop();
  }

  // HITBOX
  this.vertices = function () {
    var vertices = [
      p5.Vector.add(g.createVector(this.r / 2, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r * this.point, 0), this.pos),
      p5.Vector.add(g.createVector(this.r / 2, -this.r / 2), this.pos),
      p5.Vector.add(g.createVector(0, -this.r * this.point), this.pos),
      p5.Vector.add(g.createVector(-this.r / 2, -this.r / 2), this.pos),
      p5.Vector.add(g.createVector(-this.r * this.point, 0), this.pos),
      p5.Vector.add(g.createVector(-this.r / 2, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(0, this.r * this.point), this.pos)
    ]
    return vertices;
  }

  this.edges = function () {
    if (this.pos.x > this.g.width + this.rmax) {
      this.pos.x = -this.rmax;
    } else if (this.pos.x < -this.rmax) {
      this.pos.x = this.g.width + this.rmax;
    }
    if (this.pos.y > this.g.height + this.rmax) {
      this.pos.y = -this.rmax;
    } else if (this.pos.y < -this.rmax) {
      this.pos.y = this.g.height + this.rmax;
    }
  }
}

Enemy.prototype = Object.create(Entity.prototype);