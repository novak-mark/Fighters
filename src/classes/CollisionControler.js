export class CollisionControler {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }
  //collison function, detect collison for game borders and player collision
  Collison(canvasWidth) {
    //edge collison P1
    if (this.player1.x < 0) {
      this.player1.x += 3;
    }
    if (this.player1.x + this.player1.collisionBox.width > canvasWidth) {
      this.player1.x -= 3;
    }
    //edge collison P2
    if (this.player2.x < 0) {
      this.player2.x += 3;
    }
    if (this.player2.x + this.player2.collisionBox.width > canvasWidth) {
      this.player2.x -= 3;
    }
    //player collison
    if (
      this.player1.x + this.player1.collisionBox.width > this.player2.x &&
      this.player2.x + this.player2.collisionBox.width > this.player1.x &&
      this.player1.y + this.player1.collisionBox.height > this.player2.y &&
      this.player2.y + this.player2.collisionBox.height > this.player1.y
    ) {
      //this.x -= 1;
      //player2.x += 1;
      //console.log("collison zabil si se");
    }
  }
}
