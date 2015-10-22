function TableRenderer(Table) {

    var width = Game.View.width - 200;
    var height = (Game.View.height / 2);

    var Card = new Game.View.templates.HiddenCardTemplate();
    Card.regX = 50;
    Card.regY = 75;
    Card.x = width;
    Card.y = height;

    Card.addEventListener("click", function () {
        if (Table.activePlayer === 0) {
            Table.Players[0].drawCard(Table.Dock.draw(1));
            Table.raiseEvent('cardDrew');
        }
    });

    Game.View.stage.addChild(Card);
}

module.exports = TableRenderer;