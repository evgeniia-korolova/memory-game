import { Deck } from './Deck.js';
import { createDOMElement } from './utils.js';
import { openModal } from './Modal.js';

export class GameManager {
  #boardElement;
  #movesElement;
  #pairsElement;

  #deck;
  #firstCard = null;
  #secondCard = null;
  #isLocking = false;

  #moves = 0;
  #matchedPairs = 0;
  #failedTimeoutId = null;

  constructor(board, movesElement, pairsElement) {
    this.#boardElement = board;
    this.#movesElement = movesElement;
    this.#pairsElement = pairsElement;

    this.#deck = new Deck();
    this.initEvents();
  }

  initEvents() {
    this.#boardElement.addEventListener('click', (event) => {
      const cardListItem = event.target.closest('.card');
      if (!cardListItem) return;

      const cardInstance = cardListItem.connectedCard;
      if (cardInstance) {
        this.selectCard(cardInstance);
      }
    });

    this.#boardElement.addEventListener('keydown', (event) => {      
      if (event.key === 'Enter' || event.key === ' ' || event.code === 'Space') {
        const cardListItem = event.target.closest('.card');
        if (!cardListItem) return;
  
        const cardInstance = cardListItem.connectedCard;
        if (cardInstance) {          
          event.preventDefault(); 
          
          this.selectCard(cardInstance);
        }
      }
    });
  }

  startGame() {
    if (this.#failedTimeoutId) {
      clearTimeout(this.#failedTimeoutId);
      this.#failedTimeoutId = null;
    }

    this.#isLocking = false;
    this.#firstCard = null;
    this.#secondCard = null;

    this.moves = 0;
    this.matchedPairs = 0;

    this.#deck.initDeck();
    this.#deck.shuffle();

    this.#boardElement.replaceChildren();

    this.#deck.cards.forEach((card) => {
      this.#boardElement.append(card.element);
    });
  }

  selectCard(card) {
    if (this.#isLocking) return;
    if (card === this.#firstCard) return;
    if (
      card.element.classList.contains('flipped') ||
      card.element.classList.contains('matched')
    )
      return;

    card.flip();

    if (!this.#firstCard) {
      this.#firstCard = card;
    } else {
      this.#secondCard = card;
      this.moves++;

      if (this.#firstCard.image === this.#secondCard.image) {
        this.#firstCard.element.classList.add('matched');
        this.#secondCard.element.classList.add('matched');

        this.matchedPairs++;

        this.#firstCard = null;
        this.#secondCard = null;

        if (this.#matchedPairs === 8) {
          this.endGame();
        }
      } else {
        this.#isLocking = true;

        this.#failedTimeoutId = setTimeout(() => {
          this.#firstCard.flip();
          this.#secondCard.flip();

          this.#firstCard = null;
          this.#secondCard = null;
          this.#isLocking = false;
          this.#failedTimeoutId = null;
        }, 1000);
      }
    }
  }

  endGame() {
    this.#saveResult();

    const victoryMessage = createDOMElement(
      'p',
      { class: 'modal-text' },
      `Hooray! You found all pairs in ${this.#moves} moves.`
    );

    const playAgainBtn = createDOMElement(
      'button',
      {
        class: 'btn btn-modal-new-game',
      },
      'New Game'
    );

    playAgainBtn.addEventListener('click', () => {
      this.startGame();
    });

    openModal('Victory!', victoryMessage, [playAgainBtn]);
  }

  get moves() {
    return this.#moves;
  }

  set moves(value) {
    this.#moves = value;
    this.#movesElement.textContent = `Moves: ${value}`;
  }

  get matchedPairs() {
    return this.#matchedPairs;
  }

  set matchedPairs(value) {
    this.#matchedPairs = value;
    this.#pairsElement.textContent = `Pairs: ${value} of 8`;
  }

  #saveResult() {
    const today = Temporal.Now.plainDateISO();
    const day = String(today.day).padStart(2, '0');
    const month = String(today.month).padStart(2, '0');
    const year = today.year;
    const formattedDate = `${day}.${month}.${year}`;

    const rawData = localStorage.getItem('memory_leaderboard');
    const leaderboard = rawData ? JSON.parse(rawData) : [];

    leaderboard.push({
      moves: this.#moves,
      date: formattedDate,
      timestamp: Temporal.Now.instant().epochMilliseconds,
    });

    leaderboard.sort((a, b) => {
      if (a.moves !== b.moves) {
        return a.moves - b.moves;
      }
      return a.timestamp - b.timestamp;
    });

    const top10 = leaderboard.slice(0, 10);

    localStorage.setItem('memory_leaderboard', JSON.stringify(top10));
  }
}
