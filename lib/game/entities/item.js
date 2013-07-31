ig.module(
  'game.entities.item'
)
.requires(
  'impact.entity',
  'plugins.box2d.entity'
)
.defines(function() {
  EntityItem = ig.Box2DEntity.extend({
    animSheet: new ig.AnimationSheet('media/items.png', 32, 32),
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.NEVER,
    offset: { x: 0, y: 0 },
    size: { x: 32, y: 32 },
    type: ig.Entity.TYPE.A,

    init: function(x, y, settings) {
      this.addAnim('amp', 1, [0]);
      this.addAnim('guitar', 1, [1]);
      this.addAnim('symbol', 1, [2]);
      this.addAnim('drum', 1, [3]);
      this.currentAnim = this.anims.amp;
      this.parent(x, y, settings);
    },

    draw: function() {
      this.parent();
    },

    launch: function(angle, power) {
      this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(power, 0), this.body.GetPosition());
    },

    update: function() {
      this.parent();
    }
  });
});