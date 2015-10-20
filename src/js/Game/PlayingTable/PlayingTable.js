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