import * as p5 from 'p5';
import Entity from './entity.js';

export default function Boss(g, color, windowMod) {

  var r = 250;

  var pos = g.createVector(g.width * .75 + r, g.random(r, g.height - r));

  Entity.call(this, pos.x, pos.y, r, g, windowMod);

  Entity.prototype.setRotation.call(this, 0);

  // this.vel = g.createVector(g.random(-1.5, -4), g.random(2, -2))
  this.vel = g.createVector(-.05, g.random(0, 0))
  this.rmax = r - 30;
  this.onScreen = false;


  // randomize some features
  var e = g.random(.70, 1.25)
  var a = g.random(.8, 1.20)
  // var i = -(a - 1) + 1;  
  var i = a

  this.vertices = function () {
    var hitBox = [
      p5.Vector.add(g.createVector(
        (-this.r / 12 * a * i * g.cos(this.heading)) - (this.r * a * g.sin(this.heading)),
        (-this.r / 12 * a * i * g.sin(this.heading)) + (this.r * a * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r / 12 * i * g.cos(this.heading)) - (this.r / 3 * g.sin(this.heading)),
        (-this.r / 12 * i * g.sin(this.heading)) + (this.r / 3 * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r / 3 * g.cos(this.heading)) - (this.r / 12 * i * g.sin(this.heading)),
        (-this.r / 3 * g.sin(this.heading)) + (this.r / 12 * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r * a * g.cos(this.heading)) - (this.r / 12 * a * i * g.sin(this.heading)),
        (-this.r * a * g.sin(this.heading)) + (this.r / 12 * a * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r / 3 * e * g.cos(this.heading)) - (this.r / 3 * e * g.sin(this.heading)),
        (-this.r / 3 * e * g.sin(this.heading)) + (this.r / 3 * e * g.cos(this.heading))
      ), this.pos),

      p5.Vector.add(g.createVector(
        (this.r / 12 * a * i * g.cos(this.heading)) - (this.r * a * g.sin(this.heading)),
        (this.r / 12 * a * i * g.sin(this.heading)) + (this.r * a * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r / 12 * i * g.cos(this.heading)) - (this.r / 3 * g.sin(this.heading)),
        (this.r / 12 * i * g.sin(this.heading)) + (this.r / 3 * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r / 3 * g.cos(this.heading)) - (this.r / 12 * i * g.sin(this.heading)),
        (this.r / 3 * g.sin(this.heading)) + (this.r / 12 * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r * a * g.cos(this.heading)) - (this.r / 12 * a * i * g.sin(this.heading)),
        (this.r * a * g.sin(this.heading)) + (this.r / 12 * a * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r / 3 * e * g.cos(this.heading)) - (this.r / 3 * e * g.sin(this.heading)),
        (this.r / 3 * e * g.sin(this.heading)) + (this.r / 3 * e * g.cos(this.heading))
      ), this.pos),

      p5.Vector.add(g.createVector(
        (-this.r / 12 * a * i * g.cos(this.heading)) - (-this.r * a * g.sin(this.heading)),
        (-this.r / 12 * a * i * g.sin(this.heading)) + (-this.r * a * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r / 12 * i * g.cos(this.heading)) - (-this.r / 3 * g.sin(this.heading)),
        (-this.r / 12 * i * g.sin(this.heading)) + (-this.r / 3 * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r / 3 * g.cos(this.heading)) - (-this.r / 12 * i * g.sin(this.heading)),
        (-this.r / 3 * g.sin(this.heading)) + (-this.r / 12 * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r * a * g.cos(this.heading)) - (-this.r / 12 * a * i * g.sin(this.heading)),
        (-this.r * a * g.sin(this.heading)) + (-this.r / 12 * a * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (-this.r / 3 * e * g.cos(this.heading)) - (-this.r / 3 * e * g.sin(this.heading)),
        (-this.r / 3 * e * g.sin(this.heading)) + (-this.r / 3 * e * g.cos(this.heading))
      ), this.pos),

      p5.Vector.add(g.createVector(
        (this.r / 12 * a * i * g.cos(this.heading)) - (-this.r * a * g.sin(this.heading)),
        (this.r / 12 * a * i * g.sin(this.heading)) + (-this.r * a * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r / 12 * i * g.cos(this.heading)) - (-this.r / 3 * g.sin(this.heading)),
        (this.r / 12 * i * g.sin(this.heading)) + (-this.r / 3 * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r / 3 * g.cos(this.heading)) - (-this.r / 12 * i * g.sin(this.heading)),
        (this.r / 3 * g.sin(this.heading)) + (-this.r / 12 * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r * a * g.cos(this.heading)) - (-this.r / 12 * a * i * g.sin(this.heading)),
        (this.r * a * g.sin(this.heading)) + (-this.r / 12 * a * i * g.cos(this.heading))
      ), this.pos),
      p5.Vector.add(g.createVector(
        (this.r / 3 * e * g.cos(this.heading)) - (-this.r / 3 * e * g.sin(this.heading)),
        (this.r / 3 * e * g.sin(this.heading)) + (-this.r / 3 * e * g.cos(this.heading))
      ), this.pos),
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

  this.core = {
    pos: this.pos,
    rmin2: 200,
    vertices: function () {
      var hitBox = [
        this.pos
      ]
      // console.log(hitBox)
      return hitBox;
      
    }
  }


  this.render = function () {
    // console.log("b ren")
    var vert = this.vertices();
    g.push();
    g.stroke(255);
    g.strokeWeight(g.random(1, 2));
    g.fill(0);
    g.beginShape();
    g.vertex(vert[0].x, vert[0].y);
    g.vertex(vert[1].x, vert[1].y);
    g.vertex(vert[2].x, vert[2].y);
    g.vertex(vert[3].x, vert[3].y);
    g.vertex(vert[4].x, vert[4].y);
    g.endShape(g.CLOSE);
    g.beginShape();
    g.vertex(vert[5].x, vert[5].y);
    g.vertex(vert[6].x, vert[6].y);
    g.vertex(vert[7].x, vert[7].y);
    g.vertex(vert[8].x, vert[8].y);
    g.vertex(vert[9].x, vert[9].y);
    g.endShape(g.CLOSE);
    g.beginShape();
    g.vertex(vert[10].x, vert[10].y);
    g.vertex(vert[11].x, vert[11].y);
    g.vertex(vert[12].x, vert[12].y);
    g.vertex(vert[13].x, vert[13].y);
    g.vertex(vert[14].x, vert[14].y);
    g.endShape(g.CLOSE);
    g.beginShape();
    g.vertex(vert[15].x, vert[15].y);
    g.vertex(vert[16].x, vert[16].y);
    g.vertex(vert[17].x, vert[17].y);
    g.vertex(vert[18].x, vert[18].y);
    g.vertex(vert[19].x, vert[19].y);
    g.endShape(g.CLOSE);
    g.pop();

    // CORE
    g.push();
    g.translate(this.pos.x, this.pos.y);
    g.stroke(255);
    g.strokeWeight(g.random(this.r / 3, this.r / 2));
    g.point(0, 0);
    g.pop();


    // g.push()
    // g.translate(this.pos.x, this.pos.y);
    // g.rotate(this.heading);
    // g.stroke(255)
    // g.strokeWeight(g.random(1, 2))
    // g.fill(0)    
    // g.beginShape();
    // g.vertex(-this.r / 12 * a * i, this.r * a)
    // g.vertex(-this.r / 12 * i, this.r / 3)
    // g.vertex(-this.r / 3, this.r / 12 * i)
    // g.vertex(-this.r * a, this.r / 12 * a * i)
    // g.vertex(-this.r / 3 * e, this.r / 3 * e)
    // g.endShape(g.CLOSE);
    // g.beginShape();
    // g.vertex(this.r / 12 * a * i, this.r * a)
    // g.vertex(this.r / 12 * i, this.r / 3)
    // g.vertex(this.r / 3, this.r / 12 * i)
    // g.vertex(this.r * a, this.r / 12 * a * i)
    // g.vertex(this.r / 3 * e, this.r / 3 * e)
    // g.endShape(g.CLOSE);
    // g.beginShape();
    // g.vertex(-this.r / 12 * a * i, -this.r * a)
    // g.vertex(-this.r / 12 * i, -this.r / 3)
    // g.vertex(-this.r / 3, -this.r / 12 * i)
    // g.vertex(-this.r * a, -this.r / 12 * a * i)
    // g.vertex(-this.r / 3 * e, -this.r / 3 * e)
    // g.endShape(g.CLOSE);
    // g.beginShape();
    // g.vertex(this.r / 12 * a * i, -this.r * a)
    // g.vertex(this.r / 12 * i, -this.r / 3)
    // g.vertex(this.r / 3, -this.r / 12 * i)
    // g.vertex(this.r * a, -this.r / 12 * a * i)
    // g.vertex(this.r / 3 * e, -this.r / 3 * e)
    // g.endShape(g.CLOSE);
    // g.pop();


  }
}

Boss.prototype = Object.create(Entity.prototype);