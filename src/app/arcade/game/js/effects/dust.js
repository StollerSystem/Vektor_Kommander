import * as p5 from 'p5';

export default function Dust(pos, vel, trans, color, weight, g) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(g.random(0.5, 1.5)));
  this.transparency = 1
  this.color = color;
  this.weight = weight ? weight : 2;

  this.update = function () {
    this.pos.add(this.vel);
    this.trans = trans ? trans : .005;
    this.transparency -= this.trans;
  }

  this.render = function () {
    if (this.transparency > 0) {
      g.push();      
      g.stroke(`rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.transparency})`);
      g.strokeWeight(g.random(1, this.weight));
      g.point(this.pos.x, this.pos.y);
      g.pop();
    }
  }
}