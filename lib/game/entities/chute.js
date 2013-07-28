ig.module(
  'game.entities.chute'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityChute = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/chute.png', 64, 64),
    backingUp: true,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.PASSIVE,
    size: {x: 64, y: 64},
    type: ig.Entity.TYPE.B,
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 1, [0]);
    },

    update: function() {
      this.parent();
      if(this.backingUp) {
        // 180 is offset compared to truck
        if(this.pos.x > (ig.system.width - 180)) {
          this.vel.x = -30;
        }
        else {
          this.vel.x = 0;
          this.backingUp = false;
        }
      }
    }
  });
});