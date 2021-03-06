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

function Player(name, human) {
    var me = this;

    me.human = human || false;
    me.name = name;
    me.points = 0;
    me.cards = [];
}

module.exports = Player;