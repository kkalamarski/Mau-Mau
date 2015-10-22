(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Game = require('./src/js/Game');
Game.init().start();
},{"./src/js/Game":6}],2:[function(require,module,exports){
CardDock.prototype = {
    'Card': require('./Card/Card'),

    'generateFullColor': function (color) {
        var cards = [];

        for (var i = 2; i < 15; i++) {
            cards.push(new this.Card(i, color));
        }

        return cards;
    },
    'generate': function () {
        var cards = [].concat(
            this.generateFullColor('Spades'),
            this.generateFullColor('Hearts'),
            this.generateFullColor('Diams'),
            this.generateFullColor('Clubs')
        );

        this.cards = cards;
        return cards;
    },
    'shuffle': function () {
        var currentIndex = this.cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    },
    'draw': function (count) {
        var cards = [];
        if (!count) {
            count = 1;
        }
        if (this.cards.length < 2) {
            this.raiseEvent('noCards');
        }

        for (count; count > 0; count--) {
            cards.push(this.cards.shift());
        }

        return cards;
    },
    events: {},
    addEventListener: function (eventName, handler) {
        if (!(eventName in this.events))
            this.events[eventName] = [];

        this.events[eventName].push(handler);
    },

    raiseEvent: function (eventName, args) {
        var currentEvents = this.events[eventName];
        if (!currentEvents) return;

        for (var i = 0; i < currentEvents.length; i++) {
            if (typeof currentEvents[i] == 'function') {
                currentEvents[i](args);
            }
        }
    }
};

function CardDock() {
    var me = this;

    this.cards = [];
}

module.exports = CardDock;
},{"./Card/Card":3}],3:[function(require,module,exports){
function Card(number, color){
    var me = this;

    me.value = number;
    me.color = color;
}

module.exports = Card;
},{}],4:[function(require,module,exports){
Player.prototype = {
    'playCard': function (index) {
        var item = this.cards[index];
        this.cards.splice(index, 1);

        return [item];
    },
    'drawCard': function (cards) {
        console.info(this.name + ' draws a card.');
        this.cards = this.cards.concat(cards);
    },
    events: {},
    addEventListener: function (eventName, handler) {
        if (!(eventName in this.events))
            this.events[eventName] = [];

        this.events[eventName].push(handler);
    },

    raiseEvent: function (eventName, args) {
        var currentEvents = this.events[eventName];
        if (!currentEvents) return;

        for (var i = 0; i < currentEvents.length; i++) {
            if (typeof currentEvents[i] == 'function') {
                currentEvents[i](args);
            }
        }
    },
    'findTheBestCard': function (lastCard) {
        var found = false;
        this.cards.forEach(function (Card, index) {
            if (Card.value === lastCard.value) {
                found = index;
            }
        });
        if (!found) {
            this.cards.forEach(function (Card, index) {
                if (Card.color === lastCard.color) {
                    found = index;
                }
            });
        }
        return found;
    }

};

function Player(name, computer) {
    var me = this;

    me.computer = computer | true;
    me.name = name;
    me.points = 0;
    me.cards = [];
}

module.exports = Player;
},{}],5:[function(require,module,exports){
PlayingTable.prototype = {
    'distribute': function (count) {
        var me = this;
        this.Players.forEach(function (element, index, array) {
            element.drawCard(me.Dock.draw(count));
        });
    },
    'playCard': function (cards) {
        var me = this;
        cards.forEach(function (el) {
            el.rotate = Math.floor((Math.random() * 360) + 1);
            console.info(me.Players[me.activePlayer].name + ' plays', el.value, el.color + '.');
        });
        this.cards = this.cards.concat(cards);

        this.raiseEvent('cardPlayed');
    },
    events: {},
    addEventListener: function (eventName, handler) {
        if (!(eventName in this.events))
            this.events[eventName] = [];

        this.events[eventName].push(handler);
    },

    raiseEvent: function (eventName, args) {
        var currentEvents = this.events[eventName];
        if (!currentEvents) return;

        for (var i = 0; i < currentEvents.length; i++) {
            if (typeof currentEvents[i] == 'function') {
                currentEvents[i](args);
            }
        }
    }
};

function PlayingTable(Dock, Players) {
    var me = this;

    me.Dock = Dock;
    me.Players = Players;

    me.Dock.addEventListener('noCards', function(){
        var card = me.cards.pop();
        var newDock = me.cards;
        me.cards = [card];

        me.Dock.cards = me.Dock.cards.concat(newDock);
        me.Dock.shuffle();
        me.raiseEvent('cardDrew');
    });

    me.cards = [];
    me.activePlayer = 1;

    // Logic for players
    me.turn = function (Player) {
        var timer;
        if (Player.computer) {
            timer = setTimeout(function () {
                var bestCard = Player.findTheBestCard(me.cards[me.cards.length - 1]);
                if (bestCard === false) {
                    Player.drawCard(me.Dock.draw(1));
                    me.raiseEvent('cardDrew');
                } else {
                    me.playCard(Player.playCard(bestCard));
                }
                me.nextPlayer();
                console.info('Next turn: ' + me.Players[me.activePlayer].name);
            }, 500);
        } else {
            timer = setTimeout(function () {
                me.nextPlayer();
                console.info('Next turn: ' + me.Players[me.activePlayer].name);
            }, 15000);
        }
    };


    me.nextPlayer = function () {
        var playersCount = me.Players.length - 1;
        if (me.Players[me.activePlayer].cards.length > 0) {
            me.activePlayer++;
            if (me.activePlayer > playersCount) {
                me.activePlayer = 0;
            }
            me.turn(Players[me.activePlayer]);
        } else {
            console.info(me.Players[me.activePlayer].name + ' won.');
        }
    };
}

module.exports = PlayingTable;
},{}],6:[function(require,module,exports){
module.exports = {
    'PlayingTable': require('./PlayingTable/PlayingTable'),
    'CardDock': require('./CardDock/CardDock'),
    'Player': require('./Player/Player'),

    'View': require('../View'),
    'init': function(){
        Game.View.stage.enableMouseOver(20);
        return this;
    },
    'start': function(){
        console.info('Game Started.');
        var Dock = new this.CardDock();
        Dock.generate();
        Dock.shuffle();

        /*
        TODO: Generate them
         */
        var Players = [
            new this.Player('Tom'),
            new this.Player('Andrew'),
            new this.Player('Bruce'),
            new this.Player('Matthew')
        ];

        var Table = new this.PlayingTable(Dock, Players);
        Table.distribute(5);
        Table.playCard(Table.Dock.draw(1));
        this.View.renderers.init(Table);
        Table.nextPlayer();
        return Table;
    }
};

},{"../View":13,"./CardDock/CardDock":2,"./Player/Player":4,"./PlayingTable/PlayingTable":5}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{"./Renderers/DockRenderer":7,"./Renderers/OpponentsCardsRenderer":8,"./Renderers/PlayersCardsRenderer":9,"./Renderers/TableRenderer":10,"./Templates/CardTemplate":11,"./Templates/HiddenCardTemplate":12}]},{},[1]);
