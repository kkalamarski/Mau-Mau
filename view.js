Game.View.stage = new createjs.Stage("game");
Game.View.stage.enableMouseOver(20);

Game.View.renderer = document.getElementById("game");
Game.View.height = Game.View.renderer.height;
Game.View.width = Game.View.renderer.width;

Table = Game.start();

function renderCards() {
    Game.View.stage.removeAllChildren();
    var width = Game.View.width / 2;
    var elementsWidth = (Table.Players[0].cards.length * 30) / 2;
    var position = width - elementsWidth;
    Table.Players[0].cards.forEach(function (el, index) {
        var g = new createjs.Graphics();
        g.setStrokeStyle(1);
        g.beginStroke("#000000");
        g.beginFill("#FFFFFF");
        g.drawRect(0, 0, 100, 150);

        var shape = new createjs.Shape(g);

        var value = '';
        switch (el.value) {
            case 11:
                value = 'J';
                break;
            case 12:
                value = 'Q';
                break;
            case 13:
                value = 'K';
                break;
            case 14:
                value = 'A';
                break;
            default:
                value = el.value;
        }

        function decodeHtml(html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }

        var color = '';
        if (['Spades', 'Clubs'].indexOf(el.color) === -1) {
            color = '#FF0000';
        } else {
            color = '#000000';
        }
        var colorText = decodeHtml('&' + el.color.toLowerCase() + ';');

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
        container.x = position;
        container.y = Game.View.height - 160;
        container.addEventListener("mouseover", function () {
            container.y -= 100;
            Game.View.stage.update();
        });
        container.addEventListener("mouseout", function () {
            container.y += 100;
            Game.View.stage.update();
        });

        container.addEventListener("click", function () {
            console.info(Table.Players[0].name + ' plays', value, el.color + '.');
            console.info(Table.cards);
            Table.Players[0].playCard(index);

            renderCards();
        });

        Game.View.stage.addChild(container);
        position += 30;
    });

    Game.View.stage.update();
}

renderCards();