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
  var scope = this;
  this.quad1 = {
    pos: scope.pos,
    vertices: function () {
      var hitBox = [
        p5.Vector.add(g.createVector(
          (-scope.r / 12 * a * i * g.cos(scope.heading)) - (scope.r * a * g.sin(scope.heading)),
          (-scope.r / 12 * a * i * g.sin(scope.heading)) + (scope.r * a * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r / 12 * i * g.cos(scope.heading)) - (scope.r / 3 * g.sin(scope.heading)),
          (-scope.r / 12 * i * g.sin(scope.heading)) + (scope.r / 3 * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r / 3 * g.cos(scope.heading)) - (scope.r / 12 * i * g.sin(scope.heading)),
          (-scope.r / 3 * g.sin(scope.heading)) + (scope.r / 12 * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r * a * g.cos(scope.heading)) - (scope.r / 12 * a * i * g.sin(scope.heading)),
          (-scope.r * a * g.sin(scope.heading)) + (scope.r / 12 * a * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r / 3 * e * g.cos(scope.heading)) - (scope.r / 3 * e * g.sin(scope.heading)),
          (-scope.r / 3 * e * g.sin(scope.heading)) + (scope.r / 3 * e * g.cos(scope.heading))
        ), scope.pos),
      ]
      return hitBox;
    }
  }

  this.quad2 = {
    pos: scope.pos,
    vertices: function () {
      var hitBox = [
        p5.Vector.add(g.createVector(
          (scope.r / 12 * a * i * g.cos(scope.heading)) - (scope.r * a * g.sin(scope.heading)),
          (scope.r / 12 * a * i * g.sin(scope.heading)) + (scope.r * a * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r / 12 * i * g.cos(scope.heading)) - (scope.r / 3 * g.sin(scope.heading)),
          (scope.r / 12 * i * g.sin(scope.heading)) + (scope.r / 3 * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r / 3 * g.cos(scope.heading)) - (scope.r / 12 * i * g.sin(scope.heading)),
          (scope.r / 3 * g.sin(scope.heading)) + (scope.r / 12 * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r * a * g.cos(scope.heading)) - (scope.r / 12 * a * i * g.sin(scope.heading)),
          (scope.r * a * g.sin(scope.heading)) + (scope.r / 12 * a * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r / 3 * e * g.cos(scope.heading)) - (scope.r / 3 * e * g.sin(scope.heading)),
          (scope.r / 3 * e * g.sin(scope.heading)) + (scope.r / 3 * e * g.cos(scope.heading))
        ), scope.pos),
      ]
      return hitBox;
    }
  }

  this.quad3 = {
    pos: scope.pos,
    vertices: function () {
      var hitBox = [
        p5.Vector.add(g.createVector(
          (-scope.r / 12 * a * i * g.cos(scope.heading)) - (-scope.r * a * g.sin(scope.heading)),
          (-scope.r / 12 * a * i * g.sin(scope.heading)) + (-scope.r * a * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r / 12 * i * g.cos(scope.heading)) - (-scope.r / 3 * g.sin(scope.heading)),
          (-scope.r / 12 * i * g.sin(scope.heading)) + (-scope.r / 3 * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r / 3 * g.cos(scope.heading)) - (-scope.r / 12 * i * g.sin(scope.heading)),
          (-scope.r / 3 * g.sin(scope.heading)) + (-scope.r / 12 * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r * a * g.cos(scope.heading)) - (-scope.r / 12 * a * i * g.sin(scope.heading)),
          (-scope.r * a * g.sin(scope.heading)) + (-scope.r / 12 * a * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (-scope.r / 3 * e * g.cos(scope.heading)) - (-scope.r / 3 * e * g.sin(scope.heading)),
          (-scope.r / 3 * e * g.sin(scope.heading)) + (-scope.r / 3 * e * g.cos(scope.heading))
        ), scope.pos),
      ]
      return hitBox;
    }
  }

  this.quad4 = {
    pos: scope.pos,
    vertices: function () {
      var hitBox = [
        p5.Vector.add(g.createVector(
          (scope.r / 12 * a * i * g.cos(scope.heading)) - (-scope.r * a * g.sin(scope.heading)),
          (scope.r / 12 * a * i * g.sin(scope.heading)) + (-scope.r * a * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r / 12 * i * g.cos(scope.heading)) - (-scope.r / 3 * g.sin(scope.heading)),
          (scope.r / 12 * i * g.sin(scope.heading)) + (-scope.r / 3 * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r / 3 * g.cos(scope.heading)) - (-scope.r / 12 * i * g.sin(scope.heading)),
          (scope.r / 3 * g.sin(scope.heading)) + (-scope.r / 12 * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r * a * g.cos(scope.heading)) - (-scope.r / 12 * a * i * g.sin(scope.heading)),
          (scope.r * a * g.sin(scope.heading)) + (-scope.r / 12 * a * i * g.cos(scope.heading))
        ), scope.pos),
        p5.Vector.add(g.createVector(
          (scope.r / 3 * e * g.cos(scope.heading)) - (-scope.r / 3 * e * g.sin(scope.heading)),
          (scope.r / 3 * e * g.sin(scope.heading)) + (-scope.r / 3 * e * g.cos(scope.heading))
        ), scope.pos),
      ]
      return hitBox;
    }
  }

  this.vertices = function () {
    var hitBox = [
      // p5.Vector.add(g.createVector(
      //   (-this.r / 12 * a * i * g.cos(this.heading)) - (this.r * a * g.sin(this.heading)),
      //   (-this.r / 12 * a * i * g.sin(this.heading)) + (this.r * a * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r / 12 * i * g.cos(this.heading)) - (this.r / 3 * g.sin(this.heading)),
      //   (-this.r / 12 * i * g.sin(this.heading)) + (this.r / 3 * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r / 3 * g.cos(this.heading)) - (this.r / 12 * i * g.sin(this.heading)),
      //   (-this.r / 3 * g.sin(this.heading)) + (this.r / 12 * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r * a * g.cos(this.heading)) - (this.r / 12 * a * i * g.sin(this.heading)),
      //   (-this.r * a * g.sin(this.heading)) + (this.r / 12 * a * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r / 3 * e * g.cos(this.heading)) - (this.r / 3 * e * g.sin(this.heading)),
      //   (-this.r / 3 * e * g.sin(this.heading)) + (this.r / 3 * e * g.cos(this.heading))
      // ), this.pos),

      // p5.Vector.add(g.createVector(
      //   (this.r / 12 * a * i * g.cos(this.heading)) - (this.r * a * g.sin(this.heading)),
      //   (this.r / 12 * a * i * g.sin(this.heading)) + (this.r * a * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r / 12 * i * g.cos(this.heading)) - (this.r / 3 * g.sin(this.heading)),
      //   (this.r / 12 * i * g.sin(this.heading)) + (this.r / 3 * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r / 3 * g.cos(this.heading)) - (this.r / 12 * i * g.sin(this.heading)),
      //   (this.r / 3 * g.sin(this.heading)) + (this.r / 12 * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r * a * g.cos(this.heading)) - (this.r / 12 * a * i * g.sin(this.heading)),
      //   (this.r * a * g.sin(this.heading)) + (this.r / 12 * a * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r / 3 * e * g.cos(this.heading)) - (this.r / 3 * e * g.sin(this.heading)),
      //   (this.r / 3 * e * g.sin(this.heading)) + (this.r / 3 * e * g.cos(this.heading))
      // ), this.pos),

      // p5.Vector.add(g.createVector(
      //   (-this.r / 12 * a * i * g.cos(this.heading)) - (-this.r * a * g.sin(this.heading)),
      //   (-this.r / 12 * a * i * g.sin(this.heading)) + (-this.r * a * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r / 12 * i * g.cos(this.heading)) - (-this.r / 3 * g.sin(this.heading)),
      //   (-this.r / 12 * i * g.sin(this.heading)) + (-this.r / 3 * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r / 3 * g.cos(this.heading)) - (-this.r / 12 * i * g.sin(this.heading)),
      //   (-this.r / 3 * g.sin(this.heading)) + (-this.r / 12 * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r * a * g.cos(this.heading)) - (-this.r / 12 * a * i * g.sin(this.heading)),
      //   (-this.r * a * g.sin(this.heading)) + (-this.r / 12 * a * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (-this.r / 3 * e * g.cos(this.heading)) - (-this.r / 3 * e * g.sin(this.heading)),
      //   (-this.r / 3 * e * g.sin(this.heading)) + (-this.r / 3 * e * g.cos(this.heading))
      // ), this.pos),

      // p5.Vector.add(g.createVector(
      //   (this.r / 12 * a * i * g.cos(this.heading)) - (-this.r * a * g.sin(this.heading)),
      //   (this.r / 12 * a * i * g.sin(this.heading)) + (-this.r * a * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r / 12 * i * g.cos(this.heading)) - (-this.r / 3 * g.sin(this.heading)),
      //   (this.r / 12 * i * g.sin(this.heading)) + (-this.r / 3 * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r / 3 * g.cos(this.heading)) - (-this.r / 12 * i * g.sin(this.heading)),
      //   (this.r / 3 * g.sin(this.heading)) + (-this.r / 12 * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r * a * g.cos(this.heading)) - (-this.r / 12 * a * i * g.sin(this.heading)),
      //   (this.r * a * g.sin(this.heading)) + (-this.r / 12 * a * i * g.cos(this.heading))
      // ), this.pos),
      // p5.Vector.add(g.createVector(
      //   (this.r / 3 * e * g.cos(this.heading)) - (-this.r / 3 * e * g.sin(this.heading)),
      //   (this.r / 3 * e * g.sin(this.heading)) + (-this.r / 3 * e * g.cos(this.heading))
      // ), this.pos),
    ]
    return hitBox;
  }

  this.update = function () {
    Entity.prototype.update.call(this);
    this.core.pos = this.pos;
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
    rmin2: 6500,
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
    let q1 = this.quad1.vertices();
    let q2 = this.quad2.vertices();
    let q3 = this.quad3.vertices();
    let q4 = this.quad4.vertices();
    g.push();
    g.stroke(255);
    g.strokeWeight(g.random(1, 2));
    g.fill(0);
    g.beginShape();
    g.vertex(q1[0].x, q1[0].y);
    g.vertex(q1[1].x, q1[1].y);
    g.vertex(q1[2].x, q1[2].y);
    g.vertex(q1[3].x, q1[3].y);
    g.vertex(q1[4].x, q1[4].y);
    g.endShape(g.CLOSE);
    g.beginShape();
    g.vertex(q2[0].x, q2[0].y);
    g.vertex(q2[1].x, q2[1].y);
    g.vertex(q2[2].x, q2[2].y);
    g.vertex(q2[3].x, q2[3].y);
    g.vertex(q2[4].x, q2[4].y);
    g.endShape(g.CLOSE);
    g.beginShape();
    g.vertex(q3[0].x, q3[0].y);
    g.vertex(q3[1].x, q3[1].y);
    g.vertex(q3[2].x, q3[2].y);
    g.vertex(q3[3].x, q3[3].y);
    g.vertex(q3[4].x, q3[4].y);
    g.endShape(g.CLOSE);
    g.beginShape();
    g.vertex(q4[0].x, q4[0].y);
    g.vertex(q4[1].x, q4[1].y);
    g.vertex(q4[2].x, q4[2].y);
    g.vertex(q4[3].x, q4[3].y);
    g.vertex(q4[4].x, q4[4].y);
    g.endShape(g.CLOSE);
    g.pop();

    // CORE
    // g.push();
    // g.translate(this.pos.x, this.pos.y);
    // g.stroke(255);
    // g.strokeWeight(g.random(this.r / 3, this.r / 2));
    // g.point(0, 0);
    // g.pop();


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