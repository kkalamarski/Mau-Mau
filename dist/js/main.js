(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Game = require('./src/js/Game');

var Table = Game.start();
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
            this.generateFullColor('Spade'),
            this.generateFullColor('Heart'),
            this.generateFullColor('Diamond'),
            this.generateFullColor('Club')
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

        for (count; count > 0; count--) {
            cards.push(this.cards.shift());
        }

        return cards;
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
    'playCard': function(index){
        var item = this.cards[index];
        this.cards.splice(index, 1);

        return item;
    },
    'drawCard': function(cards){
        this.cards = this.cards.concat(cards);
    }
};

function Player(name){
    var me = this;

    me.name = name;
    me.points = 0;
    me.cards = [];
}

module.exports = Player;
},{}],5:[function(require,module,exports){
PlayingTable.prototype = {
    'distribute': function(count) {
        var me = this;
        this.Players.forEach(function(element, index, array){
            element.drawCard(me.Dock.draw(count));
        });
    }
};

function PlayingTable(Dock, Players){
    var me = this;

    me.Dock = Dock;
    me.Players = Players;

    me.cards = [];
    me.activePlayer = 0;
}

module.exports = PlayingTable;
},{}],6:[function(require,module,exports){
module.exports = {
    'PlayingTable': require('./PlayingTable/PlayingTable'),
    'CardDock': require('./CardDock/CardDock'),
    'Player': require('./Player/Player'),
    'init': function(){

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

        return Table;
    }
};
},{"./CardDock/CardDock":2,"./Player/Player":4,"./PlayingTable/PlayingTable":5}]},{},[1]);
