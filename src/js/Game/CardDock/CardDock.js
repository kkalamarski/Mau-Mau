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