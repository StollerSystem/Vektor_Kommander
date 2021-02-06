import * as p5 from 'p5';
import Entity from './entity';
import { lineIntersect } from './utility';

export default function Laser(spos, svel, angle, g, rgbColor2, enemy, heading) {  
  
  Entity.call(this, spos.x, spos.y, 4, g);
  this.pos = g.createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.enemy = enemy ? enemy : false;
  this.heading = heading  ;
  if (this.enemy) {
    this.vel.mult(10);
  } else {
    this.vel.mult(20);
  }
  this.vel.add(svel);  

  this.render = function () {
    // laser bolt
    if (enemy) {
      g.push();
      var trans = g.random(1, .8)
      g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
      g.strokeWeight(this.r*1.5);
      g.point(this.pos.x, this.pos.y);
      g.pop();

      // glow effect
      g.push();
      var size = this.r * (g.random(2, 10))
      var trans2 = g.random(.4, .05)
      g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans2}) `);
      g.strokeWeight(size);
      g.point(this.pos.x, this.pos.y);
      g.pop();

    } else {

      g.push();
      var trans = g.random(1, .8)
      g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
      g.strokeWeight(1);
      g.translate(this.pos.x, this.pos.y)
      g.rotate(this.heading)
      g.line(0, 0, 25, 0)
      g.pop();

      // glow effect
      g.push();
      var size = this.r * (g.random(1, 5))
      var trans2 = g.random(.4, .05)
      g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans2}) `);
      g.strokeWeight(size);
      g.translate(this.pos.x, this.pos.y)
      g.rotate(this.heading)
      g.line(-10, 0, 10, 0)
      g.pop();
    }
    
  }

  this.playSoundEffect = function (sound) {
    sound.play();    
  }

  this.hits = function (asteroid) {
    // Evaluate if the asteroid was hit based on the range of the laser if one
    // of these conditions hold, then there is no need to check that the laser
    // intersected the asteroid.
    let dist2 = (this.pos.x - asteroid.pos.x) * (this.pos.x - asteroid.pos.x)
      + (this.pos.y - asteroid.pos.y) * (this.pos.y - asteroid.pos.y);
    if (dist2 <= asteroid.rmin2) {
      return true;
    }
    if (dist2 >= asteroid.rmax2) {
      return false;
    }

    // Evaluate if the laser intersected the asteroid, hit detection is
    // evaluated based on hitting the line between adjacent vertices as these
    // are the edges that form the asteroid.
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