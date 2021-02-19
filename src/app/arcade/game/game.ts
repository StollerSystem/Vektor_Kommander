import * as p5 from 'p5';
import Ship from './js/entity/ship.js';
import Boss from './js/entity/boss.js';
import Asteroid from './js/entity/asteroid.js';
import Enemy from './js/entity/enemy.js'
import { input } from './js/utility/input.js';
import Dust from './js/effects/dust.js';
import Hud from './js/utility/hud.js';
import Splash from './js/utility/splash.js'
import Debris from './js/effects/debris.js';
import Star from './js/effects/star.js';
import loadStars from './js/utility/load-stars.js';
import loadBarriers from './js/utility/load-barriers.js';
import laserCollision from './js/utility/laser-collision.js';
import randomColors from './js/utility/random-colors.js';
import MobileButton from './js/utility/buttons.js';
import LaserEnergy from './js/powerups/laser-energy.js';
import PointNumber from './js/effects/point-numbers.js';
import { render } from './js/utility/render.js';
import { addToScore, addPointNumbers, addDust, addDebris, roundLoss, gameReset, spawnBoss, spawnAsteroids, spawnBarriers, spawnEnemy, spawnPowerUp, checkDust, checkDebris, checkLaserCharge, defeatBoss } from './js/utility/utility.js';


