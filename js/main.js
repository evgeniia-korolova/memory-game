console.log('hello');
import { el } from './utils.js';

function initLayout() {
  // 1. Хедер
  const newGameBtn = el('button', { class: 'btn btn-new-game' }, 'Новая игра');
  const leaderboardBtn = el('button', { class: 'btn btn-leaderboard' }, 'Таблица лидеров');
  const headerContainer = el('div', { class: 'header__container' }, newGameBtn, leaderboardBtn);
  const header = el('header', { class: 'header' }, headerContainer);

  // 2. Мейн (Центр управления игрой)
  const movesCount = el('span', { id: 'moves-count' }, '0');
  const pairsCount = el('span', { id: 'pairs-count' }, '0 из 8');
  const statsPanel = el('div', { class: 'stats-panel' },
    el('div', { class: 'stat-item' }, 'Ходы: ', movesCount),
    el('div', { class: 'stat-item' }, 'Найденные пары: ', pairsCount)
  );
  const gameBoard = el('div', { class: 'game-board' });
  const main = el('main', { class: 'main' }, statsPanel, gameBoard);

  // 3. Футер
  const footerContainer = el('div', { class: 'footer__container' }, 'Memory Game © 2026');
  const footer = el('footer', { class: 'footer' }, footerContainer);

  // Монтируем в DOM. Порядок добавления в JS теперь не важен — CSS Grid расставит всё по карте!
  document.body.appendChild(header);
  document.body.appendChild(main);
  document.body.appendChild(footer);

  return { newGameBtn, leaderboardBtn, movesCount, pairsCount, gameBoard };
}

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
});
