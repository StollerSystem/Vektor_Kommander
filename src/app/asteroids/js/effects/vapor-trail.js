export default function VaporTrail(g, pos, color, shields, r, length, windowMod) {
  this.pos = pos
  this.shields = shields;
  this.tailSkip = false;
  this.len = length
  this.lastPos = new Array(this.len);
  this.r = r;

  for (var i = 0; i < this.lastPos.length; i++) {
    this.lastPos[i] = new Array(3);
    this.lastPos[i][0] = g.createVector(this.pos.x, this.pos.y);
    this.lastPos[i][1] = this.heading;
    this.lastPos[i][2] = 1;
  }

  this.update = function (pos, heading) {
    if (this.shields > 0) {
      this.shields -= 1;
    }
    this.tailSkip = !this.tailSkip;
    if (this.tailSkip === false) {

      for (var i = this.lastPos.length - 1; i > 0; i--) {
        this.lastPos[i][0] = this.lastPos[i - 1][0].sub(g.createVector(8, 0))
        this.lastPos[i][1] = this.lastPos[i - 1][1];
        this.lastPos[i][2] = this.lastPos[i - 1][2];
      }
      this.lastPos[0][0] = g.createVector(pos.x - (this.r + (10 * windowMod)) * g.cos(heading), pos.y - (this.r + (10 * windowMod)) * g.sin(heading));
      this.lastPos[0][1] = heading;
    }
  }

  this.render = function () {
    for (var i = this.lastPos.length - 2; i >= 0; i--) {
      g.push();
      if (this.shields < 170) {
        g.stroke(`rgba(${color[0]},${color[1]},${color[2]},${this.lastPos[i][2] / g.random(4, 6)})`)
      } else {
        g.stroke(255);
      }
      g.fill(`rgba(${color[0]},${color[1]},${color[2]},${this.lastPos[i][2] / g.random(4, 6)})`);
      g.beginShape();

      g.vertex(this.lastPos[i][0].x + g.sin(this.lastPos[i][1]) * -1 * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r, this.lastPos[i][0].y - g.cos(this.lastPos[i][1]) * -1 * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r);

      g.vertex(this.lastPos[i + 1][0].x + g.sin(this.lastPos[i + 1][1]) * -1 * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r, this.lastPos[i + 1][0].y - g.cos(this.lastPos[i + 1][1]) * -1 * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r);

      g.vertex(this.lastPos[i + 1][0].x + g.sin(this.lastPos[i + 1][1]) * (+1) * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r, this.lastPos[i + 1][0].y - g.cos(this.lastPos[i + 1][1]) * (+1) * ((this.lastPos.length - (i + 1) / 1.05) / this.lastPos.length) * this.r);

      g.vertex(this.lastPos[i][0].x + g.sin(this.lastPos[i][1]) * (+1) * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r, this.lastPos[i][0].y - g.cos(this.lastPos[i][1]) * (+1) * ((this.lastPos.length - i / 1.05) / this.lastPos.length) * this.r);

      g.endShape(g.CLOSE);
      g.pop();
    }
  }
}