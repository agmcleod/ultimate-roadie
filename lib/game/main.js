ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'game.levels.main',
  'impact.font'
)
.defines(function(){

  MyGame = ig.Game.extend({
    init: function() {
      this.loadLevel(LevelMain);
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
