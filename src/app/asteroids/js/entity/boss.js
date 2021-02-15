import * as p5 from 'p5';
import Entity from './entity.js';

export default function Boss(g, color, windowMod) {

  var r = 250;

  var pos = g.createVector(g.width * .75 + r, g.random(r, g.height - r));

  Entity.call(this, pos.x, pos.y, r, g, windowMod);

  Entity.prototype.setRotation.call(this, -.0075);

  // this.vel = g.createVector(g.random(-1.5, -4), g.random(2, -2))
  this.vel = g.createVector(-1, g.random(1, -1))
  this.rmax = r - 30;
  this.onScreen = false;


  // randomize some features
  var e = g.random(.70, 1.25)
  var a = g.random(.8, 1.20)
  // var i = -(a - 1) + 1;  
  var i = a

  this.verticies = function () {

    var hitBox = [

      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),

      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),

      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),

      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos),
      p5.Vector.add(g.createVector(), this.pos)
    ]


    return hitBox;
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
    g.vertex(-this.r / 12 * a * i, this.r * a)
    g.vertex(-this.r / 12 * i, this.r / 3)
    g.vertex(-this.r / 3, this.r / 12 * i)
    g.vertex(-this.r * a, this.r / 12 * a * i)
    g.vertex(-this.r / 3 * e, this.r / 3 * e)
    g.endShape(g.CLOSE);

    g.beginShape();
    g.vertex(this.r / 12 * a * i, this.r * a)
    g.vertex(this.r / 12 * i, this.r / 3)
    g.vertex(this.r / 3, this.r / 12 * i)
    g.vertex(this.r * a, this.r / 12 * a * i)
    g.vertex(this.r / 3 * e, this.r / 3 * e)
    g.endShape(g.CLOSE);

    g.beginShape();
    g.vertex(-this.r / 12 * a * i, -this.r * a)
    g.vertex(-this.r / 12 * i, -this.r / 3)
    g.vertex(-this.r / 3, -this.r / 12 * i)
    g.vertex(-this.r * a, -this.r / 12 * a * i)
    g.vertex(-this.r / 3 * e, -this.r / 3 * e)
    g.endShape(g.CLOSE);

    g.beginShape();
    g.vertex(this.r / 12 * a * i, -this.r * a)
    g.vertex(this.r / 12 * i, -this.r / 3)
    g.vertex(this.r / 3, -this.r / 12 * i)
    g.vertex(this.r * a, -this.r / 12 * a * i)
    g.vertex(this.r / 3 * e, -this.r / 3 * e)
    g.endShape(g.CLOSE);

    g.pop();

    // CORE
    g.push()
    g.translate(this.pos.x, this.pos.y)
    g.stroke(255)
    g.strokeWeight(g.random(this.r / 3, this.r / 2))
    g.point(0, 0)
    g.pop()
  }
}

Boss.prototype = Object.create(Entity.prototype);