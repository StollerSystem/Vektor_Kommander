import * as p5 from 'p5';

export default function Dust(pos, vel, trans, color, weight, g, rgbColor1, rgbColor2, rgbColor3 ) {
  this.pos = pos.copy();
  this.vel = vel.copy();
  this.vel.add(p5.Vector.random2D().mult(g.random(0.5, 1.5)));
  this.transparency = 1
  this.color = color ? color : 1;
  this.weight = weight ? weight : 2;

  this.update = function () {
    this.pos.add(this.vel);
    this.trans = trans ? trans : .005;
    this.transparency -= this.trans;
  }

  this.render = function () {
    if (this.transparency > 0) {
      g.push();
      // if (this.color === "main") {
      //   stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},${this.transparency})`);
      // } else {
      //   stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${this.transparency})`);
      // }
      switch (color) {
        case 1:
          g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},${this.transparency})`);
          break;
        case 2:
          g.stroke(`rgba(${rgbColor2[0]},${rgbColor2[1]},${rgbColor2[2]},${this.transparency})`);
          break;
        case 3:
          g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},${this.transparency})`);
          break;
        default:
          g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},${this.transparency})`);
          break;
      }
      g.strokeWeight(g.random(1, this.weight));
      g.point(this.pos.x, this.pos.y);
      g.pop();
    }
  }
}

// export function addDust(pos, vel, n, trans, color, weight, g) {
//   for (var i = 0; i < n; i++) {
//     dust.push(new Dust(pos, vel, trans, color, weight, g));
//   }
// }
