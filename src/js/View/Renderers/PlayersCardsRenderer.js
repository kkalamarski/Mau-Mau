function PlayersCardsRenderer(Table) {
    var width = Game.View.width / 2;
    var elementsWidth = (Table.Players[0].cards.length * 30) / 2;
    var position = width - elementsWidth;

    Table.Players[0].cards.forEach(function (el, index) {
        var Card = new Game.View.templates.CardTemplate(el);
        Card.x = position;
        Card.y = Game.View.height - 160;

        Card.addEventListener("mouseover", function () {
            Card.y -= 100;
            Game.View.stage.update();
        });

        Card.addEventListener("mouseout", function () {
            Card.y += 100;
            Game.View.stage.update();
        });

        Card.addEventListener("click", function () {
            if (Table.activePlayer === 0) {
                Table.playCard(Table.Players[0].playCard(index));
            }
        });

        Game.View.stage.addChild(Card);
        position += 30;
    });
}

module.exports = PlayersCardsRenderer;