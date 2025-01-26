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
  constructor(document, player1,player2,ai) {
    this.document = document;
    this.player1 = player1;
    this.player2 = player2;
    this.ai = ai;
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
    } else if (e.code == "ArrowLeft" && this.ai == false) {
      controlMap["keyLarrow"] = true;
    } else if (e.code == "ArrowRight" && this.ai == false) {
      controlMap["keyRarrow"] = true;
    } else if (e.code == "ArrowUp" && this.ai == false) {
      controlMap["keyUParrow"] = true;
    } else if (e.code == "Numpad1" && this.ai == false) {
      controlMap["keyNum1"] = true;
    } else if (e.code == "Numpad2" && this.ai == false) {
      controlMap["keyNum2"] = true;
    }
  }
  KeyReleased(e) {
    //P1 checks
    if (e.code == "KeyA") {
      controlMap["keyA"] = false;
      if (this.player1.states[this.player1.state].interuptable) {
        this.player1.updateState("idle");
      }
    } else if (e.code == "KeyD") {
      controlMap["keyD"] = false;
      if (this.player1.states[this.player1.state].interuptable) {
        this.player1.updateState("idle");
      }
    } else if (e.code == "Space") {
      controlMap["keySpace"] = false;
    } else if (e.code == "Digit1") {
      controlMap["key1"] = false;
    } else if (e.code == "Digit2") {
      controlMap["key2"] = false;
    }

    //P2 check, check before if AI is turned ON or not, if its ON, ignore any input from P2
    else if (e.code == "ArrowLeft" && this.ai == false) {
      controlMap["keyLarrow"] = false;
      if (this.player2.states[this.player2.state].interuptable) {
        this.player2.updateState("idle");
      }
    } 
    else if (e.code == "ArrowRight" && this.ai == false) {
      controlMap["keyRarrow"] = false;
      if (this.player2.states[this.player2.state].interuptable) {
        this.player2.updateState("idle");
      }
    } 
    else if (e.code == "ArrowUp" && this.ai == false) {
      controlMap["keyUParrow"] = false;
    } 
    else if (e.code == "Numpad1" && this.ai == false) {
      controlMap["keyNum1"] = false;
    } 
    else if (e.code == "Numpad2" && this.ai == false) {
      controlMap["keyNum2"] = false;
    }
        
  }

  ControlHandler() {
    //disable movement if this.player is attacking
    if (this.player1.states[this.player1.state].interuptable) {
      if (controlMap["keyA"]) {
        this.player1.moveleft();
        this.player1.updateState("run");
      } 
      else if (controlMap["keyD"]) {
        this.player1.moveright();
        this.player1.updateState("run");
      } 
      else if (controlMap["keySpace"]) {
        this.player1.jump();
        this.player1.updateState("jump");
      } 
      else if (controlMap["key1"] && this.player1.canAttack) {
        this.player1.updateState("attack1");
      } 
      else if (controlMap["key2"]) {
        this.player1.isAttacking = true;
      }
    }
    if(this.player2.states[this.player2.state].interuptable){
      if(controlMap["keyLarrow"]){
        this.player2.moveleft();
        this.player2.updateState("run");
      }
      if(controlMap["keyRarrow"]){
        this.player2.moveright();
        this.player2.updateState("run");
      }
      if(controlMap["keyNum1"]){
        this.player2.isAttacking = true;
        this.player2.updateState("attack1");
      }
    }
  }
}
