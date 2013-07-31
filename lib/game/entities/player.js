ig.module(
  'game.entities.player'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityPlayer = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/player.png', 64, 80),
    checkAgainst: ig.Entity.TYPE.NONE,
    collides: ig.Entity.COLLIDES.NEVER,
    offset: { x: 0, y: 0 },
    size: { x: 64, y: 80 },
    type: ig.Entity.TYPE.A,

    init: function(x, y, settings) {
      this.addAnim('idle', 1, [0]);
      this.parent(x, y, settings);
    }
  });
});