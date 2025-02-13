import { Player } from "./classes/Player.js";
import { Warrior } from "./classes/Warrior.js";
import { Samurai } from "./classes/Samurai.js";
import { Knight    } from "./classes/Knight.js";
import { Controls} from "./classes/Controls.js";
import { CollisionControler } from "./classes/CollisionControler.js";
import { easySamurai } from "./functions/easyAi.js";

// getting canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
canvas.style.border = '2px solid black';

//global values
let ai = false;

let Player1 = null;
let Player2 = null;

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

let P1pos = {x: 50,  y: canvasHeight, flip: false};
let P2pos = {x: canvasWidth - 50, y: canvasHeight, flip: true};



let P1hpbar = document.getElementById("P1healthbar");
let P2hpbar = document.getElementById("P2healthbar");

const FPS = 60;
let interval = Math.floor(1000 / FPS);

let previousTime = performance.now();
let dt = 0;

//controllers
let controller = null;
let collider = null;
//event listeners
document.getElementById("PlayervPlayer").addEventListener("click",SwitchWindow);
document.getElementById("PlayervAi").addEventListener("click",AIOn);
document.getElementById("exit").addEventListener("click",exit);

window.addEventListener('resize',resizeCanvas);

function resizeCanvas(){
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    //change players y to make sure they stay on the ground
    Player1.y = canvasHeight - 250;
    Player2.y = canvasHeight - 250;

    //redraw
    draw();
}



//game loop functions
//background image to be displayed
let background = document.getElementById("backgroundimg");

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

    select_charcter_menu.children[2].addEventListener("click",chooseCharacter);
    select_charcter_menu.children[2].value = "samurai";

    select_charcter_menu.children[3].addEventListener("click",chooseCharacter);
    select_charcter_menu.children[3].value = "knight";
    
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
    SwitchWindow(); // go to the initilazion proces of the game with ai turned on (default off)
}
//character chooser for P1
function chooseCharacter(evt){
    switch(evt.currentTarget.value){
        case "warrior":
            Player1 = createWarrior(P1pos,P1hpbar);
            Player2 = createSamurai(P2pos,P2hpbar);

            break;
        case "samurai":
            Player1 = createSamurai(P1pos,P1hpbar);
            Player2 = createWarrior(P2pos,P2hpbar);
            break;
        case "knight":
            Player1 = createKnight(P1pos,P1hpbar);
            Player2 = createWarrior(P2pos,P2hpbar);
            break;
    }
    //show the canvas onto the screen
    initCanvas();
}
function createSamurai(playerpos,healthbar){
    //create Player2
    var samuraiStates = {
        idle: {frames: 8, indexY: 4, autoRepeat: true, interuptable: true},
        run: {frames: 8, indexY: 6, autoRepeat: true, interuptable: true},
        attack1: {frames: 6, indexY: 0, autoRepeat: false, interuptable: false, attackFrame: 4, cooldown: 50, dmg: 10},
        attack2: {frames: 6, indexY: 1, autoRepeat: false, interuptable: false, attackFrame: 4, cooldown: 80, dmg: 30},
        hit: {frames: 4, indexY: 7, autoRepeat: false, interuptable: false},
        death: {frames: 6, indexY: 2, autoRepeat: false, interuptable: false}
    };
    let samuraiSprite = new Image();
    let samuraiSpriteM = new Image();
    samuraiSprite.src  = "../resources/samurai.png";
    samuraiSpriteM.src = "../resources/samurai_M.png";
    //calculated with spritesheet.width / maxframes
    let samuraiWidth =  Math.floor(samuraiSprite.width  / 8);
    let samuraiHeight = Math.floor(samuraiSprite.height / 8); 
    let samuraioffsetX = 80;
    let samuraioffsetY = 65;
    let P2hp = 100;
    let samuraistate = 'idle';
    let P2maxFrames = samuraiStates[samuraistate].frames;
    let P2framesY = samuraiStates[samuraistate].indexY;

    
    let player = new Samurai(samuraiHeight,samuraiWidth,playerpos.x,playerpos.y,playerpos.flip,healthbar,P2hp,samuraiSprite,samuraiSpriteM,P2framesY,P2maxFrames,samuraistate,samuraiStates);
    player.offset.x = samuraioffsetX;
    player.offset.y = samuraioffsetY;
    player.collisionbox = {width: 130, height: 235};
    player.attackbox = {offsetX: 220, offsetY: 50, width: 80, height: 120};
    return player;
}
function createWarrior(playerpos,healthbar){
    var warriorStates = {
        idle: {frames: 10, indexY: 0, autoRepeat: true, interuptable: true},
        run: {frames: 8, indexY: 1, autoRepeat: true, interuptable: true},
        attack1: {frames: 7, indexY: 3, autoRepeat: false, interuptable: false, attackFrame: 4, cooldown: 75, dmg: 20},
        attack2: {frames: 7, indexY: 4, autoRepeat: false, interuptable: false, attackFrame: 2, cooldown: 300,dmg: 40},
        hit: {frames: 3, indexY: 5, autoRepeat: false, interuptable: false},
        death: {frames: 7, indexY: 6, autoRepeat: false, interuptable: false},
        jump: {frames: 1, indexY: 2, autoRepeat: false, interuptable: false}
    };
    let warriorSprite = new Image();
    let warriorSpriteM = new Image();
    warriorSprite.src  = "../resources/fantasy_waririor.png";
    warriorSpriteM.src = "../resources/fantasy_waririor_M.png";
    let warriorWidth  =  Math.floor(warriorSprite.width   / 10);
    let warriorHeight = Math.floor(warriorSprite.width / 10);
    let warrioroffsetX = 64;
    let warrioroffsetY = 45;
    let hp = 100;
    let warriorstate = 'idle';
    let maxFrames = warriorStates[warriorstate].frames;
    let framesY = warriorStates[warriorstate].indexY;
    
    
    let player = new Warrior(warriorHeight,warriorWidth,playerpos.x,playerpos.y,playerpos.flip,healthbar,hp,warriorSprite,warriorSpriteM,framesY,maxFrames,warriorstate,warriorStates);
    player.offset.x = warrioroffsetX;
    player.offset.y = warrioroffsetY;
    player.collisionbox = {width: 120, height: 220};
    player.attackbox = {offsetX: 140, offsetY: 50, width: 100, height: 120};

    return player;
}
function createKnight(playerpos,healthbar){
    var girlstates = {
        idle: {frames: 11, indexY: 4, autoRepeat: true, interuptable: true},
        run: {frames: 8, indexY: 6, autoRepeat: true, interuptable: true},
        attack1: {frames: 7, indexY: 0, autoRepeat: false, interuptable: false, attackFrame: 4, cooldown: 75, dmg: 10},
        attack2: {frames: 7, indexY: 1, autoRepeat: false, interuptable: false, attackFrame: 4, cooldown: 300,dmg: 40},
        hit: {frames: 4, indexY: 7, autoRepeat: false, interuptable: false},
        death: {frames: 11, indexY: 2, autoRepeat: false, interuptable: false}
    };
    let sprite = new Image();
    let spriteM = new Image();
    sprite.src  = "../resources/girl.png";
    spriteM.src = "../resources/girl_M.png";
    //for some reason this values need to be like this otherwise it takes the wrong part
    let girlWidth  =  Math.floor(sprite.width /11);
    let girlHeight = Math.floor(sprite.height / 8);
    let girloffsetX = 85;
    let girlffsetY =  60;
    let hp = 100;
    let girlstate = 'idle';
    let maxFrames = girlstates[girlstate].frames;
    let framesY = girlstates[girlstate].indexY;
    
    
    let player = new Knight(girlHeight,girlWidth,playerpos.x,playerpos.y,playerpos.flip,healthbar,hp,sprite,spriteM,framesY,maxFrames,girlstate,girlstates);
    player.offset.x = girloffsetX;
    player.offset.y = girlffsetY;
    player.collisionbox = {width: 120, height: 220};
    player.attackbox = {offsetX: 200, offsetY: 50, width: 100, height: 120};

    return player;
}
//remove the character select menu and display the canvas
function initCanvas(){
    //hide the character select menu: (maybe better to remove it)
    let select_charcter_menu = document.getElementById("selectchar");
    select_charcter_menu.style.display = "none";

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    canvas.style.display='block';
    resizeCanvas();
    controller  = new Controls(document,Player1,Player2,ai);
    controller.init();
    //display the timer again before starting it.
    document.getElementById("timer").style.display = "flex";
    document.getElementById("P1healthbar").style.display ="inline";
    document.getElementById("P1bar").style.display ="inline";
    document.getElementById("P2bar").style.display ="inline";
    document.getElementById("P2healthbar").style.display = "flex";
    document.getElementById("P1Icon").style.display = "flex";
    document.getElementById("P2Icon").style.display = "flex";
    timer();
    collider = new CollisionControler(Player1,Player2);
    GameLoop();
    
}

