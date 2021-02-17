export default function Thruster(g, color, v1x, v1y, v2x, v2y, v3x, v3y) {
  g.push()
  var trans = g.random(.9, .2)
  g.stroke(`rgba(${color[0]},${color[2]},${color[1]},${trans})`);
  g.fill(`rgba(${color[0]},${color[2]},${color[1]},${trans})`);
  g.strokeWeight(g.random(1,4))
  g.translate(0, 0);  
  g.triangle(
    v1x, v1y,
    v2x, v2y,
    v3x, v3y);
   g.pop()
}