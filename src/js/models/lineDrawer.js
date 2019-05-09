export default class lineDrawer{
	constructor(){
		this._canvas = document.getElementById('word-line');
	}

	drawLine() {
		this._canvas.height = window.innerHeight;
		this._canvas.width = window.innerWidth;

		let dice = window.boggleWord.dice;
		let context = this._canvas.getContext("2d");
		context.clearRect(0, 0, window.innerWidth, window.innerHeight);

		if (dice.length < 2) return;

		context.beginPath();
		context.lineWidth = 5;
		for (let i = 0; i < dice.length; i++) {
			let die = dice[i];
			let nextDie = dice[i + 1];
			if (!nextDie) break;

			context.moveTo(die.center.x, die.center.y);
			context.lineTo(nextDie.center.x, nextDie.center.y);
		}
		context.strokeStyle = "#FF0080";
		context.stroke();
	}
}