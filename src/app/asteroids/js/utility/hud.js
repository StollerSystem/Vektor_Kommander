// import MobileButton from './buttons'

export default function Hud(g, rgbColor1, rgbColor3, pts, windowWidth) {
  var windowWidth = windowWidth;
  var size = 30 * (windowWidth / 1800);
  var padding = 10 * (windowWidth / 1800);
  var r = 9 * (windowWidth / 1800);

  // var button1 = new MobileButton(g)

  var digitMaps = [
    [true, true, true, false, true, true, true], //0
    [false, false, true, false, false, true, false], //1
    [true, false, true, true, true, false, true], //2
    [true, false, true, true, false, true, true], //3
    [false, true, true, true, false, true, false], //4
    [true, true, false, true, false, true, true], //5
    [true, true, false, true, true, true, true], //6
    [true, false, true, false, false, true, false], //7
    [true, true, true, true, true, true, true], //8
    [true, true, true, true, false, true, true] //9

  ];

  this.render = function (stageClear, level, lives, score, laserCharge, laserOverHeat) {
    var scoreString = "" + score;
    var x = 75 * (windowWidth / 1800) - (scoreString.length * (size + padding) / 3);
    // var x = 100 
    var digitPos = g.createVector(x, padding);
    for (var i = 0; i < scoreString.length; i++) {
      var dmap = digitMaps[scoreString.charAt(i)];
      drawDigit(dmap, i, digitPos);
      digitPos.x += size + padding;
    }

    drawLives(lives);
    drawLaserCharge(laserCharge, laserOverHeat);
    // button1.render();

    if (lives < 0) {
      g.push();
      g.textFont('Montserrat')
      g.textAlign(g.CENTER)
      g.textSize(150 * (windowWidth / 1800));
      g.fill(255)
      // g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
      g.stroke(255)
      g.strokeWeight(g.random(1, 3))
      g.text("GAME OVER", (g.width / 2), g.height / 2);
      g.pop();
    }

    // if (stageClear) {      
    //   // if (!stageSoundEffect.isPlaying() && !soundPlayed) {        
    //   //   stageSoundEffect.play();
    //   // }
    //   g.push();
    //   g.textSize(100);
    //   // g.textFont(mainFont)
    //   g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
    //   g.strokeWeight(g.random(2,3))
    //   g.fill(0);
    //   g.text(`STAGE ${level+1} CLEAR!`, (g.width / 2) - 250, g.height / 3);
    //   g.pop();
    // }
  }

  function drawLives(lives) {
    g.push();
    g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
    g.strokeWeight(g.random(1, 1.5))
    g.fill(0);
    g.translate(g.width - 150 * (windowWidth / 1800), 20 * (windowWidth / 1800))
    for (var i = 0; i < lives; i++) {
      g.translate(38 * (windowWidth / 1800), 0)
      g.curve(
        -1, 20,
        0 - 10, -r / 3,
        r - 10, -r / 8,
        r * 2, 30 * (windowWidth / 1800),
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
    }
    g.pop();
  }

  function drawLaserCharge(laserCharge, laserOverHeat) {

    let w = windowWidth / 1800

    let borderColor = laserOverHeat ? 'rgba(255,0,0,.5)' : 'rgba(255,255,255,.5)';
    let barColor = `rgba(${-Math.round((laserCharge - 1270) / 5)},${Math.round(laserCharge / 5)},${40},.5)`

    g.push();
    // g.scale(.5)
    g.stroke(borderColor)
    g.noFill();
    g.strokeWeight(g.random(1, 2))
    g.rect(g.width / 2 - 126 * w, 20 * w, 254 * w, 15 * w)
    g.pop()

    g.push();
    g.stroke(borderColor)
    g.fill(barColor);
    g.strokeWeight(g.random(1, 2))
    g.rect(g.width / 2 - 126 * w, 20 * w, (laserCharge / 5) * w, 15 * w)
    // g.scale(w)
    g.pop()

    if (laserOverHeat) {
      g.push();
      g.textFont('Lexend Mega');
      g.textAlign(g.CENTER);
      g.textSize(15 * (windowWidth / 1800));
      g.stroke('rgba(255,0,0,.5)')
      g.strokeWeight(g.random(1, 4 * (windowWidth / 1800)))
      g.fill(255, 0, 0)
      g.text("OVER HEAT", (g.width / 2), 60 * (windowWidth / 1800));
      g.pop();
    }

  }
  

  //draws the digit based on the digit map
  function drawDigit(digitMap, index, pos) {
    g.push();
    g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
    g.strokeWeight(g.random(2.5 * (windowWidth / 1800), 3.5 * (windowWidth / 1800)))
    for (var i = 0; i < digitMap.length; i++) {
      if (digitMap[i] === true)
        drawLine(i, pos);
    }
    g.pop();
  }

  // function drawMobileButtons() {
  //   g.push();
  //   g.stroke(255)
  //   g.textSize(100)
  //   g.text('⇧', g.width -200, g.height - 100)
  //   g.pop();
  // }

  //draws a line based on the line map
  function drawLine(lineMap, pos) {
    switch (lineMap) {
      case 0:
        g.line(pos.x, pos.y, pos.x + size, pos.y);
        break;
      case 1:
        g.line(pos.x, pos.y, pos.x, pos.y + size);
        break;
      case 2:
        g.line(pos.x + size, pos.y, pos.x + size, pos.y + size);
        break;
      case 3:
        g.line(pos.x, pos.y + size, pos.x + size, pos.y + size);
        break;
      case 4:
        g.line(pos.x, pos.y + size, pos.x, pos.y + 2 * size);
        break;
      case 5:
        g.line(pos.x + size, pos.y + size, pos.x + size, pos.y + 2 * size);
        break;
      case 6:
        g.line(pos.x, pos.y + size * 2, pos.x + size, pos.y + 2 * size);
        break;
      default:
        console.log("line map is invalid");
        break;
    }
  }
}