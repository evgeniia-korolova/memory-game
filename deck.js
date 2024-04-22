class Deck {
	#cardsImages = [
		'tree.jpg',
		'orchid.jpg',
		'car.jpg',
		'cat.jpg',
		'pinapple.jpg',
		'mashroom.jpg',
		'fish.jpg',
		'plane.jpg',
		'ship.jpg',
		'bee.jpg',
	];

	constructor() {
		this.cards = [];
		this.#cardsImages.forEach((image) => {
			this.cards.push(new Card(image));
			this.cards.push(new Card(image));
		});
	}

	shuffle() {
		this.cards.sort(() => Math.random() - 0.5);
	}

	removeCard(card) {
		let index = this.cards.findIndex(
			(item) => item.imagePath == card.imagePath
		);
		if (index != -1) {
			this.cards.splice(index, 1);
			card.disconectFromDOM();
		}
	}
}