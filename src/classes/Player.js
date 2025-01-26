
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
        this.scale = 2;
        this.collisionbox = {};
        this.attackbox = {};
        this.canAttack = true;
        this.isDead = false;
    }
    //functions for player movement
    moveright(){        
        this.x += 1;
    }
    moveleft(){
        this.x -=1;
    }
    jump(){
        this.y -= 10; 
    }
    //check if the player is on the ground
    groundcheck(){
        if(this.y < this.startypos){
            
            this.y += gravity;
        }
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
        this.healthbar.style.width = (500 * ratio) + 'px';
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
    //transition into a new animation
    attackCollision(enemyPlayer){
        console.log("halo");
        console.log("Attackbox x: " + this.x + " width: " + this.attackbox.width);
        console.log("Attacbox y: " + this.y +  " height: " + this.attackbox.height);

        console.log("Enemy player x: " + enemyPlayer.x + " width: " + enemyPlayer.collisionbox.width);
        console.log("Enemy Player y: " + enemyPlayer.y + " height: " + enemyPlayer.collisionbox.height);

        if (
            this.x + this.attackbox.width + this.attackbox.offsetX > enemyPlayer.x &&
            enemyPlayer.x + enemyPlayer.collisionbox.width > this.x &&
            this.y + this.attackbox.height + this.attackbox.offsetY > enemyPlayer.y &&
            enemyPlayer.y + enemyPlayer.collisionbox.height > this.y
          ) {
            enemyPlayer.updateState("hit");
          }
    }
}