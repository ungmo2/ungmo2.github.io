---
layout: post
title: Snippet - Shape
subtitle:
categories: snippet
section: snippet
---

* TOC
{:toc}

# 1. Shape

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <title>The Shapes of CSS</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    body {
      font: 14px/1.4 Monaco, MonoSpace;
      background: #666;
    }

    a {
      text-decoration: none;
      color: red;
    }

    a:hover,
    a:active {
      color: black;
    }

    style {
      display: block;
      /*white-space: pre;*/
      white-space: pre-wrap;
      background: #333;
      color: white;
      font: 12px Monaco;
      padding: 0 15px 15px;
      outline: none;
    }

    #page-wrap {
      width: 560px;
      margin: 80px auto;
      padding: 50px;
      background: #eee;
      -webkit-border-radius: 20px;
      -moz-border-radius: 20px;
      border-radius: 20px;
      -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.3);
    }

    h1 {
      font: bold italic 4em Georgia, Serif;
      margin: 0 0 20px 0;
    }

    h2 {
      font: bold italic 2em Georgia, Serif;
    }

    h1>span {
      color: red;
    }

    .shape {
      padding: 20px;
    }

    .shape>div {
      margin: 20px 0;
    }

    .shape>h2 {
      background: rgba(0, 0, 0, 0.15);
      padding: 10px;
      width: 640px;
      text-indent: 60px;
      margin: 50px 0 0 -70px;
      position: relative;
    }

    .shape>h2>a {
      position: absolute;
      right: 20px;
      bottom: 10px;
      font-size: 20px;
    }
  </style>
</head>
<body spellcheck="false">
<div id="page-wrap">
  <h1>The <span>Shapes</span> of CSS</h1>

  <div id="shapes">
    <div class="shape">
      <h2>Square</h2>
      <div id="square"></div>
<style contenteditable>
  #square {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Rectangle</h2>
      <div id="rectangle"></div>
<style contenteditable>
  #rectangle {
    width: 200px;
    height: 100px;
    background: red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Circle</h2>
      <div id="circle"></div>
<style contenteditable>
  #circle {
    width: 100px;
    height: 100px;
    background: red;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }
  /* Cleaner, but slightly less support: use "50%" as value */
</style>
    </div>

    <div class="shape">
      <h2>Oval</h2>
      <div id="oval"></div>
<style contenteditable>
  #oval {
    width: 200px;
    height: 100px;
    background: red;
    -moz-border-radius: 100px / 50px;
    -webkit-border-radius: 100px / 50px;
    border-radius: 100px / 50px;
  }
  /* Cleaner, but slightly less support: use "50%" as value */
</style>
    </div>

    <div class="shape">
      <h2>Triangle Up</h2>
      <div id="triangle-up"></div>
<style contenteditable>
  #triangle-up {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Down</h2>
      <div id="triangle-down"></div>
<style contenteditable>
  #triangle-down {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Left</h2>
      <div id="triangle-left"></div>
<style contenteditable>
  #triangle-left {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Right</h2>
      <div id="triangle-right"></div>
<style contenteditable>
  #triangle-right {
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-left: 100px solid red;
    border-bottom: 50px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Top Left</h2>
      <div id="triangle-topleft"></div>
<style contenteditable>
  #triangle-topleft {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-right: 100px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Top Right</h2>
      <div id="triangle-topright"></div>
<style contenteditable>
  #triangle-topright {
    width: 0;
    height: 0;
    border-top: 100px solid red;
    border-left: 100px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Bottom Left</h2>
      <div id="triangle-bottomleft"></div>
<style contenteditable>
  #triangle-bottomleft {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-right: 100px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Triangle Bottom Right</h2>
      <div id="triangle-bottomright"></div>
<style contenteditable>
  #triangle-bottomright {
    width: 0;
    height: 0;
    border-bottom: 100px solid red;
    border-left: 100px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Curved Tail Arrow <a href="http://about.me/fwd">via Ando Razafimandimby</a></h2>
      <div id="curvedarrow"></div>
