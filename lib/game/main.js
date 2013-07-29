ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'impact.debug.debug',
  'plugins.touch-button',
  'plugins.box2d.game',
  'game.levels.intro',
  'game.levels.main',
  'game.entities.truck',
  'game.entities.chute',
  'game.objects.dialogue',
  'impact.font'
)
.defines(function(){

  MyGame = ig.Box2DGame.extend({
    font: new ig.Font('media/arialnarrow.png'),
    gravity: 100,
    init: function() {
      this.buttonImage = new ig.Image('media/buttons.png');
      this.truck = this.getEntitiesByType(EntityTruck)[0];
      this.showingDialogue = true;
      this.loadLevel(LevelIntro);

      ig.input.bind(ig.KEY.ENTER, 'action');

      var _this = this;

      this.dialogue = new Dialogue([
        'The band Shredders of a Dieing Age have just finished a show.',
        'You now need to cleanup the show by packing the gear away.',
        "Your co workers have started partying a bit early, so they're having trouble keeping the truck steady.",
        'Toss the gear in the chute up top of the truck.',
        'If you miss and break any items, the band will not be happy.'
        ],
        this.font,
        function() {
          _this.loadLevel(LevelMain);
          _this.showingDialogue = false;
        }
      );
      //if(ig.ua.mobile)
      this.nextButton = new ig.TouchButton('action', 360, ig.system.height - 70, 96, 64, this.buttonImage, 0);
      this.controlButtons = [
        new ig.TouchButton('high', 360, ig.system.height - 140, 96, 64, this.buttonImage, 3),
        new ig.TouchButton('low', 360, ig.system.height - 70, 96, 64, this.buttonImage, 4),
        new ig.TouchButton('toss', 0, ig.system.height - 70, 96, 64, this.buttonImage, 1),
        new ig.TouchButton('setAngle', 0, ig.system.height - 70, 96, 64, this.buttonImage, 2)
      ];
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
      if(this.showingDialogue) {
        this.dialogue.update();
      }
    
      // Add your own, additional update code here
    }
  });


  // Start the Game with 60fps, a resolution of 320x240, scaled
  // up by a factor of 2
  ig.main( '#canvas', MyGame, 60, 480, 320, 1);

});
