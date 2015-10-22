function OpponentsCardsRenderer(Table) {
    var width = Game.View.width / 2;
    var elementsWidth = (Table.Players[0].cards.length * 30) / 2;
    var position = width - elementsWidth;

    Table.Players.forEach(function (Player, index) {
        if (index !== 0) {
            var elementsWidth, position, diff;
            elementsWidth = (Player.cards.length * 30) / 2;
            switch (index) {
                case 1:
                    diff = {
                        x: 0,
                        y: 30
                    };
                    position = {
                        x: 0,
                        y: (Game.View.height / 2) - elementsWidth
                    };
                    break;
                case 2:
                    diff = {
                        x: 30,
                        y: 0
                    };
                    position = {
                        x: (Game.View.width) / 2 - elementsWidth,
                        y: 0
                    };
                    break;
                case 3:
                    diff = {
                        x: 0,
                        y: 30
                    };
                    position = {
                        x: Game.View.width,
                        y: (Game.View.height / 2) - elementsWidth
                    };
                    break;
                default:
                    throw 'lol';
            }

            Player.cards.forEach(function () {
                var Card = new Game.View.templates.HiddenCardTemplate();
                Card.x = position.x;
                Card.y = position.y;
                Card.regX = 50;
                Card.regY = 75;
                if (index === 1 || index === 3) {
                    Card.rotation = 90;
                }

                Game.View.stage.addChild(Card);
                position.x += diff.x;
                position.y += diff.y;
            });
        }
    });
}

module.exports = OpponentsCardsRenderer;