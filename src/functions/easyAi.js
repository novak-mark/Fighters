import { Player } from "../classes/Player.js";




export function easySamurai(player1,player2,dt){
    let dst = Math.abs(player1.x - player2.x);

    if(player1.state == 'idle' || player1.state == 'run'){
        if(dst > 350){
            if(player2.flip){
                player2.moveleft(0.25);
            }
            else {
                player2.moveright(0.25);
            }
            player2.updateState("run");
        }
        else {

            if(player2.canAttack){

                player2.updateState("attack1");
            }
            else {
                //after attack move back
                player2.moveright(0.25);
                player2.updateState("run");
            }

        }
    }
    if(player1.state == 'attack1' && dst < 200){
        player2.moveright(0.25);
        player2.updateState("run");
    }
}