import * as p5 from 'p5';

function cross(v1, v2) {
  return v1.x * v2.y - v2.x * v1.y;
}

export function lineIntersect(l1v1, l1v2, l2v1, l2v2, g) {
  // console.log("line int")
  // let game = g;
  // // console.log(l1v1, l2v1)
  // game.push()
  // game.stroke(255)
  // game.strokeWeight(4)
  // game.fill(0)
  // game.line(l1v1,l1v2)
  // game.line(l2v1,l2v2)
  // game.ellipse(game.width/2,game.height/2, 50, 50)
  // game.pop()  

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