import * as p5 from 'p5';
import Entity from './entity.js';
import { lineIntersect } from '../utility/line-intersect.js';

export default function Laser(spos, svel, angle, g, color, enemy, heading, windowWidthMod, charge) {

  Entity.call(this, spos.x, spos.y, 4, g, null);
  this.pos = g.createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.enemy = enemy ? enemy : false;
  this.charge = charge ? charge : 0;
  this.heading = heading;
  this.w = windowWidthMod;

  if (this.enemy) {
    this.vel.mult(10);
  } else {
    this.vel.mult(20);
  }

  this.vel.add(svel);

  this.render = function () {
    // ENEMY BLASTER BALL
    let enemyCharge = charge ? charge : 0;
    if (enemy) {
      g.push();
      var trans = g.random(1, .8)
      g.stroke(`rgba(${color[2]},${color[0]},${color[1]},${trans})`);
      g.strokeWeight(this.r * 1.5 * this.w + enemyCharge);
      g.point(this.pos.x, this.pos.y);
      g.pop();
      // glow effect
      g.push();
      var size = this.r * (g.random(2 * this.w, 10 * this.w))
      var trans2 = g.random(.4, .05)
      g.stroke(`rgba(${color[1]},${color[0]},${color[2]},${trans2}) `);
      g.strokeWeight(size + enemyCharge);
      g.point(this.pos.x, this.pos.y);
      g.pop();

    } else {
      // PLAYER LASER
      g.push();
      var trans = g.random(1, .8)
      g.stroke(`rgba(${color[0]},${color[1]},${color[2]},${trans})`);
      let weight = charge > 0 ? 4 + charge : 4;
      g.strokeWeight(weight);
      g.translate(this.pos.x, this.pos.y)
      g.rotate(this.heading)
      g.line(0, 0, 25 * this.w, 0)
      g.pop();
      // glow effect
      g.push();
      var size = this.r * (g.random(1 * this.w, 5 * this.w))
      var trans2 = g.random(.4, .05)
      g.stroke(`rgba(${color[0]},${color[1]},${color[2]},${trans2}) `);
      g.strokeWeight(size);
      g.translate(this.pos.x, this.pos.y)
      g.rotate(this.heading)
      g.line(-10 * this.w, 0, 10 * this.w, 0)
      g.pop();
    }
  }

  this.hits = function (target) {
    var last_pos = p5.Vector.sub(this.pos, this.vel);
    let dist2 = (this.pos.x - target.pos.x) * (this.pos.x - target.pos.x)
      + (this.pos.y - target.pos.y) * (this.pos.y - target.pos.y) - (charge * charge * 2);

    if (dist2 <= target.rmin2) {
      return true;
    }

    if (dist2 >= target.rmax2) {
      return false;
    }

    var target_vertices = target.vertices();
    for (var i = 0; i < target_vertices.length - 1; i++) {
      if (lineIntersect(last_pos,
        this.pos,
        target_vertices[i],
        target_vertices[i + 1])) {
        return true;
      }
    }

    if (lineIntersect(last_pos,
      this.pos,
      target_vertices[0],
      target_vertices[target_vertices.length - 1])) {
      return true;
    }
    return false;
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

Laser.prototype = Object.create(Entity.prototype);