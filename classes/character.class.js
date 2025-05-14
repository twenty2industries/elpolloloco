class Character extends MovableObject {
  height = 200;
  y = 230

  constructor(){ //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
  }

  jump() {
    
  }
}