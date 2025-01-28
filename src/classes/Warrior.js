import { Player } from "./Player.js";
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let P1framesC = 0;
const framespeed = 12;
export class Warrior extends Player
{
    constructor(height,width,x,y,flip,healthbar,hp,sprite,spriteM,framesY,maxFrames,state,states){
        super(height,width,x,y,flip,healthbar,hp,sprite,spriteM);
        this.framesY = framesY;
        this.maxFrames = maxFrames;
        this.state = state;
        this.states = states;
        this.framesX = 0;
        this.cooldownTime = 0;  
    }
    draw(enemyPlayer,dt){
        if(this.canAttack && this.framesX == this.states[this.state].attackFrame){
            
            console.log("attacking");
            let hit = this.attackCollision(enemyPlayer);
            if(hit){
                this.attack(enemyPlayer,this.states[this.state].dmg);
            }
            this.canAttack = false;
            this.cooldownTime = this.states[this.state].cooldown;
        }
        if(this.canAttack == false){
            console.log(dt);
            console.log(this.cooldownTime);
            this.cooldownTime -=dt;
            if(this.cooldownTime <= 0){
                this.canAttack = true;
                this.cooldownTime = 0;
            }
        }
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y,this.collisionbox.width,this.collisionbox.height);
        //check if we need to flip the spritesheet
        if(this.isDead == false){
            //this.flipSprite(player2.x);
        }
        //flip the sprite if need be
        if(this.flip == false){
            ctx.drawImage(this.sprite,this.width*this.framesX,this.height*this.framesY,this.width,this.height, //src
                this.x-(this.offset.x*this.scale),this.y-(this.offset.y*this.scale),this.width*this.scale,this.height*this.scale);
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x + this.attackbox.offsetX, this.y + this.attackbox.offsetY,this.attackbox.width,this.attackbox.height);
        }
        else {
            ctx.drawImage(this.spriteM,(this.spriteM.width-this.width) - (this.width*this.framesX),this.height*this.framesY,this.width,this.height, //src
                this.x-(this.offset.x*this.scale),this.y-(this.offset.y*this.scale),this.width*this.scale,this.height*this.scale);
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x - this.attackbox.offsetX, this.y + this.attackbox.offsetY,this.attackbox.width,this.attackbox.height);
        }
        //animation cycle
        if(P1framesC % framespeed == 0){
            if(this.framesX < this.maxFrames - 1){
                this.framesX++;
            }
            //if need to repeat the animation restart the animation cycle
            else if(this.states[this.state].autoRepeat){
                this.framesX = 0;
            }
            //go back to idle after the animation is finished.
            else {
                if(this.isDead == false){
                    this.updateState('idle');
                    this.isAttacking = false;
                }
            }
        }
        P1framesC++;
    }
    updateState(state){
            
        //check if the state is in the dictionary
        if(Object.keys(this.states).includes(state) && this.state != state){
            //reset animation parameters
            this.framesX = 0;
            this.framesY = this.states[state].indexY;
            this.maxFrames = this.states[state].frames;
            this.state = state;       
        }
    }
}