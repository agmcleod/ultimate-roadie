ig.module(
  'game.lib.intro'
)
.requires(
  'game.lib.dialogue'
)
.defines(function() {
  var Intro = ig.Class.extend({
    init: function() {
      this.dialogues = [new Dialogue([{
        text: 'The band Shredders of a Dieing Age have just finished a show'
      }, {
        text: 'You now need to cleanup the show by packing the gear away'
      }, {
        text: 'Your co workers have started partying a bit early, so'
      }, {
        text: "They're having trouble keeping the truck still."
      }, {
        text: 'Toss the gear in the chute up top of the truck.'
      }, {
        text: 'If you miss and break any items, the band will not be happy'
      }])];
    }
  });
});