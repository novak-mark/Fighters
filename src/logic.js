import { Player } from "./classes/Player.js";
import { Warrior } from "./classes/Warrior.js";

// getting canvas element
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
canvas.style.border = '2px solid black';

//global values
let ai = false;
const framespeed = 12;
const gravity = 1.10;
let Player1 = null;
const P2 = null;



//player input, when key is pressed set that key to true, when the key is not pressedset that key to false
//Player 1 controls
let key_A = false;
let key_D = false;
let key_1 = false;
let key_2 = false;
let key_space = false;
//Player 2 controls (only avaiable if AI is turned off)
let key_Larrow = false;
let key_Rarrow = false;
let key_Num1 = false;
let key_Num2 = false;
let key_UParrow = false;

//event listeners
document.getElementById("PlayervPlayer").addEventListener("click",SwitchWindow);
document.getElementById("PlayervAi").addEventListener("click",AIOn);
document.getElementById("exit").addEventListener("click",exit);




//game loop functions
//background image to be displayed
let background = new Image(canvas.width,canvas.height);
background.src = "../resources/background_placeholder.png";
//function to hide main menu and display character selector
function SwitchWindow(){
    let menu_elements = document.getElementsByClassName("menu");
    for(let i=0; i < menu_elements.length;i++){
        menu_elements[i].style.display = "none";
     
    }
    let select_charcter_menu = document.getElementById("selectchar");
    select_charcter_menu.style.display = "inline";
    //add event listeners to buttons

    select_charcter_menu.children[1].addEventListener("click",chooseCharacter);
    select_charcter_menu.children[1].value = "warrior";
    /*
    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.width = '1920px';
    canvas.style.height = '1080px'
    ctx.scale(2, 2);
    canvas.style.display='block';
    */
    
}

function AIOn(){
    ai = true;
    StartGame(); // go to the initilazion proces of the game with ai turned on (default off)
}
//character chooser for P1
function chooseCharacter(evt){
    switch(evt.currentTarget.value){
        case "warrior":
            var warriorStates = {
                idle: {frames: 10, indexY: 0, autoRepeat: true, interuptable: true},
                run: {frames: 8, indexY: 1, autoRepeat: true, interuptable: true},
                attack1: {frames: 7, indexY: 3, autoRepeat: false, interuptable: false, attackFrame: 4, cooldown: 200},
                attack2: {frames: 7, indexY: 4, autoRepeat: false, interuptable: false, attackFrame: 2, cooldown: 300},
                hit: {frames: 3, indexY: 5, autoRepeat: false, interuptable: false},
                death: {frames: 7, indexY:6, autoRepeat: false, interuptable: false}
            };
            let warriorSprite = new Image();
            let warriorSpriteM = new Image();
            warriorSprite.src  = "../resources/fantasy_waririor.png";
            warriorSpriteM.src = "../resources/fantasy_waririor_M.png";
            let warriorWidth = 162;
            let warriorHeight = 162;
            let warrioroffsetX = 64;
            let warrioroffsetY = 45;
            let hp = 100;
            let warriorstate = 'idle';
            let maxFrames = warriorStates[warriorstate].frames;
            let framesY = warriorStates[warriorstate].indexY;
            let healthbar = document.getElementById('P1healthbar');
            
            Player1 = new Warrior(warriorHeight,warriorWidth,50,100,false,healthbar,hp,framesY,maxFrames,warriorstate,warriorStates);
            Player1.sprite = warriorSprite;
            Player1.spriteM = warriorSpriteM;
            Player1.offset.x = warrioroffsetX;
            Player1.offset.y = warrioroffsetY;
            Player1.collisionbox = {width: 64, height: 120};
            Player1.attackbox = {offsetX: 60, offsetY: 0, width: 64, height: 120};
            break;
        case "test2":
            this.sprite.src = "../resources/fantasy_waririor.png";
            this.states = 
            [
                {state:'idle',frames: 10, indexY: 5},
                {state:'run',frames: 8, indexY: 7},
                {state:'attack1',frames: 7, indexY: 0}
            ]
            this.width = 164;         
            this.height = 164;
            break;
    }
    //show the canvas onto the screen
    initCanvas();
}

