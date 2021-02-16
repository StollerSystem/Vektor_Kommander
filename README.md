<br>
<p align="center">
  <u><big>||&emsp;<b><u>Vektor Commander</u></b>&emsp;||</big></u>
</p>
<p align="center">
    <!-- Project Avatar/Logo -->
    <br>
    <a href="https://github.com/Murphynd">
        <img src="https://media.giphy.com/media/IKVSBHEn3essvA9qXR/giphy.gif">
    </a>
    <p align="center">
      ___________________________
    </p>
    <!-- GitHub Link -->
    <p align="center">
        <a href="https://github.com/stollersystem">
            <strong>Ben Stoller</strong> &
        </a>
        <a href="https://github.com/granteadie">
            <strong>Grant Eadie</strong>
        </a>
    </p>
    <!-- Project Shields -->
    <p align="center">
        <a href="https://github.com/murphynd/TapRoom/issues">
            <img src="https://img.shields.io/github/issues/LondresRi/README-Assistance?style=plastic">
        </a>
        <a href="https://opensource.org/licenses/MIT">
            <img src="https://img.shields.io/github/license/LondresRi/README-Assistance?color=orange&style=plastic">
        </a>
    </p>    
</p>

---

# **80's style, side scrolling space simulator**

##### Built With

- p5.js

- Angular


##### Features

- 60 fps with low framedropping
- Maximum display ratio of 1200px
- Splash page with customizable SVG logo and text
- Mobile Compatibility
- Cross-browser Compatibility
- Organized file structure


---

#  Setup and Use

- Clone down from github: 
  
  `git clone {this repo link}`

- In the root directory, install the Angular package: 

  `npm install`

- Build the Angular app: 

  `ng build`

- Launch server: 

  `npm start`

---
# File Structure

**All the game code is held in the ASTEROIDS directory**

### `asteroids.component.ts` What is held in the most important file? 
- Contains the **declared variables** that will persist through the game (ie. ship, barriers, stars, enemies, etc.)
- Initializes the game with **pre-load, setup, and draw** functions 
- Creates a **canvas**
- Injects **p5** into almost all the js files

### `js folder` What's up with all the file names in this thing?
- `entity` for structures that have the ability to interact with one another. Also contains the most important class - **entity.js**
- `effects` for features that do not interact with the materials
- `powerups` for shapes that have no interaction except the ship
- `utility` for text, colors, inputs, and detections

---
# Specifics 

*asteroids.component.ts*
---

The `config` import takes a JSON package and uses it to define variables in the game. These include *colors, title, logo, and details* provided by the user.

The `p5` import injects the p5 library for use by the Angular component:
```
import * as config from "../../assets/config.json"
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
```
Begins the build of the game in the angular app:
```
ngOnInit(): void {

// This function contains all the game information. 

}
``` 
These are the **game state variables**. They will hold the information, objects, and classes that will persist through the game without being reinitialized by the draw (which calls functions 60 times per second):
```
var ctx: any;
var windowWidth: any;
var ship: any;
var hud: any;
var buttons: any = [];
var asteroids: any = [];
var lasers: any = [];
var enemies: any = [];
var bosses: any = [];
var debris: any = [];
...
```


These are the **global functions** that are used by the game when a *game state variable* needs to change:
```
const addPointNumbers = function () {
}

const addDust = function () {
}

const addDebris = function () {
}

const reduceLaserCharge = function () {
}  

...
```
Resets all the variables to a starting value and instantiates all classes. This is called at the start of the game and after a GAME OVER: 
```
const resetCanvas = function () {
  ...
      }
```
Loads the colors from the given JSON. If the colors are not available, it will assign random colors: 

```
g.preload = () => {
  ...       
      }
```
`NOTE: "g." is a call to the p5 library. "g." is an object that contains various HTML5 Canvas functions and variables`

Called once before the *draw function*, allowing for initial values and classes to be instantiated at load:
```
g.setup = () => {
  ...
      }
```

Every function or class that is called in this function is done so 60 times per second. Position, render, array push and splice, and randomization is held here:

```
g.draw = () => {
  ...
}
```
---
*js/entity*
---
The file names are pretty self explanatory, so we'll go over two key files: `entity.js` and `ship.js`.

### `entity.js` holds the physics for every object in the game.

These attributes are applied to *all* entities (ie. ship, barrier, etc.) in order to consistently alter velocity and rotation:
```
...
this.pos = g.createVector(x, y);
this.r = radius;
this.rmax = radius;
this.heading = 0;
this.rotation = 0;
this.vel = g.createVector(0, 0);
...
```
Applied to entites 60 times per second, allowing for increases and decreases in velocity, position, and force:
```
Entity.prototype.update = function() {
  ...
}
```
### `ship.js` holds the functions that allow for keyboard control. 

Handles the last key that was lifted:
```
g.keyReleased = () => {
    input.handleEvent(g.key, g.keyCode, false);
  }

```
Handles the last key that was pressed: 
```
g.keyPressed = () => {
    input.handleEvent(g.key, g.keyCode, true);
  }
```
Handles the last mouse pressed and it's position: 
```
g.mousePressed = () => {
    
  }
```
Handles the last mouse lift:
```
g.mouseReleased = () => {
    
  }

```
These functions handle the velocity changes and laser shots when certain keys are pressed and subsequently released: 
```
input.registerAsListener({argument}, function (char, code, press) {
  ...
  });
```

Detects the verticies passing through/in the verticies of another entity: 
```
this.hits = function ({entity being hit}) {
  ...
}
```

Creates the lines that are drawn to create the ship on canvas:

`Note: this function is called 60 times per second in asteroid.component.ts`

```
this.render = function () {
  g.push()
    ...
  g.pop()
}
```


---

### Resources

| Author                                |                                                    Link                                                    |
| ------------------------------------- | :--------------------------------------------------------------------------------------------------------: |
| The Coding Train                         | [Asteroids with p5.js](https://www.youtube.com/watch?v=hacZU523FyM) |
| p5.js|                 [Getting Started](https://p5js.org/)                  |

---

### ✉️ Contact and Support

## If you have any feedback or concerns, please contact one of the contributors.

### ⚖️ License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Copyright (C) 2020 Ben Stoller & Grant Eadie. All Rights Reserved.

```
MIT License

Copyright (c) 2020 Ben Stoller & Grant Eadie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.