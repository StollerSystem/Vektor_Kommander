import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import Ship from './js/ship.js';
import Asteroid from './js/asteroid.js';
import Enemy from './js/enemy.js'
import { input } from './js/input.js';
import Dust from './js/dust.js';
import Hud from './js/hud.js';
import Debris from './js/debris.js';
import Star from './js/star.js';
import loadStars from './js/load-stars.js'
import loadBarriers from './js/load-barriers.js'
// import { addDust } from './js/utility.js'
// import DigitalFont from '../../assets/digital.tff';

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
    var laserSoundEffects: any = [];
    var explosionSoundEffects: any = [];
    var rocketSoundEffects: any = [];
    var stageSoundEffect: any;
    var dust: any = [];
    var canPlay: any = true;
    var shieldTime: any = 180;
    var rgbColor1: any;
    var rgbColor2: any;
    var rgbColor3: any;
    var rgbColor4: any;
    // var boostStabilizer: any = 1;
    var mainFont: any;
    var pts: any;
    var title: any = false;
    var stageClear: any = false;
    var score: any = 0;
    var lives: any = 3;
    const points: any = [200, 100, 50, 25];
    var level: any = 0;
    let stars: any = [];
    let barriers: any = [];

    const addDust = function (pos: any, vel: any, n: any, trans: any, color: any, weight: any, g: any) {
      for (var i = 0; i < n; i++) {
        dust.push(new Dust(pos, vel, trans, color, weight, g, rgbColor1, rgbColor2, rgbColor3));
      }
    }

    const addDebris = function (pos: any, vel: any, n: any, r: any, g: any, rgbColor4: any) {
      debris.push(new Debris(pos, vel, n, r, g, rgbColor4));
      // console.log(debris)
    }

    const roundLoss = function (g: any) {
      let game = g;
      setTimeout(function () {
        lives--;
        if (lives >= 0) {
          ship = new Ship(game, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust);
          canPlay = true;
        }
      }, 3000);
    }

    // src\app\asteroids\digital.ttf

    const game = (g: any) => {

      g.preload = () => {
        // mainFont = g.loadFont(DigitalFont)
        // for (var i = 0; i < 3; i++) {
        //   laserSoundEffects[i] = g.loadSound('audio/laser-' + i + '.wav');
        // }
        // for (var i = 0; i < 3; i++) {
        //   explosionSoundEffects[i] = g.loadSound('audio/explosion-' + i + '.mp3');
        // }
        // for (var i = 0; i < 2; i++) {
        //   rocketSoundEffects[i] = g.loadSound('audio/rocket-' + i + '.wav');
        // }
        // stageSoundEffect = g.loadSound('audio/stage-complete.wav')

        // RANDOMIZE COLORS
        let ran1 = Math.round(g.random(1, 3))
        let c1a = ran1 === 1 ? 0 : 255;
        let c1b = ran1 === 2 ? 0 : 255;
        let c1c = ran1 === 3 ? 0 : 255;
        rgbColor1 = [Math.round(g.random(0, c1a)), Math.round(g.random(0, c1b)), Math.round(g.random(0, c1c))]
        let c2a = ran1 === 3 ? 0 : 255;
        let c2b = ran1 === 1 ? 0 : 255;
        let c2c = ran1 === 2 ? 0 : 255;
        rgbColor2 = [Math.round(g.random(0, c2a)), Math.round(g.random(0, c2b)), Math.round(g.random(0, c2c))]
        let c3a = ran1 === 2 ? 0 : 255;
        let c3b = ran1 === 3 ? 0 : 255;
        let c3c = ran1 === 1 ? 0 : 255;
        rgbColor3 = [Math.round(g.random(0, c3a)), Math.round(g.random(0, c3b)), Math.round(g.random(0, c3c))]
        rgbColor4 = [Math.round(g.random(0, 255)), Math.round(g.random(0, 255)), Math.round(g.random(0, 255))]
        console.log(rgbColor1)
        console.log(rgbColor2)
        console.log(rgbColor3)
        console.log(rgbColor4)
      }

      g.setup = () => {
        g.createCanvas(g.windowWidth * .9, g.windowHeight * .9);
        ship = new Ship(g, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust);
        hud = new Hud(g, rgbColor1, rgbColor3, pts);
        stars = loadStars(g)

        // for (let i = 0; i < 4; i++) {
        //   const x = g.random(0, g.width)
        //   const y = g.random(0, g.height)
        //   const vx = g.random(-2, -5)
        //   const size = g.round(g.random(50, 100))

        //   barriers[i] = loadBarriers(g, x, y, vx, size)
        // }

        // pts = mainFont.textToPoints('ASTRO-BLASTER', 0, 0, 200, {
        //   sampleFactor: 0.25,
        //   simplifyThreshold: 0
        // });
        spawnAsteroids();
      }

      g.draw = () => {

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
            // possibleEnemies--;
          }
        }

        // RANDOM ASTEROID SPAWN
        if (!title && !stageClear && possibleEnemies > 0 && enemies.length < 1) {
          let ranNum = g.random(750);
          if (ranNum <= 1) {
            spawnAsteroids();
          }
        }

        if (!title && !stageClear && possibleEnemies > 0 && enemies.length < 1) {
          let ranNum = g.random(200);
          if (ranNum <= 1) {
            spawnBarriers();
          }
        }


        // UPDATE ASTEROIDS AND CHECK FOR COLLISIONS 
        for (var i = 0; i < asteroids.length; i++) {

          if (asteroids[i].offscreen()) {
            // destroy asteroids that go off screen.
            asteroids.splice(i, 1);
            continue;
          }

          if (ship.hits(asteroids[i]) && canPlay) {
            canPlay = false;
            var dustVel = p5.Vector.add(ship.vel.mult(0.2), asteroids[i].vel);
            addDust(ship.pos, dustVel, 15, .005, 3, 3, g);
            ship.destroy();
            input.reset();
            // sounds - need to stop rocket sounds here
            // ship.playSoundEffect(explosionSoundEffects);
            // rocketSoundEffects[0].stop();
            // rocketSoundEffects[1].stop();
            // setTimeout(function () {
            //   lives--;
            //   if (lives >= 0) {
            //     ship = new Ship(g, shieldTime, rgbColor2, rgbColor3, title, score, lasers, addDust);
            //     canPlay = true;
            //   }
            // }, 3000);
            roundLoss(g);
          }
          asteroids[i].update();
        }

        //UPDATES ALL LASERS AND CHECKS FOR ALL COLLISIONS
        for (var i = lasers.length - 1; i >= 0; i--) {
          var exists = true;
          lasers[i].update();
          if (lasers[i].offscreen()) {
            // destroy lasers that go off screen.
            lasers.splice(i, 1);
            continue;
          }
          // LASER HITS ASTEROIDS
          for (var j = asteroids.length - 1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
              exists = false;
              // Handle laser contact with asteroids - handles graphics and sounds -
              // including asteroids that result from being hit.
              // asteroids[j].playSoundEffect(explosionSoundEffects);
              if (!lasers[i].enemy) {
                score += points[asteroids[j].size];
              }
              var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), asteroids[j].vel);
              var dustNum = (asteroids[j].size * 2 + 1) * 3;
              addDust(asteroids[j].pos, dustVel, dustNum, .005, 1, 2.5, g);
              // The new smaller asteroids broken lasers are added to the same list
              // of asteroids, so they can be referenced the same way as their full
              // asteroid counterparts.
              var newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
              // Laser and previous asteroid are removed as per the rules of the game.
              asteroids.splice(j, 1);
              lasers.splice(i, 1);
              if (asteroids.length == 0) {
                // Next level
                stageClear = true;
                setTimeout(function () {
                  level++;
                  possibleEnemies += level;
                  stageClear = false;
                  spawnAsteroids();
                  ship.shields = shieldTime;
                }, 4000)
              }
              break;
            }
          }
          // check enemies + laser collision
          if (exists) {
            for (var k = enemies.length - 1; k >= 0; k--) {
              if (lasers[i].hits(enemies[k]) && !lasers[i].enemy) {
                exists = false;
                score += 500;
                // enemies[k].destroy();
                let dustVel = p5.Vector.add(lasers[i].vel.mult(0.5), enemies[k].vel);
                addDust(enemies[k].pos, dustVel, 10, .01, 2, 3, g);
                addDebris(enemies[k].pos, enemies[k].vel, 10, 30, g, rgbColor4);
                addDust
                enemies.splice(j, 1);
                lasers.splice(i, 1);
                break;
              }
            }
          }
          // check barrier + laser collision 
          if (exists) {
            for (var k = barriers.length - 1; k >= 0; k--) {
              for (var j = barriers[k].length - 1; j >= 0; j--) {
                if (exists && lasers[i].hits(barriers[k][j])) {
                  exists = false;
                  // score += 500;
                  // enemies[k].destroy();
                  let dustVel = p5.Vector.add(lasers[i].vel.mult(0.5), barriers[k][j].vel);
                  addDust(barriers[k][j].pos, dustVel, 10, .01, 2, 3, g);
                  // addDebris(enemies[k].pos, enemies[k].vel, 10, 30, g, rgbColor4);
                  
                  barriers[k].splice(j, 1);
                  lasers.splice(i, 1);
                  break; 
                }
                
              }



            }
          }
          // check player + laser collision     
          if (exists) {
            // console.log(lasers[i].hits(ship))
            if (lasers[i].hits(ship) && lasers[i].enemy && canPlay) {
              canPlay = false;
              var dustVel = p5.Vector.add(ship.vel.mult(0.2), lasers[i].vel.mult(.2));
              lasers.splice(i, 1);
              addDust(ship.pos, dustVel, 15, .005, 3, 2.5, g);
              ship.destroy();
              input.reset();
              // sounds - need to stop rocket sounds here
              // ship.playSoundEffect(explosionSoundEffects);
              // rocketSoundEffects[0].stop();
              // rocketSoundEffects[1].stop();              
              roundLoss(g);
            }
          }
        }

        // CHECK FOR COLLISION BEWTWEEN SHIP + ENEMY 
        for (var i = enemies.length - 1; i >= 0; i--) {
          if (ship.hits(enemies[i]) && canPlay) {
            canPlay = false;
            var dustVel = p5.Vector.add(ship.vel.mult(0.2), enemies[i].vel);
            addDust(ship.pos, dustVel, 15, .005, 3, 2.5, g);
            ship.destroy();
            input.reset();
            // sounds - need to stop rocket sounds here
            // ship.playSoundEffect(explosionSoundEffects);
            // rocketSoundEffects[0].stop();
            // rocketSoundEffects[1].stop();
            roundLoss(g)
          }
          enemies[i].update();
        }

        ship.update();
        // UPDATE AND DESTROY BARRIERS
        for (let i = 0; i < barriers.length; i++) {
          for (let j = 0; j < barriers[i].length; j++) {
            barriers[i][j].update()
            if (barriers[i][j].offscreen()) {
              barriers[i].splice(j,1)
            }
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

        // RENDERS
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
        hud.render(stageClear, level, lives, score, title);
      }

      const spawnAsteroids = function () {
        for (var i = 0; i < level + 1; i++) {
          asteroids.push(new Asteroid(null, null, 3, g, rgbColor1));
        }
      }

      const spawnBarriers = function() {
        for (let i = 0; i < level + 1; i++) {
          const x = g.width
          const y = g.random(0, g.height)
          const vx = g.random(-.1, -3)
          const size = g.round(g.random(10, 50))

          barriers.push(loadBarriers(g, x, y, vx, size))
        }
      }

      const spawnEnemy = function() {
        var radius = g.random(20, 30)
        enemies.push(new Enemy(radius, g, addDust, level, rgbColor4, rgbColor2, lasers))
      }

    };

    let canvas = new p5(game);
  };
};