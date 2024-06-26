class Card {
	#image;
	#element;
	#isFlipped;

	constructor(image) {
		this.#image = image;

		this.#element = document.createElement('div');
		this.#element.classList.add('card');
        this.#element.style.backgroundImage = `url('${this.coverPath}')`;
        // this.#element.style.backgroundRepeat = 'no-repeat';
		this.#element.connectedCard = this;
	}

	get imagePath() {
		return `images/${this.#image}`;
	}

	get coverPath() {
		return 'images/card-cover.jpg';
	}

	get element() {
		return this.#element;
	}

	flip() {
		if (this.#isFlipped)
			this.#element.style.backgroundImage = `url('${this.coverPath}')`;
		else this.#element.style.backgroundImage = `url('${this.imagePath}')`;

		this.#isFlipped = !this.#isFlipped;
	}

	disconectFromDOM() {
		this.#element.connectedCard = null;
	}
}