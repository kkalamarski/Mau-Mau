function CardTemplate(CardModel) {
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill("#FFFFFF");
    g.drawRect(0, 0, 100, 150);

    var shape = new createjs.Shape(g);

    var value = Game.View.helpers.getCardValue(CardModel.value);

    var color = '';
    if (['Spades', 'Clubs'].indexOf(CardModel.color) === -1) {
        color = '#FF0000';
    } else {
        color = '#000000';
    }
    var colorText = Game.View.helpers.decodeHtml('&' + CardModel.color.toLowerCase() + ';');

    var textValueTop = new createjs.Text(value, "20px Arial", color);
    textValueTop.x = 5;
    textValueTop.y = 5;

    var textValueBottom = new createjs.Text(value, "20px Arial", color);
    textValueBottom.x = 95;
    textValueBottom.y = 125;
    textValueBottom.textAlign = 'right';

    var textColorTop = new createjs.Text(colorText, "20px Arial", color);
    textColorTop.x = 95;
    textColorTop.y = 5;
    textColorTop.textAlign = 'right';


    var textColorBottom = new createjs.Text(colorText, "20px Arial", color);
    textColorBottom.x = 5;
    textColorBottom.y = 125;

    var textColorCenter = new createjs.Text(colorText, "50px Arial", color);
    textColorCenter.x = 50;
    textColorCenter.y = 50;
    textColorCenter.textAlign = 'center';

    var container = new createjs.Container();
    container.addChild(shape, textValueTop, textValueBottom, textColorCenter, textColorTop, textColorBottom);

    return container;
}

module.exports = CardTemplate;