
function init() {

  class Component {
    constructor( img, x, y, w, h) {
      this.imgScr = img;
      this.posX = x;
      this.posY = y;
      this.imgW = w;
      this.imgH = h
    }
  };
  
  let canva = {
    width: 500,
    height: 500
  };

  let initialScore = 0;
  let initialLives = 5;

  // insert canvas HTML
  let canvasHTML = `<div id="score">Score:<span>${initialScore}</span></div>
                    <div id="lives">Lives:<span>${initialLives}</span></div>
                    <canvas id="field" width=${canva.width} height=${canva.height}></canvas>`
  document.querySelector('body').insertAdjacentHTML('afterBegin', canvasHTML);  
  
  // set canvas context
  let ctx = document.getElementById('field').getContext('2d');
  
  // new object instances
  let superman = new Component( "./img/superman.png", 0, 180, 100, 150 );
  let fireball = new Component( "./img/fireball.png", 450, 200, 50, 50 );

  play( canva, ctx, superman, fireball )
}

// animation & play features
function play( canva, ctx, superman, fireball ) {

  let intv = setInterval( function() {
    clear( canva, ctx );
    background( ctx );    
    drawComp( ctx, superman );
    drawComp( ctx, fireball );
    movePlayer( superman );
    let compCollision = collision( superman, fireball ) 
    let restart = randomFireball( fireball, compCollision );
    if ( restart ) {
      clearInterval(intv);
      location.reload();
    }
  }, 1000/60 )
}

// draws backgroud
function background( ctx ) {  
  ctx.fillStyle="lightblue";
  ctx.fillRect(0, 0, 500, 500);
}

function drawComp ( ctx, obj ) {
  let img = new Image();
  img.src = obj.imgScr;
  ctx.drawImage(img, obj.posX, obj.posY, obj.imgW, obj.imgH);
}

function clear( canva, ctx ){
  ctx.clearRect(0, 0, canva.width, canva.height)
}

function movePlayer( superman ) {
  document.onkeydown = event => {
    let keyCodes = [37, 38, 39, 40];
    const key = event.keyCode;    
    
    if ( keyCodes.includes(key) ) {
      console.log(keyCodes.includes(key));
      event.preventDefault();
      if ( key === 37 && superman.posX >= 0 ) console.log(superman.posX -= 20)
      else if ( key === 39 && superman.posX <= 500 - superman.imgW ) superman.posX += 20
      else if ( key === 38 && superman.posY >= 10 ) superman.posY -= 20
      else if ( key === 40 && superman.posY <= 500 - superman.imgH ) superman.posY += 20
    }   
  }
}

function collision( superman, fireball ) {
  let colRight = ( (superman.posX + superman.imgW - 20 >= fireball.posX) && (superman.posX <= fireball.posX) );
  let colLeft = ( (superman.posX + 20 <= fireball.posX + fireball.imgW) && (superman.posX + superman.imgW >= fireball.posX + fireball.imgW) );
  let colTop = ( (superman.posY + 20 <= fireball.posY + fireball.imgH) && (superman.posY + superman.imgH >= fireball.posY + fireball.imgH) );
  let colBot = ( (superman.posY + superman.imgH - 20 >= fireball.posY) && (superman.posY <= fireball.posY) );
  
  if ( (colRight || colLeft) && (colTop || colBot)) return true;
  return false;
}

function randomFireball( fireball, compCollision ) {
  let lives = Number(document.querySelector('#lives > span').innerText);
  let score = Number(document.querySelector('#score > span').innerText);
  fireball.posX -= 2;

  if( compCollision || fireball.posX <= -70 ) {
    fireball.posX = 450;
    fireball.posY = Math.floor(Math.random() * 430);

    if( compCollision ) {
      document.querySelector('#lives > span').innerText = lives - 1;
      if ( lives <= 0 ) return true;
    } 
    else {
      document.querySelector('#score > span').innerText = score + 1;
    }
  }
}



// *************************************************** //

window.addEventListener('load', () => {
  init();
});


