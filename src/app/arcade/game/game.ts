import * as p5 from 'p5';
import { input } from './js/utility/input.js';
import Star from './js/effects/star.js';
import randomColors from './js/utility/random-colors.js';
import { render } from './js/utility/render.js';
import { state } from './js/utility/state.js';
import { resetCanvas } from './js/utility/reset.js';
import { spawn } from './js/utility/spawn.js'
import { update } from './js/utility/update.js'
import {  checkDust, checkDebris, checkLaserCharge, hyperDriveIntro } from './js/utility/utility.js';


export const callGame = (eventInput) => {

  var config: any = eventInput.default
  var logoPath = new Path2D(config.logo.path);

  const game = (g: any) => {
   
    g.preload = () => {
      let random_Colors = randomColors(g);
      state.rgbColor1 = config.gameColors.rocks ? config.gameColors.rocks : random_Colors[0]; // ROCKS/SCORE
      state.rgbColor2 = random_Colors[1] // LASERS / THRUSTERS
      state.rgbColor3 = config.gameColors.ship ? config.gameColors.ship : random_Colors[2]; // SHIP
      state.rgbColor4 = config.gameColors.squares ? config.gameColors.squares : random_Colors[3]; // SQUARES
      state.rgbColor5 = config.gameColors.enemy ? config.gameColors.enemy : random_Colors[4]; // ENEMY        
    }
    
    g.setup = () => {
      g.frameRate(60)      
      resetCanvas(state, g)
      g.keyReleased = () => {
        input.handleEvent(g.key, g.keyCode, false);
      }
      g.keyPressed = () => {
        input.handleEvent(g.key, g.keyCode, true);
      }      
    }

    g.draw = () => {

      if (state.fullReset) {
        state.fullReset = false;
        resetCanvas(state, g, canvas)
      }

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

        spawn(g);     
        
        update(g);        

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