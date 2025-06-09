/**
 * Level class defines the game level's components such as enemies, items, and environmental elements.
 */
class Level {
  /**
   * Array of enemy objects including chickens, small chickens, and an endboss.
   * @type {(Chicken|SmallChicken|Endboss)[]}
   */
  enemies = [
    new Chicken(), new Chicken(), new Chicken(),
    new SmallChicken(), new SmallChicken(),
    new Endboss()
  ];

  /**
   * Array of cloud objects used for background/environment.
   * @type {Cloud[]}
   */
  clouds = [
    new Cloud(),
  ];

  /**
   * Array of ground bottle items in the level.
   * @type {GroundItems[]}
   */
  bottles = [
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[1]),
    new GroundItems(ImageHub.salsabottle[0]),
  ];

  /**
   * Array of coin items positioned in the air.
   * @type {AirItems[]}
   */
  coins = [
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
    new AirItems(ImageHub.coin[0]),
    new AirItems(ImageHub.coin[1]),
  ];

  /**
   * X-coordinate that defines the end of the level.
   * @type {number}
   * @static
   */
  static level_end_x = 3595;
}
