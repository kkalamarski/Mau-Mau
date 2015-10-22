function TableRenderer(Table) {

    var width = (Game.View.width / 2) - 50;
    var height = (Game.View.height / 2);

    Table.cards.forEach(function (el, index) {
        var Card = new Game.View.templates.CardTemplate(el);
        Card.rotation = el.rotate;
        Card.regX = 50;
        Card.regY = 75;
        Card.x = width;
        Card.y = height;

        Game.View.stage.addChild(Card);
    });

}

module.exports = TableRenderer;