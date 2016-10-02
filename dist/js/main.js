(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

window.Game = require('./src/js/Game');

var PlayingTable = Game.init();

Game.addEventListener("START_GAME", function () {
  Game.start(PlayingTable);
  PlayingTable.raiseEvent("RENDER");
});

},{"./src/js/Game":6}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NORMAL = 0;
var HOSTILE = 1;
var SPECIAL = 2;

var Card = function Card(number, color) {
  _classCallCheck(this, Card);

  this.value = number;
  this.color = color;
  this.points = 0;

  if ([2, 3].indexOf(number) > -1) {
    this.type = HOSTILE;
    this.points = number;
    this.description = "Next player takes " + number + " cards.";
  } else if (number === 13) {} else {
    this.type = NORMAL;
  }
};

module.exports = Card;

},{}],3:[function(require,module,exports){
'use strict';

CardDock.prototype = {
    'Card': require('./Card/Card'),

    'generateFullColor': function generateFullColor(color) {
        var cards = [];

        for (var i = 2; i < 15; i++) {
            cards.push(new this.Card(i, color));
        }

        return cards;
    },
    'generate': function generate() {
        var cards = [].concat(this.generateFullColor('Spades'), this.generateFullColor('Hearts'), this.generateFullColor('Diams'), this.generateFullColor('Clubs'));

        this.cards = cards;
        return cards;
    },
    'shuffle': function shuffle() {
        var currentIndex = this.cards.length,
            temporaryValue,
            randomIndex;

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
    'draw': function draw(count) {
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
    addEventListener: function addEventListener(eventName, handler) {
        if (!(eventName in this.events)) this.events[eventName] = [];

        this.events[eventName].push(handler);
    },

    raiseEvent: function raiseEvent(eventName, args) {
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

},{"./Card/Card":2}],4:[function(require,module,exports){
'use strict';

Player.prototype = {
    'playCard': function playCard(index) {
        var item = this.cards[index];
        this.cards.splice(index, 1);

        return [item];
    },
    'drawCard': function drawCard(cards) {
        console.info(this.name + ' draws a card.');
        this.cards = this.cards.concat(cards);
    },
    events: {},
    addEventListener: function addEventListener(eventName, handler) {
        if (!(eventName in this.events)) this.events[eventName] = [];

        this.events[eventName].push(handler);
    },

    raiseEvent: function raiseEvent(eventName, args) {
        var currentEvents = this.events[eventName];
        if (!currentEvents) return;

        for (var i = 0; i < currentEvents.length; i++) {
            if (typeof currentEvents[i] == 'function') {
                currentEvents[i](args);
            }
        }
    },
    'findTheBestCard': function findTheBestCard(lastCard) {
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

function Player(name, human) {
    var me = this;

    me.human = human || false;
    me.name = name;
    me.points = 0;
    me.cards = [];
}

module.exports = Player;

},{}],5:[function(require,module,exports){
'use strict';

PlayingTable.prototype = {
  'distribute': function distribute(count) {
    var me = this;
    this.Players.forEach(function (element, index, array) {
      element.drawCard(me.Dock.draw(count));
    });
  },
  'playCard': function playCard(cards) {
    var me = this;
    var isBlocked = false;
    var points = 0;
    cards.forEach(function (el) {
      el.rotate = Math.floor(Math.random() * 360 + 1);

      isBlocked = el.type === 1;
      points = el.points;
      console.info(me.Players[me.activePlayer].name + ' plays', el.value, el.color + '.');
    });
    this.isBlocked = isBlocked;
    this.points = points;
    this.cards = this.cards.concat(cards);

    this.raiseEvent('cardPlayed');
  },
  events: {},
  addEventListener: function addEventListener(eventName, handler) {
    if (!(eventName in this.events)) this.events[eventName] = [];

    this.events[eventName].push(handler);
  },

  raiseEvent: function raiseEvent(eventName, args) {
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

  me.Dock.addEventListener('noCards', function () {
    var card = me.cards.pop();
    var newDock = me.cards;
    me.cards = [card];

    me.Dock.cards = me.Dock.cards.concat(newDock);
    me.Dock.shuffle();
    me.raiseEvent('cardDrew');
  });

  me.cards = [];
  me.activePlayer = 1;
  me.timer = null;
  me.points = 0;
  me.isBlocked = false;

  // Logic for players
  me.turn = function (Player) {
    if (me.isBlocked) {
      me.timer = setTimeout(function () {
        Player.drawCard(me.Dock.draw(me.points));
        console.info('Player ' + Player.name + ' took ' + me.points + ' cards.');

        me.points = 0;
        me.isBlocked = false;
        me.nextPlayer();
        console.info('Next turn: ' + me.Players[me.activePlayer].name);
      }, 2500);
    } else {

      if (!Player.human) {
        me.timer = setTimeout(function () {
          var bestCard = Player.findTheBestCard(me.cards[me.cards.length - 1]);
          if (bestCard === false) {
            Player.drawCard(me.Dock.draw(1));
            me.raiseEvent('cardDrew');
          } else {
            me.playCard(Player.playCard(bestCard));
          }
          me.nextPlayer();
          console.info('Next turn: ' + me.Players[me.activePlayer].name);
        }, 2500);
      } else {
        me.timer = setTimeout(function () {
          Player.drawCard(me.Dock.draw(1));
          me.nextPlayer();
          console.info('Next turn: ' + me.Players[me.activePlayer].name);
        }, 15000);
      }
    }
  };

  me.nextPlayer = function () {
    me.raiseEvent('NEXT_PLAYER');
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

  me.addEventListener("PLAYER_PLAYS_A_CARD", function (card) {
    console.log('test', card);
    if (me.activePlayer === 0) {
      if (me.cards[me.cards.length - 1].value === me.Players[0].cards[card].value || me.cards[me.cards.length - 1].color === me.Players[0].cards[card].color) {
        me.playCard(me.Players[0].playCard(card));
        clearTimeout(me.timer);
        me.nextPlayer();
      } else {
        console.warn("Sorry, you can't play this card.");
      }
    }
  });

  me.addEventListener("PLAYER_DRAWS_A_CARD", function (card) {
    if (me.activePlayer === 0) {
      me.Players[0].drawCard(me.Dock.draw(1));

      clearTimeout(me.timer);
      me.nextPlayer();
      me.raiseEvent('cardDrew');
    }
  });
}

module.exports = PlayingTable;

},{}],6:[function(require,module,exports){
'use strict';

module.exports = {
    'PlayingTable': require('./PlayingTable/PlayingTable'),
    'CardDock': require('./CardDock/CardDock'),
    'Player': require('./Player/Player'),

    'View': require('../View'),
    'init': function init() {
        Game.View.stage.enableMouseOver(20);

        var Dock = new this.CardDock();
        Dock.generate();
        Dock.shuffle();

        /*
        TODO: Generate them
         */
        var Players = [new this.Player('You', true), new this.Player('Andrew'), new this.Player('Bruce'), new this.Player('Matthew')];

        var Table = new this.PlayingTable(Dock, Players);
        this.View.renderers.init(Table);

        return Table;
    },
    'start': function start(Table) {
        console.info('Game Started.');

        Table.distribute(5);
        Table.playCard(Table.Dock.draw(1));
        Table.nextPlayer();
        return Table;
    },
    events: {},
    addEventListener: function addEventListener(eventName, handler) {
        if (!(eventName in this.events)) this.events[eventName] = [];

        this.events[eventName].push(handler);
    },

    raiseEvent: function raiseEvent(eventName, args) {
        var currentEvents = this.events[eventName];
        if (!currentEvents) return;

        for (var i = 0; i < currentEvents.length; i++) {
            if (typeof currentEvents[i] == 'function') {
                currentEvents[i](args);
            }
        }
    }
};

},{"../View":13,"./CardDock/CardDock":3,"./Player/Player":4,"./PlayingTable/PlayingTable":5}],7:[function(require,module,exports){
"use strict";

function TableRenderer(Table) {

  var width = Game.View.width - 200;
  var height = Game.View.height / 2;

  var Card = new Game.View.templates.HiddenCardTemplate();
  Card.regX = 50;
  Card.regY = 75;
  Card.x = width;
  Card.y = height;

  Card.addEventListener("click", function () {
    Table.raiseEvent('PLAYER_DRAWS_A_CARD');
  });

  Game.View.stage.addChild(Card);
}

module.exports = TableRenderer;

},{}],8:[function(require,module,exports){
'use strict';

function OpponentsCardsRenderer(Table) {
    var width = Game.View.width / 2;
    var elementsWidth = Table.Players[0].cards.length * 30 / 2;
    var position = width - elementsWidth;

    Table.Players.forEach(function (Player, index) {
        if (index !== 0) {
            var elementsWidth, position, diff;
            elementsWidth = Player.cards.length * 30 / 2;
            switch (index) {
                case 1:
                    diff = {
                        x: 0,
                        y: 30
                    };
                    position = {
                        x: 0,
                        y: Game.View.height / 2 - elementsWidth
                    };
                    break;
                case 2:
                    diff = {
                        x: 30,
                        y: 0
                    };
                    position = {
                        x: Game.View.width / 2 - elementsWidth,
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
                        y: Game.View.height / 2 - elementsWidth
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
"use strict";

function PlayersCardsRenderer(Table) {
  var width = Game.View.width / 2;
  var elementsWidth = Table.Players[0].cards.length * 30 / 2;
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
      Table.raiseEvent('PLAYER_PLAYS_A_CARD', index);
    });

    Game.View.stage.addChild(Card);
    position += 30;
  });
}

module.exports = PlayersCardsRenderer;

},{}],10:[function(require,module,exports){
"use strict";

function TableRenderer(Table) {

    var width = Game.View.width / 2 - 50;
    var height = Game.View.height / 2;

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
"use strict";

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
"use strict";

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
'use strict';

module.exports = Object.create({
    'stage': new createjs.Stage("game"),
    'renderer': document.getElementById("game") | {},
    'width': document.getElementById("game") && document.getElementById("game").width ? document.getElementById("game").width : 800,
    'height': document.getElementById("game") && document.getElementById("game").height ? document.getElementById("game").height : 600,
    'helpers': {
        'getCardValue': function getCardValue(value) {
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
        'decodeHtml': function decodeHtml(html) {
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
        'init': function init(Table) {
            var me = this;

            var update = function update() {
                Game.View.stage.removeAllChildren();
                me.TableRenderer(Table);
                me.PlayersCardsRenderer(Table);
                me.OpponentsCardsRenderer(Table);
                me.DockRenderer(Table);
                Game.View.stage.update();
            };

            Table.addEventListener("NEXT_PLAYER", update);
            Table.addEventListener("RENDER", update);

            var startScreen = function startScreen() {

                var width = Game.View.width / 2 - 100;
                var height = Game.View.height / 2 - 25;

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

},{"./Renderers/DockRenderer":7,"./Renderers/OpponentsCardsRenderer":8,"./Renderers/PlayersCardsRenderer":9,"./Renderers/TableRenderer":10,"./Templates/CardTemplate":11,"./Templates/HiddenCardTemplate":12}]},{},[1]);
