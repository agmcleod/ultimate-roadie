ig.module(
  'game.lib.dialogue'
)
.defines(function() {
  var Dialogue = ig.Class.extend({
    init: function(texts) {
      this.currentText = 0;
    },
    
    update: function() {
      this.parent();
    }
  });
});