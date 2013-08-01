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
      this.body.ApplyImpulse(new Box2D.Common.Math.b2Vec2(Math.cos(angle) * power, Math.sin(angle) * power), this.body.GetPosition());
    },

    setRandomType: function() {
      var animations = ['amp', 'guitar', 'symbol', 'drum'];
      var anim = animations[Math.floor(Math.random() * 4)];
      this.currentAnim = this.anims[anim];
      switch(anim) {
        case 'amp':
        case 'guitar':
          this.size = {x:32,y:32};
          this.offset = {x:0,y:0};
          break;
        case 'symbol':
          this.size = {x:15, y:29};
          this.offset = {x:8, y:0};
          break;
        case 'drum':
          this.size = {x:17, y:26};
          this.offset = {x:8, y:7};
          break;
        default:
          break;
      };
    },

    update: function() {
      this.parent();
      if(this.pos.x < 0 || this.pos.x > (ig.system.width + 64) || this.pos.y < 0 || this.pos.y > (ig.system.height + 64)) {
        ig.game.killItem();
      }
    }
  });
});