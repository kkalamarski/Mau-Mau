function TableRenderer(Table) {

  var width = Game.View.width - 200;
  var height = (Game.View.height / 2);

  var Card = new Game.View.templates.HiddenCardTemplate();
  Card.regX = 50;
  Card.regY = 75;
  Card.x = width;
  Card.y = height;

  Card.addEventListener("click", function () {
    Table.raiseEvent('PLAYER_DRAWS_A_CARD');
  });

  Game.View.stage.addChild(Card);
}

module.exports = TableRenderer;
