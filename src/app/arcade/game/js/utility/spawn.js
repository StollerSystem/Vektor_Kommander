import { state } from './state.js';
import { spawnBoss, spawnAsteroids, spawnBarriers, spawnEnemy } from './utility.js';

export const spawn = (g) => {
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
}