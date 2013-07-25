ig.module(
  'game.entities.truck'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityTruck = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/truck.png', 220, 140),
    backingUp: true,
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.B,
    size: { x: 220, y: 140 },
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 1, [0]);
    },
    
    update: function() {
      this.parent();
      if(this.backingUp) {
        if(this.pos.x > (ig.system.width - this.size.x)) {
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