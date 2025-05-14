class Character extends MovableObject {
  height = 200;
  y = 230
  IMAGES_WALKING = [
      'img/2_character_pepe/2_walk/W-21.png',
      'img/2_character_pepe/2_walk/W-22.png',
      'img/2_character_pepe/2_walk/W-23.png',
      'img/2_character_pepe/2_walk/W-24.png',
      'img/2_character_pepe/2_walk/W-25.png',
      'img/2_character_pepe/2_walk/W-26.png'
    ];

  constructor(){ //wird immer als aller erstes ausgeführt sobald new Character erstellt wird
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate(){
    setInterval(() => {
    let i = this.currentImage % this.IMAGES_WALKING.length; 
    // let i = 0 % 6 
    let path = this.IMAGES_WALKING[i];
    this.img = this.imageCache[path];
    this.currentImage++;
    }, 100);
  }

  jump() {
    
  }
}