describe('Test Card', function(){

  var Dock;

  beforeEach(function() {
    Dock = new Game.CardDock();
  });

  it('Create Card', function() {
    var card = new Dock.Card(2, 'Spade');

    expect(card.value).toEqual(2);
    expect(card.color).toEqual('Spade');
  });

  it('Create Normal Card', function() {
    var card = new Dock.Card(5, 'Spade');

    expect(card.type).toEqual(0);
    expect(card.points).toEqual(0);
  });

  it('Create Hostile Card', function() {
    var card = new Dock.Card(2, 'Spade');

    expect(card.type).toEqual(1);
    expect(card.points).toEqual(2);
  });
});
