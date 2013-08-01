ig.module( 
  'game.main' 
)
.requires(
  'impact.game',
  'impact.debug.debug',
  'plugins.touch-button',
  'plugins.box2d.game',
  'game.levels.end',
  'game.levels.intro',
  'game.levels.main',
  'game.entities.truck',
  'game.entities.item',
  'game.entities.player',
  'game.objects.dialogue',
  'impact.font'
)
.defines(function(){
  var condition, maxPower, minAngle, maxAngle, power, angle, amt, increasingPower, gearCollected;
  MyGame = ig.Box2DGame.extend({
    currentStage: null,
    font: new ig.Font('media/arialnarrow.png'),
    gravity: 100,
    powerBar: new ig.Image('media/bar.png'),
    throwStages: {ANGLE: 0, POWER: 1, THROW: 2},
    init: function() {
      this.reset();
      this.buttonImage = new ig.Image('media/buttons.png');
      this.truck = this.getEntitiesByType(EntityTruck)[0];
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
          //ig.music.play();
          _this.currentStage = _this.throwStages.ANGLE;
          _this.listener = new Box2D.Dynamics.b2ContactListener();
          _this.listener.BeginContact = _this.beginContact;
          _this.listener.EndContact = _this.endContact;
          ig.world.SetContactListener(_this.listener);
        }
      );

      this.endDialogue = new Dialogue([
        'You ' + condition + '. Press enter or tap next to replay'
        ],
        this.font,
        function() {

        }
      );

      ig.music.add('media/music/thewreck.ogg');
      
      this.nextButton = new ig.TouchButton('action', 360, ig.system.height - 70, 96, 64, this.buttonImage, 0);
      this.controlButtons = [
        new ig.TouchButton('increaseAngle', 380, ig.system.height - 135, 97, 65, this.buttonImage, 3),
        new ig.TouchButton('decreaseAngle', 380, ig.system.height - 65, 97, 65, this.buttonImage, 4),
        new ig.TouchButton('toss', 0, ig.system.height - 65, 97, 65, this.buttonImage, 1)
      ];
    },

    beginContact: function(contact) {
      var bodyA = contact.GetFixtureA().GetBody();
      var bodyB = contact.GetFixtureB().GetBody();
      if(bodyA.m_userData == "item" && bodyB.m_userData == "truck") {
        gearCollected++;
      }
      else if(bodyA.m_userData == "truck" && bodyB.m_userData == "item") {
        gearCollected++;
      }
      if(bodyA.m_userData == "item") {
        ig.game.killItem();
        ig.world.DestroyBody(bodyA);
      }
      else if(bodyB.m_userData == "item") {
        ig.game.killItem();
        ig.world.DestroyBody(bodyB);
      }

      console.log(gearCollected);
      
      if(gearCollected == 10) {
        ig.game.loadLevel(LevelEnd);
        condition = 'won';
        this.showEndDialogue = true;
      }
    },

    decreaseAngle: function() {
      angle += 5;
      if(angle > maxAngle) angle = maxAngle;
    },

    draw: function() {
      this.parent();
      if(this.showingDialogue) {
        this.nextButton.draw();
        this.dialogue.draw();
      }
      else if(this.showEndDialogue) {
        this.nextButton.draw();
        this.endDialogue.update();
      }
      else if(this.currentStage !== null) {
        if(this.currentStage !== this.throwStages.THROW) {
          this.controlButtons[0].draw();
          this.controlButtons[1].draw();
          this.font.draw('Angle: ' + Math.abs(angle), ig.system.width - 80, 30, ig.Font.ALIGN.LEFT);
          this.controlButtons[2].draw();
          if(this.currentStage == this.throwStages.POWER) {
            var width = Math.floor((power / maxPower) * 200);
            if(width <= 0) width = 1;
            this.powerBar.drawTile(20, 20, 0, width, 32);
          }
        }
      }
    },

    endContact: function() {
      
    },

    increaseAngle: function() {
      angle -= 5;
      if(angle < minAngle) angle = minAngle;
    },

    killItem: function() {
      this.currentItem.kill();
      this.currentStage = this.throwStages.ANGLE;
    },

    reset: function() {
      maxPower = 300;
      minAngle = -90;
      maxAngle = 0;
      power = 0;
      angle = 0;
      amt = 300;
      increasingPower = true;
      gearCollected = 0;
      this.currentStage = null;
      condition = 'lost';
      this.showingDialogue = true;
      this.showEndDialogue = false;
    },

    spawnItem: function() {
      this.currentItem = ig.game.spawnEntity(EntityItem, 70, ig.system.height - 130, {});
      this.currentItem.setRandomType();
      this.currentItem.launch(angle * Math.PI / 180, power);
    },

    toss: function() {
      if(this.currentStage == this.throwStages.ANGLE) {
        this.currentStage = this.throwStages.POWER;
      }
      else if(this.currentStage == this.throwStages.POWER) {
        this.currentStage = this.throwStages.THROW;
        this.spawnItem();
        power = 0;
      }
    },
  
    update: function() {
      // Update all entities and backgroundMaps
      this.parent();
      if(this.showingDialogue) {
        this.dialogue.update();
      }
      else if(this.showEndDialogue) {
        this.endDialogue.update();
        if(this.input.pressed('action')) {
          this.reset();
          this.LoadLevel(LevelIntro);
        }
      }
      else if(this.currentStage == this.throwStages.POWER) {
        if(increasingPower) {
          power += amt * ig.system.tick;
          if(power >= maxPower) {
            power = maxPower;
            increasingPower = false;
          }
        }
        else {
          power -= amt * ig.system.tick;
          if(power <= 0) {
            power = 0;
            increasingPower = true;
          }
        }
      }

      if(ig.input.state('increaseAngle')) {
        this.increaseAngle();
      }
      else if(ig.input.state('decreaseAngle')) {
        this.decreaseAngle();
      }
      else if(ig.input.pressed('toss')) {
        this.toss();
      }
    }
  });


  // Start the Game with 60fps, a resolution of 320x240, scaled
  // up by a factor of 2
  ig.main( '#canvas', MyGame, 60, 480, 320, 1);

});
