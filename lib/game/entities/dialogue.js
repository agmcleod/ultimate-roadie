ig.module(
  'game.entities.dialogue'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityDialogue = ig.Entity.extend({
    init: function(texts, callback, font) {
      this.currentText = 0;
      this.width = 400;
      this.callback = callback;
      this.font = font;
      this.texts = texts;
    },

    draw: function() {
      var text = this.texts[this.currentText];
      if(text)
        font.draw(text, 20, 20, ig.Font.ALIGN.LEFT);
    },

    nextText: function() {
      this.currentText++;
      if(this.texts[this.currentText] === null || typeof this.texts[currentText] === 'undefined') {
        this.callback();
      }
    },
    
    update: function() {
      this.parent();
      if(ig.input.pressed('next')) {
        this.nextText();
      }
    }
  });
});