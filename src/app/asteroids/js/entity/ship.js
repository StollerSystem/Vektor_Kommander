import * as p5 from 'p5';
import Entity from './entity.js';
import Laser from './laser.js';
import { input } from '../utility/input.js';
import { lineIntersect } from '../utility/utility.js';
import VaporTrail from '../effects/vapor-trail.js';
import Thruster from '../effects/thruster.js';


export default function Ship(g, shieldTime, color1, color2, title, score, lasers, addDust, reduceLaserCharge, laserCharge, windowWidth, buttons) {
  this.w = windowWidth / 1800;
  // var velMod = this.w > .6 ? 1 : .98
  Entity.call(this, 200, g.height / 2, 20 * this.w, g, null);
  this.isDestroyed = false;
  this.destroyFrames = 1000;
  this.shields = shieldTime;
  this.rmax = this.r * 1.5;
  this.rmax2 = this.rmax * this.rmax;
  var trailColor = color2;
  var trailLength = Math.round(20 * this.w)
  this.vaporTrail = new VaporTrail(g, this.pos, trailColor, this.shields, this.r, trailLength, this.w)
  this.buttons = buttons;
  // console.log(this.w)
  g.keyReleased = () => {
    input.handleEvent(g.key, g.keyCode, false);
  }

  g.keyPressed = () => {
    input.handleEvent(g.key, g.keyCode, true);
  }

  g.mousePressed = () => {
    // console.log("mouse click!");
    for (var i = 0; i < this.buttons.length; i++) {
      let key = this.buttons[i].clicked()
      console.log(key)
      if (key) {
        input.handleEvent(key[0], key[1], true);
      }
    }
  }

  g.mouseReleased = () => {
    input.handleEvent(g.UP_ARROW, 38, false);
    input.handleEvent(g.DOWN_ARROW, 40, false);
    input.handleEvent(g.LEFT_ARROW, 37, false);
    input.handleEvent(g.RIGHT_ARROW, 39, false);
    input.handleEvent(" ".charCodeAt(0), 32, false);
  }

  var scope = this;
  input.registerAsListener(" ".charCodeAt(0), function (char, code, press) {
    if (!press) {
      return;
    }
    let offSet = 29 * scope.w;
    if (reduceLaserCharge()) {
      let shootPos = g.createVector(scope.pos.x + offSet * g.cos(scope.heading), scope.pos.y + offSet * g.sin(scope.heading));
      var laser = new Laser(shootPos, scope.vel, scope.heading, g, color1, false, scope.heading, scope.w);
      var dustVel = laser.vel.copy();
      addDust(shootPos, dustVel.mult(.5), 4, .045, color1, 5 * scope.w, g);
      lasers.push(laser);

    }
    // var effect = laserSoundEffects[floor(random() * laserSoundEffects.length)];
    // laser.playSoundEffect(effect);
  });

  input.registerAsListener(g.RIGHT_ARROW, function (char, code, press) {
    scope.setRotation(press ? 0.06 : 0);
    // if (press) {
    //   rocketSoundEffects[1].play();
    // } else {
    //   rocketSoundEffects[1].stop();
    // }
  });

  input.registerAsListener(g.LEFT_ARROW, function (char, code, press) {
    scope.setRotation(press ? -0.06 : 0);
    // if (press) {
    //   rocketSoundEffects[1].play();
    // } else {
    //   rocketSoundEffects[1].stop();
    // }
  });


  // if (this.buttons[0].clicked()) {
  //   console.log("SHIP BUTTON CHECK")
  // }

  input.registerAsListener(g.UP_ARROW, function (char, code, press) {
    scope.setAccel(press ? 0.1 : 0);
    // if (press) {
    //   rocketSoundEffects[0].play();
    // } else {
    //   rocketSoundEffects[0].stop();
    // }
  });

  input.registerAsListener(g.DOWN_ARROW, function (char, code, press) {
    scope.setAccel(press ? -0.1 : 0);
    // if (press) {
    //   rocketSoundEffects[0].play();
    // } else {
    //   rocketSoundEffects[0].stop();
    // }
  });

  this.update = function () {
    this.edges();
    Entity.prototype.update.call(this);
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
    this.vaporTrail.update(this.pos, this.heading);
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
    if (this.shields > 0) {
      return false;
    }
    var dist2 = (this.pos.x - asteroid.pos.x) * (this.pos.x - asteroid.pos.x)
      + (this.pos.y - asteroid.pos.y) * (this.pos.y - asteroid.pos.y);
    if (dist2 >= (asteroid.rmax + this.rmax2) * (asteroid.rmax + this.rmax2)) {
      return false;
    }
    if (dist2 <= asteroid.rmin2) {
      return true;
    }
    var shipVertices = [
      g.createVector(-this.r - 10, this.r / 2).rotate(this.heading),
      g.createVector(this.r * 2 - 10, this.r / 2).rotate(this.heading),
      g.createVector(this.r * 2.2 - 10, 0).rotate(this.heading),
      g.createVector(-10, -this.r / 3).rotate(this.heading),
      g.createVector(-this.r - 10, -this.r).rotate(this.heading)
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

  //HITBOX <- NOT RIGHT
  this.vertices = function () {
    var shipVertices = [
      p5.Vector.add(g.createVector(-this.r - 10, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r * 2 - 10, this.r / 2), this.pos),
      p5.Vector.add(g.createVector(this.r * 2.2 - 10, 0), this.pos),
      p5.Vector.add(g.createVector(-10, -this.r / 3), this.pos),
      p5.Vector.add(g.createVector(-this.r - 10, -this.r), this.pos),
    ]
    return shipVertices;
  }

  // g.vertex(-this.r - 10, this.r / 2)
  //     g.vertex(this.r * 2 - 10, this.r / 2)
  //     g.vertex(this.r * 2.5 - 10, 0)
  //     g.vertex(-10, -this.r / 3)
  //     g.vertex(-this.r - 10, -this.r)

  this.edges = function () {
    if (this.pos.x >= this.g.width - this.rmax) {
      let rebound = this.vel.x < 2 ? -2 * this.w : -this.vel.x / 2;
      this.vel = g.createVector(rebound, 0);
    } else if (this.pos.x <= + this.rmax) {
      if (this.vel.x < 0) {
        this.vel.x = 0
      }
    }
    if (this.pos.y >= this.g.height - this.rmax) {
      let rebound = this.vel.y < 2 ? -2 * this.w : this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);

    } else if (this.pos.y <= +this.rmax) {
      let rebound = this.vel.y > -2 ? 2 * this.w : -this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);
    }
  }

  this.render = function () {
    if (this.isDestroyed) {
      for (var i = 0; i < this.brokenParts.length; i++) {
        g.push();
        let transNum = (1 * ((this.destroyFrames--) / 1000))
        let trans = transNum > 0 ? transNum : 0;
        g.stroke(`rgba(${color2[0]},${color2[1]},${color2[2]},${trans})`);
        var bp = this.brokenParts[i];
        g.fill(0);
        g.translate(bp.pos.x, bp.pos.y);
        g.rotate(bp.heading);
        if (i === 1) {
          g.triangle(-this.r, this.r,
            -this.r, this.r / 4,
            this.r / 2, this.r / 4);
        } else {
          g.line(-this.r / 2, -this.r / 2, this.r / 2, this.r / 2);
        }
        g.pop();
      }
    } else {
      this.vaporTrail.render();
      g.push();
      g.translate(this.pos.x, this.pos.y);
      g.rotate(this.heading);
      g.fill(0);
      // shield up effect 
      var shieldTrans = g.random(1, .3)
      var shieldCol = `rgba(${color2[0]},${color2[1]},${color2[2]},${shieldTrans})`
      var weight = this.shields > 0 ? g.random(1.5, 4) : g.random(1, 1.5);
      var shipColor = this.shields > 0 ? shieldCol : `rgba(${color2[0]},${color2[1]},${color2[2]},1)`;
      g.stroke(shipColor);
      g.strokeWeight(weight)

      // thruster animations
      if (this.accelMagnitude > 0) {
        var thrustEnd = g.random(-75 * this.w, -30 * this.w)
        Thruster(g, color1, this.r - 52 * this.w, this.r - 10 * this.w, this.r - 52 * this.w, -this.r + 10 * this.w, thrustEnd, 0)
      }
      if (this.accelMagnitude < 0) {
        var thrustEnd = g.random(70 * this.w, 50 * this.w)
        Thruster(g, color1, this.r * 2 - (9 * this.w), this.r / 2 - this.w - 1, this.r * 2.5 - (9 * this.w), this.w + 1, thrustEnd, this.r / 4)
      }
      if (this.rotation > 0) {
        var thrustEnd = g.random(-25 * this.w, -10 * this.w)
        Thruster(g, color1, 25 * this.w, -4 * this.w, 30 * this.w, -3 * this.w, 27.5 * this.w, thrustEnd)
      }
      if (this.rotation < 0) {
        var thrustEnd = g.random(30 * this.w, 10 * this.w)
        Thruster(g, color1, 25 * this.w, this.r / 2 * this.w, 30 * this.w, this.r / 2 * this.w, 27.5 * this.w, thrustEnd)
      }

      // THE SHIP
      let backSet = 10 * this.w;
      g.curve(
        -1, 20,
        0 - backSet, -this.r / 3,
        this.r - backSet, -this.r / 8,
        this.r * 2, this.r * 4,
      )
      g.beginShape()
      g.vertex(-this.r - backSet, this.r / 2)
      g.vertex(this.r * 2 - backSet, this.r / 2)
      g.vertex(this.r * 2.5 - backSet, 0)
      g.vertex(0-backSet, -this.r / 3)
      g.vertex(-this.r - backSet, -this.r)
      g.endShape(g.CLOSE)
      g.triangle(-this.r - backSet, this.r,
        -this.r - backSet, this.r / 4,
        this.r / 2 - backSet, this.r / 4);
      g.pop();
    }
  }
}

Ship.prototype = Object.create(Entity.prototype);