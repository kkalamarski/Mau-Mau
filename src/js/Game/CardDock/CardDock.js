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