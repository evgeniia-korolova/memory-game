import { Card } from './Card.js';

export class Deck {
  #allImages = [
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
    this.initDeck();
  }

  initDeck() {
    this.cards = [];    
    
    const shuffledImages = [...this.#allImages].sort(() => Math.random() - 0.5);
    const selectedImages = shuffledImages.slice(0, 8);
    
    const doubleImages = [...selectedImages, ...selectedImages];
    
    doubleImages.forEach((image, index) => {
      this.cards.push(new Card(image, index));
    });
  }

  // алгоритм Фишера — Йетса для перемешивания карт
  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  
  resetCards() {
    this.cards.forEach(card => card.reset?.() || card.element.classList.remove('flipped', 'matched'));
  }
}