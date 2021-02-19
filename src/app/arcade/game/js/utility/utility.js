import * as p5 from 'p5';
import PointNumber from '../effects/point-numbers.js';
import Dust from '../effects/dust.js';
import Debris from '../effects/debris.js';
import { input } from './input.js';
import { loadBarrier } from './load-barriers.js'
import Ship from '../entity/ship.js';
import Boss from '../entity/boss.js';
import Asteroid from '../entity/asteroid.js';
import Enemy from '../entity/enemy.js'
import LaserEnergy from '../powerups/laser-energy.js'


function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

export function lineIntersect(l1v1, l1v2, l2v1, l2v2, g) {
  var base = p5.Vector.sub(l1v1, l2v1);
  var l1_vector = p5.Vector.sub(l1v2, l1v1);
  var l2_vector = p5.Vector.sub(l2v2, l2v1);
  var direction_cross = cross(l2_vector, l1_vector);
  var t = cross(base, l1_vector) / direction_cross;
  var u = cross(base, l2_vector) / direction_cross;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return true;
  } else {
    return false;
  }
}

export const addToScore = (state, add) => {
  state.score += add;
}

export const addPointNumbers = (state, pos, vel, color, g, text, size) => {
  state.pointNumbers.push(new PointNumber(pos, vel, color, g, text, size))
}

export const addDust = (state, pos, vel, n, trans, color, weight, g) => {
  for (var i = 0; i < n; i++) {
    state.dust.push(new Dust(pos, vel, trans, color, weight, g, state.rgbColor1, state.rgbColor2, state.rgbColor3));
  }
}

export const addDebris = (state, pos, vel, n, r, g, rgbColor4) => {
  state.debris.push(new Debris(pos, vel, n, r, g, rgbColor4));
}

export const reduceLaserCharge = (state) => {
  if (state.laserCharge > 0) {
    state.laserCharge -= 100;
    return true;
  }
}

export const roundLoss = (state, g) => {
  setTimeout(function () {
    state.lives--;
    if (state.lives >= 0) {
      state.ship = new Ship(state, g, state.shieldTime, state.rgbColor2, state.rgbColor3, state.score, state.lasers, addDust, state.laserCharge, state.windowWidth, state.buttons, state.lives, gameReset);
      state.canPlay = true;
      state.laserCharge = 1270;
    }
  }, 3000);
  input.registerAsListener(g.ENTER, function (char, code, press) {
    if (press) {
      if (state.lives < 0) {
        gameReset();
      }
    }
  });
}

export const gameReset = (state) => {
  state.lives = 3;
  state.splashScreen = true;
  resetCanvas();
}

export const spawnBoss = (state, g) => {
  state.bosses.push(new Boss(state, g, state.rgbColor5, state.windowWidth, addDust, state.level, state.lasers, state.rgbColor2, state.ship))
}

export const spawnAsteroids = (state, g) => {
  state.asteroids.push(new Asteroid(null, null, 3, g, state.rgbColor1, state.windowWidth));
}

export const spawnBarriers = (state, g) => {
  const vx = -.4
  const size = g.round(g.random(10, 50))
  const y = g.random(0 + size * 4, g.height - size * 2)
  const x = g.width + size * 6;
  state.barriers.push(loadBarrier(g, x, y, vx, size, state.rgbColor4, state.windowWidth))
}

export const spawnEnemy = (state, g) => {
  let radius = g.random(20, 30)
  state.enemies.push(new Enemy(state, radius, g, addDust, state.level, state.rgbColor5, state.rgbColor2, state.lasers, state.windowWidth))
}

export const spawnPowerUp = (state, g, pos) => {
  state.powerUps.push(new LaserEnergy(state, g, pos, state.windowWidth))
}

export const checkDust = (state) => {
  while (state.dust.length > 30) {
    state.dust.shift();
  }
}

export const checkDebris = (state) => {
  if (state.debris.length > 7) {
    state.debris.shift();
  }
}

export const checkLaserCharge = (state) => {
  if (state.laserCharge < 0) {
    state.laserCharge = 0;
    state.laserOverHeat = true;
    setTimeout(function () {
      state.laserOverHeat = false;
    }, 2500);
  }
  if (state.laserCharge < 1270 && !state.laserOverHeat) {
    state.laserCharge += 5;
  }
}

export const defeatBoss = (state, i) => {
  setTimeout(function () {
    state.level += 1;
    state.possibleBarriers += (8 + (3 * state.level));
    state.possibleBosses += 2;
    state.bosses.splice(i, 1);
  }, 8000)
}