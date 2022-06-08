// Helicopter Game Start

// Set up canvas and graphics context
let cnv = document.getElementById("my-canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;

// Global Variables (once)
let heliImg = document.createElement("img");
heliImg.src = "img/heliBlueTransparent.png";

let exploSnd = document.createElement("audio");
exploSnd.src = "sound/explosion.wav";

let propSnd = document.createElement("audio");
propSnd.src = "sound/propeller.wav";

let mpressed = false, bestscore = 0;

//Reset
let state;
let heli;
let wall1, wall2,wall3;
let distance;
let spd1,spd2,spd3;
reset();
// Draw Function
window.addEventListener("load", draw);

function draw() {
  if(state === "start"){
    drawStart();
  } else if (state === "game"){
    runGame();
  } else if (state === "gameover"){
    drawGameOver();
    
  }
  // Request Animation Frame
  requestAnimationFrame(draw);
}

// FUNCTIONS

// Draw Start Screen

//event
document.addEventListener("mousedown", mdownH);
document.addEventListener("mouseup", mupH);

function mdownH(){
  mpressed = true;

  //propeller snd
  
  propSnd.currentTime = 0;
  propSnd.play();
  
  if (state === "start"){
    state = "game";
  } 
}
function mupH(){
  mpressed = false;
  propSnd.pause();
}