//exting game
function exit(){
    self.close();
}

function DrawBackground(){
    background.style.display = "inline";
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
function draw(dt){
    //clear canvas before resuming draw operations
    ctx.clearRect(0,0,canvas.width,canvas.height);
    DrawBackground();
    Player1.draw(Player2,dt);
    Player2.draw(Player1,dt);
}

//main game loop

function GameLoop(currentTime){
    dt = currentTime - previousTime;
    dt = dt / interval;
    previousTime = currentTime;
    if(controller instanceof Controls){
        controller.ControlHandler(dt);
    }
    if(collider instanceof CollisionControler){
        collider.Collison(canvasWidth);
    }
    if(Player1.isDead == false){
        Player1.flipSprite(Player2.x);
    }
    if(Player2.isDead == false){
        Player2.flipSprite(Player1.x);
    }
    
    //if AI is turned on then call the function for the AI.
    if(ai && Player2.isDead == false){
        easySamurai(Player1,Player2,dt);
    }
    if(Player1.isDead || Player2.isDead){
        gameOver(Player1.isDead);
    }
    Player1.update();
    Player2.update();
    draw(dt);

    window.requestAnimationFrame(GameLoop);

}
export function PlaySound(sound){
    let audio = new Audio(sound);
    audio.play();

}
//restart the game when one of the player dies
function gameOver(P1status,P2status){
    //draw Player WON text on to the screen
    let txt = document.getElementById("gameovertxt");

    if(P1status){
        txt.innerHTML = "P2 WON";
    }
    else {
        txt.innerHTML = "P1 WON";
    }
    setTimeout(() => {
        window.location.reload();
    }, 3000);
}