//remove the character select menu and display the canvas
function initCanvas(){
    //hide the character select menu: (maybe better to remove it)
    let select_charcter_menu = document.getElementById("selectchar");
    select_charcter_menu.style.display = "none";

    canvas.width = 1920;
    canvas.height = 1080;
    canvas.style.width = '1920px';
    canvas.style.height = '1080px'
    ctx.scale(2, 2);
    canvas.style.display='block';
    //add event listeners
    document.addEventListener("keyup",function(e){
        KeyReleased(e);
    });
    document.addEventListener("keydown",function(e){
        KeyPressed(e);
    });
    GameLoop();
    //display the timer again before starting it.
    document.getElementById("timer").style.display = "flex";
    document.getElementById("P1healthbar").style.display ="flex";
    document.getElementById("P2healthbar").style.display = "flex";
    document.getElementById("P1Icon").style.display = "flex";
    document.getElementById("P2Icon").style.display = "flex";
    timer();
}
//exting game
function exit(){
    self.close();
}




const player2 = new Player(64,64,800,350,100,true,5,6,document.getElementById('P2healthbar'));



//collison function, detect collison for game borders and player collision
function Collison(){
    //edge collison P1
    if(Player1.x < 0){
        this.x += 1;
    }
    if(Player1.x + Player1.collisionbox.width > (canvas.width/2)){
        this.x -= 1;
    }
    /*
    //edge collison P2
    if(player2.x < 0 ){
        player2.x += 1;
    }
    if(player2.x + player2.collisionbox.width > (canvas.width/2)){
        player2.x -= 1;
    }
    //player collison
    if(Player1.x + Player1.collisionbox.width > player2.x &&
       player2.x + player2.collisionbox.width > Player1.x &&
       Player1.y + Player1.collisionbox.height > player2.y &&
       player2.y + player2.collisionbox.height > Player1.y
    ){
        //this.x -= 1;
        //player2.x += 1;
        //console.log("collison zabil si se");
    }
        */
}
function Controls(){
    //disable movement if player is attacking
    if(Player1.states[Player1.state].interuptable){
        if(key_A){
            Player1.moveleft();
            Player1.updateState('run');
        }
        else if(key_D){
            Player1.moveright();
            Player1.updateState('run');
        }
        else if(key_space){
            Player1.jump();
            Player1.updateState('jump');
        }
        else if(key_1){
            //this.updateState('attack1');
            Player1.isAttacking = true;
            Player1.updateState('attack1');
           
        }
        else if(key_2){
            Player1.isAttacking = true;
        }
    }
}
function DrawBackground(){
    let ratio = background.width / background.height;
    let width = canvas.width;
    let height = width / 3.5;
    ctx.drawImage(background,0,0,width,height);
}
//timer that will show how long the game lasts
let secs = 0;
let mins = 0;
function timer(){
    setTimeout(timer,1000);
    if(secs < 10){
        document.getElementById('timer').innerHTML = mins + ":" + "0" + secs;
    }
    else {
        document.getElementById('timer').innerHTML = mins + ":" + secs;
    }
    if(secs == 59){
        mins+=1;
        secs = 0;
    }
    secs+=1;
}
//function to draw all the required assets on
function draw(){
    //clear canvas before resuming draw operations
    ctx.clearRect(0,0,canvas.width,canvas.height);
    DrawBackground();
    Player1.draw();
}

//main game loop
function GameLoop(){
    Controls();
    Player1.groundcheck();
    Collison();
    draw();

    window.requestAnimationFrame(GameLoop);

}
//restart the game when one of the player dies
function gameOver(P1status,P2status){
    //draw Player WON text on to the screen
    if(P1status){
        console.log('P2 WON');
    }
    else {
        console.log('P1 WON');
    }
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}
