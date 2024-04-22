/**
 * Manages the game, remembers opened cards, manages the deck and counts number of attemps.
 * Binds JavaScriptcode with user interface
 */

class GameManager {
	#boardElement;
	#scoreElement;
	#deck = new Deck();
	#firstCard = null;
	#secondCard = null;
	#attemptNumber = 0;

	constructor(board, score) {
		if (typeof board === 'string') {
			this.#boardElement = document.querySelector(board);
		} else {
			this.#boardElement = board;
		}

		if (typeof score === 'string') {
			this.#scoreElement = document.querySelector(score);
		} else {
			this.#scoreElement = score;
		}
	}

	startGame() {
		this.attemptNumber = 0;
		this.#deck = new Deck();
		this.#boardElement.innerHTML = '';
		this.shuffleAndDeal();
	}

	shuffleAndDeal() {
		this.#deck.shuffle();
		this.#deck.cards.forEach((card) => {
			this.#boardElement.append(card.element);
		});
	}

	selectCard(card) {
		if (card == this.#firstCard) return; // if the card selected twice, do nothing(methods execution is stopped)
		card.flip(); // flip the card

		// if there are two values of fields, the previous two cards don't match
		// flip the cover upwards
		if (this.#firstCard && this.#secondCard) {
			this.#firstCard.flip();
			this.#secondCard.flip();

			this.#firstCard = this.#secondCard = null;
		}

		// If one card is selected, remember it and wait for the second
		if (this.#firstCard == null) {
			this.#firstCard = card;
		} else if (this.#secondCard == null) {
			this.attemptNumber++;
			this.#secondCard = card;

			// if two matching cards are found
			if (this.#firstCard.imagePath === card.imagePath) {
				this.#deck.removeCard(this.#firstCard); // remove cards from the deck (don't remove from DOM tree)
				this.#deck.removeCard(this.#secondCard);

				this.#firstCard = this.#secondCard = null;
			}
		}
	}

	get attemptNumber() {
		return this.#attemptNumber;
	}

	set attemptNumber(value) {
		this.#attemptNumber = value;
		this.#scoreElement.innerHTML = value;
	}
}
