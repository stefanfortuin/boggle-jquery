import die from './die'
import wordBasket from './wordBasket';

export default class board{
  constructor(){
    this._dice = [];
    this._div = $(".board");
    this.initDice()
    this.renderDice();
    this.initListeners();
  }

  initListeners(){
    for (const die of this._dice) {
      $('#' + die.data.id).click(() => {

        if (window.boggle_word.contains(die)){
          this.removeChar(die)
          return;
        }

        let lastDice = window.boggle_word.lastDice;
        if (!die.isAdjescent(lastDice))
          return;

        this.addChar(die)
      })
    }
  }

  removeChar(die){
    window.boggle_word.remove(die);
    this.renderDice();
  }

  addChar(die){
    window.boggle_word.add(die);
    this.renderDice();
  }

  initDice(){
    for (let i = 0; i < 16; i++) {
      let char = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      let die_object = new die(i, char);
      this._dice.push(die_object)
    }
  }

  renderDice(){
    console.log("rendering");
    this._div.empty();
    for (const die of this._dice) {
      let d = die.render();
      d.appendTo(this._div);
    }
    this.initListeners();
  }

  get dice(){
    return this._dice;
  }
}
