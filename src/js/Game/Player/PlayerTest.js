describe('Test Player', function(){
    var Player, Dock;

    beforeEach(function(){
        Player = new Game.Player('Matt');
        Dock = new Game.CardDock();
        Dock.generate();
        Dock.shuffle();
    });

    it('Create Player', function(){
        expect(Player.name).toEqual('Matt');
        expect(Player.points).toEqual(0);
        expect(Player.cards.length).toEqual(0);
    });

    it('Player Draws Cards', function(){
        expect(Player.cards.length).toEqual(0);
        Player.drawCard(Dock.draw(3));
        expect(Player.cards.length).toEqual(3);

        var playedCard = Player.cards[1];

        expect(Player.playCard(1)[0]).toEqual(playedCard);
        expect(Player.cards.length).toEqual(2);
    });
});