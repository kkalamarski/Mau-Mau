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

            Table.addEventListener("cardPlayed", update);
            Table.addEventListener("cardDrew", update);

            update();
        },
        'PlayersCardsRenderer': require('./Renderers/PlayersCardsRenderer'),
        'OpponentsCardsRenderer': require('./Renderers/OpponentsCardsRenderer'),
        'TableRenderer': require('./Renderers/TableRenderer'),
        'DockRenderer': require('./Renderers/DockRenderer')
    }
});