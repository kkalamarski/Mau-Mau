module.exports = {
    'PlayingTable': require('./PlayingTable/PlayingTable'),
    'CardDock': require('./CardDock/CardDock'),
    'Player': require('./Player/Player'),

    'View': {
        'renderer': {},
        'stage': {}
    },
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
        Table.distribute(9);
        return Table;
    }
};