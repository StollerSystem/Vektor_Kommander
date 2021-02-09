import * as p5 from 'p5';
import Entity from './entity.js';
import { lineIntersect } from '../utility/utility.js';

export default function Laser(spos, svel, angle, g, color, enemy, heading, windowWidthMod) {

  Entity.call(this, spos.x, spos.y, 4, g, null);
  this.pos = g.createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.enemy = enemy ? enemy : false;
  this.heading = heading;
  this.w = windowWidthMod;
  // console.log(this.w)
  if (this.enemy) {
    this.vel.mult(10);
  } else {
    this.vel.mult(20);
  }
  this.vel.add(svel);

  this.render = function () {
    // ENEMY BLASTER BALL
    if (enemy) {
      g.push();
      var trans = g.random(1, .8)
      g.stroke(`rgba(${color[2]},${color[1]},${color[0]},${trans})`);
      g.strokeWeight(this.r * 1.5 * this.w);
      g.point(this.pos.x, this.pos.y);
      g.pop();

      // glow effect
      g.push();
      var size = this.r * (g.random(2 * this.w, 10 * this.w))
      var trans2 = g.random(.4, .05)
      g.stroke(`rgba(${color[2]},${color[0]},${color[1]},${trans2}) `);
      g.strokeWeight(size);
      g.point(this.pos.x, this.pos.y);
      g.pop();

    } else {
      // PLAYER LASER
      g.push();
      var trans = g.random(1, .8)
      g.stroke(`rgba(${color[0]},${color[1]},${color[2]},${trans})`);
      g.strokeWeight(1 * this.w);
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

  this.playSoundEffect = function (sound) {
    sound.play();
  }

  this.hits = function (asteroid) {
    let dist2 = (this.pos.x - asteroid.pos.x) * (this.pos.x - asteroid.pos.x)
      + (this.pos.y - asteroid.pos.y) * (this.pos.y - asteroid.pos.y);
    if (dist2 <= asteroid.rmin2) {
      return true;
    }
    if (dist2 >= asteroid.rmax2) {
      return false;
    }
    var last_pos = p5.Vector.sub(this.pos, this.vel);
    var asteroid_vertices = asteroid.vertices();
    for (var i = 0; i < asteroid_vertices.length - 1; i++) {
      if (lineIntersect(last_pos,
        this.pos,
        asteroid_vertices[i],
        asteroid_vertices[i + 1])) {
        return true;
      }
    }
    if (lineIntersect(last_pos,
      this.pos,
      asteroid_vertices[0],
      asteroid_vertices[asteroid_vertices.length - 1])) {
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