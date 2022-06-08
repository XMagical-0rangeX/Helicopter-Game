function drawStart() {
    drawcommon();
    // Start Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("CLICK TO START", 350, 285)
    
    ctx.font = "25px Consolas";
    ctx.fillText("CLICK AND HOLD LEFT MOUSE BUTTON TO GO UP", 100, 450);
    ctx.fillText("RELEASE TO GO DOWN", 415, 480);
  }
  function runGame(){
      //lodgic
        moveHeli();
        movewalls();
        checkcollisions();
      //draw
      drawGame();
      distance++
  }
  function moveHeli(){
      // accell up if m pressed
      if (mpressed){
          heli.speed += -1;
      }
      heli.speed += heli.a;
      //constrain speed
      if (heli.speed >5){
          heli.speed = 5;
      } else if (heli.speed <-5){
          heli.speed = -5;
      }
      //move by speed
      heli.y +=heli.speed;
  }
    function movewalls(){
      
        // wall 1
        wall1.x += -3-spd1;
        if (wall1.x + wall1.w<0){
            spd1 ++;
            console.log(spd1)
            wall1.x = wall3.x+500
            wall1.y = Math.random()* 300+100;
            
        }
        // wall 2
        wall2.x += -3-spd2;
        if (wall2.x + wall2.w<0){
            spd2 ++;
            wall2.x = wall1.x+500
            wall2.y = Math.random()* 300+100;
        }
        // wall 3
        wall3.x += -3-spd3;
        if (wall3.x + wall3.w<0){
            spd3++;
            wall3.x = wall2.x+500
            wall3.y = Math.random()* 300+100;
        }
    }
    function checkcollisions(){
        //check top bottm gren bars n walls
        if (heli.y <50 || heli.y +heli.h> cnv.height-50 || 
          heli.x+heli.w>wall1.x && heli.x<wall1.x+wall1.w && heli.y<wall1.y+wall1.h && heli.y+heli.h>wall1.y||
          heli.x+heli.w>wall2.x && heli.x<wall2.x+wall2.w && heli.y<wall2.y+wall2.h && heli.y+heli.h>wall2.y||
          heli.x+heli.w>wall3.x && heli.x<wall3.x+wall3.w && heli.y<wall3.y+wall3.h && heli.y+heli.h>wall3.y){
            gameOver();
        }
    }

    function gameOver(){
        exploSnd.play();
        state = "gameover";

        setTimeout(reset, 2000);
    }
    
  // Draw Game Elements
  function drawGame() {
    drawcommon();
    // Draw Walls
    drawwalls();
  }
  // Draw Game Over Screen
  function drawGameOver() {
    drawcommon();
    // Draw Walls
    drawwalls();
  
    // Circle around Helicopter
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(heli.x+heli.w/2, heli.y+heli.h/2, 60, 0, 2 * Math.PI);
    ctx.stroke();
  
    // Game Over Text
    ctx.font = "40px Consolas";
    ctx.fillStyle = "lightblue";
    ctx.fillText("GAME OVER", 350, 285);
  }

  // helper functons 
  function reset(){
     state = "start"; 
     heli = {
      x: 200,
      y: 250,
      w: 80,
      h: 40,
      speed: 0,
      a: 0.7,
    }
     wall1 = {
      x: cnv.width,
      y: Math.random()* 300+100,
      w: 50,
      h: 100,
    }
     wall2 = {
      x: cnv.width+500,
      y: Math.random()* 300+100,
      w: 50,
      h: 100,
    }
     wall3 = {
      x: cnv.width+1000,
      y: Math.random()* 300+100,
      w: 50,
      h: 100,
    }
    distance=0;
    spd1=0,spd2=0,spd3=0;
    }
  
  function drawwalls(){
    ctx.fillStyle = "green";
    ctx.fillRect(wall1.x, wall1.y, wall1.w, wall1.h);
    ctx.fillRect(wall2.x, wall2.y, wall2.w, wall2.h);
    ctx.fillRect(wall3.x, wall3.y, wall3.w, wall3.h);
  }
  function drawcommon(){
      // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
  
    // Green Bars
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, cnv.width, 50);
    ctx.fillRect(0, cnv.height - 50, cnv.width, 50);
    if (distance > bestscore){
          bestscore = distance;
        }
    // Green Bar Text
    ctx.font = "30px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText("HELICOPTER GAME", 25, 35);
    ctx.fillText("DISTANCE: "+distance, 25, cnv.height - 15);
    ctx.fillText("BEST: "+bestscore, cnv.width - 250, cnv.height - 15);
  
    // Helicopter
    ctx.drawImage(heliImg, heli.x, heli.y);
  }