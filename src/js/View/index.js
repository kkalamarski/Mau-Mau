module.exports = Object.create({
    'stage': new createjs.Stage("game"),
    'renderer': document.getElementById("game") | {},
    'width': (document.getElementById("game") && document.getElementById("game").width)? document.getElementById("game").width : 800,
    'height': (document.getElementById("game") && document.getElementById("game").height)? document.getElementById("game").height : 600,
    'helpers': {
        'getCardValue': function (value) {
            switch (value) {
                case 11:
                    return 'J';
                case 12:
                    return 'Q';
                case 13:
                    return 'K';
                case 14:
                    return 'A';
                default:
                    return value;
            }
        },
        'decodeHtml': function (html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }
    },
    'templates': {
        'CardTemplate': require('./Templates/CardTemplate'),
        'HiddenCardTemplate': require('./Templates/HiddenCardTemplate')
    },
    'renderers': {
        'init': function (Table) {
            var me = this;

            var update = function(){
                Game.View.stage.removeAllChildren();
                me.TableRenderer(Table);
                me.PlayersCardsRenderer(Table);
                me.OpponentsCardsRenderer(Table);
                me.DockRenderer(Table);
                Game.View.stage.update();
            };

            Table.addEventListener("NEXT_PLAYER", update);
            Table.addEventListener("RENDER", update);

            var startScreen = function() {

              var width = (Game.View.width / 2) - 100;
              var height = (Game.View.height / 2) - 25;

              var g = new createjs.Graphics();
              g.setStrokeStyle(1);
              g.beginStroke("#000000");
              g.beginFill("#FFFFFF");
              g.drawRect(width, height, 200, 50);

              var shape = new createjs.Shape(g);


              var color = '#000000';

              var textColorCenter = new createjs.Text('Start The Game', "22px Arial", color);
              textColorCenter.x = width + 100;
              textColorCenter.y = height + 14;
              textColorCenter.textAlign = 'center';

              var container = new createjs.Container();
              container.addChild(shape, textColorCenter);

              container.addEventListener("click", function () {
                Game.raiseEvent('START_GAME');
              });

              Game.View.stage.addChild(container);
              Game.View.stage.update();
            };

            startScreen();
        },
        'PlayersCardsRenderer': require('./Renderers/PlayersCardsRenderer'),
        'OpponentsCardsRenderer': require('./Renderers/OpponentsCardsRenderer'),
        'TableRenderer': require('./Renderers/TableRenderer'),
        'DockRenderer': require('./Renderers/DockRenderer')
    }
});
