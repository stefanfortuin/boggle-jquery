export default class die {
	constructor(id, char) {
		this._id = id;
		this._char = char;
		this.coord = { x: Math.floor((id + 1) / 4.01), y: id % 4 };
		this.selected = false;
	}

	centerOfDiv() {
		let die = document.getElementById(this._id);
		let diePos = die.getBoundingClientRect();

		let left = diePos.left;
		let right = diePos.right;
		let top = diePos.top;
		let bottom = diePos.bottom;

		let x = left + ((right - left) / 2);
		let y = top - ((top - bottom) / 2);

		this.center = {
			x,
			y
		}
	}

	isAdjescent(otherDie) {
		if (!otherDie)
			return true;

		var diffX = otherDie.coord.x - this.coord.x;
		var diffY = otherDie.coord.y - this.coord.y;

		if (diffX >= -1 && diffX <= 1 &&
			diffY >= -1 && diffY <= 1)
			return true;

		return false;
	}

	render() {
		let d = $("<div/>", {
			id: this._id,
			class: "die",
		});

		if (this.selected) {
			d.css("background-color", "rgb(160, 93, 30)");
		}

		d.append(this._char);
		return d;
	}

	get data() {
		return {
			id: this._id,
			char: this._char,
			center: this.center,
			coord: this.coord,
		}
	}
}
