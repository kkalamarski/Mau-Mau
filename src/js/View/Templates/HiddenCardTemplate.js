function HiddenCardTemplate() {
    var g = new createjs.Graphics();
    g.setStrokeStyle(1);
    g.beginStroke("#000000");
    g.beginFill("#333333");
    g.drawRect(0, 0, 100, 150);

    var shape = new createjs.Shape(g);


    var color = '#000000';

    var textColorCenter = new createjs.Text('#', "50px Arial", color);
    textColorCenter.x = 50;
    textColorCenter.y = 50;
    textColorCenter.textAlign = 'center';

    var container = new createjs.Container();
    container.addChild(shape, textColorCenter);

    return container;
}

module.exports = HiddenCardTemplate;