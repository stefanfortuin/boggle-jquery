export default class boggle_word{
  constructor(){
    this._word = [];
    this._div = $('.word');
    this._save_button = $('.save-button')
    this._save_button.hide();
  }

  add(die){
    console.log("adding")
    die.selected= true;
    this._word.push(die);
    this.render();
  }

  remove(die){
    console.log("removing")
    let d = this._word.find(d => d.data.id == die.data.id);
    let dieIndex = this._word.indexOf(d);

    for (const die of this._word.slice(dieIndex, 0)) {
      die.selected = false;
    }

    this._word = this._word.slice(0, dieIndex);
    this.render();
  }

  contains(die){
    let d = this._word.find(w => w.data.id == die.data.id);
    return (d)? true: false
  }

  clear(){
    this._word = [];
    this.render();
  }

  get lastDice(){
    return this._word[this._word.length - 1];
  }

  render(){
    if (this.word.length == 0)
      return;

    this._save_button.show();

    this._div.empty();
    this._div.append(this.word)
  }

  get word(){
    return this._word.map(die => die.data.char).join("");
  }
}
