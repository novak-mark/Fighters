import { playSound } from "../logic.js";
export class SamuraiAI{
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.reactionTime = 0.5; 
      }
    update(dt){
        console.log(this.player2.state);
        let dst = Math.abs(this.player1.x - this.player2.x);
        if (this.player2.isDead == false) {
          if (dst < 360) {
            this.player2.velocityX = 0;
            if (this.player2.canAttack) {
              this.player2.updateState("attack1");
            }
            if(this.player1.state == "attack1" || this.player1.state == "attack2"){
                this.player2.moveRight(dt);
               
            }
          } 
          else {
            if (this.player2.flip) {
              this.player2.updateState("run");
              this.player2.moveLeft(dt);
            } else {
              this.player2.updateState("run");
              this.player2.moveRight(dt);
            }
          }
        }

}
}