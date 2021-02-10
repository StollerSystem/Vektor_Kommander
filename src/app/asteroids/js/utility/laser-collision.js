import * as p5 from 'p5';

export default function laserCollision(g, lasers, i, asteroids, addDust, rgbColor1, rgbColor2, rgbColor3, rgbColor4, rgbColor5, enemies, addDebris, barriers, ship, roundLoss, canPlay, input, addToScore, windowWidth) {
  const points = [200, 100, 50, 25];
  var g = g;
  var exists = true;
  var w = windowWidth / 1800;
  for (var j = asteroids.length - 1; j >= 0; j--) {
    // VS ASTEROIDS
    if (lasers[i].hits(asteroids[j])) {
      exists = false;
      // asteroids[j].playSoundEffect(explosionSoundEffects);
      if (!lasers[i].enemy) {
        // score += points[asteroids[j].size];
        addToScore(points[asteroids[j].size])
      }
      var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), asteroids[j].vel);
      var dustNum = (asteroids[j].size * 2 + 1) * 3;
      addDust(asteroids[j].pos, dustVel, dustNum, .005, rgbColor1, 2.5, g);
      var newAsteroids = asteroids[j].breakup();
      newAsteroids.forEach(function (asteroid) {
        asteroids.push(asteroid)
      })
      asteroids.splice(j, 1);
      lasers.splice(i, 1);
      // CHECK FOR NEXT LEVEL 
      // if (asteroids.length == 0) {
      //   stageClear = true;
      //   setTimeout(function () {
      //     level++;
      //     possibleEnemies += level;
      //     stageClear = false;
      //     spawnAsteroids();
      //     ship.shields = shieldTime;
      //   }, 4000)
      // }
      break;
    }
  }
  // VS ENEMIES
  if (exists) {
    for (var k = enemies.length - 1; k >= 0; k--) {
      if (lasers[i].hits(enemies[k]) && !lasers[i].enemy) {
        exists = false;
        if (!lasers[i].enemy) {
          // score += points[asteroids[j].size];
          addToScore(100)
        }
        let dustVel = p5.Vector.add(lasers[i].vel.mult(0.5), enemies[k].vel);
        addDust(enemies[k].pos, dustVel, 10, .01, rgbColor5, 1, g);
        addDebris(enemies[k].pos, enemies[k].vel, 10, 30 * w, g, rgbColor5)
        enemies.splice(j, 1);
        lasers.splice(i, 1);
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
          if (!lasers[i].enemy) {
            // score += points[asteroids[j].size];
            addToScore(10)
          }
          //THIS LASER HIT DUST IS LEGIT
          let dustVel = p5.Vector.add(lasers[i].vel.mult(0.05), barriers[k][j].vel);
          addDust(barriers[k][j].pos, dustVel, 5, .02, rgbColor2, 3, g);
          addDebris(barriers[k][j].pos, barriers[k][j].vel.add(g.createVector(g.random(-1, -2), g.random(.1, -.1))), g.random(2, 4), 15 * w, g, rgbColor4);
          // BREAK OFF
          if (barriers[k][j].rotation === 0) {
            // console.log("square off")
            if (j - 1 >= 0) {
              barriers[k][j - 1].vel.add(g.createVector(g.random(-1, -2), g.random(1, -1)))
              barriers[k][j - 1].setRotation(g.random(-.05, .05));
            }
          }
          barriers[k].splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }
  // VS PLAYER   
  if (exists) {
    if (lasers[i].hits(ship) && lasers[i].enemy && canPlay) {
      canPlay = false;
      var dustVel = p5.Vector.add(ship.vel.mult(0.2), lasers[i].vel.mult(.2));
      lasers.splice(i, 1);
      addDust(ship.pos, dustVel, 15, .005, rgbColor3, 2.5, g);
      ship.destroy();
      input.reset();
      // ship.playSoundEffect(explosionSoundEffects);
      // rocketSoundEffects[0].stop();
      // rocketSoundEffects[1].stop();              
      roundLoss(g);
    }
  }
}