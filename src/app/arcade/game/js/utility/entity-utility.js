import Dust from '../effects/dust.js'

export const addDust = (state, pos, vel, n, trans, color, weight, g) => {
  for (var i = 0; i < n; i++) {
    state.dust.push(new Dust(pos, vel, trans, color, weight, g, state.rgbColor1, state.rgbColor2, state.rgbColor3));
  }
}

export const reduceLaserCharge = (state) => {
  if (state.laserCharge > 0) {
    state.laserCharge -= 100;
    return true;
  }
}