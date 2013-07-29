ig.module(
  'game.entities.item'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityItem = ig.Entity.extend({
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

    init: function() {

    },

    draw: function() {
      this.parent();
    },

    update: function() {
      this.parent();
    }
  });
});