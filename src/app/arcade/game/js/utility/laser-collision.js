import * as p5 from 'p5';

export default function laserCollision(state, g, i, addDust, addDebris, roundLoss, input, addToScore, spawnPowerUp, addPointNumbers) {
  const points = [200, 100, 50, 25];
  var g = g;
  var exists = true;
  var w = state.windowWidth / 1800;
  for (var j = state.asteroids.length - 1; j >= 0; j--) {

    // VS ASTEROIDS
    if (state.lasers[i].hits(state.asteroids[j])) {
      exists = false;
      let laserVel = state.lasers[i].vel.copy();
      var dustVel = p5.Vector.add(laserVel.mult(0.2), state.asteroids[j].vel);
      var dustNum = (state.asteroids[j].size * 2 + 1) * 3;
      addDust(state, state.asteroids[j].pos, dustVel, dustNum, .005, state.rgbColor1, 2.5, g);
      var newAsteroids = state.asteroids[j].breakup();
      newAsteroids.forEach(function (asteroid) {
        state.asteroids.push(asteroid)
      })
      if (!state.lasers[i].enemy) {
        addToScore(state, points[state.asteroids[j].size])
        addPointNumbers(state, state.asteroids[j].pos, dustVel.mult(.25), 255, g, points[state.asteroids[j].size])
      }
      state.asteroids.splice(j, 1);
      if (state.lasers[i].charge > 0) {
        state.lasers[i].charge -= 3
      } else {
        state.lasers.splice(i, 1);
      }
      break;
    }
  }

  // VS ENEMIES
  if (exists) {
    for (var k = state.enemies.length - 1; k >= 0; k--) {
      if (state.lasers[i].hits(state.enemies[k]) && !state.lasers[i].enemy) {
        exists = false;
        let laserVel = state.lasers[i].vel.copy();
        let dustVel = p5.Vector.add(laserVel.mult(0.5), state.enemies[k].vel);
        addDust(state, state.enemies[k].pos, dustVel, 10, .01, state.rgbColor5, 1, g);
        addDebris(state, state.enemies[k].pos, state.enemies[k].vel, 10, 30 * w, g, state.rgbColor5)
        if (!state.lasers[i].enemy) {
          addToScore(state, 100)
          addPointNumbers(state, state.enemies[k].pos, dustVel.mult(.25), 255, g, 100)
        }
        state.enemies.splice(j, 1);
        if (state.lasers[i].charge > 0) {
          state.lasers[i].charge -= 3
        } else {
          state.lasers.splice(i, 1);
        }
        break;
      }
    }
  }

  // VS BARRIERS
  if (exists) {
    for (var k = state.barriers.length - 1; k >= 0; k--) {
      for (var j = state.barriers[k].length - 1; j >= 0; j--) {
        if (exists && state.lasers[i].hits(state.barriers[k][j])) {
          exists = false;
          // IF POWER SQUARE SPAWN POWERUP
          if (state.barriers[k][j].powerSquare) {
            spawnPowerUp(state, g, state.barriers[k][j].pos)
          }
          let laserVel = state.lasers[i].vel.copy();
          let dustVel = p5.Vector.add(laserVel.mult(0.05),state. barriers[k][j].vel);
          addDust(state, state.barriers[k][j].pos, dustVel, 5, .02, state.rgbColor2, 3, g);

          if (!state.lasers[i].enemy) {
            addToScore(state, 10)
            addPointNumbers(state, state.barriers[k][j].pos, dustVel, 255, g, 10)
          }
          addDebris(state, state.barriers[k][j].pos, state.barriers[k][j].vel.add(g.createVector(g.random(-1, -2), g.random(.1, -.1))), g.random(2, 4), 15 * w, g, state.rgbColor4);
          // BREAK OFF
          if (state.barriers[k][j].rotation === 0) {
            if (j - 1 >= 0) {
              state.barriers[k][j - 1].vel.add(g.createVector(g.random(-1, -2), g.random(1, -1)))
              state.barriers[k][j - 1].setRotation(g.random(-.05, .05));
            }
          }
          state.barriers[k].splice(j, 1);
          if (state.lasers[i].charge > 0) {
            state.lasers[i].charge -= 3
          } else {
            state.lasers.splice(i, 1);
          }
          break;
        }
      }
    }
  }

  // VS PLAYER   
  if (exists) {
    if (state.lasers[i].hits(state.ship) && state.lasers[i].enemy && state.canPlay) {
      state.canPlay = false;
      exists = false;
      var dustVel = p5.Vector.add(state.ship.vel.mult(0.2), state.lasers[i].vel.mult(.2));
      state.lasers.splice(i, 1);
      addDust(state, state.ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
      state.ship.destroy();
      input.reset();
      roundLoss(state, g);
    }
  }

  // VS BOSS ARMOR
  if (exists) {
    for (var k = state.bosses.length - 1; k >= 0; k--) {
      if (state.lasers[i].hits(state.bosses[k].quad1) && !state.lasers[i].enemy || state.lasers[i].hits(state.bosses[k].quad2) && !state.lasers[i].enemy ||state. lasers[i].hits(state.bosses[k].quad3) && !state.lasers[i].enemy || state.lasers[i].hits(state.bosses[k].quad4) && !state.lasers[i].enemy) {
        exists = false;
        let laserVel = state.lasers[i].vel.copy();
        let dustVel = p5.Vector.add(laserVel.mult(0.01), state.bosses[k].vel);
        addDust(state, state.lasers[i].pos, dustVel, 5, .01, state.rgbColor2, 2, g);
        state.lasers.splice(i, 1);
      }
    }
  }

  // VS BOSS CORE
  if (exists) {
    for (var k = state.bosses.length - 1; k >= 0; k--) {
      if (state.lasers[i].hits(state.bosses[k].core) && !state.lasers[i].enemy && !state.bosses[k].destroyed) {
        exists = false;
        let laserVel = state.lasers[i].vel.copy();
        let dustVel = p5.Vector.add(laserVel.mult(0.01), state.bosses[k].vel);
        addDust(state, state.lasers[i].pos, dustVel, 5, .01, state.rgbColor2, 4, g);
        state.bosses[k].coreHit(state.lasers[i].charge);
        state.lasers.splice(i, 1);
      }
    }
  }
}