ig.module( 'game.levels.main' )
.requires( 'impact.image' )
.defines(function(){
LevelMain=/*JSON[*/{"entities":[],"layer":[{"name":"background","width":3,"height":2,"linkWithCollision":false,"visible":1,"tilesetName":"media/background.png","repeat":false,"preRender":false,"distance":"1","tilesize":160,"foreground":false,"data":[[1,2,3],[4,5,6]]},{"name":"buildings","width":3,"height":2,"linkWithCollision":false,"visible":true,"tilesetName":"media/buildings.png","repeat":false,"preRender":false,"distance":"1.2","tilesize":160,"foreground":false,"data":[[1,2,3],[4,5,6]]},{"name":"fence","width":3,"height":2,"linkWithCollision":false,"visible":true,"tilesetName":"media/fence.png","repeat":false,"preRender":false,"distance":"1","tilesize":160,"foreground":false,"data":[[0,0,0],[1,1,1]]}]}/*]JSON*/;
LevelMainResources=[new ig.Image('media/background.png'), new ig.Image('media/buildings.png'), new ig.Image('media/fence.png')];
});