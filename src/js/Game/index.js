module.exports = {
    'PlayingTable': require('./PlayingTable/PlayingTable'),
    'CardDock': require('./CardDock/CardDock'),
    'Player': require('./Player/Player'),

    'View': require('../View'),
    'init': function(){
        Game.View.stage.enableMouseOver(20);

        var Dock = new this.CardDock();
        Dock.generate();
        Dock.shuffle();

        /*
        TODO: Generate them
         */
        var Players = [
            new this.Player('You', true),
            new this.Player('Andrew'),
            new this.Player('Bruce'),
            new this.Player('Matthew')
        ];

        var Table = new this.PlayingTable(Dock, Players);
        this.View.renderers.init(Table);

        return Table;
    },
    'start': function(Table){
        console.info('Game Started.');

        Table.distribute(5);
        Table.playCard(Table.Dock.draw(1));
        Table.nextPlayer();
        return Table;
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
