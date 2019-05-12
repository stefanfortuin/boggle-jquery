import die from './die'

const dices =  [
	["R", "I", "F", "O", "B", "X"], //1
	["I", "F", "E", "H", "E", "Y"], //2
	["D", "E", "N", "O", "W", "S"], //3
	["U", "T", "O", "K", "N", "D"], //4
	["H", "M", "S", "R", "A", "O"], //5
	["L", "U", "P", "E", "T", "S"], //6
	["A", "C", "I", "T", "O", "A"], //7
	["Y", "L", "G", "K", "U", "E"], //8
	["Q", "B", "M", "J", "O", "A"], //9
	["E", "H", "I", "S", "P", "N"], //10
	["V", "E", "T", "I", "G", "N"], //11
	["B", "A", "L", "I", "Y", "T"], //12
	["E", "Z", "A", "V", "N", "D"], //13
	["R", "A", "L", "E", "S", "C"], //14
	["U", "W", "I", "L", "R", "G"], //15
	["P", "A", "C", "E", "M", "D"] //16
  ]

export default class board {
	constructor() {
		this._dice = [];
		this._board = $(".board");
		this._container = $(".container");
		this._body = $("body");
		this._config = this.generateConfig();
		this.initDice()
		this.renderDice();
	}

	generateConfig(){
		let config_temp = "";
		for (let i = 0; i < 16; i++) {

			let random = Math.floor(Math.random() * 6);
			let char = dices[i][random].toString()

			config_temp += char;
		}
		return config_temp;
	}

	resetSelectedDice() {
		for (const die of this._dice) {
			die.selected = false;
		}
	}

	resetInfoComponents(){
		window.boggleWord.clear();
		window.timer.reset();
		window.wordBasket.clear();
	}

	refillBoard(){
		this._dice = [];
		this._config = this.generateConfig();
		this.initDice();
	}

	initListeners() {
		for (const die of this._dice) {
			$('#' + die.data.id).click(() => {
				if (die.selected) {
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

	removeChar(die) {
		window.boggleWord.remove(die);
		this.renderDice();
	}

	addChar(die) {
		window.boggleWord.add(die);
		this.renderDice();
	}

	initDice() {
		for (let i = 0; i < 16; i++) {
			let char = this._config[i];
			let die_object = new die(i, char);
			this._dice.push(die_object)
		}
	}

	end() {
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

	replay() {
		this._container.removeClass("blur");
		$(".end-screen").remove();

		this.resetSelectedDice();
		this.resetInfoComponents();
		this.refillBoard();
		this.renderDice();
	}

	renderDice() {
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

	get dice() {
		return this._dice;
	}
}