<style contenteditable>
  #curvedarrow {
    position: relative;
    width: 0;
    height: 0;
    border-top: 9px solid transparent;
    border-right: 9px solid red;
    -webkit-transform: rotate(10deg);
    -moz-transform: rotate(10deg);
    -ms-transform: rotate(10deg);
    -o-transform: rotate(10deg);
  }

  #curvedarrow:after {
    content: "";
    position: absolute;
    border: 0 solid transparent;
    border-top: 3px solid red;
    border-radius: 20px 0 0 0;
    top: -12px;
    left: -9px;
    width: 12px;
    height: 12px;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>Trapezoid</h2>
      <div id="trapezoid"></div>
<style contenteditable>
  #trapezoid {
    border-bottom: 100px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    height: 0;
    width: 100px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Parallelogram</h2>
      <div id="parallelogram"></div>
<style contenteditable>
  #parallelogram {
    width: 150px;
    height: 100px;
    -webkit-transform: skew(20deg);
    -moz-transform: skew(20deg);
    -o-transform: skew(20deg);
    background: red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Star (6-points)</h2>
      <div id="star-six"></div>
<style contenteditable>
  #star-six {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
    position: relative;
  }

  #star-six:after {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 100px solid red;
    position: absolute;
    content: "";
    top: 30px;
    left: -50px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Star (5-points) <a href="http://kitmacallister.com/2011/css-only-5-point-star/">via Kit MacAllister</a></h2>
      <div id="star-five"></div>
<style contenteditable>
  #star-five {
    margin: 50px 0;
    position: relative;
    display: block;
    color: red;
    width: 0px;
    height: 0px;
    border-right: 100px solid transparent;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    -moz-transform: rotate(35deg);
    -webkit-transform: rotate(35deg);
    -ms-transform: rotate(35deg);
    -o-transform: rotate(35deg);
  }

  #star-five:before {
    border-bottom: 80px solid red;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    position: absolute;
    height: 0;
    width: 0;
    top: -45px;
    left: -65px;
    display: block;
    content: '';
    -webkit-transform: rotate(-35deg);
    -moz-transform: rotate(-35deg);
    -ms-transform: rotate(-35deg);
    -o-transform: rotate(-35deg);
  }

  #star-five:after {
    position: absolute;
    display: block;
    color: red;
    top: 3px;
    left: -105px;
    width: 0px;
    height: 0px;
    border-right: 100px solid transparent;
    border-bottom: 70px solid red;
    border-left: 100px solid transparent;
    -webkit-transform: rotate(-70deg);
    -moz-transform: rotate(-70deg);
    -ms-transform: rotate(-70deg);
    -o-transform: rotate(-70deg);
    content: '';
  }
</style>
    </div>

    <div class="shape">
      <h2>Pentagon</h2>
      <div id="pentagon"></div>
<style contenteditable>
  #pentagon {
    position: relative;
    width: 54px;
    border-width: 50px 18px 0;
    border-style: solid;
    border-color: red transparent;
  }

  #pentagon:before {
    content: "";
    position: absolute;
    height: 0;
    width: 0;
    top: -85px;
    left: -18px;
    border-width: 0 45px 35px;
    border-style: solid;
    border-color: transparent transparent red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Hexagon</h2>
      <div id="hexagon"></div>
<style contenteditable>
  #hexagon {
    width: 100px;
    height: 55px;
    background: red;
    position: relative;
  }

  #hexagon:before {
    content: "";
    position: absolute;
    top: -25px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 25px solid red;
  }

  #hexagon:after {
    content: "";
    position: absolute;
    bottom: -25px;
    left: 0;
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-top: 25px solid red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Octagon</h2>
      <div id="octagon"></div>
<style contenteditable>
  #octagon {
    width: 100px;
    height: 100px;
    background: red;
    position: relative;
  }

  #octagon:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 29px solid red;
    border-left: 29px solid #eee;
    border-right: 29px solid #eee;
    width: 42px;
    height: 0;
  }

  #octagon:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 29px solid red;
    border-left: 29px solid #eee;
    border-right: 29px solid #eee;
    width: 42px;
    height: 0;
  }
</style>
    </div>

    <div class="shape">
      <h2>Heart <a href="http://nicolasgallagher.com/">via Nicolas Gallagher</a></h2>
      <div id="heart"></div>
<style contenteditable>
  #heart {
    position: relative;
    width: 100px;
    height: 90px;
  }

  #heart:before,
  #heart:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: red;
    -moz-border-radius: 50px 50px 0 0;
    border-radius: 50px 50px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }

  #heart:after {
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
</style>
    </div>

    <div class="shape">
      <h2>Infinity <a href="http://nicolasgallagher.com/">via Nicolas Gallagher</a></h2>
      <div id="infinity"></div>
