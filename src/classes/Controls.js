

function KeyPressed(e){
    if(e.code == 'KeyA'){
        key_A = true;
    }
    else if(e.code == 'KeyD'){
        key_D = true;
    }
    else if(e.code =='Space'){
        key_space = true;
    }
    else if (e.code =='Digit1'){
        key_1 = true;
    }
    else if(e.code == 'Digit2'){
        key_2 = true;
    }
    else if(e.code == 'ArrowLeft' && ai == false){
        key_Larrow = true;
    }
    else if(e.code == 'ArrowRight' && ai == false){
        key_Rarrow = true;
    }
    else if(e.code == 'ArrowUp' && ai == false){
        key_UParrow = true;
    }
    else if(e.code == 'Numpad1' && ai == false){
        key_Num1 = true;
    }
    else if(e.code == 'Numpad2' && ai == false){
        key_Num2 = true;
    } 
    
}
function KeyReleased(e){
    //P1 checks
    if(e.code == 'KeyA'){
        key_A = false;
        if(Player1.states[Player1.state].interuptable){
            Player1.updateState('idle');
        }
    }
    else if(e.code == 'KeyD'){
        key_D = false;
        if(Player1.states[Player1.state].interuptable){
            Player1.updateState('idle');
        }
    }
    else if(e.code == 'Space'){
        key_space = false;
    }
    else if(e.code == 'Digit1'){
        key_1 = false;  
    }
    else if(e.code == 'Digit2'){
        key_2 = false;
    }
    /*
    //P2 check, check before if AI is turned ON or not, if its ON, ignore any input from P2
    
    else if(e.code == 'ArrowLeft' && ai == false){
        key_Larrow = false;
        if(player2.states[player2.state].interuptable){
            player2.updateState('idle');
        }
    }
    else if(e.code == 'ArrowRight' && ai == false){
        key_Rarrow = false;
        if(player2.states[player2.state].interuptable){
            player2.updateState('idle');
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