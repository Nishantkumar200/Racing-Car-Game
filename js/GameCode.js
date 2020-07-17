

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const  gameArea = document.querySelector('.gameArea');

const keys = {
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false,
}

document.addEventListener('keydown',keydown);

document.addEventListener('keyup',keyup);      // firing an event when user clicked on page i.e: on the web  and keyup and keydown is a function calling,

startScreen.addEventListener('click',start);

let player = {speed:5  , score:0};

function keydown(e){
   // e.preventDefault();
    keys[e.key] = true;
   // console.log(e.key);
   // console.log(keys);
}

function keyup(e){
 //   e.preventDefault();
    keys[e.key]=false;
   // console.log(e.key);
  //  console.log(keys)
}

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();
   
     return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.left > bRect.right) || (aRect.right < bRect.left));

}


function MoveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
       if(item.y>=700){
           item.y -=900;
       }
        item.y += player.speed;
        item.style.top = item.y +"px";
    

    })
}

function endGame(){
    player.start = false;
    startScreen.classList.remove('hide');



}
function MoveEnemy(car){
    let enemycar = document.querySelectorAll('.enemyCar');
    enemycar.forEach(function(item){

        if(isCollide(car,item)){
          console.log("BOoooooooooooooooooooooooooooom")
          endGame();
        }

       if(item.y>=750){
        item.y = -300;
           item.style.left  = Math.floor(Math.random()*350)+"px";   
       }
      
       item.y += player.speed;
        item.style.top = item.y +"px";
    

    })
}



function GamePlay(){
    let car = document.querySelector('.car');

    let road = gameArea.getBoundingClientRect();
   // console.log(road);
       MoveLines();
       MoveEnemy(car);

    if(player.start){

        if(keys.ArrowUp && player.y > (road.top+70)){
            player.y-= player.speed;
        }
        if(keys.ArrowDown && player.y <(road.bottom-70)){
            player.y+=  player.speed ;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-=  player.speed;
        }
        if(keys.ArrowRight && player.x < (road.width -50)){
            player.x+= player.speed;
        }

        car.style.top  =  player.y +'px';
        car.style.left = player.x + 'px';
       // console.log(car.style.left);
        window.requestAnimationFrame(GamePlay);     // for calling again and again function
        player.score++;
        score.innerText = "Score :" + player.score;
    }
   
}



function start(){
   // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    
    player.start = true;
    player.score  = 0;
    window.requestAnimationFrame(GamePlay);



    for(i=0; i<=5;i++)
    {
    let roadLines = document.createElement('div');
    roadLines.setAttribute('class','lines');
    roadLines.y = (i*150);
    roadLines.style.top = (i*150)+"px";
    gameArea.appendChild(roadLines);
    }
    
   
 
    let car  = document.createElement('div');
    car.setAttribute('class' , 'car');
   // car.innerText = "hey i am ur car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;   // Saying the position 
    player.y = car.offsetTop;

    //console.log(player.speed);

    //console.log('From left :' +player.x);
   // console.log('From Top :' +player.y);

   for(x=0;x<3;x++){
       let enemyCar = document.createElement('div');
       enemyCar.setAttribute('class' , 'enemyCar');
       enemyCar.y = ((x+1)*350)*-1;
       enemyCar.style.top = enemyCar.y+"px";
       enemyCar.style.background = "blue";
       enemyCar.style.left  = Math.floor(Math.random()*350)+"px";
       gameArea.appendChild(enemyCar);
   }
}
