import Ship from '../entity/ship.js'  

export const spawnShip = (state, g) => {
  state.ship = new Ship(state, g)
}