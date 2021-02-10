export default function MobileButton(g, rad, key, code, x, y) {
  this.x = x
  this.y = y
  this.r = 60;
  this.rad = rad
  this.key = key
  this.keyCode = code

  this.clicked = function () {
    var d = g.dist(g.mouseX, g.mouseY, this.x, this.y);    
    if (d < this.r/2) {      
      return [this.key, this.keyCode];
    } else {
      return false
    }
  }

  this.render = function () {
    g.push();
    g.translate(this.x,this.y)
    g.stroke('rgba(255,255,255,.3)')
    g.strokeWeight(1)
    g.fill('rgba(255,255,255,.05)')
    g.ellipse(0,0,this.r,this.r)
    if (this.keyCode != 32) {
      g.push();
      g.rotate(this.rad)
      g.stroke('rgba(255,255,255,.3)')
      g.strokeWeight(1.5)
      g.line(-this.r/4,this.r/6,0,-this.r/4)
      g.line(this.r/4,this.r/6,0,-this.r/4)
      g.pop();
    }
    g.stroke(255)    
    g.pop();
  }
}