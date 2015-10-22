describe('Test PlayingTable', function(){

    var Table, Dock, Players;

    beforeEach(function(){
        Dock = new Game.CardDock();
        Dock.generate();
        Dock.shuffle();

        Players = [
            new Game.Player('Tom'),
            new Game.Player('Andrew'),
            new Game.Player('Bruce'),
            new Game.Player('Matthew')
        ];

        Table = new Game.PlayingTable(Dock, Players);
    });

    it('Create PlayingTable', function(){
        expect(Table.Dock).toEqual(Dock);
        expect(Table.Dock.cards.length).toEqual(52);
        expect(Table.Players).toEqual(Players);
    });

    it('DistributeCards#1', function(){
        Table.distribute(5);

        expect(Table.Dock.cards.length).toEqual(32);
        expect(Table.Players[0].cards.length).toEqual(5);
        expect(Table.Players[1].cards.length).toEqual(5);
        expect(Table.Players[2].cards.length).toEqual(5);
        expect(Table.Players[3].cards.length).toEqual(5);
    });

    it('DistributeCards#2', function(){
        Table.distribute(2);

        expect(Table.Dock.cards.length).toEqual(44);
        expect(Table.Players[0].cards.length).toEqual(2);
        expect(Table.Players[1].cards.length).toEqual(2);
        expect(Table.Players[2].cards.length).toEqual(2);
        expect(Table.Players[3].cards.length).toEqual(2);

        Table.distribute(2);

        expect(Table.Dock.cards.length).toEqual(36);
        expect(Table.Players[0].cards.length).toEqual(4);
        expect(Table.Players[1].cards.length).toEqual(4);
        expect(Table.Players[2].cards.length).toEqual(4);
        expect(Table.Players[3].cards.length).toEqual(4);

    });

    it('Play Card', function(){
        Table.distribute(5);
        expect(Table.cards.length).toEqual(0);
        Table.playCard(Table.Players[0].playCard(2));
        expect(Table.cards.length).toEqual(1);
        var secondCard = Table.Players[1].playCard(1);
        Table.playCard(secondCard);
        expect(Table.cards.length).toEqual(2);
        expect(Table.cards[1]).toEqual(secondCard[0]);
    });

});