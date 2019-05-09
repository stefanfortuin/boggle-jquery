import die from './die'

export default class board{
  constructor(){
    this._dice = [];
    this._div = $(".board");
    this.initDice()
    this.renderDice();
  }

  initListeners(){
    for (const die of this._dice) {
      $('#' + die.data.id).click(() => {
        if (die.selected){
          this.removeChar(die);
          return;
        }

        let lastDice = window.boggleWord.lastDice;
        if (!die.isAdjescent(lastDice))
          return;

        this.addChar(die)
      })
    }
  }

  removeChar(die){
    window.boggleWord.remove(die);
    this.renderDice();
  }

  addChar(die){
    window.boggleWord.add(die);
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
    console.log("rendering board");
    this._div.find('*').not('#word-line').remove();

    for (const die of this._dice) {
      let d = die.render();
      d.appendTo(this._div);
    }

	for (const die of this._dice) {
		die.centerOfDiv();
	}

	window.lineDrawer.drawLine();
    this.initListeners();
	
  }

  get dice(){
    return this._dice;
  }
}
