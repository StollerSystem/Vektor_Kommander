import * as p5 from 'p5';

export default function Debris(pos, vel, n, r, g, color) {

  this.destroyFrames = 1000;
  this.r = r
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.debrisParts = [];
  
  for (var i = 0; i < n; i++)
    this.debrisParts[i] = {
      pos: this.pos.copy(),
      vel: this.vel.copy().add(p5.Vector.random2D().mult(g.random(1,1.5))),
      heading: g.random(0, 360),
      rot: g.random(-0.2, 0.2),
      len: g.random(.05,.4)
    };  

  this.update = function () {    
    for (var i = 0; i < this.debrisParts.length; i++) {
      this.debrisParts[i].pos.add(this.debrisParts[i].vel);
      this.debrisParts[i].heading += this.debrisParts[i].rot;
    }
  }

  this.render = function ()  {    
    for (var i = 0; i < this.debrisParts.length; i++) {     
      g.push();
      let transNum = (.8 * ((this.destroyFrames--) / 1000))
      let trans = transNum > 0 ? transNum : 0;
      g.stroke(`rgba(${color[0]},${color[1]},${color[2]},${trans})`);
      g.strokeWeight(g.random(.5,2)) 
      var d = this.debrisParts[i];
      g.translate(d.pos.x, d.pos.y);
      g.rotate(d.heading);      
      g.line(-this.r * d.len, -this.r * d.len, this.r * d.len, this.r * d.len);
      g.pop();
    }
  }
}