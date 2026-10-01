import { createDOMElement } from './utils.js';

export class Card {
  #image;
  #element;
  #isFlipped;

  constructor(image, index) {
    this.#image = image;
    this.#isFlipped = false;

    // Создаем карточку как элемент списка <li>
    // Добавляем tabindex для управления с клавиатуры и понятный aria-label
    this.#element = createDOMElement('li', { 
      class: 'card',
      tabindex: '0',
      'aria-label': `Карточка №${index + 1}, закрыта.`,
      // style: `--card-front-img: url('images/${this.#image}')`
      style: `--card-front-img: url('../images/${this.#image}')`
    });

    this.#element.connectedCard = this;
  }

  get element() {
    return this.#element;
  }

  get image() {
    return this.#image;
  }

  get isFlipped() {
    return this.#isFlipped;
  }

  // Переворот карточки и динамическое обновление aria-label
  flip() {
    this.#isFlipped = !this.#isFlipped;
    this.#element.classList.toggle('flipped', this.#isFlipped);
    
    // Обновляем состояние для скринридеров
    if (this.#isFlipped) {
      this.#element.setAttribute('aria-label', `Карточка открыта. Изображение: ${this.#image.split('.')[0]}.`);
    } else {
      this.#element.setAttribute('aria-label', 'Карточка закрыта.');
    }
  }

  disconnectFromDOM() {
    this.#element.connectedCard = null;
  }
}
