import * as p5 from 'p5';

export default function Entity(x, y, radius, g)
{
  // console.log(x)
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

  // Accelerate using the heading and the accelMagnitude
  var force = p5.Vector.fromAngle(this.heading);
  force.mult(this.accelMagnitude);
  this.vel.add(force);

  this.pos.add(this.vel);
  this.edges();
}

Entity.prototype.setAccel = function(magnitude)
{
  this.accelMagnitude = magnitude;
}

Entity.prototype.edges = function() {
  if (this.pos.x > this.g.width + this.rmax) {
    this.pos.x = -this.rmax;    
    this.tailEdge = true;
  } else if (this.pos.x < -this.rmax) {
    this.pos.x = this.g.width + this.rmax;
    this.tailEdge = true;
  }
  if (this.pos.y > this.g.height + this.rmax) {
    this.pos.y = -this.rmax;
    this.tailEdge = true;
  } else if (this.pos.y < -this.rmax) {
    this.pos.y = this.g.height + this.rmax;
    this.tailEdge = true;
  }
}

Entity.prototype.setRotation = function(rot) {
  this.rotation = rot;
}