export const callGame = (eventInput) => {

  var config: any = eventInput.default
  var logoPath = new Path2D(config.logo.path);
  var ctx: any;
  // var windowWidth: any;
  // var rgbColor1: any;
  // var rgbColor2: any;
  // var rgbColor3: any;
  // var rgbColor4: any;
  // var rgbColor5: any;

  // var buttons: any = [];
  // var asteroids: any = [];
  // var lasers: any = [];
  // var enemies: any = [];
  // var bosses: any = [];
  // var debris: any = [];
  // var pointNumbers: any = [];
  // var powerUps: any = [];
  var stars: any = [];
  // var barriers: any = [];
  // var dust: any = [];

  // var ship: any;
  var hud: any;
  var splash: any;

  // var canPlay: boolean = true;
  // var laserOverHeat: boolean = false;
  // var splashScreen: boolean = true;
  var consoleTrigger: boolean = false;

  var easeInStars: number = .75;
  var powerUpCounter: number = 300;

  var possibleEnemies: number = 1;
  var possibleBarriers: number = 10;
  var possibleBosses: number = 1;
  // var shieldTime: number = 180;
  // var score: number = 0;
  // var lives: number = 3;
  // var level: number = 0;
  // var laserCharge: number = 1270;
  var beginGameSequence: number = 0;




  var state = {
    config: eventInput.default,
    logoPath: new Path2D(config.logo.path),
    ctx: null,
    windowWidth: null,
    rgbColor1: null,
    rgbColor2: null,
    rgbColor3: null,
    rgbColor4: null,
    rgbColor5: null,

    buttons: [],
    asteroids: [],
    lasers: [],
    enemies: [],
    bosses: [],
    debris: [],
    pointNumbers: [],
    powerUps: [],
    stars: [],
    barriers: [],
    dust: [],

    ship: null,
    hud: null,
    splash: null,

    canPlay: true,
    laserOverHeat: false,
    splashScreen: true,
    consoleTrigger: false,

    easeInStars: .75,
    powerUpCounter: 300,

    possibleEnemies: 1,
    possibleBarriers: 10,
    possibleBosses: 1,
    shieldTime: 180,
    score: 0,
    lives: 3,
    level: 0,
    laserCharge: 1270,
    beginGameSequence: 0
  }


  const game = (g: any) => {

    // Global Functions

    // const addPointNumbers = (pos: any, vel: any, color: any, g: any, text: string, size: any) => {
    //   pointNumbers.push(new PointNumber(pos, vel, color, g, text, size))
    // }

    // const addDust = (pos: any, vel: any, n: any, trans: any, color: any, weight: any, g: any) => {
    //   for (var i = 0; i < n; i++) {
    //     dust.push(new Dust(pos, vel, trans, color, weight, g, rgbColor1, rgbColor2, rgbColor3));
    //   }
    // }

    // const addDebris = (pos: any, vel: any, n: any, r: any, g: any, rgbColor4: any) => {
    //   debris.push(new Debris(pos, vel, n, r, g, rgbColor4));
    // }

    // const reduceLaserCharge = () => {
    //   if (laserCharge > 0) {
    //     laserCharge -= 100;
    //     return true;
    //   }
    // }

    // const roundLoss = () => {
    //   setTimeout(function () {
    //     lives--;
    //     if (lives >= 0) {
    //       ship = new Ship(state, g, shieldTime, state.rgbColor2, state.rgbColor3, state.score, lasers, addDust, windowWidth, buttons, lives, gameReset);
    //       canPlay = true;
    //       state.laserCharge = 1270;
    //     }
    //   }, 3000);
    //   input.registerAsListener(g.ENTER, function (char, code, press) {
    //     if (press) {
    //       if (lives < 0) {
    //         gameReset();
    //       }
    //     }
    //   });
    // }


    // const gameReset = () => {
    //   lives = 3;
    //   splashScreen = true;
    //   resetCanvas();
    // }

    // const spawnBoss = () => {
    //   bosses.push(new Boss(state, g, state.rgbColor5, windowWidth, addDust, level, lasers, state.rgbColor2, state.ship))
    // }

    // const spawnAsteroids = () => {
    //   for (let i = 0; i < spawnBoost + 1; i++) {
    //     asteroids.push(new Asteroid(null, null, 3, g, state.rgbColor1, state.windowWidth));
    //   }
    // }

    // const spawnBarriers = () => {
    //   const vx = -.4
    //   const size = g.round(g.random(10, 50))
    //   const y = g.random(0 + size * 4, g.height - size * 2)
    //   const x = g.width + size * 6;
    //   barriers.push(loadBarriers(g, x, y, vx, size, state.rgbColor4, state.windowWidth))
    // }

    // const spawnEnemy = () => {
    //   let radius = g.random(20, 30)
    //   enemies.push(new Enemy(state, radius, g, addDust, state.level, state.rgbColor5, state.rgbColor2, state.lasers, state.windowWidth))
    // }

    // const spawnPowerUp = (pos: any) => {
    //   powerUps.push(new LaserEnergy(g, pos, state.windowWidth, laserPowerUp))
    // }

    // const laserPowerUp = (points) => {
    //   state.score += points;
    //   laserOverHeat = false;
    //   state.laserCharge = 2000;
    // }

    // const checkDebris = () => {
    //   if (state.debris.length > 7) {
    //     state.debris.shift();
    //   }
    // }

    // const checkLaserCharge = () => {
    //   if (state.laserCharge < 0) {
    //     state.laserCharge = 0;
    //     state.laserOverHeat = true;
    //     setTimeout(function () {
    //       state.laserOverHeat = false;
    //     }, 2500);
    //   }
    //   if (state.laserCharge < 1270 && !state.laserOverHeat) {
    //     state.laserCharge += 5;
    //   }
    // }

    // const canPlayToggle = () => {
    //   state.canPlay = false;
    // }

    // const defeatBoss = (state, i) => {
    //   setTimeout(function () {
    //     state.level += 1;
    //     state.possibleBarriers += (8 + (3 * state.level));
    //     state.possibleBosses += 2;
    //     state.bosses.splice(i, 1);
    //   }, 8000)
    // }

    const hyperDriveIntro = () => {
      for (let i = 0; i < stars.length; i++) {
        if (g.frameCount - beginGameSequence < 100) {
          easeInStars = easeInStars / Math.pow(1.000008, g.frameCount - beginGameSequence)
        }
        else {
          easeInStars += (g.frameCount - beginGameSequence) / 1000000
          if (easeInStars >= .6) {
            easeInStars = .6;
          }
        }
        stars[i].move(easeInStars)
        if (stars[i].x <= 0) {
          let windowX = g.width;
          let randomY = g.random(0, g.height);
          let randomSize = g.random(.1, 25);
          const newStar = new Star(windowX, randomY, randomSize, g);
          stars.push(newStar);
          stars.splice(i, 1);
        }
      }
    }

    const resetCanvas = () => {
      state.score = 0;
      state.canPlay = true;

      state.buttons = [];
      state.asteroids = [];
      state.lasers = [];
      state.enemies = [];
      state.bosses = [];
      state.debris = [];
      state.pointNumbers = [];
      state.powerUps = [];
      state.barriers = [];

      possibleBarriers = 10;
      possibleBosses = 1;
      state.laserCharge = 1270;


      state.windowWidth = g.windowWidth <= 1200 ? g.windowWidth : 1200;
      canvas = g.createCanvas(state.windowWidth * .98, g.windowHeight * .95);
      ctx = canvas.elt.getContext("2d");

      console.log("w:" + g.width + " h:" + g.height)

      // SET UP MOBILE BUTTONS
      state.buttons[0] = new MobileButton(g, 0, g.UP_ARROW, 38, 120, g.height - 120)
      state.buttons[1] = new MobileButton(g, g.PI, g.DOWN_ARROW, 40, 120, g.height - 50)
      state.buttons[2] = new MobileButton(g, 3 * g.PI / 2, g.LEFT_ARROW, 37, 50, g.height - 50)
      state.buttons[3] = new MobileButton(g, g.PI / 2, g.RIGHT_ARROW, 39, 190, g.height - 50)
      state.buttons[4] = new MobileButton(g, 0, " ".charCodeAt(0), 32, g.width - 100 * (state.windowWidth / 600), g.height - 50)

      // LOAD INITIAL ASSETS
      state.ship = new Ship(state, g, state.shieldTime, state.rgbColor2, state.rgbColor3, state.score, state.lasers, addDust, state.laserCharge, state.windowWidth, state.buttons, state.lives, gameReset);
      hud = new Hud(g, state.rgbColor1, state.rgbColor3, state.windowWidth);
      stars = loadStars(g);
      splash = new Splash();

      setTimeout(function () {
        input.registerAsListener(g.ENTER, function (char, code, press) {
          if (press) {
            if (state.splashScreen) {
              state.splashScreen = false;
              beginGameSequence = g.frameCount;
            }
          }
        }, 100)
      });
    }


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
      resetCanvas()
      g.keyReleased = () => {
        input.handleEvent(g.key, g.keyCode, false);
      }
      g.keyPressed = () => {
        input.handleEvent(g.key, g.keyCode, true);
      }

      spawnBoss(state, g);
    }


    g.draw = () => {

      if (state.splashScreen) {
        g.background(0);
        splash.render(g, stars, state.windowWidth, ctx, logoPath, config);
        if (state.ship.beginGame) {
          state.splashScreen = false
        }
      } else {

        // CHECK FOR FX CREATING LAAAAG
        checkDust(state);
        checkDebris(state);
        checkLaserCharge(state);

        // STARS
        if (g.frameCount - beginGameSequence < 175) {
          hyperDriveIntro()

        } else {

          for (let i = 0; i < stars.length; i++) {
            stars[i].move(.6)
            if (stars[i].x <= 0) {
              let windowX = g.width
              let randomY = g.random(0, g.height)
              let randomSize = g.random(0.1, 7)
              const newStar = new Star(windowX, randomY, randomSize, g);
              stars.push(newStar)
              stars.splice(i, 1)
            }
          }
        }

        // RANDOM ENEMY SPAWN
        if (possibleEnemies > 0 && state.enemies.length < 1) {
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
          if (ranNum <= 1 && state.barriers.length < 6 && possibleBarriers > 0) {
            possibleBarriers -= 1;
            spawnBarriers(state, g);
            // console.log("squares left: "+possibleBarriers)
          }
        }

        //SPAWN BOSS
        if (possibleBarriers <= 0 && possibleBosses > 0) {
          possibleBosses -= 1;
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
              if (g.frameCount - powerUpCounter < 100) {
                state.powerUps[i].powerUp(450)
                addPointNumbers(state, state.powerUps[i].pos, dustVel.mult(.25), 255, g, '650', 15)
              } else if (g.frameCount - powerUpCounter < 200) {
                addPointNumbers(state, state.powerUps[i].pos, dustVel.mult(.25), 255, g, '450', 15)
                state.powerUps[i].powerUp(650)
              } else {
                addPointNumbers(state, state.powerUps[i].pos, dustVel.mult(.25), 255, g, '250', 15)
                state.powerUps[i].powerUp(250)
              }
              state.powerUps.splice(i, 1)
              powerUpCounter = g.frameCount

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
          if (state.bosses[i].hp <= 0 && possibleBosses === 0) {
            possibleBosses -= 1;
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
        render(stars)
        render(state.powerUps)
        render(state.asteroids)
        render(state.lasers)
        render(state.enemies)
        render(state.bosses)
        render(state.dust)
        render(state.debris)
        render(state.pointNumbers)
        state.ship.render();
        hud.render(state.lives, state.score, state.laserCharge, state.laserOverHeat, state);


        if (state.lives < 0 && !consoleTrigger) {
          console.log("Your final score was " + state.score)
          consoleTrigger = true
        }

        // RENDER MOBILE BUTTONS IF THE SCREEN IS AS SMALL AS AN IPAD 
        if (state.windowWidth <= 1024) {
          render(state.buttons)
        }

      }
    }
  };
  var canvas = new p5(game);
}