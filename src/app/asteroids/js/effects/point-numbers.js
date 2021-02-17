import * as p5 from 'p5';

export default function PointNumber(pos, vel, color, g, text, size) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(g.random(0.5, 1.5)));
  this.transparency = 1
  this.color = color;
  this.text = text;
  this.trans = .005;
  this.size = size ? size : 15

  this.update = function () {
    this.pos.add(this.vel);
    this.trans = .025;
    this.transparency -= this.trans;
  }

  this.render = function() {
    let transNum = (.8 * ((this.destroyFrames--) / 1000))    
    g.push()
    g.fill(`rgba(255, 255, 255, ${g.random(0, this.transparency)})`)
    g.stroke(`rgba(255, 255, 255, ${this.transparency})`)
    g.strokeWeight(g.random(.1, 2))
    g.textFont('Montserrat')
    g.textSize(this.size)
    g.text(this.text, this.pos.x, this.pos.y)
    g.pop()
  }
}