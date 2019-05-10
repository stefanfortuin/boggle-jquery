export default class word {
	constructor(word) {
		this._word = word;
		this._score = this.calc_score();
		this._correct = null;
		this.check();
	}

	check() {
		$.ajax({
			type: "POST",
			url: 'http://boggle.stefanfortuin.nl/api/word',
			data: { word: this.word, score: this.score },
			timeout: 3000,
		}).done((response) => {
			this._correct = response.data.correct;
			this.renderBasket();
		}).fail((error) => {
			this._correct = false;
			this.renderBasket();
		})
	}

	renderBasket() {
		window.wordBasket.render();
	}

	calc_score() {
		let length = this._word.length;
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

	get word() {
		return this._word;
	}

	get score() {
		return this._score;
	}

	get correct() {
		return this._correct;
	}
}
