ig.module(
  'game.entities.truck'
)
.requires(
  'impact.entity',
  'plugins.box2d.entity'
)
.defines(function() {
  EntityTruck = ig.Box2DEntity.extend({
    animSheet: new ig.AnimationSheet('media/truck.png', 220, 140),
    backingUp: true,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.NEVER,
    offset: { x: 0, y: 10 },
    type: ig.Entity.TYPE.B,
    size: { x: 220, y: 130 },
    
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 1, [0]);

      if(!ig.global.wm) {
        this.body.SetFixedRotation(true);
      }
    },
    
    update: function() {
      if(this.backingUp) {
        if(this.pos.x > (ig.system.width - this.size.x / 2)) {
          this.body.ApplyForce(new Box2D.Common.Math.b2Vec2(-1800, 0), this.body.GetPosition());
        }
        else {
          this.backingUp = false;
        }
      }
      this.parent();
    }
  });
});