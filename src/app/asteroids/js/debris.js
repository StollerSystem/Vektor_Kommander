import * as p5 from 'p5';

export default function Debris(pos, vel, n, r, g, rgbColor4) {

  this.destroyFrames = 1300;
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
      len: g.random(.05,.5)
    };

  // console.log(this.debrisParts)

  this.update = function () {
    // console.log("check")
    for (var i = 0; i < this.debrisParts.length; i++) {
      this.debrisParts[i].pos.add(this.debrisParts[i].vel);
      this.debrisParts[i].heading += this.debrisParts[i].rot;
    }
  }

  this.render = function ()  {
    
    // console.log("check")
    for (var i = 0; i < this.debrisParts.length; i++) {
      // ellipse(this.r,this.r,10)
      g.push();
      let transNum = (1 * ((this.destroyFrames--) / 1000))
      let trans = transNum > 0 ? transNum : 0;
      g.stroke(`rgba(${rgbColor4[0]},${rgbColor4[1]},${rgbColor4[2]},${trans})`);
      g.strokeWeight(g.random(1,2.5))
      var d = this.debrisParts[i];
      g.translate(d.pos.x, d.pos.y);
      g.rotate(d.heading);
      
      g.line(-this.r * d.len, -this.r * d.len, this.r * d.len, this.r * d.len);
      g.pop();
    }
  }

}

// function addDebris(pos, vel, n, r) {  
//   debris.push(new Debris(pos, vel, n, r, g));  
//   // console.log(debris)
// }