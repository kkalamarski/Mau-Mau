const NORMAL = 0;
const HOSTILE = 1;
const SPECIAL = 2;

class Card {

  constructor (number, color) {
    this.value = number;
    this.color = color;
    this.points = 0;

    if([2, 3].indexOf(number) > -1 ){
      this.type = HOSTILE;
      this.points = number;
      this.description = "Next player takes " + number + " cards.";
    } else if (number === 13) {

    } else {
      this.type = NORMAL;
    }
  }


}

module.exports = Card;
