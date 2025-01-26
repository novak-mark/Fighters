export class CollisionControler {
  constructor(player1, player2, canvasWidth) {
    this.player1 = player1;
    this.player2 = player2;
    this.canvasWidth = canvasWidth;
  }
  //collison function, detect collison for game borders and player collision
  Collison() {
    //edge collison P1
    if (this.player1.x < 0) {
      this.player1.x += 1;
    }
    if (this.player1.x + this.player1.collisionbox.width > this.canvasWidth / 2) {
      this.player1.x -= 1;
    }
    //edge collison P2
    if (this.player2.x < 0) {
      this.player2.x += 1;
    }
    if (this.player2.x + this.player2.collisionbox.width > this.canvasWidth / 2) {
      this.player2.x -= 1;
    }
    //player collison
    if (
      this.player1.x + this.player1.collisionbox.width > this.player2.x &&
      this.player2.x + this.player2.collisionbox.width > this.player1.x &&
      this.player1.y + this.player1.collisionbox.height > this.player2.y &&
      this.player2.y + this.player2.collisionbox.height > this.player1.y
    ) {
      //this.x -= 1;
      //player2.x += 1;
      //console.log("collison zabil si se");
    }
  }
}
