class Level {
  enemies;
  clouds;
  bottles;
  coins
  static level_end_x = 3595;

  constructor(en, cl, bl, cs) {
    this.enemies = en;
    this.clouds = cl;
    this.bottles = bl;
    this.coins = cs;
  }
}