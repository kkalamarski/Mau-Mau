PlayingTable.prototype = {
  'distribute': function (count) {
    var me = this;
    this.Players.forEach(function (element, index, array) {
      element.drawCard(me.Dock.draw(count));
    });
  },
  'playCard': function (cards) {
    var me = this;
    var isBlocked = false;
    var points = 0;
    cards.forEach(function (el) {
      el.rotate = Math.floor((Math.random() * 360) + 1);

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
  me.timer = null;
  me.points = 0;
  me.isBlocked = false;

  // Logic for players
  me.turn = function (Player) {
    if(me.isBlocked) {
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
      if(me.cards[me.cards.length - 1].value === me.Players[0].cards[card].value ||
        me.cards[me.cards.length - 1].color === me.Players[0].cards[card].color) {
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
