describe('Test Card', function(){
    it('Create Card', function(){
        var Dock = new Game.CardDock();
        var card = new Dock.Card(2, 'Spade');

        expect(card.value).toEqual(2);
        expect(card.color).toEqual('Spade');
    });
});