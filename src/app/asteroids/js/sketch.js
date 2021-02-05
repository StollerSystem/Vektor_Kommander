// var ship;
// var hud;
// var asteroids = [];
// var lasers = [];
// var laserSoundEffects = [];
// var explosionSoundEffects = [];
// var rocketSoundEffects = [];
// var stageSoundEffect;
// var dust = [];
// var canPlay = true;
// var shieldTime = 180;
// var rgbColor1;
// var rgbColor2;
// var rgbColor3;
// var boostStabilizer = 1; // anything below one will slow ship down after boosting 
// var mainFont;
// var pts;
// var title = true;
// var stageClear = false;
// var score = 0;
// var lives = 3;
// const points = [200, 100, 50, 25];
// var level = 0;

// function preload() {

//   mainFont = loadFont('digital.ttf')
//   // randomize colors
//   rgbColor1 = [Math.round(random(0,255)), Math.round(random(0,255)), Math.round(random(0,255))]
//   rgbColor2 = [Math.round(random(0,255)), Math.round(random(0,255)), Math.round(random(0,255))]
//   rgbColor3 = [Math.round(random(0,255)), Math.round(random(0,255)), Math.round(random(0,255))]
//   console.log(rgbColor1)
//   console.log(rgbColor2)
//   console.log(rgbColor3)
  

//   // Laser and Explosion Sound Effects are loaded here as opposed to the laser
//   // or asteroid files because the asteroid destruction logic is here and it
//   // also reduces redundancy of each asteroid or laser containing sound data.
//   for (var i = 0; i < 3; i++) {
//     laserSoundEffects[i] = loadSound('audio/laser-' + i + '.wav');
//   }
//   for (var i = 0; i < 3; i++) {
//     explosionSoundEffects[i] = loadSound('audio/explosion-' + i + '.mp3');
//   }
//   for (var i = 0; i < 2; i++) {
//     rocketSoundEffects[i] = loadSound('audio/rocket-' + i + '.wav');
//   }
//   stageSoundEffect = loadSound('audio/stage-complete.wav')
// }

// function setup() {  

//   createCanvas(windowWidth, windowHeight);
//   ship = new Ship();
//   hud = new Hud();
//   spawnAsteroids();

//   pts = mainFont.textToPoints('ASTRO-BLASTER', 0, 0, 200, {
//     sampleFactor: 0.25,
//     simplifyThreshold: 0
//   });
// }

// function draw() {
//   // Handles the round loss, destruction of ship and round restart when the
//   // ship contacts an asteroid.
//   for (var i = 0; i < asteroids.length; i++) {
//     if (ship.hits(asteroids[i]) && canPlay) {
//       canPlay = false;
//       var dustVel = p5.Vector.add(ship.vel.mult(0.2), asteroids[i].vel);
//       addDust(ship.pos, dustVel, 15, .005, 3);
//       ship.destroy();
//       input.reset();
//       // sounds - need to stop rocket sounds here
//       ship.playSoundEffect(explosionSoundEffects);
//       rocketSoundEffects[0].stop();
//       rocketSoundEffects[1].stop();
//       setTimeout(function () {
//         lives--;
//         if (lives >= 0) {
//           ship = new Ship();
//           canPlay = true;
//         }
//       }, 3000);
//     }
//     asteroids[i].update();
//   }

//   // Update the lasers' positions
//   for (var i = lasers.length - 1; i >= 0; i--) {
//     lasers[i].update();
//     if (lasers[i].offscreen()) {
//       // Destroy lasers that go off screen.
//       lasers.splice(i, 1);
//       continue;
//     }

//     for (var j = asteroids.length - 1; j >= 0; j--) {
//       if (lasers[i].hits(asteroids[j])) {
//         // Handle laser contact with asteroids - handles graphics and sounds -
//         // including asteroids that result from being hit.
//         asteroids[j].playSoundEffect(explosionSoundEffects);
//         score += points[asteroids[j].size];
//         var dustVel = p5.Vector.add(lasers[i].vel.mult(0.2), asteroids[j].vel);
//         var dustNum = (asteroids[j].size * 2 + 1) * 7;
//         addDust(asteroids[j].pos, dustVel, dustNum);
//         // The new smaller asteroids broken lasers are added to the same list
//         // of asteroids, so they can be referenced the same way as their full
//         // asteroid counterparts.
//         var newAsteroids = asteroids[j].breakup();
//         asteroids = asteroids.concat(newAsteroids);
//         // Laser and previous asteroid are removed as per the rules of the game.
//         asteroids.splice(j, 1);
//         lasers.splice(i, 1);
//         if (asteroids.length == 0) {
//           // Next level
//           stageClear = true
//           setTimeout(function () {
//             level++;
//             stageClear = false;
//             spawnAsteroids();
//             ship.shields = shieldTime;
//           }, 4000)
//         }
//         break;
//       }
//     }
//   }

//   ship.update();

//   // DESTROY DUST
//   for (var i = dust.length - 1; i >= 0; i--) {
//     dust[i].update();
//     if (dust[i].transparency <= 0) {
//       dust.splice(i, 1);
//     }
//   }

//   // Render
//   background(0);
//   for (var i = 0; i < asteroids.length; i++) {
//     asteroids[i].render();
//   }
//   for (var i = lasers.length - 1; i >= 0; i--) {
//     lasers[i].render();
//   }
//   for (var i = dust.length - 1; i >= 0; i--) {
//     dust[i].render();
//   }
//   ship.render();
//   hud.render();
// }

// function spawnAsteroids() {
//   for (var i = 0; i < level + 1; i++) {
//     asteroids.push(new Asteroid(null, null, 3));
//   }
// }

// function cross(v1, v2) {
//   return v1.x * v2.y - v2.x * v1.y;
// }

// function lineIntersect(l1v1, l1v2, l2v1, l2v2) {
//   var base = p5.Vector.sub(l1v1, l2v1);
//   var l1_vector = p5.Vector.sub(l1v2, l1v1);
//   var l2_vector = p5.Vector.sub(l2v2, l2v1);
//   var direction_cross = cross(l2_vector, l1_vector);
//   var t = cross(base, l1_vector) / direction_cross;
//   var u = cross(base, l2_vector) / direction_cross;
//   if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
//     return true;
//   } else {
//     return false;
//   }
// }