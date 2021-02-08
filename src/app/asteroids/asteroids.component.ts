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
import LaserCollision from './js/utility/laser-collision.js';

@Component({
  selector: 'app-asteroids',
  templateUrl: './asteroids.component.html',
  styleUrls: ['./asteroids.component.css']
})
export class AsteroidsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var ship: any;
    var hud: any
    var asteroids: any = [];
    var lasers: any = [];
    var enemies = [];
    var debris = [];
    var possibleEnemies = 1;
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
    // const points: any = [200, 100, 50, 25];
    var level: any = 0;
    let stars: any = [];
    let barriers: any = [];
    let splash: any;
    var laserCharge = 1000;
    let splashScreen: boolean = true;
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
      if (laserCharge >100) {
        laserCharge -= 100;
        return true
      }
    }

    const roundLoss = function (g: any) {
      let game = g;
      setTimeout(function () {
        lives--;
        if (lives >= 0) {
          ship = new Ship(game, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust, reduceLaserCharge, laserCharge);
          canPlay = true;
        }
      }, 3000);
    }

    const game = (g: any) => {

      const spawnAsteroids = function () {
        for (var i = 0; i < level + 1; i++) {
          asteroids.push(new Asteroid(null, null, 3, g, rgbColor1));
        }
      }

      const spawnBarriers = function () {
        for (let i = 0; i < level + 1; i++) {
          const vx = -.4
          const size = g.round(g.random(10, 50))
          const y = g.random(0 + size * 4, g.height - size * 4)
          const x = g.width + size * 4;

          barriers.push(loadBarriers(g, x, y, vx, size, rgbColor4))
        }
      }

      const spawnEnemy = function () {
        var radius = g.random(20, 30)
        enemies.push(new Enemy(radius, g, addDust, level, rgbColor5, rgbColor2, lasers))
      }

      const addToScore = function (add) {
        score += add;
      }

      const checkDust = function () {
        while (dust.length > 40) {
          // console.log("too much dust!")
          dust.shift()
        }
      }

      const checkDebris = function () {
        if (debris.length > 8) {
          // console.log("too much debris!")
          debris.shift()
        }
      }

      const checkLaserCharge = function () {
        if (laserCharge < 1000) {
          laserCharge += 5;
        }
      }

     

      g.preload = () => {



        // RANDOMIZE COLORS
        let ran1 = Math.round(g.random(1, 3))
        let c1x = ran1 === 3 ? 255 : 0;
        let c1y = ran1 === 1 ? 255 : 0;
        let c1z = ran1 === 2 ? 255 : 0;
        let c1a = ran1 === 1 ? 0 : 240;
        let c1b = ran1 === 2 ? 0 : 240;
        let c1c = ran1 === 3 ? 0 : 240;
        rgbColor1 = [Math.round(g.random(c1x, c1a)), Math.round(g.random(c1y, c1b)), Math.round(g.random(c1z, c1c))]
        let c2x = ran1 === 2 ? 255 : 0;
        let c2y = ran1 === 3 ? 255 : 0;
        let c2z = ran1 === 1 ? 255 : 0;
        let c2a = ran1 === 3 ? 0 : 255;
        let c2b = ran1 === 1 ? 0 : 255;
        let c2c = ran1 === 2 ? 0 : 255;
        rgbColor2 = [Math.round(g.random(c2x, c2a)), Math.round(g.random(c2y, c2b)), Math.round(g.random(c2z, c2c))]
        let c3x = ran1 === 1 ? 255 : 0;
        let c3y = ran1 === 2 ? 255 : 0;
        let c3z = ran1 === 3 ? 255 : 0;
        let c3a = ran1 === 2 ? 0 : 255;
        let c3b = ran1 === 3 ? 0 : 255;
        let c3c = ran1 === 1 ? 0 : 255;
        rgbColor3 = [Math.round(g.random(c3x, c3a)), Math.round(g.random(c3y, c3b)), Math.round(g.random(c3z, c3c))]
        let c4x = ran1 === 2 ? 255 : 0;
        let c4y = ran1 === 1 ? 255 : 0;
        let c4z = ran1 === 3 ? 255 : 0;
        let c4a = ran1 === 1 ? 0 : 255;
        let c4b = ran1 === 3 ? 0 : 255;
        let c4c = ran1 === 2 ? 0 : 255;
        rgbColor4 = [Math.round(g.random(c4x, c4a)), Math.round(g.random(c4y, c4b)), Math.round(g.random(c4z, c4c))]
        let c5a = ran1 === 1 ? 0 : 255;
        let c5b = ran1 === 3 ? 0 : 255;
        let c5c = ran1 === 2 ? 0 : 255;
        rgbColor5 = [Math.round(g.random(0, c5a)), Math.round(g.random(0, c5b)), Math.round(g.random(0, c5c))]
        // COLOR SCHEME #1
        // rgbColor1 = [116, 238, 21]
        // rgbColor2 = [255, 0, 0]
        // rgbColor3 = [77, 238, 234]
        // rgbColor4 = [240, 0, 255]
        // rgbColor5 = [240, 0, 255]

        console.log(rgbColor1)
        console.log(rgbColor2)
        console.log(rgbColor3)
        console.log(rgbColor4)
      }

      g.setup = () => {
        g.frameRate(50)
        g.createCanvas(g.windowWidth * .9, g.windowHeight * .9);
        ship = new Ship(g, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust, reduceLaserCharge, laserCharge);
        hud = new Hud(g, rgbColor1, rgbColor3, pts);
        stars = loadStars(g);
        splash = new Splash();
        // g.textFont(myFont);
        // g.text('hello', 10, 50)
        // pts = mainFont.textToPoints('ASTRO-BLASTER', 0, 0, 200, {
        //   sampleFactor: 0.25,
        //   simplifyThreshold: 0
        // });
        spawnAsteroids();
      }

      g.draw = () => {

        if (!splashScreen) {
          g.background(0);
          splash.render(g);
        } else {
      
        // CHECK FOR FX CREATING LAAAAG
        checkDust();
        checkDebris();
        checkLaserCharge();
        // console.log(laserCharge)
        // console.log("DUST: "+dust.length)
        // console.log("DEBRIS: "+debris.length)

        // STARS
        for (let i = 0; i < stars.length; i++) {
          stars[i].move()
          if (stars[i].x <= 0) {
            let windowX = g.width
            let randomY = g.random(0, g.height)
            let randomSize = g.random(0.1, 7)
            const newStar = new Star(windowX, randomY, randomSize, g);
            stars.push(newStar)
            stars.splice(i, 1)
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
          let ranNum = g.random(350);
          if (ranNum <= 1 && barriers.length < 5) {
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
          LaserCollision(g, lasers, i, asteroids, addDust, rgbColor1, rgbColor2, rgbColor3, rgbColor4, rgbColor5, enemies, addDebris, barriers, ship, roundLoss, canPlay, input, addToScore)          
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


        ship.render();
        hud.render(stageClear, level, lives, score, laserCharge);
      }
    }
    };
    let canvas = new p5(game);
  };
};