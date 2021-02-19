import * as p5 from 'p5';
import PointNumber from '../effects/point-numbers.js';
import Dust from '../effects/dust.js'
import Debris from '../effects/debris.js'

function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

export function lineIntersect(l1v1, l1v2, l2v1, l2v2, g) {
  var base = p5.Vector.sub(l1v1, l2v1);
  var l1_vector = p5.Vector.sub(l1v2, l1v1);
  var l2_vector = p5.Vector.sub(l2v2, l2v1);
  var direction_cross = cross(l2_vector, l1_vector);
  var t = cross(base, l1_vector) / direction_cross;
  var u = cross(base, l2_vector) / direction_cross;
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return true;
  } else {
    return false;
  }
}

export const addToScore = (state, add) => {
  state.score += add;
}

export const addPointNumbers = (state, pos, vel , color , g, text, size) => {  
  state.pointNumbers.push(new PointNumber(pos, vel, color, g, text, size))
}

export const addDust = (state, pos, vel, n, trans, color, weight, g) => {
  for (var i = 0; i < n; i++) {
    state.dust.push(new Dust(pos, vel, trans, color, weight, g, state.rgbColor1, state.rgbColor2, state.rgbColor3));
  }
}

export const addDebris = (state, pos, vel, n, r, g, rgbColor4) => {
  state.debris.push(new Debris(pos, vel, n, r, g, rgbColor4));
}

export const reduceLaserCharge = (state) => {
  if (state.laserCharge > 0) {
    state.laserCharge -= 100;
    return true;
  }
}