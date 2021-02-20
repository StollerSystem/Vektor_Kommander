import Ship from '../entity/ship.js'
import Hud from './hud.js'
import Splash from './splash.js'
import MobileButton from './buttons.js'
import loadStars from './load-stars.js'
import { input } from './input.js'

export const resetCanvas = (state, g, canvas) => {

  state.lives = 3;
  state.splashScreen = true;
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
  state.possibleBarriers = 10;
  state.possibleBosses = 1;
  state.laserCharge = 1270;
  state.fullReset = false;

  state.windowWidth = g.windowWidth <= 1200 ? g.windowWidth : 1200;
  canvas = g.createCanvas(state.windowWidth * .98, g.windowHeight * .95);
  state.ctx = canvas.elt.getContext("2d");

  console.log("w:" + g.width + " h:" + g.height)

  // SET UP MOBILE BUTTONS
  state.buttons[0] = new MobileButton(g, 0, g.UP_ARROW, 38, 120, g.height - 120)
  state.buttons[1] = new MobileButton(g, g.PI, g.DOWN_ARROW, 40, 120, g.height - 50)
  state.buttons[2] = new MobileButton(g, 3 * g.PI / 2, g.LEFT_ARROW, 37, 50, g.height - 50)
  state.buttons[3] = new MobileButton(g, g.PI / 2, g.RIGHT_ARROW, 39, 190, g.height - 50)
  state.buttons[4] = new MobileButton(g, 0, " ".charCodeAt(0), 32, g.width - 100 * (state.windowWidth / 600), g.height - 50)

  // LOAD INITIAL ASSETS
  state.ship = new Ship(state, g)
  state.hud = new Hud(g, state.rgbColor1, state.rgbColor3, state.windowWidth);
  state.stars = loadStars(g);
  state.splash = new Splash();

  setTimeout(function () {
    input.registerAsListener(g.ENTER, function (char, code, press) {
      if (press) {
        if (state.splashScreen) {
          state.splashScreen = false;
          state.beginGameSequence = g.frameCount;
        }
      }
    }, 100)
  });
}