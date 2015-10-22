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
