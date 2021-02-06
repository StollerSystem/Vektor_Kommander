import * as p5 from 'p5';

export default function Entity(x, y, radius, g)
{  
  this.g = g;
  this.pos = g.createVector(x, y);
  this.r = radius;
  this.rmax = radius;
  this.heading = 0;
  this.rotation = 0;
  this.vel = g.createVector(0, 0);
  this.accelMagnitude = 0;  
}

Entity.prototype.update = function() {
  this.heading += this.rotation;  
  var force = p5.Vector.fromAngle(this.heading);
  force.mult(this.accelMagnitude);
  this.vel.add(force);
  this.pos.add(this.vel);  
}

Entity.prototype.setAccel = function(magnitude){
  this.accelMagnitude = magnitude;
}

Entity.prototype.setRotation = function(rot) {  
  this.rotation = rot;
}