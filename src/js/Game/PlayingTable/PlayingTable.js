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

    me.cards = [];
    me.activePlayer = 1;

    // Logic for players
    me.turn = function (Player) {
        var timer;
        if (Player.computer) {
            timer = setTimeout(function () {
                me.playCard(Player.playCard(0));
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