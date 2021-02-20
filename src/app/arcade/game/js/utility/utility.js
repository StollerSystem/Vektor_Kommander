import PointNumber from '../effects/point-numbers.js';
import Debris from '../effects/debris.js';
import { input } from './input.js';
import { loadBarrier } from './load-barriers.js'
import { resetCanvas } from './reset.js'
import Ship from '../entity/ship.js';
import Boss from '../entity/boss.js';
import Asteroid from '../entity/asteroid.js';
import Enemy from '../entity/enemy.js';
import LaserEnergy from '../powerups/laser-energy.js';
import Star from '../effects/star.js'

export const addToScore = (state, add) => {
  state.score += add;
}

export const addPointNumbers = (state, pos, vel, color, g, text, size) => {
  state.pointNumbers.push(new PointNumber(pos, vel, color, g, text, size))
}

export const addDebris = (state, pos, vel, n, r, g, rgbColor4) => {
  state.debris.push(new Debris(pos, vel, n, r, g, rgbColor4));
}


export const roundLoss = (state, g) => {
  setTimeout(function () {
    state.lives--;
    if (state.lives >= 0) {
      state.ship = new Ship(state, g);
      state.canPlay = true;
      state.laserCharge = 1270;
    }
  }, 3000);
  input.registerAsListener(g.ENTER, function (char, code, press) {
    if (press) {
      if (state.lives < 0) {
        resetCanvas(state, g);
      }
    }
  });
}

export const spawnBoss = (state, g) => {
  state.bosses.push(new Boss(state, g))
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
  state.enemies.push(new Enemy(state, radius, g, state.rgbColor5, state.rgbColor2))
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

export const hyperDriveIntro = (state, g) => {
  for (let i = 0; i < state.stars.length; i++) {
    if (g.frameCount - state.beginGameSequence < 100) {
      state.easeInStars = state.easeInStars / Math.pow(1.000008, g.frameCount - state.beginGameSequence)
    }
    else {
      state.easeInStars += (g.frameCount - state.beginGameSequence) / 1000000
      if (state.easeInStars >= .6) {
        state.easeInStars = .6;
      }
    }
    state.stars[i].move(state.easeInStars)
    if (state.stars[i].x <= 0) {
      let windowX = g.width;
      let randomY = g.random(0, g.height);
      let randomSize = g.random(.1, 25);
      const newStar = new Star(windowX, randomY, randomSize, g);
      state.stars.push(newStar);
      state.stars.splice(i, 1);
    }
  }
}