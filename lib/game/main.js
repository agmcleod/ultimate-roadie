ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'game.lib.dialogue',
  'game.lib.intro',
  'game.levels.main',
  'game.entities.truck',
  'game.entities.chute',
  'impact.font'
)
.defines(function(){

  MyGame = ig.Game.extend({
    font: new ig.Font('media/arialnarrow.png'),
    init: function() {
      this.loadLevel(LevelMain);
      this.truck = this.getEntitiesByType(EntityTruck)[0];
    },
  
    update: function() {
      // Update all entities and backgroundMaps
      this.parent();
    
      // Add your own, additional update code here
    },
  
    draw: function() {
      // Draw all entities and backgroundMaps
      this.parent();
    }
  });


  // Start the Game with 60fps, a resolution of 320x240, scaled
  // up by a factor of 2
  ig.main( '#canvas', MyGame, 60, 480, 320, 1);

});
