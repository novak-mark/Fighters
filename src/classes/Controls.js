import { Player } from "./Player.js";

//player input, when key is pressed set that key to true, when the key is not pressedset that key to false
const controlMap = {
   
    //Player 1 controls
    "keyA":        false,
    "keyD":        false,
    "key1":        false,
    "key2":        false,
    "keySpace":    false,

    //Player 2 controls (only avaiable if AI is turned off)
    "keyLarrow":   false,
    "keyRarrow":   false,
    "keyNum1":     false,
    "keyNum2":     false,
    "keyUParrow":  false
}

export class Controls {
  constructor(document, player) {
    this.document = document;
    this.player = player;
  }
  init() {
    this.document.addEventListener("keydown", (e) => this.KeyPressed(e));
    this.document.addEventListener("keyup",   (e) => this.KeyReleased(e));
  }

  KeyPressed(e) {
    if (e.code == "KeyA") {
      controlMap["keyA"] = true;
    } else if (e.code == "KeyD") {
      controlMap["keyD"] = true;
    } else if (e.code == "Space") {
      controlMap["keySpace"] = true;
    } else if (e.code == "Digit1") {
      controlMap["key1"] = true;
    } else if (e.code == "Digit2") {
      controlMap["key2"] = true;
    } else if (e.code == "ArrowLeft" && ai == false) {
      controlMap["keyLarrow"] = true;
    } else if (e.code == "ArrowRight" && ai == false) {
      controlMap["keyRarrow"] = true;
    } else if (e.code == "ArrowUp" && ai == false) {
      controlMap["keyUParrow"] = true;
    } else if (e.code == "Numpad1" && ai == false) {
      controlMap["keyNum1"] = true;
    } else if (e.code == "Numpad2" && ai == false) {
      controlMap["keyNum2"] = true;
    }
  }
  KeyReleased(e) {
    //P1 checks
    if (e.code == "KeyA") {
      controlMap["keyA"] = false;
      if (this.player.states[this.player.state].interuptable) {
        this.player.updateState("idle");
      }
    } else if (e.code == "KeyD") {
      controlMap["keyD"] = false;
      if (this.player.states[this.player.state].interuptable) {
        this.player.updateState("idle");
      }
    } else if (e.code == "Space") {
      controlMap["keySpace"] = false;
    } else if (e.code == "Digit1") {
      controlMap["key1"] = false;
    } else if (e.code == "Digit2") {
      controlMap["key2"] = false;
    }
    /*
        //P2 check, check before if AI is turned ON or not, if its ON, ignore any input from P2
        
        else if(e.code == 'ArrowLeft' && ai == false){
            key_Larrow = false;
            if(this.player2.states[this.player2.state].interuptable){
                this.player2.updateState('idle');
            }
        }
        else if(e.code == 'ArrowRight' && ai == false){
            key_Rarrow = false;
            if(this.player2.states[this.player2.state].interuptable){
                this.player2.updateState('idle');
            }
        }
        else if(e.code == 'ArrowUp' && ai == false){
            key_UParrow = false;
        }
        else if(e.code == 'Numpad1' && ai == false){
            key_Num1 = false;
        } 
        else if(e.code == 'Numpad2' && ai == false){
            key_Num2 = false;
        }
        */
  }

  ControlHandler() {
    console.log("halo");
    //disable movement if this.player is attacking
    if (this.player.states[this.player.state].interuptable) {
      if (controlMap["keyA"]) {
        this.player.moveleft();
        this.player.updateState("run");
      } else if (controlMap["keyD"]) {
        this.player.moveright();
        this.player.updateState("run");
      } else if (controlMap["keySpace"]) {
        this.player.jump();
        this.player.updateState("jump");
      } else if (controlMap["key1"]) {
        //this.updateState('attack1');
        this.player.isAttacking = true;
        this.player.updateState("attack1");
      } else if (controlMap["key2"]) {
        this.player.isAttacking = true;
      }
    }
  }
}
