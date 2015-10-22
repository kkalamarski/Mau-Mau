describe('Test Player', function () {
    var Player, Dock;

    beforeEach(function () {
        Player = new Game.Player('Matt');
        Dock = new Game.CardDock();
        Dock.generate();
        Dock.shuffle();
    });

    it('Create Player', function () {
        expect(Player.name).toEqual('Matt');
        expect(Player.points).toEqual(0);
        expect(Player.cards.length).toEqual(0);
    });

    it('Player Draws Cards', function () {
        expect(Player.cards.length).toEqual(0);
        Player.drawCard(Dock.draw(3));
        expect(Player.cards.length).toEqual(3);

        var playedCard = Player.cards[1];

        expect(Player.playCard(1)[0]).toEqual(playedCard);
        expect(Player.cards.length).toEqual(2);
    });

    it('Player Finds The Best Card', function () {
        Player.drawCard(Dock.draw(3));
        Player.drawCard([{
            value: 1,
            color: 'Spades'
        }]);

        expect(Player.findTheBestCard({
            value: 1,
            color: 'Diams'
        })).toEqual(3);
    });

    it('Player Finds The Best Card #2', function () {
        Player.drawCard([
            {
                value: 8,
                color: 'Spades'
            },
            {
                value: 2,
                color: 'Diams'
            },
            {
                value: 3,
                color: 'Spades'
            }
        ]);

        expect(Player.findTheBestCard({
            value: 1,
            color: 'Diams'
        })).toEqual(1);
    });

    it('Player Finds The Best Card #3', function () {
        Player.drawCard([
            {
                value: 8,
                color: 'Spades'
            },
            {
                value: 2,
                color: 'Spades'
            },
            {
                value: 3,
                color: 'Spades'
            }
        ]);

        expect(Player.findTheBestCard({
            value: 1,
            color: 'Diams'
        })).toBe(false);
    });
});