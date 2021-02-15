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

**All the game code is held in the ASTEROIDS folder**

## Initialization and State file

### `asteroids.component.ts` What is held in the most important file? 
- Contains the **declared variables** that will persist through the game (ie. ship, barriers, stars, enemies, etc.)
- Initializes the game with **pre-load, setup, and draw** functions 
- Creates a **canvas**
- Injects **p5** into almost all the js files

### `js folder` What's up with all the file names in this thing?
- `entity` for structures that have the ability to interact with one another. Also contains the most important class - **entity.js**
- `effects` for features that do no interact with the materials
- `powerups` for shapes that have no interaction except the ship
- `utility` for text, colors, and collision detection




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