<style contenteditable>
  #infinity {
    position: relative;
    width: 212px;
    height: 100px;
  }

  #infinity:before,
  #infinity:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border: 20px solid red;
    -moz-border-radius: 50px 50px 0 50px;
    border-radius: 50px 50px 0 50px;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  #infinity:after {
    left: auto;
    right: 0;
    -moz-border-radius: 50px 50px 50px 0;
    border-radius: 50px 50px 50px 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>Diamond Square <a href="http://josephsilber.com">via Joseph Silber</a></h2>
      <div id="diamond"></div>
<style scoped contenteditable>
  #diamond {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom-color: red;
    position: relative;
    top: -50px;
  }

  #diamond:after {
    content: '';
    position: absolute;
    left: -50px;
    top: 50px;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top-color: red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Diamond Shield <a href="http://josephsilber.com">via Joseph Silber</a></h2>
      <div id="diamond-shield"></div>
<style scoped contenteditable>
  #diamond-shield {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 20px solid red;
    position: relative;
    top: -50px;
  }

  #diamond-shield:after {
    content: '';
    position: absolute;
    left: -50px;
    top: 20px;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 70px solid red;
  }
</style>
    </div>

    <div class="shape">
      <h2>Diamond Narrow <a href="http://josephsilber.com">via Joseph Silber</a></h2>
      <div id="diamond-narrow"></div>
<style scoped contenteditable>
  #diamond-narrow {
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom: 70px solid red;
    position: relative;
    top: -50px;
  }

  #diamond-narrow:after {
    content: '';
    position: absolute;
    left: -50px;
    top: 70px;
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-top: 70px solid red;
  }
      </style>
    </div>

    <div class="shape">
      <h2>Cut Diamond <a>via Alexander Futekov</a></h2>
      <div id="cut-diamond"></div>
<style scoped contenteditable>
  #cut-diamond {
    border-style: solid;
    border-color: transparent transparent red transparent;
    border-width: 0 25px 25px 25px;
    height: 0;
    width: 50px;
    position: relative;
    margin: 20px 0 50px 0;
  }

  #cut-diamond:after {
    content: "";
    position: absolute;
    top: 25px;
    left: -25px;
    width: 0;
    height: 0;
    border-style: solid;
    border-color: red transparent transparent transparent;
    border-width: 70px 50px 0 50px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Egg</h2>
      <div id="egg"></div>
<style scoped contenteditable>
  #egg {
    display: block;
    width: 126px;
    height: 180px;
    background-color: red;
    -webkit-border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  }
</style>
    </div>

    <div class="shape">
      <h2>Pac-Man</h2>
      <div id="pacman"></div>
<style scoped contenteditable>
  #pacman {
    width: 0px;
    height: 0px;
    border-right: 60px solid transparent;
    border-top: 60px solid red;
    border-left: 60px solid red;
    border-bottom: 60px solid red;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Talk Bubble</h2>
      <div id="talkbubble"></div>
<style scoped contenteditable>
  #talkbubble {
    width: 120px;
    height: 80px;
    background: red;
    position: relative;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
  }

  #talkbubble:before {
    content: "";
    position: absolute;
    right: 100%;
    top: 26px;
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-right: 26px solid red;
    border-bottom: 13px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>12 Point Burst <a href="http://commondream.net/post/8848553728/pure-css-badges">via Alan Johnson</a></h2>
      <div id="burst-12"></div>
