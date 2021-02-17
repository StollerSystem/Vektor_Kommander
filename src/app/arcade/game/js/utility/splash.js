import Star from '../effects/star.js'

export default function Splash() {

  this.colorPicker = function(g, color) {
    const colorOutput = g.round(g.random(color - 20, color + 20))
    return colorOutput
  }

  this.render = function (g, stars, windowWidth, ctx, logoPath, config) {

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
      stars[i].render()
    }

    const configInput = config
    const centerX = g.width / 2;
    const centerY = g.height / 2;
    const w = windowWidth / 1800;
    const h = g.height / 900
    const windowSize = g.width / g.height
    const shadowColor = `rgba(${this.colorPicker(g, configInput.logo.color[0])},${this.colorPicker(g, configInput.logo.color[1])},${this.colorPicker(g, configInput.logo.color[2])},${.5})`

    //LOGO SHADOW
    g.push()
    g.translate((configInput.logo.x * w) - (g.random(4, 10) * w), (configInput.logo.y * h) + (g.random(4, 10)*w))
    g.fill(shadowColor)
    g.scale(configInput.logo.size * w, configInput.logo.size * w)
    ctx.fill(logoPath);
    g.strokeWeight(g.random(0, 1));
    ctx.stroke(logoPath);
    g.pop();

    //LOGO
    g.push()
    g.translate(configInput.logo.x * w, configInput.logo.y * h)
    g.fill(`rgba(${this.colorPicker(g, configInput.logo.color[0])},${this.colorPicker(g, configInput.logo.color[1])},${this.colorPicker(g, configInput.logo.color[2])},${1})`)
    g.scale(configInput.logo.size * w, configInput.logo.size * w)
    g.stroke(configInput.logo.color)
    ctx.fill(logoPath);
    g.strokeWeight(g.random(0, 1));
    ctx.stroke(logoPath);
    g.pop();

    //LOWER TEXT SHADOW
    g.push()
    g.strokeWeight(g.random(.1, 2 * w))
    g.stroke(`rgba(${this.colorPicker(g, configInput.detail.color[0])},${this.colorPicker(g, configInput.detail.color[1])},${this.colorPicker(g, configInput.detail.color[2])},${.5})`)
    g.textSize(35 * configInput.detail.size * w)
    g.textFont('Montserrat')
    g.text(configInput.detail.text, configInput.detail.x * w -1, configInput.detail.y * w + 1)
    g.pop()

    //LOWER TEXT
    g.push()
    g.fill(configInput.detail.color)
    g.strokeWeight(g.random(.5, 3 * w))
    g.stroke(configInput.detail.color)
    g.textSize(35 * configInput.detail.size * w)
    g.textFont('Montserrat')
    g.text(configInput.detail.text, configInput.detail.x * w, configInput.detail.y * w)
    g.pop()

    //TITLE SHADOW
    g.push()
    g.fill('rgba(255, 255, 255, .3)')
    g.strokeWeight(g.random(1, 5 * w))
    g.stroke('rgba(255, 255, 255, .3)')
    g.textAlign(g.CENTER)
    g.translate(g.random(-3, -5), g.random(2, 4))
    g.textSize(100 * w)
    g.textFont('Montserrat')
    g.text(configInput.title.text, centerX, centerY)
    g.pop()

    //TITLE
    g.push()
    g.fill(255)
    g.strokeWeight(g.random(.5, 3 * w))
    g.stroke(255)
    g.textAlign(g.CENTER)
    g.textSize(100 * w)
    g.textFont('Montserrat')
    g.text(configInput.title.text, centerX, centerY)
    g.pop()

    //PRESS ENTER
    g.push()
    g.fill(255)
    g.strokeWeight(g.random(.5, 3 * w))
    g.stroke(255)
    g.textAlign(g.CENTER)
    g.textSize(35 * w)
    g.textFont('Montserrat')
    g.text('PRESS <ENTER> TO START', centerX, centerY + (g.height/8))
    g.pop()

    // CONTROLS
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
    g.text('(HOLD) ⎵', centerX / 1.075, centerY / .600)
    g.textAlign(g.LEFT)
    g.text('FORWARD THRUST', centerX, centerY / .70)
    g.text('REVERSE THRUST', centerX, centerY / .675)
    g.text('ROTATIONAL THRUST', centerX, centerY / .65)
    g.text('FIRE LASER', centerX, centerY / .625)
    g.text('POWER SHOT', centerX, centerY / .600)
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