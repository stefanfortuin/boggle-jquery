export default class wordBasket{
  constructor(){
    this._words = [];
    this._word_basket = $('.word-basket');
	  this._score_div = $('.score');
  }

  get score(){
    return this._words.reduce((t,w) => {
      return (w.correct)
      ? t += w.score
      : t += 0;
    }, 0);
  }

  clear(){
    this._words = [];
    this.render();
  }

  add(word){
    this._words.unshift(word);
    this.render();
  }

  render(){
    this._word_basket.empty();
    for (const word of this._words) {
      let d = $("<div class='word'/>");
      d.append(word.word);

      console.log(word);
      if (word.correct != null){
        (word.correct)
        ? d.append("<img class='check' src='/assets/check_green.png'/>")
        : d.append("<img class='check' src='/assets/wrong_red.png'/>")
      }
      else
        d.append("<img class='loading' src='/assets/loading.png'/>");

      d.appendTo(this._word_basket);
    }

  this._score_div.empty();
  console.log(this.score);
	this._score_div.append("Score: " + this.score);
  }
}
