import * as p5 from 'p5';

export default function PointNumber(pos, vel, color, g, text) {

  console.log(g)

  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(g.random(0.5, 1.5)));
  this.transparency = 1
  this.color = color;
  this.text = text;

  this.update = function () {
    this.pos.add(this.vel);
    this.trans = .005;
    this.transparency -= this.trans;
  }

  this.render = function() {
    let transNum = (.8 * ((this.destroyFrames--) / 1000))
    let trans = transNum > 0 ? transNum : 0;
    g.push()
    g.fill(255)
    g.text(this.text, this.pos.x, this.pos.y)
    g.pop()
  }


}