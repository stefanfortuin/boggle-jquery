export default class wordBasket{
  constructor(){
    this._words = [];
    this._word_basket = $('.word-basket');
	this._score_div = $('.score');
  }

  get score(){
	  let score = 0;
	  for (const word of this._words) {
		  score += this.calc_score(word);
	  }
	  return score;
  }

  clear(){
    this._words = [];
    this._word_basket.empty();
  }

  add(word){
    this._words.unshift(word);
    this._word_basket.empty();
    this.render();
  }

  render(){
    for (const word of this._words) {
      let d = $('<div/>');
      d.append(word);
      d.appendTo(this._word_basket);
    }

	this._score_div.empty();
	this._score_div.append("Score: " + this.score);
  }

  calc_score(word) {
		let length = word.length;
		if (length <= 4)
			return 1;
		else if (length == 5)
			return 2;
		else if (length == 6)
			return 3;
		else if (length == 7)
			return 5;
		else if (length >= 8)
			return 8;
	}
}
