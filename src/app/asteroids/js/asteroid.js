import * as p5 from 'p5';
import Entity from './entity';

export default function Asteroid(pos, r, size, g, rgbColor1) {
  if (pos == null) {
    pos = g.createVector(g.random(g.width), g.random(g.height));
  }

  r = r != null ? r * 0.5 : g.random(80, 105);
  Entity.call(this, pos.x, pos.y, r, g);

  this.vel = p5.Vector.random2D();
  this.total = g.floor(g.random(7, 15));

  //smaller asteroids go a bit faster
  this.size = size;
  switch(size) {
    case 2:
      this.vel.mult(1); break;
    case 1:
      this.vel.mult(2); break;
    case 0:
      this.vel.mult(3); break;
  }


  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = g.random(-this.r * 0.2, this.r * 0.5);
  }

  // Calculate minimum and maximum radii squared
  // this.rmin = this.r + g.min(this.offset);
  // this.rmin2 = this.rmin * this.rmin;
  // this.rmax = this.r + g.max(this.offset);
  // this.rmax2 = this.rmax * this.rmax;

  Entity.prototype.setRotation.call(this, g.random(-0.03, 0.03));

  this.render = function() {
    g.push();
    g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
    g.strokeWeight(g.random(1,1.5))
    g.noFill();
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

  this.playSoundEffect = function(soundArray){
    soundArray[floor(random(0,soundArray.length))].play();
  }

  this.breakup = function() {
    if(size > 0)
      return [
        new Asteroid(this.pos, this.r, this.size-1, g, rgbColor1),
        new Asteroid(this.pos, this.r, this.size-1, g, rgbColor1)
      ];
    else
      return [];
  }

  this.vertices = function() {
    var vertices = []
    for(var i = 0; i < this.total; i++) {
      var angle = this.heading + g.map(i, 0, this.total, 0, g.TWO_PI);
      var r = this.r + this.offset[i];
      var vec = g.createVector(r * g.cos(angle), r * g.sin(angle));
      vertices.push(p5.Vector.add(vec, this.pos));
    }

    return vertices;
  }
}

Asteroid.prototype = Object.create(Entity.prototype);