<style scoped contenteditable>
  #burst-12 {
    background: red;
    width: 80px;
    height: 80px;
    position: relative;
    text-align: center;
  }

  #burst-12:before,
  #burst-12:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 80px;
    width: 80px;
    background: red;
  }

  #burst-12:before {
    -webkit-transform: rotate(30deg);
    -moz-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  #burst-12:after {
    -webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    -ms-transform: rotate(60deg);
    -o-transform: rotate(60deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>8 Point Burst <a href="http://commondream.net/post/8848553728/pure-css-badges">via Alan Johnson</a></h2>
      <div id="burst-8"></div>
<style scoped contenteditable>
  #burst-8 {
    background: red;
    width: 80px;
    height: 80px;
    position: relative;
    text-align: center;
    -webkit-transform: rotate(20deg);
    -moz-transform: rotate(20deg);
    -ms-transform: rotate(20deg);
    -o-transform: rotate(20eg);
  }

  #burst-8:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 80px;
    width: 80px;
    background: red;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -o-transform: rotate(135deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>Yin Yang <a>via Alexander Futekov</a></h2>
      <div id="yin-yang"></div>
<style scoped contenteditable>
  #yin-yang {
    width: 96px;
    height: 48px;
    background: #eee;
    border-color: red;
    border-style: solid;
    border-width: 2px 2px 50px 2px;
    border-radius: 100%;
    position: relative;
  }

  #yin-yang:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    background: #eee;
    border: 18px solid red;
    border-radius: 100%;
    width: 12px;
    height: 12px;
  }

  #yin-yang:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background: red;
    border: 18px solid #eee;
    border-radius: 100%;
    width: 12px;
    height: 12px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Badge Ribbon <a href="http://www.red-team-design.com/">via Catalin Rosu</a></h2>
      <div id="badge-ribbon"></div>
<style scoped contenteditable>
  #badge-ribbon {
    position: relative;
    background: red;
    height: 100px;
    width: 100px;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }

  #badge-ribbon:before,
  #badge-ribbon:after {
    content: '';
    position: absolute;
    border-bottom: 70px solid red;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    top: 70px;
    left: -10px;
    -webkit-transform: rotate(-140deg);
    -moz-transform: rotate(-140deg);
    -ms-transform: rotate(-140deg);
    -o-transform: rotate(-140deg);
  }

  #badge-ribbon:after {
    left: auto;
    right: -10px;
    -webkit-transform: rotate(140deg);
    -moz-transform: rotate(140deg);
    -ms-transform: rotate(140deg);
    -o-transform: rotate(140deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>Space Invader <a href="http://ecsspert.com/">via Vlad Zinculescu</a></h2>
      <div id="space-invader"></div>
<style scoped contenteditable>
  #space-invader {
    box-shadow: 0 0 0 1em red, 0 1em 0 1em red, -2.5em 1.5em 0 .5em red, 2.5em 1.5em 0 .5em red, -3em -3em 0 0 red, 3em -3em 0 0 red, -2em -2em 0 0 red, 2em -2em 0 0 red, -3em -1em 0 0 red, -2em -1em 0 0 red, 2em -1em 0 0 red, 3em -1em 0 0 red, -4em 0 0 0 red, -3em 0 0 0 red, 3em 0 0 0 red, 4em 0 0 0 red, -5em 1em 0 0 red, -4em 1em 0 0 red, 4em 1em 0 0 red, 5em 1em 0 0 red, -5em 2em 0 0 red, 5em 2em 0 0 red, -5em 3em 0 0 red, -3em 3em 0 0 red, 3em 3em 0 0 red, 5em 3em 0 0 red, -2em 4em 0 0 red, -1em 4em 0 0 red, 1em 4em 0 0 red, 2em 4em 0 0 red;
    background: red;
    width: 1em;
    height: 1em;
    overflow: hidden;
    margin: 50px 0 70px 65px;
  }
</style>
    </div>

    <div class="shape">
      <h2>TV Screen</h2>
      <div id="tv"></div>
<style scoped contenteditable>
  #tv {
    position: relative;
    width: 200px;
    height: 150px;
    margin: 20px 0;
    background: red;
    border-radius: 50% / 10%;
    color: white;
    text-align: center;
    text-indent: .1em;
  }

  #tv:before {
    content: '';
    position: absolute;
    top: 10%;
    bottom: 10%;
    right: -5%;
    left: -5%;
    background: inherit;
    border-radius: 5% / 50%;
  }
</style>
    </div>

    <div class="shape">
      <h2>Chevron <a href="http://twitter.com/apticknor">via Anthony Ticknor</a></h2>
      <div id="chevron"></div>
