ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'plugins.touch-button',
  'game.levels.intro',
  'game.levels.main',
  'game.entities.truck',
  'game.entities.chute',
  'game.entities.dialogue',
  'impact.font'
)
.defines(function(){

  MyGame = ig.Game.extend({
    init: function() {
      this.buttonImage = new ig.Image('media/buttons.png');
      this.font = new ig.Font('media/arialnarrow.png');
      this.loadLevel(LevelIntro);
      this.truck = this.getEntitiesByType(EntityTruck)[0];
      ig.input.bind(ig.KEY.ENTER, 'action');
      this.showingDialogue = true;

      var _this = this;

      this.dialogue = new EntityDialogue([{
          text: 'The band Shredders of a Dieing Age have just finished a show'
        }, {
          text: 'You now need to cleanup the show by packing the gear away'
        }, {
          text: 'Your co workers have started partying a bit early, so'
        }, {
          text: "They're having trouble keeping the truck still."
        }, {
          text: 'Toss the gear in the chute up top of the truck.'
        }, {
          text: 'If you miss and break any items, the band will not be happy'
        }],
        this.font,
        function() {
          _this.loadLevel(LevelMain);
          _this.showingDialogue = false;
        }
      );
      if(ig.ua.mobile) {
        this.nextButton = new ig.TouchButton('action', 360, ig.system.height - 70, 96, 64, this.buttonImage, 0);
      }
    },

    draw: function() {
      this.parent();
      if(this.showingDialogue) {
        if(this.nextButton) this.nextButton.draw();
        this.dialogue.draw();
      }
    },
  
    update: function() {
      // Update all entities and backgroundMaps
      this.parent();
    
      // Add your own, additional update code here
    }
  });


  // Start the Game with 60fps, a resolution of 320x240, scaled
  // up by a factor of 2
  ig.main( '#canvas', MyGame, 60, 480, 320, 1);

});
