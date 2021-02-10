export default function MobileButton(g, char, key, code, x, y) {

  this.x = g.width - x
  this.y = g.height - y
  this.r = 50;
  this.character = char
  this.key = key
  this.keyCode = code

  this.clicked = function () {
    // console.log(g.mouseX,g.mouseY)
    var d = g.dist(g.mouseX, g.mouseY, this.x, this.y);
    // console.log(d)
    if (d < this.r) {
      console.log("YOU CLICKED " + this.character)
      return [this.key, this.keyCode];
    } else {
      return false
    }
  }

  this.render = function () {
    g.push();
    g.stroke(255)
    g.textSize(100)
    g.text(this.character, this.x, this.y)
    g.pop();
  }
}