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
  'game.entities.item',
  'game.entities.player',
  'game.objects.dialogue',
  'impact.font'
)
.defines(function(){
  var maxPower = 300;
  var minAngle = -90;
  var maxAngle = 0;
  var power = 0;
  var angle = 0;
  MyGame = ig.Box2DGame.extend({
    currentStage: null,
    font: new ig.Font('media/arialnarrow.png'),
    gravity: 100,
    throwStages: {ANGLE: 0, THROW: 1},
    init: function() {
      this.buttonImage = new ig.Image('media/buttons.png');
      this.truck = this.getEntitiesByType(EntityTruck)[0];
      this.showingDialogue = true;
      this.loadLevel(LevelIntro);

      ig.input.bind(ig.KEY.ENTER, 'action');
      ig.input.bind(ig.KEY.UP_ARROW, 'increaseAngle');
      ig.input.bind(ig.KEY.DOWN_ARROW, 'decreaseAngle');

      var _this = this;

      this.dialogue = new Dialogue([
        'The band Shredders of a Dieing Age have just finished a show.',
        'You now need to cleanup the show by packing the gear away.',
        "Your co workers have started partying a bit early, so they're having trouble keeping the truck steady.",
        'Toss the gear on the top of the truck.',
        'If you miss and break any items, the band will not be happy.'
        ],
        this.font,
        function() {
          _this.loadLevel(LevelMain);
          _this.showingDialogue = false;
          ig.music.volume = 0.6;
          ig.music.play();
          _this.currentStage = _this.throwStages.ANGLE;
        }
      );

      ig.music.add('media/music/thewreck.ogg');
      
      this.nextButton = new ig.TouchButton('action', 360, ig.system.height - 70, 96, 64, this.buttonImage, 0);
      this.controlButtons = [
        new ig.TouchButton('increaseAngle', 370, ig.system.height - 140, 97, 65, this.buttonImage, 3),
        new ig.TouchButton('decreaseAngle', 370, ig.system.height - 70, 97, 65, this.buttonImage, 4),
        new ig.TouchButton('toss', 0, ig.system.height - 65, 97, 65, this.buttonImage, 1)
      ];

      var listener = new Box2D.Dynamics.b2ContactListener();
      listener.BeginContact = this.beginContact;
      listener.EndContact = this.endContact;
    },

    beginContact: function() {

    },

    decreaseAngle: function() {
      angle += 5;
      if(angle > 0) angle = 0;
    },

    draw: function() {
      this.parent();
      if(this.showingDialogue) {
        if(this.nextButton) this.nextButton.draw();
        this.dialogue.draw();
      }
      else if(this.currentStage !== null) {
        if(this.currentStage == this.throwStages.ANGLE) {
          this.controlButtons[0].draw();
          this.controlButtons[1].draw();
          this.font.draw('Angle: ' + Math.abs(angle), ig.system.width - 80, 30, ig.Font.ALIGN.LEFT);
          this.controlButtons[2].draw();
        }
      }
    },

    endContact: function() {

    },

    increaseAngle: function() {
      angle -= 5;
      if(angle < -90) angle = -90;
    },

    spawnItem: function() {
      this.currentItem = ig.game.spawnEntity(EntityItem, 70, ig.system.height - 130, {});
      this.currentItem.setRandomType();
      this.currentItem.launch(angle, power);
    },
  
    update: function() {
      // Update all entities and backgroundMaps
      this.parent();
      if(this.showingDialogue) {
        this.dialogue.update();
      }

      if(ig.input.state('increaseAngle')) {
        this.increaseAngle();
      }
      else if(ig.input.state('decreaseAngle')) {
        this.decreaseAngle();
      }
    }
  });


  // Start the Game with 60fps, a resolution of 320x240, scaled
  // up by a factor of 2
  ig.main( '#canvas', MyGame, 60, 480, 320, 1);

});
