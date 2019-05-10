import Word from './word'

export default class boggleWord{
  constructor(){
    this._dice = [];
    this._div = $('.word');
    this._save_button = $('.save-button')
    this._save_button.hide();

	this._save_button.click(() => {this.saveWord()});
  }

  add(die){
    die.selected= true;
    this._dice.push(die);
    this.render();
  }

  remove(die){
    let found_die = this._dice.find(d => d.data.id == die.data.id);
    let dieIndex = this._dice.indexOf(found_die);

    for (const die of this._dice.slice(dieIndex, this._dice.length)) {
      die.selected = false;
    }

    this._dice = this._dice.slice(0, dieIndex);
    this.render();
  }

  saveWord(){
    let word = new Word(this.word)
	  window.wordBasket.add(word);
	  this.clear();
	  window.board.renderDice();
  }

  clear(){
	for (const die of this._dice) {
		die.selected = false;
	}
    this._dice = [];
    this.render();
  }

  get lastDice(){
    return this._dice[this._dice.length - 1];
  }

  render(){
    if (this.word.length == 0){
		this._div.empty()
		this._save_button.hide();
      return;
	}

	this._save_button.hide();
	if (this.word.length > 3)
    	this._save_button.show();

    this._div.empty();
    this._div.append(this.word)
  }

  get dice(){
	  return this._dice;
  }

  get word(){
    return this._dice.map(die => die.data.char).join("");
  }
}
