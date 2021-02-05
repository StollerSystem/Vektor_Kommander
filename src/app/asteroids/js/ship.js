import Entity from './entity';
import { input } from './input';
import Laser from './laser';
import * as p5 from 'p5';
import { lineIntersect } from './utility';

// import { addDust } from './dust';

export default function Ship(g, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust) {
  Entity.call(this, 200, g.height / 2, 20, g);
  this.isDestroyed = false;
  this.destroyFrames = 1000;
  this.shields = shieldTime;
  this.rmax = this.r * 1.5;
  this.rmax2 = this.rmax * this.rmax;
  this.tailEdge = true; //if true will hide vapor trail
  this.tailSkip = false;//tail effect toggles between true/false


  // magic for tail effect
  this.lastPos = new Array(30);
  for (var i = 0; i < this.lastPos.length; i++) {
    this.lastPos[i] = new Array(3);
    this.lastPos[i][0] = g.createVector(this.pos.x, this.pos.y);
    this.lastPos[i][1] = this.heading;
    this.lastPos[i][2] = 1;
  }

  g.keyReleased = () => {
    input.handleEvent(g.key, g.keyCode, false);
  }

  g.keyPressed = () => {
    input.handleEvent(g.key, g.keyCode, true);
  }


  var scope = this;
  // g.keyPressed = () => {
  //   if (g.keyCode === g.RIGHT_ARROW) {
  //     scope.setRotation(press ? 0.08 : 0);
  //   }
  // }
  input.registerAsListener(" ".charCodeAt(0), function (char, code, press) {
    if (!press) {
      return;
    }
    title = false;

    let shootPos = scope.pos.add(g.createVector(this.r * 2, this.r / 4))
    var laser = new Laser(shootPos, scope.vel, scope.heading, g, rgbColor2, false);
    if (score > 0) {
      score -= 5;
    }

    var dustVel = laser.vel.copy();
    addDust(shootPos, dustVel.mult(.5), 4, .045, 2, 5, g);

    // var effect = laserSoundEffects[floor(random() * laserSoundEffects.length)];
    // laser.playSoundEffect(effect);
    lasers.push(laser);
  });
  input.registerAsListener(g.RIGHT_ARROW, function (char, code, press) {
    // title = false;
    scope.setRotation(press ? 0.08 : 0);
    // if (press) {
    //   rocketSoundEffects[1].play();
    // } else {
    //   rocketSoundEffects[1].stop();
    // }
  });
  input.registerAsListener(g.LEFT_ARROW, function (char, code, press) {
    // title = false;
    scope.setRotation(press ? -0.08 : 0);
    // if (press) {
    //   rocketSoundEffects[1].play();
    // } else {
    //   rocketSoundEffects[1].stop();
    // }
  });
  input.registerAsListener(g.UP_ARROW, function (char, code, press) {
    // title = false;
    scope.setAccel(press ? 0.1 : 0);
    // if (press) {
    //   rocketSoundEffects[0].play();
    // } else {
    //   rocketSoundEffects[0].stop();
    // }
  });
  input.registerAsListener(g.DOWN_ARROW, function (char, code, press) {
    // title = false;
    scope.setAccel(press ? -0.1 : 0);
    // if (press) {
    //   rocketSoundEffects[0].play();
    // } else {
    //   rocketSoundEffects[0].stop();
    // }
  });

  this.update = function () {
    Entity.prototype.update.call(this);
    // this.vel.mult(boostStabilizer);
    if (this.isDestroyed) {
      for (var i = 0; i < this.brokenParts.length; i++) {
        this.brokenParts[i].pos.add(this.brokenParts[i].vel);
        this.brokenParts[i].heading += this.brokenParts[i].rot;
      }
    } else {
      this.vel.mult(1);
    }
    if (this.shields > 0 && !title) {
      this.shields -= 1;
    }

    // More tail effect magic 
    this.tailSkip = !this.tailSkip;
    if (this.tailSkip === false) {
      for (var i = this.lastPos.length - 1; i > 0; i--) {
        this.lastPos[i][0] = this.lastPos[i - 1][0].sub(g.createVector(5, 0))
        //HERE?
        // console.log(this.lastPos[i][0].x)
        // this.lastPos[i][0].y - 50;
        this.lastPos[i][1] = this.lastPos[i - 1][1];
        this.lastPos[i][2] = this.lastPos[i - 1][2];
      }
      this.lastPos[0][0] = g.createVector(this.pos.x - (this.r + 10) * g.cos(this.heading), this.pos.y - (this.r + 10) * g.sin(this.heading));
      this.lastPos[0][1] = this.heading;

      if (this.tailEdge) {
        this.lastPos[0][2] = 0;
        this.tailEdge = false;
      } else {
        this.lastPos[0][2] = 1;
      }

    }
  }

  this.brokenParts = [];

  this.destroy = function () {
    this.isDestroyed = true;
    for (var i = 0; i < 6; i++)
      this.brokenParts[i] = {
        pos: this.pos.copy(),
        vel: this.vel.copy().add(p5.Vector.random2D().mult(g.random(1, 1.8))),
        heading: g.random(0, 360),
        rot: g.random(-0.07, 0.07)
      };
  }

  this.hits = function (asteroid) {

    // Are shields up?
    if (this.shields > 0) {
      return false;
    }

    // Is the ship far from the asteroid?
    var dist2 = (this.pos.x - asteroid.pos.x) * (this.pos.x - asteroid.pos.x)
      + (this.pos.y - asteroid.pos.y) * (this.pos.y - asteroid.pos.y);
    if (dist2 >= (asteroid.rmax + this.rmax2) * (asteroid.rmax + this.rmax2)) {
      return false;
    }

    // Is the ship inside the asteroid?
    if (dist2 <= asteroid.rmin2) {
      return true;
    }

    // Otherwise, we need to check for line intersection
    var shipVertices = [
      g.createVector(-2 / 3 * this.r, this.r).rotate(this.heading),
      g.createVector(-2 / 3 * this.r, -this.r).rotate(this.heading),
      g.createVector(4 / 3 * this.r, 0).rotate(this.heading)
    ];

    for (var i = 0; i < shipVertices.length; i++) {
      shipVertices[i] = p5.Vector.add(shipVertices[i], this.pos);
    }
    var asteroid_vertices = asteroid.vertices();

    for (var i = 0; i < asteroid_vertices.length; i++) {
      for (var j = 0; j < shipVertices.length; j++) {
        var next_i = (i + 1) % asteroid_vertices.length;
        if (lineIntersect(shipVertices[j], shipVertices[(j + 1) % shipVertices.length],
          asteroid_vertices[i], asteroid_vertices[next_i])) {

          return true;
        }
      }
    }
    return false;
  }

  this.playSoundEffect = function (soundArray) {
    // soundArray[g.floor(g.random(0,soundArray.length))].play();
  }

  this.vertices = function () {
    var shipVertices = [
      p5.Vector.add(g.createVector(-this.r, this.r), this.pos),
      p5.Vector.add(g.createVector(-this.r, -this.r), this.pos),
      p5.Vector.add(g.createVector(4 / 3 * this.r, 0), this.pos)
    ]
    return shipVertices;
  }

  this.edges = function () {
    if (this.pos.x >= this.g.width - this.rmax) {

      let rebound = this.vel.x < 2 ? -2 : -this.vel.x / 2;
      this.vel = g.createVector(rebound, 0);
      // this.tailEdge = true;
    } else if (this.pos.x <= + this.rmax) {

      // let rebound = this.vel.x > -2 ? 2 : -this.vel.x/2; 
      if (this.vel.x < 0) {
        this.vel.x = 0
      }
      // this.tailEdge = true;
    }
    if (this.pos.y >= this.g.height - this.rmax) {
      // WACKY!
      let rebound = this.vel.y < 2 ? -2 : this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);
      // this.tailEdge = true;
    } else if (this.pos.y <= +this.rmax) {
      let rebound = this.vel.y > -2 ? 2 : -this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);
      // this.tailEdge = true;
    }
  }

  this.render = function () {
    if (this.isDestroyed) {
      // ship debris
      for (var i = 0; i < this.brokenParts.length; i++) {
        g.push();
        let transNum = (1 * ((this.destroyFrames--) / 1000))
        let trans = transNum > 0 ? transNum : 0;
        g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},${trans})`);
        var bp = this.brokenParts[i];
        g.translate(bp.pos.x, bp.pos.y);
        g.rotate(bp.heading);
        g.line(-this.r / 2, -this.r / 2, this.r / 2, this.r / 2);
        g.pop();
      }
    } else {
      //render vapor tail      
      for (var i = this.lastPos.length - 2; i >= 0; i--) {
        g.push();
        // won't render the tail stroke right after respawn...looks werid 
        if (this.shields < 170) {
          g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},${this.lastPos[i][2] / g.random(4, 6)})`)
        } else {
          g.stroke(0);
        }
        g.fill(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},${this.lastPos[i][2] / g.random(4, 6)})`);
        g.beginShape();
        g.vertex(this.lastPos[i][0].x + g.sin(this.lastPos[i][1]) * -1 * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r, this.lastPos[i][0].y - g.cos(this.lastPos[i][1]) * -1 * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r);

        g.vertex(this.lastPos[i + 1][0].x + g.sin(this.lastPos[i + 1][1]) * -1 * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r, this.lastPos[i + 1][0].y - g.cos(this.lastPos[i + 1][1]) * -1 * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r);

        g.vertex(this.lastPos[i + 1][0].x + g.sin(this.lastPos[i + 1][1]) * (+1) * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r, this.lastPos[i + 1][0].y - g.cos(this.lastPos[i + 1][1]) * (+1) * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r);

        g.vertex(this.lastPos[i][0].x + g.sin(this.lastPos[i][1]) * (+1) * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r, this.lastPos[i][0].y - g.cos(this.lastPos[i][1]) * (+1) * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r);
        g.endShape(g.CLOSE);
        g.pop();
      }

      // draw ship
      g.push();
      g.translate(this.pos.x, this.pos.y);
      g.rotate(this.heading);
      g.fill(0);
      // shield up effect 
      var shieldTrans = g.random(1, .3)
      var shieldCol = `rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},${shieldTrans})`
      var weight = this.shields > 0 ? g.random(1.5, 4) : g.random(1, 1.5);
      var shipColor = this.shields > 0 ? shieldCol : `rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`;
      g.stroke(shipColor);
      g.strokeWeight(weight)

      g.curve(
        -1, 20,
        0 - 10, -this.r / 3,
        this.r - 10, -this.r / 8,
        this.r * 2, 80,
      )

      g.beginShape()

      // g.vertex(-this.r, this.r)
      g.vertex(-this.r - 10, this.r / 2)
      g.vertex(this.r * 2 - 10, this.r / 2)
      g.vertex(this.r * 2.5 - 10, 0)
      g.vertex(-10, -this.r / 3)
      g.vertex(-this.r - 10, -this.r)

      g.endShape(g.CLOSE)
      // g.point(0,0)
      g.triangle(-this.r - 10, this.r,
        -this.r - 10, this.r / 4,
        this.r / 2 - 10, this.r / 4);

      // thruster animations
      if (this.accelMagnitude > 0) {
        g.push()
        var trans = g.random(.9, .2)
        g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.fill(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.strokeWeight(1)
        g.translate(-this.r, 0);
        var thrustEnd = g.random(-55, -10)
        g.triangle(this.r - 32, this.r - 10,
          this.r - 32, -this.r + 10,
          thrustEnd, 0);
        g.pop()
      }
      if (this.accelMagnitude < 0) {
        g.push()
        var trans = g.random(.9, .2)
        g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.fill(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.strokeWeight(1)
        g.translate(0, 0);
        var thrustEnd = g.random(this.r * 4, this.r * 3)
        g.triangle(this.r * 2 - 10, this.r / 2,
          this.r * 2.5 - 10, 0,
          thrustEnd, this.r / 4);
        g.pop()
      }
      if (this.rotation > 0) {
        g.push()
        var trans = g.random(.9, .2)
        g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.fill(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.strokeWeight(1)
        g.translate(-this.r, 0);
        var thrustEnd = g.random(-35, -10)
        g.triangle(this.r + 25, -4,
          this.r + 35, -3,
          this.r + 30, thrustEnd);
        g.pop()
      }
      if (this.rotation < 0) {
        g.push()
        var trans = g.random(.9, .2)
        g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.fill(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${trans})`);
        g.strokeWeight(1)
        g.translate(-this.r, 0);
        var thrustEnd = g.random(35, 10)
        g.triangle(this.r + 25, this.r / 2,
          this.r + 35, this.r / 2,
          this.r + 30, thrustEnd);
        g.pop()
      }

      g.pop();
    }
  }
}

Ship.prototype = Object.create(Entity.prototype);