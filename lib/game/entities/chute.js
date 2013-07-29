ig.module(
  'game.entities.chute'
)
.requires(
  'impact.entity',
  'plugins.box2d.entity'
)
.defines(function() {
  EntityChute = ig.Box2DEntity.extend({
    animSheet: new ig.AnimationSheet('media/chute.png', 64, 64),
    backingUp: true,
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.NEVER,
    size: {x: 64, y: 64},
    type: ig.Entity.TYPE.B,
    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 1, [0]);
      if(!ig.global.wm) {
        this.body.SetFixedRotation(true);
      }
    }
  });
});