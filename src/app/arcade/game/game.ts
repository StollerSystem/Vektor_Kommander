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
import { addToScore, addPointNumbers, addDust, addDebris } from './js/utility/utility.js';


export const callGame = (eventInput) => {

  var config: any = eventInput.default
  var logoPath = new Path2D(config.logo.path);
  var ctx: any;
  var windowWidth: any;
  // var rgbColor1: any;
  // var rgbColor2: any;
  // var rgbColor3: any;
  // var rgbColor4: any;
  // var rgbColor5: any;

  var buttons: any = [];
  var asteroids: any = [];
  var lasers: any = [];
  var enemies: any = [];
  var bosses: any = [];
  // var debris: any = [];
  // var pointNumbers: any = [];
  var powerUps: any = [];
  var stars: any = [];
  var barriers: any = [];
  // var dust: any = [];

  var ship: any;
  var hud: any;
  var splash: any;

  var canPlay: boolean = true;
  var laserOverHeat: boolean = false;
  var splashScreen: boolean = true;
  var consoleTrigger: boolean = false;

  var easeInStars: number = .75;
  var powerUpCounter: number = 300;
  var spawnBoost: number = 0;
  var possibleEnemies: number = 1;
  var possibleBarriers: number = 10;
  var possibleBosses: number = 1;
  var shieldTime: number = 180;
  // var score: number = 0;
  var lives: number = 3;
  var level: number = 0;
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
    spawnBoost: 0,
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

    const roundLoss = () => {
      setTimeout(function () {
        lives--;
        if (lives >= 0) {
          ship = new Ship(state, g, shieldTime, state.rgbColor2, state.rgbColor3, state.score, lasers, addDust, windowWidth, buttons, lives, gameReset);
          canPlay = true;
          state.laserCharge = 1270;
        }
      }, 3000);
      input.registerAsListener(g.ENTER, function (char, code, press) {
        if (press) {
          if (lives < 0) {
            gameReset();
          }
        }
      });
    }


    const gameReset = () => {
      lives = 3;
      splashScreen = true;
      resetCanvas();
    }

    const spawnBoss = () => {
      bosses.push(new Boss(state, g, state.rgbColor5, windowWidth, addDust, level, lasers, state.rgbColor2, ship))
    }

    const spawnAsteroids = () => {
      for (let i = 0; i < spawnBoost + 1; i++) {
        asteroids.push(new Asteroid(null, null, 3, g, state.rgbColor1, windowWidth));
      }
    }

    const spawnBarriers = () => {
      for (let i = 0; i < spawnBoost + 1; i++) {
        const vx = -.4
        const size = g.round(g.random(10, 50))
        const y = g.random(0 + size * 4, g.height - size * 2)
        const x = g.width + size * 6;
        barriers.push(loadBarriers(g, x, y, vx, size, state.rgbColor4, windowWidth))
      }
    }

    const spawnEnemy = () => {
      let radius = g.random(20, 30)
      enemies.push(new Enemy(state, radius, g, addDust, level, state.rgbColor5, state.rgbColor2, lasers, windowWidth))
    }

    const spawnPowerUp = (pos: any) => {
      powerUps.push(new LaserEnergy(g, pos, windowWidth, laserPowerUp))
    }

    const laserPowerUp = (points) => {
      state.score += points;
      laserOverHeat = false;
      state.laserCharge = 2000;
    }

    const checkDust = () => {
      while (state.dust.length > 30) {
        state.dust.shift();
      }
    }

    const checkDebris = () => {
      if (state.debris.length > 7) {
        state.debris.shift();
      }
    }

    const checkLaserCharge = () => {
      if (state.laserCharge < 0) {
        state.laserCharge = 0;
        laserOverHeat = true;
        setTimeout(function () {
          laserOverHeat = false;
        }, 2500);
      }
      if (state.laserCharge < 1270 && !laserOverHeat) {
        state.laserCharge += 5;
      }
    }

    const canPlayToggle = () => {
      canPlay = false;
    }

    const defeatBoss = (i) => {
      setTimeout(function () {
        level += 1;
        possibleBarriers += (8 + (3 * level));
        possibleBosses += 2;
        bosses.splice(i, 1);
      }, 8000)
    }

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
      canPlay = true;

      buttons = [];
      asteroids = [];
      lasers = [];
      enemies = [];
      bosses = [];
      state.debris = [];
      state.pointNumbers = [];
      powerUps = [];
      barriers = [];

      possibleBarriers = 10;
      possibleBosses = 1;
      state.laserCharge = 1270;


      windowWidth = g.windowWidth <= 1200 ? g.windowWidth : 1200;
      canvas = g.createCanvas(windowWidth * .98, g.windowHeight * .95);
      ctx = canvas.elt.getContext("2d");

      console.log("w:" + g.width + " h:" + g.height)

      // SET UP MOBILE BUTTONS
      buttons[0] = new MobileButton(g, 0, g.UP_ARROW, 38, 120, g.height - 120)
      buttons[1] = new MobileButton(g, g.PI, g.DOWN_ARROW, 40, 120, g.height - 50)
      buttons[2] = new MobileButton(g, 3 * g.PI / 2, g.LEFT_ARROW, 37, 50, g.height - 50)
      buttons[3] = new MobileButton(g, g.PI / 2, g.RIGHT_ARROW, 39, 190, g.height - 50)
      buttons[4] = new MobileButton(g, 0, " ".charCodeAt(0), 32, g.width - 100 * (windowWidth / 600), g.height - 50)

      // LOAD INITIAL ASSETS
      ship = new Ship(state, g, shieldTime, state.rgbColor2, state.rgbColor3, state.score, lasers, addDust, state.laserCharge, windowWidth, buttons, lives, gameReset);
      hud = new Hud(g, state.rgbColor1, state.rgbColor3, windowWidth);
      stars = loadStars(g);
      splash = new Splash();

      setTimeout(function () {
        input.registerAsListener(g.ENTER, function (char, code, press) {
          if (press) {
            if (splashScreen) {
              splashScreen = false;
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

      spawnBoss();
    }


    g.draw = () => {

      if (splashScreen) {
        g.background(0);
        splash.render(g, stars, windowWidth, ctx, logoPath, config);
        if (ship.beginGame) {
          splashScreen = false
        }
      } else {

        // CHECK FOR FX CREATING LAAAAG
        checkDust();
        checkDebris();
        checkLaserCharge();

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
        if (possibleEnemies > 0 && enemies.length < 1) {
          let ranNum = g.random(1000);
          if (ranNum <= 1) {
            spawnEnemy();
          }
        }

        // RANDOM ASTEROID SPAWN
        if (asteroids.length < 3) {
          let ranNum = g.random(650);
          if (ranNum <= 1) {
            spawnAsteroids();
            // console.log("spawn rock, total: "+asteroids.length)
          }
        }

        // RANDOM BARRIER SPAWN
        if (barriers.length < 5) {
          let ranNum = g.random(220);
          if (ranNum <= 1 && barriers.length < 6 && possibleBarriers > 0) {
            possibleBarriers -= 1;
            spawnBarriers();
            // console.log("squares left: "+possibleBarriers)
          }
        }

        //SPAWN BOSS
        if (possibleBarriers <= 0 && possibleBosses > 0) {
          possibleBosses -= 1;
          spawnBoss()
        }

        // _________UPDATES ___________

        // UPDATE ASTEROIDS AND CHECK FOR COLLISIONS 
        for (let i = 0; i < asteroids.length; i++) {
          if (asteroids[i].offscreen()) {
            asteroids.splice(i, 1);
            continue;
          }
          if (ship.hits(asteroids[i]) && canPlay) {
            canPlay = false;
            var dustVel = p5.Vector.add(ship.vel.mult(0.2), asteroids[i].vel);
            addDust(state, ship.pos, dustVel, 15, .005, state.rgbColor3, 3, g);
            ship.destroy();
            input.reset();
            roundLoss();
          }
          asteroids[i].update();
        }

        //UPDATES ALL LASERS AND CHECKS FOR ALL COLLISIONS
        for (var i = lasers.length - 1; i >= 0; i--) {
          // var exists = true;
          lasers[i].update();
          if (lasers[i].offscreen()) {
            lasers.splice(i, 1);
            continue;
          }
          laserCollision(state, g, lasers, i, asteroids, addDust, enemies, addDebris, barriers, ship, roundLoss, canPlayToggle, input, addToScore, windowWidth, spawnPowerUp, addPointNumbers, bosses, canPlay, state)
        }

        // UPDATE ENEMY AND CHECK FOR COLLISION BEWTWEEN SHIP
        for (var i = enemies.length - 1; i >= 0; i--) {
          if (ship.hits(enemies[i]) && canPlay) {
            canPlay = false;
            var dustVel = p5.Vector.add(ship.vel.mult(0.2), enemies[i].vel);
            addDust(state, ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
            ship.destroy();
            input.reset();
            roundLoss()
          }
          enemies[i].update();
        }

        // UPDATE AND CHECK FOR COLLISION WITH POWERUPS
        for (var i = powerUps.length - 1; i >= 0; i--) {
          powerUps[i].update();
          if (powerUps[i].offscreen()) {
            powerUps.splice(i, 1)
            continue;
          } else {
            if (ship.hits(powerUps[i]) && canPlay) {
              let color = [Math.round(g.random(50, 250)), Math.round(g.random(50, 250)), Math.round(g.random(50, 250))]
              let dustVel = p5.Vector.add(ship.vel.mult(0.5), powerUps[i].vel);
              addDust(state, ship.pos, dustVel, 7, .015, color, 5, g);
              if (g.frameCount - powerUpCounter < 100) {
                powerUps[i].powerUp(450)
                addPointNumbers(state, powerUps[i].pos, dustVel.mult(.25), 255, g, '650', 15)
              } else if (g.frameCount - powerUpCounter < 200) {
                addPointNumbers(state, powerUps[i].pos, dustVel.mult(.25), 255, g, '450', 15)
                powerUps[i].powerUp(650)
              } else {
                addPointNumbers(state, powerUps[i].pos, dustVel.mult(.25), 255, g, '250', 15)
                powerUps[i].powerUp(250)
              }
              powerUps.splice(i, 1)
              powerUpCounter = g.frameCount

            }
          }
        }

        // UPDATE AND DESTROY BARRIERS AND CHECK COLLISION
        for (let i = 0; i < barriers.length; i++) {
          for (let j = 0; j < barriers[i].length; j++) {
            barriers[i][j].update()
            if (ship.hits(barriers[i][j]) && canPlay) {
              canPlay = false;
              var dustVel = p5.Vector.add(ship.vel.mult(0.2), barriers[i][j].vel);
              addDust(state, ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
              ship.destroy();
              input.reset();
              roundLoss()
            }
            if (barriers[i][j].offscreen()) {
              barriers[i].splice(j, 1);
              continue
            }
          }
          if (barriers[i].length === 0) {
            barriers.splice(i, 1)
            continue;
          }
        }

        //UPDATE BOSS
        for (var i = bosses.length - 1; i >= 0; i--) {
          bosses[i].update(ship);
          if (bosses[i].hp <= 0 && possibleBosses === 0) {
            possibleBosses -= 1;
            let addScore = (1000 + (500 * level))
            addToScore(state, addScore)
            addPointNumbers(state, bosses[i].pos, bosses[i].vel.mult(.25), 255, g, state.score.toString(), 30)
            defeatBoss(i)
          }
          if (ship.hits(bosses[i].quad1) && canPlay || ship.hits(bosses[i].quad2) && canPlay || ship.hits(bosses[i].quad3) && canPlay || ship.hits(bosses[i].quad4) && canPlay) {
            canPlay = false;
            var dustVel = p5.Vector.add(ship.vel.mult(0.2), bosses[i].vel);
            addDust(state, ship.pos, dustVel, 15, .005, state.rgbColor3, 2.5, g);
            ship.destroy();
            input.reset();
            roundLoss()
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

        ship.update(state.laserCharge);

        // _________ALL RENDERS_________

        g.background(0);

        let fps = g.frameRate();
        g.fill(255);
        g.stroke(0);
        g.text("FPS: " + fps.toFixed(2), 10, g.height - 10);


        for (let i = 0; i < barriers.length; i++) {
          render(barriers[i])
        }
        render(stars)
        render(powerUps)
        render(asteroids)
        render(lasers)
        render(enemies)
        render(bosses)
        render(state.dust)
        render(state.debris)
        render(state.pointNumbers)
        ship.render();
        hud.render(lives, state.score, state.laserCharge, laserOverHeat, state);


        if (lives < 0 && !consoleTrigger) {
          console.log("Your final score was " + state.score)
          consoleTrigger = true
        }

        // RENDER MOBILE BUTTONS IF THE SCREEN IS AS SMALL AS AN IPAD 
        if (windowWidth <= 1024) {
          render(buttons)
        }

      }
    }
  };
  var canvas = new p5(game);
}