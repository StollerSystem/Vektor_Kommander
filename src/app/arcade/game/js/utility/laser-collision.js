import * as p5 from 'p5';

export default function laserCollision(state, g, lasers, i, asteroids, addDust, enemies, addDebris, barriers, ship, roundLoss, canPlayToggle, input, addToScore, windowWidth, spawnPowerUp, addPointNumbers, bosses, canPlay) {
  const points = [200, 100, 50, 25];
  var g = g;
  var exists = true;
  var w = windowWidth / 1800;
  for (var j = asteroids.length - 1; j >= 0; j--) {

    // VS ASTEROIDS
    if (lasers[i].hits(asteroids[j])) {
      exists = false;      
      let laserVel = lasers[i].vel.copy();
      var dustVel = p5.Vector.add(laserVel.mult(0.2), asteroids[j].vel);
      var dustNum = (asteroids[j].size * 2 + 1) * 3;
      addDust(state, asteroids[j].pos, dustVel, dustNum, .005, state.rgbColor1, 2.5, g);
      var newAsteroids = asteroids[j].breakup();
      newAsteroids.forEach(function (asteroid) {
        asteroids.push(asteroid)
      })
      if (!lasers[i].enemy) {        
        addToScore(state,points[asteroids[j].size])
        addPointNumbers(state, asteroids[j].pos, dustVel.mult(.25), 255, g, points[asteroids[j].size])
      }
      asteroids.splice(j, 1);
      if (lasers[i].charge > 0) {
        lasers[i].charge -= 3
      } else {
        lasers.splice(i, 1);
      }      
      break;
    }
  }

  // VS ENEMIES
  if (exists) {
    for (var k = enemies.length - 1; k >= 0; k--) {
      if (lasers[i].hits(enemies[k]) && !lasers[i].enemy) {
        exists = false;
        let laserVel = lasers[i].vel.copy();
        let dustVel = p5.Vector.add(laserVel.mult(0.5), enemies[k].vel);
        addDust(state, enemies[k].pos, dustVel, 10, .01, state.rgbColor5, 1, g);
        addDebris(state, enemies[k].pos, enemies[k].vel, 10, 30 * w, g, state.rgbColor5)
        if (!lasers[i].enemy) {          
          addToScore(state, 100)
          addPointNumbers(state, enemies[k].pos, dustVel.mult(.25), 255, g, 100)
        }
        enemies.splice(j, 1);
        if (lasers[i].charge > 0) {
          lasers[i].charge -= 3
        } else {
          lasers.splice(i, 1);
        }
        break;
      }
    }
  }

  // VS BARRIERS
  if (exists) {
    for (var k = barriers.length - 1; k >= 0; k--) {
      for (var j = barriers[k].length - 1; j >= 0; j--) {
        if (exists && lasers[i].hits(barriers[k][j])) {
          exists = false;
          // IF POWER SQUARE SPAWN POWERUP
          if (barriers[k][j].powerSquare) {
            spawnPowerUp(barriers[k][j].pos)
          }          
          let laserVel = lasers[i].vel.copy();
          let dustVel = p5.Vector.add(laserVel.mult(0.05), barriers[k][j].vel);
          addDust(state, barriers[k][j].pos, dustVel, 5, .02, state.rgbColor2, 3, g);

          if (!lasers[i].enemy) {            
            addToScore(state,10)
            addPointNumbers(state, barriers[k][j].pos, dustVel, 255, g, 10)
          }          
          addDebris(state, barriers[k][j].pos, barriers[k][j].vel.add(g.createVector(g.random(-1, -2), g.random(.1, -.1))), g.random(2, 4), 15 * w, g, state.rgbColor4);
          // BREAK OFF
          if (barriers[k][j].rotation === 0) {            
            if (j - 1 >= 0) {
              barriers[k][j - 1].vel.add(g.createVector(g.random(-1, -2), g.random(1, -1)))
              barriers[k][j - 1].setRotation(g.random(-.05, .05));
            }
          }
          barriers[k].splice(j, 1);
          if (lasers[i].charge > 0) {
            lasers[i].charge -= 3
          } else {
            lasers.splice(i, 1);
          }
          break;
        }
      }
    }
  }

  // VS PLAYER   
  if (exists) {
    if (lasers[i].hits(ship) && lasers[i].enemy && canPlay) {
      canPlayToggle();
      exists = false;
      var dustVel = p5.Vector.add(ship.vel.mult(0.2), lasers[i].vel.mult(.2));
      lasers.splice(i, 1);
      addDust(state, ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
      ship.destroy();
      input.reset();                
      roundLoss(g);
    }
  }

  // VS BOSS ARMOR
  if (exists) {
    for (var k = bosses.length - 1; k >= 0; k--) {      
      if (lasers[i].hits(bosses[k].quad1) && !lasers[i].enemy || lasers[i].hits(bosses[k].quad2) && !lasers[i].enemy || lasers[i].hits(bosses[k].quad3) && !lasers[i].enemy || lasers[i].hits(bosses[k].quad4) && !lasers[i].enemy) {
        exists = false;
        let laserVel = lasers[i].vel.copy();
        let dustVel = p5.Vector.add(laserVel.mult(0.01), bosses[k].vel);
        addDust(state, lasers[i].pos, dustVel, 5, .01, state.rgbColor2, 2, g);
        lasers.splice(i, 1);
      }
    }
  }

  // VS BOSS CORE
  if (exists) {
    for (var k = bosses.length - 1; k >= 0; k--) {      
      if (lasers[i].hits(bosses[k].core) && !lasers[i].enemy && !bosses[k].destroyed) {
        exists = false;
        let laserVel = lasers[i].vel.copy();
        let dustVel = p5.Vector.add(laserVel.mult(0.01), bosses[k].vel);
        addDust(state, lasers[i].pos, dustVel, 5, .01, state.rgbColor2, 4, g);
        bosses[k].coreHit(lasers[i].charge);
        lasers.splice(i, 1);        
      }
    }
  }
}