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