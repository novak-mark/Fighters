import { PlaySound } from "../logic.js"
const gravity = 0.6;
const jumpStrength = -25;
export class Player{

    constructor(height,width,x,y,flip,healthbar,hp,sprite,spriteM){
        this.height = height;
        this.width = width;
        this.x = x;
        this.y = y;
        this.flip = flip;
        this.startypos = y;
        this.healthbar = healthbar;
        this.hp = hp;
        //store the spritesheets and mirrored spritesheet for the player
        this.sprite = sprite;
        this.spriteM = spriteM;
        this.offset = {x: 0, y:0};
        this.scale = 4;
        this.collisionbox = {};
        this.attackbox = {};
        this.canAttack = true;
        this.isDead = false;
        this.velocityX = 0;
        this.velocityY = 0;
        this.onGround = true;
    }
    //functions for player movement
    moveRight(dt){        
        this.velocityX = 3 * dt;
    }
    moveLeft(dt){
        this.velocityX = -3 * dt;
    }
    jump(){
        if(this.onGround){
            this.velocityY = jumpStrength;
            this.onGround = false;
        } 
    }
    groundCheck(){
        console.log("burek");
    }
    takeDMG(amount){
        let new_HP = this.hp - amount;
        if(new_HP <= 0){
            this.updateState('death');
            this.isDead = true;
            this.hp = 0;
        }
        else {
            this.hp = new_HP; //change P2 hp to the new HP.
            
        }
        //decreasce the width of the hit players healthbar
        let ratio = this.hp / 100;
        this.healthbar.style.width = (34 * ratio) + '%';
    }
    //flip the sprite if need be
    flipSprite(dst_x){
        if(this.x > dst_x){
            this.flip = true;
        }
        else {
            this.flip = false;
        }
    }
    attack(enemyPlayer,dmg){
        console.log(dmg);
        PlaySound("../resources/sound/hit.mp3");
        enemyPlayer.updateState("hit");


        enemyPlayer.takeDMG(dmg);
    }
    //transition into a new animation
    //check if attack hit P2 
    attackCollision(enemyPlayer){
        let direction = 1;
        let hit = false
        if(this.flip){
            direction = -1;
        }
        
        if( this.x + (this.attackbox.offsetX * direction) < enemyPlayer.x + enemyPlayer.collisionbox.width &&
            this.x + (this.attackbox.offsetX * direction) + this.attackbox.width > enemyPlayer.x &&
            this.y + this.attackbox.offsetY < enemyPlayer.y + enemyPlayer.collisionbox.height &&
            this.y + this.attackbox.offsetY + this.attackbox.height > enemyPlayer.y && 
            enemyPlayer.isDead == false 
        ){
            hit = true;
        }
        return hit;
    }
    update(){
        this.x += this.velocityX;

        this.velocityY += gravity;
        this.y += this.velocityY; 
        let ground = window.innerHeight - 250;
        if(this.y >= ground){
            console.log("halo");
            this.y = ground;
            this.velocityY = 0;
            this.onGround = true;
            
        }
         
    }
}