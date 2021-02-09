export default function Star(x, y, size, e) {
  this.x = x;
  this.y = y;
  this.size = size;

  this.show = function () {
    e.push();
    e.stroke(e.random(100, 255));
    e.strokeWeight(e.random(this.size/2, this.size));
    e.point(this.x, this.y);
    e.pop();
  };

  this.move = function (speed) {
    this.x -= this.size/speed
  };
}