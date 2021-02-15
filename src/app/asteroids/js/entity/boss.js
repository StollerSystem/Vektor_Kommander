import * as p5 from 'p5';
import Entity from './entity.js';

export default function Boss(g, color, windowMod) {

  var r = 250;

  var pos = g.createVector(g.width * .75 + r, g.random(r, g.height - r));

  Entity.call(this, pos.x, pos.y, r, g, windowMod);

  Entity.prototype.setRotation.call(this, -.015);

  // this.vel = g.createVector(g.random(-1.5, -4), g.random(2, -2))
  this.vel = g.createVector(-2, g.random(1,-1))
  this.rmax = r - 30;
  this.onScreen = false;

  this.verticies = function () {

  }

  this.update = function () {
    Entity.prototype.update.call(this);
    this.edges();
    if (this.pos.x < this.g.width - this.rmax) {
      this.onScreen = true;
      // console.log(this.onScreen)
    } 
  }

  this.edges = function () {
    if (this.onScreen && this.pos.x >= this.g.width - this.rmax) {
      // let rebound = this.vel.x < 2 ? -2 * this.w : -this.vel.x / 2;
      this.vel.x = -this.vel.x
      
    } else if (this.pos.x <= + this.rmax) {
      this.vel.x = -this.vel.x
    }
    if (this.pos.y >= this.g.height - this.rmax) {      
      this.vel = g.createVector(this.vel.x, -this.vel.y);

    } else if (this.pos.y <= +this.rmax) {      
      this.vel = g.createVector(this.vel.x, -this.vel.y);
    }
  }

  this.render = function () {
    // console.log("b ren")
    g.push()
    g.translate(this.pos.x, this.pos.y);
    g.rotate(this.heading);
    g.stroke(255)
    g.strokeWeight(g.random(1, 2))
    g.fill(0)
    // g.ellipse(0,0,40,40)

    g.beginShape();
    g.vertex(-this.r / 12, this.r)
    g.vertex(-this.r / 12, this.r / 3)
    g.vertex(-this.r / 3, this.r / 12)
    g.vertex(-this.r, this.r / 12)
    g.vertex(-this.r / 3, this.r / 3)
    g.endShape(g.CLOSE);

    g.beginShape();
    g.vertex(this.r / 12, this.r)
    g.vertex(this.r / 12, this.r / 3)
    g.vertex(this.r / 3, this.r / 12)
    g.vertex(this.r, this.r / 12)
    g.vertex(this.r / 3, this.r / 3)
    g.endShape(g.CLOSE);

    g.beginShape();
    g.vertex(-this.r / 12, -this.r)
    g.vertex(-this.r / 12, -this.r / 3)
    g.vertex(-this.r / 3, -this.r / 12)
    g.vertex(-this.r, -this.r / 12)
    g.vertex(-this.r / 3, -this.r / 3)
    g.endShape(g.CLOSE);

    g.beginShape();
    g.vertex(this.r / 12, -this.r)
    g.vertex(this.r / 12, -this.r / 3)
    g.vertex(this.r / 3, -this.r / 12)
    g.vertex(this.r, -this.r / 12)
    g.vertex(this.r / 3, -this.r / 3)
    g.endShape(g.CLOSE);

    g.pop();
  }
}

Boss.prototype = Object.create(Entity.prototype);