<style scoped contenteditable>
  #chevron {
    position: relative;
    text-align: center;
    padding: 12px;
    margin-bottom: 6px;
    height: 60px;
    width: 200px;
  }

  #chevron:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 51%;
    background: red;
    -webkit-transform: skew(0deg, 6deg);
    -moz-transform: skew(0deg, 6deg);
    -ms-transform: skew(0deg, 6deg);
    -o-transform: skew(0deg, 6deg);
    transform: skew(0deg, 6deg);
  }

  #chevron:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 50%;
    background: red;
    -webkit-transform: skew(0deg, -6deg);
    -moz-transform: skew(0deg, -6deg);
    -ms-transform: skew(0deg, -6deg);
    -o-transform: skew(0deg, -6deg);
    transform: skew(0deg, -6deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>Magnifying Glass</h2>
      <div id="magnifying-glass"></div>
<style contenteditable>
  #magnifying-glass {
    font-size: 10em;
    /* This controls the size. */
    display: inline-block;
    width: 0.4em;
    height: 0.4em;
    border: 0.1em solid red;
    position: relative;
    border-radius: 0.35em;
  }

  #magnifying-glass::before {
    content: "";
    display: inline-block;
    position: absolute;
    right: -0.25em;
    bottom: -0.1em;
    border-width: 0;
    background: red;
    width: 0.35em;
    height: 0.08em;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
</style>
    </div>

    <div class="shape">
      <h2>Facebook Icon <a href="http://clicknathan.com/">via Nathan Swartz</a></h2>
      <div id="facebook-icon"></div>
<style contenteditable>
  #facebook-icon {
    background: red;
    text-indent: -999em;
    width: 100px;
    height: 110px;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    border: 15px solid red;
    border-bottom: 0;
  }

  #facebook-icon::before {
    content: "/20";
    position: absolute;
    background: red;
    width: 40px;
    height: 90px;
    bottom: -30px;
    right: -37px;
    border: 20px solid #eee;
    border-radius: 25px;
  }

  #facebook-icon::after {
    content: "/20";
    position: absolute;
    width: 55px;
    top: 50px;
    height: 20px;
    background: #eee;
    right: 5px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Moon <a href="http://www.blendesign.ir/">via Omid Rasouli</a></h2>
      <div id="moon"></div>
<style contenteditable>
  #moon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 15px 15px 0 0 red;
  }
</style>
    </div>


    <div class="shape">
      <h2>Flag <a href="http://codepen.io/zoerooney/pen/xIoCn">via Zoe Rooney</a></h2>
      <div id="flag"></div>
<style contenteditable>
  #flag {
    width: 110px;
    height: 56px;
    padding-top: 15px;
    position: relative;
    background: red;
    color: white;
    font-size: 11px;
    letter-spacing: 0.2em;
    text-align: center;
    text-transform: uppercase;
  }

  #flag:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 13px solid #eee;
    border-left: 55px solid transparent;
    border-right: 55px solid transparent;
  }
</style>
    </div>

    <div class="shape">
      <h2>Cone <a href="http://www.blendesign.ir/">via Omid Rasouli</a></h2>
      <div id="cone"></div>
<style contenteditable>
  #cone {
    width: 0;
    height: 0;
    border-left: 70px solid transparent;
    border-right: 70px solid transparent;
    border-top: 100px solid red;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
</style>
    </div>

    <div class="shape">
      <h2>Cross <a href="#">via Kaya Basharan</a></h2>
      <div id="cross"></div>
<style contenteditable>
  #cross {
    background: red;
    height: 100px;
    position: relative;
    width: 20px;
  }

  #cross:after {
    background: red;
    content: "";
    height: 20px;
    left: -40px;
    position: absolute;
    top: 40px;
    width: 100px;
  }
</style>
    </div>

    <div class="shape">
      <h2>Base <a href="http://joshrodgers.com/">via Josh Rodgers</a></h2>
      <div id="base"></div>
<style contenteditable>
  #base {
    background: red;
    display: inline-block;
    height: 55px;
    margin-left: 20px;
    margin-top: 55px;
    position: relative;
    width: 100px;
  }

  #base:before {
    border-bottom: 35px solid red;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    content: "";
    height: 0;
    left: 0;
    position: absolute;
    top: -35px;
    width: 0;
  }
</style>
    </div>
  </div>
</div>
  <!-- shapes -->
  <!-- </div> -->
  <!-- page wrap -->

