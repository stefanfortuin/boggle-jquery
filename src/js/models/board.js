import die from './die'

export default class board{
  constructor(){
    this._dice = [];
    this._board = $(".board");
    this._container = $(".container");
    this._body = $("body");
    this.initDice()
    this.renderDice();
  }

  clear(){
    for (const die of this._dice) {
      die.selected = false;
    }
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

  end(){
    this._container.addClass("blur");
    let end_screen = $("<div class='end-screen'/>");
    let replay_button = $("<div class='replay-button'/>")

    end_screen.append(window.wordBasket.score);
    replay_button.append("<div>Replay</div>");

    replay_button.click(() => {
      this.replay();
    })

    replay_button.appendTo(end_screen);
    end_screen.appendTo(this._body);
  }

  replay(){
    this._container.removeClass("blur");
    $(".end-screen").remove();

    this.clear();
    window.boggleWord.clear();
    window.timer.reset();
    window.wordBasket.clear();
    this.renderDice();
  }

  renderDice(){
    console.log("rendering board");
    this._board.find('*').not('#word-line').remove();

    for (const die of this._dice) {
      let d = die.render();
      d.appendTo(this._board);
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
