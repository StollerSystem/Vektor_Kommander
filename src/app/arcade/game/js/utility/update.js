import * as p5 from 'p5';
import { state } from './state.js';
import { addToScore, addPointNumbers, addDebris, roundLoss, spawnPowerUp, defeatBoss } from './utility.js';
import { addDust } from './entity-utility.js';
import laserCollision from './laser-collision.js';
import { input } from './input.js';


export const update = (g) => {

  // UPDATE ASTEROIDS AND CHECK FOR COLLISIONS 
  for (let i = 0; i < state.asteroids.length; i++) {
    if (state.asteroids[i].offscreen()) {
      state.asteroids.splice(i, 1);
      continue;
    }
    if (state.ship.hits(state.asteroids[i]) && state.canPlay) {
      state.canPlay = false;
      var dustVel = p5.Vector.add(state.ship.vel.mult(0.2), state.asteroids[i].vel);
      addDust(state, state.ship.pos, dustVel, 15, .005, state.rgbColor3, 3, g);
      state.ship.destroy();
      input.reset();
      roundLoss(state, g);
    }
    state.asteroids[i].update();
  }

  //UPDATES ALL LASERS AND CHECKS FOR ALL COLLISIONS
  for (var i = state.lasers.length - 1; i >= 0; i--) {
    // var exists = true;
    state.lasers[i].update();
    if (state.lasers[i].offscreen()) {
      state.lasers.splice(i, 1);
      continue;
    }
    laserCollision(state, g, i, addDust, addDebris, roundLoss, input, addToScore, spawnPowerUp, addPointNumbers)
  }

  // UPDATE ENEMY AND CHECK FOR COLLISION BEWTWEEN SHIP
  for (var i = state.enemies.length - 1; i >= 0; i--) {
    if (state.ship.hits(state.enemies[i]) && state.canPlay) {
      state.canPlay = false;
      var dustVel = p5.Vector.add(state.ship.vel.mult(0.2), state.enemies[i].vel);
      addDust(state, state.ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
      state.ship.destroy();
      input.reset();
      roundLoss(state, g)
    }
    state.enemies[i].update();
  }

  // UPDATE AND CHECK FOR COLLISION WITH POWERUPS
  for (var i = state.powerUps.length - 1; i >= 0; i--) {
    state.powerUps[i].update();
    if (state.powerUps[i].offscreen()) {
      state.powerUps.splice(i, 1)
      continue;
    } else {
      if (state.ship.hits(state.powerUps[i]) && state.canPlay) {
        let color = [Math.round(g.random(50, 250)), Math.round(g.random(50, 250)), Math.round(g.random(50, 250))]
        let dustVel = p5.Vector.add(state.ship.vel.mult(0.5), state.powerUps[i].vel);
        addDust(state, state.ship.pos, dustVel, 7, .015, color, 5, g);
        if (g.frameCount - state.powerUpCounter < 100) {
          state.powerUps[i].powerUp(450)
          addPointNumbers(state, state.powerUps[i].pos, dustVel.mult(.25), 255, g, '650', 15)
        } else if (g.frameCount - state.powerUpCounter < 200) {
          addPointNumbers(state, state.powerUps[i].pos, dustVel.mult(.25), 255, g, '450', 15)
          state.powerUps[i].powerUp(650)
        } else {
          addPointNumbers(state, state.powerUps[i].pos, dustVel.mult(.25), 255, g, '250', 15)
          state.powerUps[i].powerUp(250)
        }
        state.powerUps.splice(i, 1)
        state.powerUpCounter = g.frameCount

      }
    }
  }

  // UPDATE AND DESTROY BARRIERS AND CHECK COLLISION
  for (let i = 0; i < state.barriers.length; i++) {
    for (let j = 0; j < state.barriers[i].length; j++) {
      state.barriers[i][j].update()
      if (state.ship.hits(state.barriers[i][j]) && state.canPlay) {
        state.canPlay = false;
        var dustVel = p5.Vector.add(state.ship.vel.mult(0.2), state.barriers[i][j].vel);
        addDust(state, state.ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
        state.ship.destroy();
        input.reset();
        roundLoss(state, g)
      }
      if (state.barriers[i][j].offscreen()) {
        state.barriers[i].splice(j, 1);
        continue
      }
    }
    if (state.barriers[i].length === 0) {
      state.barriers.splice(i, 1)
      continue;
    }
  }

  //UPDATE BOSS
  for (var i = state.bosses.length - 1; i >= 0; i--) {
    state.bosses[i].update(state.ship);
    if (state.bosses[i].hp <= 0 && state.possibleBosses === 0) {
      state.possibleBosses -= 1;
      let addScore = (1000 + (500 * state.level))
      addToScore(state, addScore)
      addPointNumbers(state, state.bosses[i].pos, state.bosses[i].vel.mult(.25), 255, g, addScore.toString(), 30)
      defeatBoss(state, i)
    }
    if (state.ship.hits(state.bosses[i].quad1) && state.canPlay || state.ship.hits(state.bosses[i].quad2) && state.canPlay || state.ship.hits(state.bosses[i].quad3) && state.canPlay || state.ship.hits(state.bosses[i].quad4) && state.canPlay) {
      state.canPlay = false;
      var dustVel = p5.Vector.add(state.ship.vel.mult(0.2), state.bosses[i].vel);
      addDust(state, state.ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
      state.ship.destroy();
      input.reset();
      roundLoss(state, g)
    }

  }

  // UPDATE AND DESTROY DUST
  for (var i = state.dust.length - 1; i >= 0; i--) {
    state.dust[i].update();
    if (state.dust[i].transparency <= 0) {
      state.dust.splice(i, 1);
      continue
    }
  }

  // UPDATE AND DESTROY DEBRIS
  for (var i = state.debris.length - 1; i >= 0; i--) {
    state.debris[i].update();
    if (state.debris[i].destroyFrames <= 0) {
      state.debris.splice(i, 1);
      continue;
    }
  }

  for (var i = state.pointNumbers.length - 1; i >= 0; i--) {
    state.pointNumbers[i].update();
    if (state.pointNumbers[i].transparency <= 0) {
      state.pointNumbers.splice(i, 1)
      continue
    }
  }

  state.ship.update(state.laserCharge);
}