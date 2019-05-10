export default class Timer {
	constructor() {
		this._timer_div = $("<div class='timer'/>")
		this._container = $(".container");
		this._time = "";
		this._playtime_seconds = 180;
		this.start();
	}

	start() {
		let tick = () => {
			var minutes = Math.floor(this._playtime_seconds / 60);
			var seconds = this._playtime_seconds - minutes * 60;

			if (minutes < 10) { minutes = "0" + minutes; }
			if (seconds < 10) { seconds = "0" + seconds; }
			this._time = minutes + ':' + seconds;

			if (this._playtime_seconds <= 0) {
				clearInterval(timer);
				this.render();
				window.board.end();
				return;
			}

			this._playtime_seconds -= 1;
			this.render();
		};

		let timer = setInterval(tick, 1000);
		tick();
	}

	reset() {
		this._playtime_seconds = 180;
		this.start();
	}

	get time() {
		return this._time;
	}

	render() {
		this._timer_div.empty();
		this._timer_div.append(this._time);
		this._timer_div.appendTo(this._container);
	}
}
