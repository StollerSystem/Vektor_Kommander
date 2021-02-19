import * as p5 from 'p5';
import { input } from './js/utility/input.js';
import Star from './js/effects/star.js';
import laserCollision from './js/utility/laser-collision.js';
import randomColors from './js/utility/random-colors.js';
import { render } from './js/utility/render.js';
import { state } from './js/utility/state.js';
import { resetCanvas } from './js/utility/reset.js';
import { addToScore, addPointNumbers, addDust, addDebris, roundLoss, spawnBoss, spawnAsteroids, spawnBarriers, spawnEnemy, spawnPowerUp, checkDust, checkDebris, checkLaserCharge, defeatBoss, hyperDriveIntro } from './js/utility/utility.js';


export const callGame = (eventInput) => {

  var config: any = eventInput.default
  var logoPath = new Path2D(config.logo.path);

  const game = (g: any) => {

    // LOAD COLORS
    g.preload = () => {
      let random_Colors = randomColors(g);
      state.rgbColor1 = config.gameColors.rocks ? config.gameColors.rocks : random_Colors[0]; // ROCKS/SCORE
      state.rgbColor2 = random_Colors[1] // LASERS / THRUSTERS
      state.rgbColor3 = config.gameColors.ship ? config.gameColors.ship : random_Colors[2]; // SHIP
      state.rgbColor4 = config.gameColors.squares ? config.gameColors.squares : random_Colors[3]; // SQUARES
      state.rgbColor5 = config.gameColors.enemy ? config.gameColors.enemy : random_Colors[4]; // ENEMY        
    }

    // LOAD VARIABLES
    g.setup = () => {
      g.frameRate(60)
      // resetCanvas()
      resetCanvas(state, g)
      g.keyReleased = () => {
        input.handleEvent(g.key, g.keyCode, false);
      }
      g.keyPressed = () => {
        input.handleEvent(g.key, g.keyCode, true);
      }

      // spawnBoss(state, g);
    }


    g.draw = () => {

      if (state.splashScreen) {
        g.background(0);
        state.splash.render(g, state.stars, state.windowWidth, state.ctx, logoPath, config);
        if (state.ship.beginGame) {
          state.splashScreen = false
        }
      } else {

        // CHECK FOR FX CREATING LAAAAG
        checkDust(state);
        checkDebris(state);
        checkLaserCharge(state);

        // STARS
        if (g.frameCount - state.beginGameSequence < 175) {
          hyperDriveIntro(state, g)

        } else {

          for (let i = 0; i < state.stars.length; i++) {
            state.stars[i].move(.6)
            if (state.stars[i].x <= 0) {
              let windowX = g.width
              let randomY = g.random(0, g.height)
              let randomSize = g.random(0.1, 7)
              const newStar = new Star(windowX, randomY, randomSize, g);
              state.stars.push(newStar)
              state.stars.splice(i, 1)
            }
          }
        }

        // RANDOM ENEMY SPAWN
        if (state.possibleEnemies > 0 && state.enemies.length < 1) {
          let ranNum = g.random(1000);
          if (ranNum <= 1) {
            spawnEnemy(state, g);
          }
        }

        // RANDOM ASTEROID SPAWN
        if (state.asteroids.length < 3) {
          let ranNum = g.random(650);
          if (ranNum <= 1) {
            spawnAsteroids(state, g);
            // console.log("spawn rock, total: "+asteroids.length)
          }
        }

        // RANDOM BARRIER SPAWN
        if (state.barriers.length < 5) {
          let ranNum = g.random(220);
          if (ranNum <= 1 && state.barriers.length < 6 && state.possibleBarriers > 0) {
            state.possibleBarriers -= 1;
            spawnBarriers(state, g);
            // console.log("squares left: "+possibleBarriers)
          }
        }

        //SPAWN BOSS
        if (state.possibleBarriers <= 0 && state.possibleBosses > 0) {
          state.possibleBosses -= 1;
          spawnBoss(state, g)
        }

        // _________UPDATES ___________

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
          laserCollision(state, g, state.lasers, i, state.asteroids, addDust, state.enemies, addDebris, state.barriers, state.ship, roundLoss, input, addToScore, state.windowWidth, spawnPowerUp, addPointNumbers, state.bosses)
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
            addPointNumbers(state, state.bosses[i].pos, state.bosses[i].vel.mult(.25), 255, g, state.score.toString(), 30)
            defeatBoss(i)
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

        // _________ALL RENDERS_________

        g.background(0);

        let fps = g.frameRate();
        g.fill(255);
        g.stroke(0);
        g.text("FPS: " + fps.toFixed(2), 10, g.height - 10);


        for (let i = 0; i < state.barriers.length; i++) {
          render(state.barriers[i])
        }
        render(state.stars)
        render(state.powerUps)
        render(state.asteroids)
        render(state.lasers)
        render(state.enemies)
        render(state.bosses)
        render(state.dust)
        render(state.debris)
        render(state.pointNumbers)
        state.ship.render();
        state.hud.render(state.lives, state.score, state.laserCharge, state.laserOverHeat, state);

        // RENDER MOBILE BUTTONS IF THE SCREEN IS AS SMALL AS AN IPAD 
        if (state.windowWidth <= 1024) {
          render(state.buttons)
        }
      }
    }
  };
  var canvas = new p5(game);
  state.canvas = canvas;
}