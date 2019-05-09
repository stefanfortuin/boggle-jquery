export default class wordBasket{
  constructor(){
    this._words = [];
    this._div = $('.word-basket');
  }

  clear(){
    this._words = [];
    this._div.empty();
  }

  add(word){
    this._words.unshift(word);
    this._div.empty();
    this.render();
  }

  render(){
    for (const word of this._words) {
      let d = $('<div/>');
      d.append(word);
      d.appendTo(this._div);
    }
  }
}
