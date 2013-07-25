ig.module(
  'game.entities.chute'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityChute = ig.Entity.extend({
    size: {x: 10, y: 10},
    init: function(x, y, settings) {
      this.parent(x, y, settings);
    }
  });
});