</body>
</html>
```

<div class="result"></div>

# 2. Avatar

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet prefetch" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: url(http://subtlepatterns.com/patterns/white_texture.png);
      font: 100 14px sans-serif;
      color: #444555;
      text-shadow: 0 2px white;
      text-align: center;
    }

    h1 {
      font-weight: 100;
      font-size: 2.7em;
      margin: 20px;
    }

    h3 {
      color: #555666;
      font-size: 1.6em;
      margin: 15px;
    }

    .avatar {
      width: 70px;
      height: 70px;
      margin: 10px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
      display: inline-block;
    }

    .avatar.small {
      width: 50px;
      height: 50px;
    }

    .avatar.big {
      width: 100px;
      height: 100px;
    }

    .avatar.status {
      position: relative;
    }

    .avatar img {
      width: 100%;
      border-radius: 50%;
    }

    .online,
    .offline {
      font-size: 1.2em;
      position: absolute;
      bottom: -3px;
      right: 5%;
      text-shadow: none;
    }

    .online {
      color: #8bc34a;
    }

    .offline {
      color: #ff5722;
    }

    .avatar.big .online,
    .avatar.big .offline {
      font-size: 1.8em;
    }

    .avatar.small .online,
    .avatar.small .offline {
      font-size: .9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>CSS3 Border-Radius with Border</h1>
    <h3>Small Avatars</h3>
    <div class="avatar small">
      <img src="http://poiemaweb.com/img/russel.jpg">
    </div>
    <div class="avatar small">
      <img src="http://poiemaweb.com/img/carl.jpg">
    </div>
    <div class="avatar small">
      <img src="http://poiemaweb.com/img/doug.jpg">
    </div>

    <h3>Nomal Avatars</h3>
    <div class="avatar">
      <img src="http://poiemaweb.com/img/russel.jpg">
    </div>
    <div class="avatar">
      <img src="http://poiemaweb.com/img/carl.jpg">
    </div>
    <div class="avatar">
      <img src="http://poiemaweb.com/img/doug.jpg">
    </div>

    <h3>Big Avatars</h3>
    <div class="avatar big">
      <img src="http://poiemaweb.com/img/russel.jpg">
    </div>
    <div class="avatar big">
      <img src="http://poiemaweb.com/img/carl.jpg">
    </div>
    <div class="avatar big">
      <img src="http://poiemaweb.com/img/doug.jpg">
    </div>

    <h3>Avatars with Status</h3>
    <div class="avatar status big">
      <img src="http://poiemaweb.com/img/russel.jpg">
      <i class="fa fa-circle online"></i>
    </div>
    <div class="avatar status">
      <img src="http://poiemaweb.com/img/carl.jpg">
      <i class="fa fa-circle offline"></i>
    </div>
    <div class="avatar status small">
      <img src="http://poiemaweb.com/img/doug.jpg">
      <i class="fa fa-circle online"></i>
    </div>
  </div>
</body>
</html>
```

<div class="result"></div>

# 3. 코너 리본

```html
<!DOCTYPE html>
<html>
<head>
  <style>
  .wrapper {
    margin: 50px auto;
    width: 280px;
    height: 370px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.3);
    position: relative;
    z-index: 90;
  }

  .ribbon-wrapper-green {
    width: 85px;
    height: 88px;
    overflow: hidden;
    position: absolute;
    top: -3px;
    right: -3px;
  }

  .ribbon-green {
    font: bold 15px Sans-Serif;
    color: #333;
    text-align: center;
    text-shadow: rgba(255,255,255,0.5) 0px 1px 0px;
    transform: rotate(45deg);
    position: relative;
    padding: 7px 0;
    left: -5px;
    top: 15px;
    width: 120px;
    background-color: #BFDC7A;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#BFDC7A), to(#8EBF45));
    background-image: -webkit-linear-gradient(top, #BFDC7A, #8EBF45);
    background-image:    -moz-linear-gradient(top, #BFDC7A, #8EBF45);
    background-image:     -ms-linear-gradient(top, #BFDC7A, #8EBF45);
    background-image:      -o-linear-gradient(top, #BFDC7A, #8EBF45);
    color: #6a6340;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.3);
  }

  .ribbon-green:before, .ribbon-green:after {
    content: "";
    border-top:   3px solid #6e8900;   
    border-left:  3px solid transparent;
    border-right: 3px solid transparent;
    position: absolute;
    bottom: -3px;
  }

  .ribbon-green:before {
    left: 0;
  }
  .ribbon-green:after {
    right: 0;
  }​
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="ribbon-wrapper-green">
      <div class="ribbon-green">NEWS</div>
  </div>
  </div>​</body>
</html>
```

<div class="result"></div>
