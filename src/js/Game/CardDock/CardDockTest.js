describe('Test CardDock', function(){
    it('Create CardDock', function(){
        var Dock = new Game.CardDock();

        expect(Dock.cards.length).toEqual(0);
    });

    it('Generate Color', function(){
        var Dock = new Game.CardDock();

        expect(Dock.generateFullColor('Spades').length).toEqual(13);
    });


    it('Generate Cards', function(){
        var Dock = new Game.CardDock();

        // Check if cards are generated
        expect(Dock.generate().length).toEqual(52);
        // Check if cards are saved
        expect(Dock.cards.length).toEqual(52);
    });

    it('Draw Cards', function(){
        var Dock = new Game.CardDock();

        Dock.generate();
        expect(Dock.cards.length).toEqual(52);

        var Card1 = Dock.draw();
        expect(Card1 instanceof Array).toBe(true);
        expect(Card1[0] instanceof Dock.Card).toBe(true);
        expect(Dock.cards.length).toEqual(51);

        var Card2 = Dock.draw();
        expect(Dock.cards.length).toEqual(50);

        var Cards = Dock.draw(5);
        expect(Cards instanceof Array).toBe(true);
        expect(Cards.length).toEqual(5);
        expect(Dock.cards.length).toEqual(45);
    });

    it('Shuffle Cards', function(){
        var Dock = new Game.CardDock();

        Dock.generate();

        var Card = Dock.cards[3];

        Dock.shuffle();
        expect(Dock.cards.length).toEqual(52);
        expect(Dock.cards[3]).not.toEqual(Card);
    });
});