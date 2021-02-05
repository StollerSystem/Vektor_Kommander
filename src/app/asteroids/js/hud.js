export default function Hud(g, rgbColor1, rgbColor3, pts) {
  var size = 20;
  var padding = 10;
  var lifeWidth = 20;

  // digitMaps is used to create line representations of digits 0 through 9,
  // the diagram below indicates the mapping of the digitMaps array index to
  // its visual line.
  /*
   --0--
   1   2
   --3--
   4   5
   --6--
  */
  var digitMaps = [
    // Return a digit map
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

  this.render = function (stageClear, level, lives, score, title) {
    // var scoreString = "" + score;
    // var x = (g.width - (scoreString.length * (size + padding))) / 2;
    // var digitPos = g.createVector(x, padding);
    // for (var i = 0; i < scoreString.length; i++) {
    //   var dmap = digitMaps[scoreString.charAt(i)];
    //   drawDigit(dmap, i, digitPos);
    //   digitPos.x += size + padding;
    // }

    drawLives(lives);

    if (lives < 0) {
      g.push();
      g.textSize(150);
      // g.textFont(mainFont)
      g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
      g.strokeWeight(g.random(1,1.5))
      g.fill(0);
      g.text("GAME OVER!", (g.width / 2) - 300, g.height / 2);
      g.pop();
    }

    if (title) {
      g.push();
      g.textSize(25);
      // g.textFont(mainFont)
      g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
      g.strokeWeight(g.random(1,1.5))
      g.fill(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
      g.text("'UP_ARROW: FORWARD THRUST' - 'LEFT/RIGHT_ARROW: ROTATIONAL THRUST' - 'SPACE_BAR: BLASTER'", (g.width / 2 -410) , g.height / 3 +50);
      g.pop();

      g.push();
      g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
      g.strokeWeight(g.random(1,1.5))
      g.translate((g.width / 2) - 575, g.height / 3);      
      g.noFill();
      let rotX = g.sin(g.frameCount / 20) * 10;
      let rotY = g.cos(g.frameCount / 20) * 10;
      //draw the 3d lines
      // for (let i = 0; i < pts.length; i++) {
      //   g.line(pts[i].x, pts[i].y, pts[i].x - rotX, pts[i].y - rotY);
      // }
      // g.textFont(mainFont);
      g.textSize(200);
      g.text('ASTRO-BLASTER', 0, 0);
      g.fill(0);
      // g.text('ASTRO-BLASTER', -rotX, -rotY);
      g.pop();
    }

    if (stageClear) {
      
      // if (!stageSoundEffect.isPlaying() && !soundPlayed) {        
      //   stageSoundEffect.play();
      // }

      g.push();
      g.textSize(100);
      // g.textFont(mainFont)
      g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
      g.strokeWeight(g.random(2,3))
      g.fill(0);
      g.text(`STAGE ${level+1} CLEAR!`, (g.width / 2) - 250, g.height / 3);
      g.pop();
    }
  }

  function drawLives(lives) {
    // g.push();
    // g.stroke(`rgba(${rgbColor3[0]},${rgbColor3[1]},${rgbColor3[2]},1)`);
    // g.strokeWeight(g.random(1,1.5))
    // g.fill(0);
    // var top = g.createVector((g.width / 2) + lifeWidth * 2, padding * 2 + size * 2);
    // for (var i = 0; i < lives; i++) {
    //   g.triangle(top.x, top.y,
    //     top.x - lifeWidth / 2, top.y + 25,
    //     top.x + lifeWidth / 2, top.y + 25);
    //   top.x -= 20 + padding;
    // }
    // g.pop();
  }

  //draws the digit based on the digit map
  function drawDigit(digitMap, index, pos) {
    g.push();
    g.stroke(`rgba(${rgbColor1[0]},${rgbColor1[1]},${rgbColor1[2]},1)`);
    g.strokeWeight(g.random(1,1.5))
    for (var i = 0; i < digitMap.length; i++) {
      if (digitMap[i] === true)
        drawLine(i, pos);
    }
    g.pop();
  }

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
