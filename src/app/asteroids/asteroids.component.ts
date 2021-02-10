import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/entity/ship.js';
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
import hyperDrive from './js/effects/hyper-drive.js'
import laserCollision from './js/utility/laser-collision.js';
import randomColors from './js/utility/random-colors.js';
import MobileButton from './js/utility/buttons.js'
import logo1 from './img/apple-logo.js'
import LaserEnergy from './js/powerups/laser-energy.js'

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css']
})
export class AsteroidsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // let cnvs: any;
    let ctx: any;
    var windowWidth: any;
    var ship: any;
    var hud: any;
    var buttons: any = [];
    var asteroids: any = [];
    var lasers: any = [];
    var enemies: any = [];
    var debris: any = [];
    var powerUps: any = [];
    var possibleEnemies: any = 1;
    var dust: any = [];
    var canPlay: any = true;
    var shieldTime: any = 180;
    var rgbColor1: any;
    var rgbColor2: any;
    var rgbColor3: any;
    var rgbColor4: any;
    var rgbColor5: any;
    var pts: any;
    var title: any = false;
    var stageClear: any = false;
    var score: any = 0;
    var lives: any = 3;
    var level: any = 0;
    let stars: any = [];
    let barriers: any = [];
    let barrierSensor: any = [];
    let splash: any;
    var laserCharge = 1270;
    var laserOverHeat = false;
    let splashScreen: boolean = true;
    let beginGameSequence: number = 0;
    let logoPath = new Path2D(logo1.path)

    // var laserSoundEffects: any = []; 
    // var explosionSoundEffects: any = [];
    // var rocketSoundEffects: any = [];
    // var stageSoundEffect: any;
    // var mainFont: any;

    const addDust = function (pos: any, vel: any, n: any, trans: any, color: any, weight: any, g: any) {
      for (var i = 0; i < n; i++) {
        dust.push(new Dust(pos, vel, trans, color, weight, g, rgbColor1, rgbColor2, rgbColor3));
      }
    }

    const addDebris = function (pos: any, vel: any, n: any, r: any, g: any, rgbColor4: any) {
      debris.push(new Debris(pos, vel, n, r, g, rgbColor4));
    }

    const reduceLaserCharge = function () {
      if (laserCharge > 0) {
        laserCharge -= 100;
        return true
      }
    }

    const roundLoss = function (g: any) {
      let game = g;
      setTimeout(function () {
        lives--;
        if (lives >= 0) {
          ship = new Ship(game, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust, reduceLaserCharge, laserCharge, windowWidth, buttons);
          canPlay = true;
        }
      }, 3000);
    }

    const game = (g: any) => {

      const spawnAsteroids = function () {
        for (var i = 0; i < level + 1; i++) {
          asteroids.push(new Asteroid(null, null, 3, g, rgbColor1, windowWidth));
        }
      }

      const spawnBarriers = function () {
        for (let i = 0; i < level + 1; i++) {
          const vx = -.4
          const size = g.round(g.random(10, 50))
          const y = g.random(0 + size * 4, g.height - size * 4)
          const x = g.width + size * 6;

          barrierSensor.push()
          barriers.push(loadBarriers(g, x, y, vx, size, rgbColor4, windowWidth))
        }
      }

      const spawnEnemy = function () {
        var radius = g.random(20, 30)
        enemies.push(new Enemy(radius, g, addDust, level, rgbColor5, rgbColor2, lasers, windowWidth))
      }

      const spawnPowerUp = function(pos: any) {
        powerUps.push(new LaserEnergy(g,pos,windowWidth))
      }

      const addToScore = function (add) {
        score += add;
      }

      const checkDust = function () {
        while (dust.length > 40) {
          dust.shift();
        }
      }

      const checkDebris = function () {
        if (debris.length > 8) {
          debris.shift();
        }
      }

      const checkLaserCharge = function () {
        if (laserCharge < 0) {
          laserCharge = 0;
          laserOverHeat = true;
          setTimeout(function () {
            laserOverHeat = false;
            laserCharge = 1;
          }, 2500);
        }
        if (laserCharge < 1270 && !laserOverHeat) {
          laserCharge += 5;
        }
      }

      g.preload = () => {

        let random_Colors = randomColors(g);
        rgbColor1 = random_Colors[0]
        rgbColor2 = random_Colors[1]
        rgbColor3 = random_Colors[2]
        rgbColor4 = random_Colors[3]
        rgbColor5 = random_Colors[4]
        console.log(rgbColor1)
        console.log(rgbColor2)
        console.log(rgbColor3)
        console.log(rgbColor4)
        console.log(rgbColor5)
      }

      g.setup = () => {

        windowWidth = g.windowWidth;        
        g.frameRate(60)
        canvas = g.createCanvas(windowWidth * .98, windowWidth / 2);
        ctx = canvas.elt.getContext("2d");

        console.log("w:" + g.width + " h:" + g.height)

        buttons[0] = new MobileButton(g, 0, g.UP_ARROW, 38, 120, g.height-120)
        buttons[1] = new MobileButton(g, g.PI, g.DOWN_ARROW, 40, 120, g.height-50)
        buttons[2] = new MobileButton(g, 3 * g.PI / 2, g.LEFT_ARROW, 37, 50, g.height-50)
        buttons[3] = new MobileButton(g, g.PI / 2, g.RIGHT_ARROW, 39, 190, g.height-50)
        buttons[4] = new MobileButton(g, 0, " ".charCodeAt(0), 32, g.width - 100, g.height-50)


        ship = new Ship(g, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust, reduceLaserCharge, laserCharge, windowWidth, buttons);
        hud = new Hud(g, rgbColor1, rgbColor3, pts, windowWidth);
        stars = loadStars(g);
        splash = new Splash();
        // g.textFont(myFont);
        // g.text('hello', 10, 50)
        // pts = mainFont.textToPoints('ASTRO-BLASTER', 0, 0, 200, {
        //   sampleFactor: 0.25,
        //   simplifyThreshold: 0
        // });
        // spawnAsteroids();
        // var button = g.createButton('⇧');
        // button.position(g.width-50, g.height-50);
        // button.mousePressed(console.log("BUTTON"));

      }

      // g.mousePressed = () => {
      //   // console.log("mouse click!");
      //   for (var i = 0; i < buttons.length; i++) {
      //     buttons[i].clicked()
      //   }
      // }

      let easeInStars = 1.25

      g.draw = () => {

        if (splashScreen) {
          g.keyReleased = () => {
            input.handleEvent(g.key, g.keyCode, false);
          }

          g.keyPressed = () => {
            input.handleEvent(g.key, g.keyCode, true);
          }
          input.registerAsListener(g.ENTER, function (char, code, press) {
            splashScreen = false;
            beginGameSequence = g.frameCount;
          });
          g.background(0);
          splash.render(g, stars, windowWidth, ctx, logoPath, logo1);

        } else {

          // CHECK FOR FX CREATING LAAAAG
          checkDust();
          checkDebris();
          checkLaserCharge();
          // console.log(laserCharge)
          // console.log("DUST: "+dust.length)
          // console.log("DEBRIS: "+debris.length)

          // STARS
          if (g.frameCount - beginGameSequence < 175) {
            hyperDrive(g, stars, easeInStars, beginGameSequence)
            // for (let i = 0; i < stars.length; i++) {
            //   if (g.frameCount-beginGameSequence < 100) {
            //   easeInStars = easeInStars/Math.pow(1.000008, g.frameCount-beginGameSequence)
            //   } 
            //   else {
            //   easeInStars += (g.frameCount-beginGameSequence)/1000000
            //     if (easeInStars >= 1.25) {
            //       easeInStars = 1.25
            //     }
            //   }
            //   stars[i].move(easeInStars)
            //   if (stars[i].x <= 0) {
            //     let windowX = g.width
            //     let randomY = g.random(0, g.height)
            //     let randomSize = g.random(.1, 25)
            //     const newStar = new Star(windowX, randomY, randomSize, g);
            //     stars.push(newStar)
            //     stars.splice(i, 1)
            //   }
            // }

          } else {
            for (let i = 0; i < stars.length; i++) {
              stars[i].move(1.25)
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
          if (!title && !stageClear && possibleEnemies > 0 && enemies.length < 1) {
            let ranNum = g.random(1000);
            if (ranNum <= 1) {
              spawnEnemy();
            }
          }

          // RANDOM ASTEROID SPAWN
          if (!title && !stageClear && possibleEnemies > 0 && enemies.length < 1) {
            let ranNum = g.random(750);
            if (ranNum <= 1) {
              spawnAsteroids();
            }
          }

          // RANDOM BARRIER SPAWN
          if (!title && !stageClear && possibleEnemies > 0 && enemies.length < 1) {
            let ranNum = g.random(300);
            if (ranNum <= 1 && barriers.length < 8) {
              spawnBarriers();
            }
          }

          // UPDATE ASTEROIDS AND CHECK FOR COLLISIONS 
          for (var i = 0; i < asteroids.length; i++) {
            if (asteroids[i].offscreen()) {
              asteroids.splice(i, 1);
              continue;
            }
            if (ship.hits(asteroids[i]) && canPlay) {
              canPlay = false;
              var dustVel = p5.Vector.add(ship.vel.mult(0.2), asteroids[i].vel);
              addDust(ship.pos, dustVel, 15, .005, rgbColor3, 3, g);
              ship.destroy();
              input.reset();
              // sounds - need to stop rocket sounds here
              // ship.playSoundEffect(explosionSoundEffects);
              // rocketSoundEffects[0].stop();
              // rocketSoundEffects[1].stop();            
              roundLoss(g);
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
            laserCollision(g, lasers, i, asteroids, addDust, rgbColor1, rgbColor2, rgbColor3, rgbColor4, rgbColor5, enemies, addDebris, barriers, ship, roundLoss, canPlay, input, addToScore, windowWidth, spawnPowerUp)
          }

          // CHECK FOR COLLISION BEWTWEEN SHIP + ENEMY 
          for (var i = enemies.length - 1; i >= 0; i--) {
            if (ship.hits(enemies[i]) && canPlay) {
              canPlay = false;
              var dustVel = p5.Vector.add(ship.vel.mult(0.2), enemies[i].vel);
              addDust(ship.pos, dustVel, 15, .005, rgbColor3, 2.5, g);
              ship.destroy();
              input.reset();
              // ship.playSoundEffect(explosionSoundEffects);
              // rocketSoundEffects[0].stop();
              // rocketSoundEffects[1].stop();
              roundLoss(g)
            }
            enemies[i].update();
          }

          // UPDATE AND DESTROY BARRIERS
          for (let i = 0; i < barriers.length; i++) {
            for (let j = 0; j < barriers[i].length; j++) {
              barriers[i][j].update()
              if (ship.hits(barriers[i][j]) && canPlay) {
                canPlay = false;
                var dustVel = p5.Vector.add(ship.vel.mult(0.2), barriers[i][j].vel);
                addDust(ship.pos, dustVel, 15, .005, rgbColor3, 2.5, g);
                ship.destroy();
                input.reset();
                // ship.playSoundEffect(explosionSoundEffects);
                // rocketSoundEffects[0].stop();
                // rocketSoundEffects[1].stop();
                roundLoss(g)
              }
              if (barriers[i][j].offscreen()) {
                barriers[i].splice(j, 1);
              }
            }
            if (barriers[i].length === 0) {
              barriers.splice(i, 1)
            }
          }

          // UPDATE AND DESTROY DUST
          for (var i = dust.length - 1; i >= 0; i--) {
            dust[i].update();
            if (dust[i].transparency <= 0) {
              dust.splice(i, 1);
            }
          }

          // UPDATE AND DESTROY DEBRIS
          for (var i = debris.length - 1; i >= 0; i--) {
            debris[i].update();
            if (debris[i].destroyFrames <= 0) {
              debris.splice(i, 1);
            }
          }

          // UPDATE AND DESTROY POWERUPS
          for (var i = powerUps.length - 1; i >= 0; i--) {
            powerUps[i].update();            
          }

          ship.update();

          // ALL RENDERS...
          g.background(0);

          for (let i = 0; i < barriers.length; i++) {
            for (let j = 0; j < barriers[i].length; j++) {
              barriers[i][j].render()
            }
          }
          for (let i = 0; i < stars.length; i++) {
            stars[i].show()
          }
          for (var i = 0; i < asteroids.length; i++) {
            asteroids[i].render();
          }
          for (var i = lasers.length - 1; i >= 0; i--) {
            lasers[i].render();
          }
          for (var i = dust.length - 1; i >= 0; i--) {
            dust[i].render();
          }
          for (var i = debris.length - 1; i >= 0; i--) {
            debris[i].render();
          }
          for (var i = enemies.length - 1; i >= 0; i--) {
            enemies[i].render();
          }
          for (var i = powerUps.length - 1; i >= 0; i--) {
            powerUps[i].render();
          }

          // RENDER MOBILE BUTTONS IF THE SCREEN IS AS SMALL AS AN IPAD 
          if (windowWidth <= 1024) {
            for (var i = buttons.length - 1; i >= 0; i--) {
              buttons[i].render();
            }
          }

          ship.render();
          hud.render(stageClear, level, lives, score, laserCharge, laserOverHeat);
        }
      }
    };
    let canvas = new p5(game);
  };
};