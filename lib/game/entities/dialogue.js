ig.module(
  'game.entities.dialogue'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityDialogue = ig.Entity.extend({
    init: function(messages, font, callback, x, y) {
      this.currentText = 0;
      this.width = 400;
      this.callback = callback;
      this.font = font;
      this.texts = this.parseMessages(messages);
      this.pos = {
        x: x || 20,
        y: y || 20
      }
    },

    draw: function() {
      var textObject = this.texts[this.currentText];
      if(textObject) {
        for(var i = 0; i < textObject.texts.length; i++) {
          this.font.draw(textObject.texts[i], this.pos.x, this.pos.y + (i * this.pos.y), ig.Font.ALIGN.LEFT);
        }
        
      }
    },

    nextText: function() {
      this.currentText++;
      if(this.texts[this.currentText] === null || typeof this.texts[this.currentText] === 'undefined') {
        this.callback();
      }
    },

    parseMessages: function(messages) {
      var texts = [];
      for(var i = 0; i < messages.length; i++) {
        var obj = { texts: [''] };
        var words = messages[i].split(" ");
        var currentWidth = 0;
        var tIndex = 0;
        for(var w = 0; w < words.length; w++) {
          currentWidth += this.font.widthForString(words[i] + " ");
          if(currentWidth > this.width) {
            tIndex++;
            currentWidth = 0;
            obj.texts[tIndex] = words[w] + ' ';
          }
          else {
            obj.texts[tIndex] += words[w] + ' ';
          }
        }
        texts.push(obj);
      }
      return texts;
    },
    
    update: function() {
      this.parent();
      if(ig.input.pressed('action')) {
        this.nextText();
      }
    }
  });
});