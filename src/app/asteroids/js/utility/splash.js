import Star from '../effects/star.js'

export default function Splash() {

  const colorArray = ['red', 'blue', 'green', 'yellow', 'red', 'orange', 'pink', 'purple', 'cyan']

  this.render = function (g, stars, windowWidth, ctx, logoPath, logo) {

    for (let i = 0; i < stars.length; i++) {
      stars[i].move(1.25)
      if (stars[i].x <= 0) {
        let windowX = g.width
        let randomY = g.random(0, g.height)
        let randomSize = g.random(0.1, 7)
        const newStar = new Star(windowX, randomY, randomSize, g);
        stars.push(newStar)
        stars.splice(i, 1)
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].show()
    }

    const centerX = g.width / 2;
    const centerY = g.height / 2;
    const w = windowWidth / 1800;
    const pathCenter = logo.center;

    g.push()
    g.stroke(255);
    g.line(g.width/2,0,g.width/2,g.height)
    g.pop();
  
    g.push()
    g.translate((g.width / 2) - pathCenter * w, g.height / 15)
    g.fill(logo.lowerTextColor)
    g.scale(w, w)
    g.stroke(logo.lowerTextColor)
    ctx.fill(logoPath);
    g.strokeWeight(g.random(.25, 4));
    ctx.stroke(logoPath);
    g.pop();

    g.push()
    g.fill(logo.lowerTextColor)
    g.strokeWeight(g.random(.5, 3 * w))
    g.stroke(logo.lowerTextColor)
    g.textAlign(g.CENTER)
    g.textSize(35 * w)
    g.textFont('Montserrat')
    g.text(logo.lowerText, centerX, centerY / 2)
    g.pop()

    g.push()
    g.fill(255)
    g.strokeWeight(g.random(.5, 3 * w))
    g.stroke(255)
    g.textAlign(g.CENTER)
    g.textSize(35 * w)
    g.textFont('Montserrat')
    g.text('PRESS <ENTER> TO START', centerX, centerY)
    g.pop()

    g.push()
    g.fill(255)
    g.strokeWeight(g.random(.5, 2 * w))
    g.stroke(255)
    g.textSize(20 * w)
    g.textFont('Montserrat')
    g.textAlign(g.RIGHT)
    g.text('⇧', centerX / 1.075, centerY / .70)
    g.text('⇩', centerX / 1.075, centerY / .675)
    g.text('⇦ ⇨', centerX / 1.075, centerY / .65)
    g.text('⎵', centerX / 1.075, centerY / .625)
    g.textAlign(g.LEFT)
    g.text('FORWARD THRUST', centerX, centerY / .70)
    g.text('REVERSE THRUST', centerX, centerY / .675)
    g.text('ROTATIONAL THRUST', centerX, centerY / .65)
    g.text('FIRE BLASTER', centerX, centerY / .625)
    g.pop()


    // THE SHIP
    const r = 20 * w

    g.push()
    g.stroke(255)
    g.fill(0)
    g.strokeWeight(g.random(.5, 2 * w))
    g.translate(centerX, centerY / .55)
    g.curve(
      -1, 20,
      0 - 10, -r / 3,
      r - 10, -r / 8,
      r * 2, 80 * w,
    )
    g.beginShape()
    g.vertex(-r - 10, r / 2)
    g.vertex(r * 2 - 10, r / 2)
    g.vertex(r * 2.5 - 10, 0)
    g.vertex(-10, -r / 3)
    g.vertex(-r - 10, -r)
    g.endShape(g.CLOSE)
    g.triangle(-r - 10, r,
      -r - 10, r / 4,
      r / 2 - 10, r / 4);

    g.pop()
  }

}