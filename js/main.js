import { createDOMElement } from './utils.js';
import { GameManager } from './GameManager.js';
import { openModal } from './Modal.js';

function initLayout() {
  // 1. Хедер
  const gameTitle = createDOMElement(
    'h1',
    { class: 'visually-hidden' },
    'Memory Match Game'
  );
  const newGameBtn = createDOMElement(
    'button',
    { class: 'btn btn-new-game' },
    'New Game'
  );
  const leaderboardBtn = createDOMElement(
    'button',
    { class: 'btn btn-leaderboard' },
    'Liders stats'
  );
  const headerContainer = createDOMElement(
    'div',
    { class: 'header__container' },
    gameTitle,
    newGameBtn,
    leaderboardBtn
  );
  const header = createDOMElement(
    'header',
    { class: 'header' },
    headerContainer
  );

  // 2. Мейн (Центр управления игрой)
  const movesCount = createDOMElement('span', { id: 'moves-count' }, '0');
  const pairsCount = createDOMElement('span', { id: 'pairs-count' }, '0 из 8');
  const statsTitle = createDOMElement(
    'h2',
    { class: 'visually-hidden' },
    'Current Game Progress'
  );
  const statsPanel = createDOMElement(
    'section',
    { class: 'stats-panel', 'aria-label': 'Game Statistics' },
    statsTitle,
    createDOMElement('div', { class: 'stat-item' }, movesCount),
    createDOMElement('div', { class: 'stat-item' }, pairsCount)
  );

  // *===
  const boardTitle = createDOMElement(
    'h2',
    { class: 'visually-hidden' },
    'Memory Card Grid'
  );

  const gameBoard = createDOMElement('ul', { class: 'game-board' });
  const boardSection = createDOMElement(
    'section',
    { class: 'board-section', 'aria-label': 'Puzzle Board' },
    boardTitle,
    gameBoard
  );
  const main = createDOMElement(
    'main',
    { class: 'main' },
    statsPanel,
    boardSection
  );

  // 3. Футер
  const footerContainer = createDOMElement(
    'div',
    { class: 'footer__container' },
    'Memory Game © 2026'
  );
  const footer = createDOMElement(
    'footer',
    { class: 'footer' },
    footerContainer
  );

  // Монтируем в DOM.
  document.body.appendChild(header);
  document.body.appendChild(main);
  document.body.appendChild(footer);

  return { newGameBtn, leaderboardBtn, movesCount, pairsCount, gameBoard };
}

function showLeaderboard() {
  const rawData = localStorage.getItem('memory_leaderboard');
  const leaderboard = rawData ? JSON.parse(rawData) : [];

  let contentNode;

  if (leaderboard.length === 0) {
    contentNode = createDOMElement(
      'p',
      { class: 'modal-text' },
      'No results yet.'
    );
  } else {
    const tableHeader = createDOMElement(
      'thead',
      {},
      createDOMElement(
        'tr',
        {},
        createDOMElement('th', {}, 'Place'),
        createDOMElement('th', {}, 'Moves'),
        createDOMElement('th', {}, 'Date')
      )
    );

    const tableBody = createDOMElement('tbody', {});

    leaderboard.forEach((item, index) => {
      const row = createDOMElement(
        'tr',
        {},
        createDOMElement('td', {}, String(index + 1)),
        createDOMElement('td', {}, String(item.moves)),
        createDOMElement('td', {}, item.date)
      );
      tableBody.appendChild(row);
    });

    contentNode = createDOMElement(
      'table',
      { class: 'leaderboard-table' },
      tableHeader,
      tableBody
    );
  }

  openModal('Leaderboard', contentNode);
}

document.addEventListener('DOMContentLoaded', () => {
  const nodes = initLayout();

  const game = new GameManager(
    nodes.gameBoard,
    nodes.movesCount,
    nodes.pairsCount
  );

  nodes.newGameBtn.addEventListener('click', () => {
    game.startGame();
  });

  nodes.leaderboardBtn.addEventListener('click', () => {
    showLeaderboard();
  });

  game.startGame();
});
