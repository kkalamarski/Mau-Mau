window.Game = require('./src/js/Game');

var PlayingTable = Game.init();

Game.addEventListener("START_GAME", function() {
  Game.start(PlayingTable);
  PlayingTable.raiseEvent("RENDER")
});
