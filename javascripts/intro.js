
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

function init() {
  // insert canvas HTML
  let canvasHTML = `<canvas id="field" width=${canva.width} height=${canva.height}></canvas>`
  document.querySelector('body').insertAdjacentHTML('afterBegin', canvasHTML);  
  // set canvas context
  let ctx = document.getElementById('field').getContext('2d');
  
  // new object instances
  let superman = new Component( "./img/superman.png", 0, 180, 100, 150 );
  let fireball = new Component( "./img/fireball.png", 450, 200, 50, 50 );

  play( ctx, superman, fireball)
}

function play( ctx, superman, fireball ) {

  setInterval( function() {
    clear( ctx );
    background( ctx );    
    drwaComp( ctx, superman );
    drwaComp( ctx, fireball );
    movePlayer( superman );
    randomFireball( fireball );
  }, 1000/60 )
  
}

function background( ctx ) {  
  ctx.fillStyle="lightblue";
  ctx.fillRect(0, 0, 500, 500);
}

function drwaComp ( ctx, obj ) {
  let img = new Image();
  img.src = obj.imgScr;
  ctx.drawImage(img, obj.posX, obj.posY, obj.imgW, obj.imgH);
}

function clear( ctx ) {
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

function randomFireball( fireball ) {
  fireball.posX -= 2;
    if( fireball.posX <= -70 ) {
      fireball.posX = 450;
      fireball.posY = Math.floor(Math.random() * 430);
    }
}


// *************************************************** //

window.addEventListener('load', () => {
  init();
});


