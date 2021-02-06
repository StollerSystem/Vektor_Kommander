import * as p5 from 'p5';
import Entity from './entity.js';
import Laser from './laser.js';
import { input } from '../utility/input.js';
import { lineIntersect } from '../utility/utility.js';
import VaporTrail from '../effects/vapor-trail.js';
import Thruster from '../effects/thruster.js';


export default function Ship(g, shieldTime, color1, color2, title, score, lasers, addDust) {
  Entity.call(this, 200, g.height / 2, 20, g);
  this.isDestroyed = false;
  this.destroyFrames = 1000;
  this.shields = shieldTime;
  this.rmax = this.r * 1.5;
  this.rmax2 = this.rmax * this.rmax;
  // this.tailEdge = true; //if true will hide vapor trail
  // this.tailSkip = false;//tail effect toggles between true/false
  var trailColor = color2;
  this.vaporTrail = new VaporTrail(g, this.pos, trailColor, this.shields, this.r)

  g.keyReleased = () => {
    input.handleEvent(g.key, g.keyCode, false);
  }

  g.keyPressed = () => {
    input.handleEvent(g.key, g.keyCode, true);
  }

  var scope = this;
  input.registerAsListener(" ".charCodeAt(0), function (char, code, press) {
    if (!press) {
      return;
    }
    let shootPos = g.createVector(scope.pos.x + 30 * g.cos(scope.heading), scope.pos.y + 30 * g.sin(scope.heading));
    var laser = new Laser(shootPos, scope.vel, scope.heading, g, color1, false, scope.heading);
    var dustVel = laser.vel.copy();
    addDust(shootPos, dustVel.mult(.5), 4, .045, color1, 5, g);
    lasers.push(laser);
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

  //HITBOX <- NOT RIGHT
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
    } else if (this.pos.x <= + this.rmax) {
      if (this.vel.x < 0) {
        this.vel.x = 0
      }
    }
    if (this.pos.y >= this.g.height - this.rmax) {
      let rebound = this.vel.y < 2 ? -2 : this.vel.y / 2;
      this.vel = g.createVector(this.vel.x, rebound);

    } else if (this.pos.y <= +this.rmax) {
      let rebound = this.vel.y > -2 ? 2 : -this.vel.y / 2;
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
        var thrustEnd = g.random(-75, -30)
        Thruster(g, color1, this.r - 52, this.r - 10, this.r - 52, -this.r + 10, thrustEnd, 0)
      }
      if (this.accelMagnitude < 0) {
        var thrustEnd = g.random(70, 50)
        Thruster(g, color1, this.r * 2 - 9, this.r / 2-1, this.r * 2.5 - 9, 1, thrustEnd, this.r / 4)
      }
      if (this.rotation > 0) {
        var thrustEnd = g.random(-25, -10)
        Thruster(g, color1, 25, -4, 30, -3, 27.5, thrustEnd)        
      }
      if (this.rotation < 0) {
        var thrustEnd = g.random(30, 10)
        Thruster(g, color1, 25, this.r/2, 30, this.r/2, 27.5, thrustEnd)        
      }

      // THE SHIP
      g.curve(
        -1, 20,
        0 - 10, -this.r / 3,
        this.r - 10, -this.r / 8,
        this.r * 2, 80,
      )
      g.beginShape()
      g.vertex(-this.r - 10, this.r / 2)
      g.vertex(this.r * 2 - 10, this.r / 2)
      g.vertex(this.r * 2.5 - 10, 0)
      g.vertex(-10, -this.r / 3)
      g.vertex(-this.r - 10, -this.r)
      g.endShape(g.CLOSE)
      g.triangle(-this.r - 10, this.r,
        -this.r - 10, this.r / 4,
        this.r / 2 - 10, this.r / 4);      
      g.pop();
    }
  }
}

Ship.prototype = Object.create(Entity.prototype);