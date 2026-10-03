# 🎴 Memory Match Game

[English](#english) | [Русский](#русский)

---

## English

A classic memory training card game. The project is built completely from scratch using modern web technologies in strict accordance with functional and technical specifications.

### ✨ Key Features & Architecture
* **Pure DOM Generation:** The `index.html` file contains only a single `<script>` tag. The entire layout, including semantic tags (`<header>`, `<main>`, `<section>`, `<ul>`, `<li>`), is generated dynamically via JavaScript.
* **Strict Code Constraints:** Written completely without forbidden methods like `innerHTML`, `outerHTML`, or `insertAdjacentHTML`. All text nodes and element structures are handled safely using native DOM methods.
* **Semantic Grid Skeleton:** Layout structure relies heavily on `grid-template-areas` for the core viewport frame, alongside responsive CSS Grid columns utilizing `aspect-ratio: 1 / 1` for fluid, square-shaped game cards.
* **Advanced Accessibility (A11y):** The application is keyboard-navigable (`tabindex="0"`) and features fully reactive `aria-label` tags that report card indices and live image states to screen readers.
* **Native Component Dialogs:** Standardized modal implementation utilizing the native `<dialog>` element, taking advantage of built-in focus traps, automatic backdrop rendering (`::backdrop`), and out-of-the-box `Escape` key capture.
* **Temporal API Storage:** Historical scoreboards utilize the cutting-edge JavaScript `Temporal` API for uniform date processing (`DD.MM.YYYY`) and exact epoch time sorting before updating `localStorage`.

### 🚀 Local Setup Instructions
1. Clone this repository locally:
   ```bash
   git clone https://github.com/evgeniia-korolova/memory-game.git
   ```
2. Navigate into the project folder:
   ```bash
   cd memory-game
   ```
3. Checkout to the development branch:
   ```bash
   git checkout memory-game
   ```
4. Open `index.html` in your web browser. You can use standard extensions like **Live Server** in VS Code for local hosting.

---

## Русский

Классическая игра для тренировки памяти и визуального запоминания. Проект разработан полностью с нуля на чистом JavaScript в строгом соответствии с требованиями технического задания.

### ✨ Особенности архитектуры и реализации
* **Чистая генерация DOM:** Файл `index.html` содержит единственный тег `<script>`. Вся семантическая структура разметки (`<header>`, `<main>`, `<section>`, `<ul>`, `<li>`) создается на лету средствами JS.
* **Безопасная работа с DOM:** Проект реализован без использования небезопасных и запрещенных методов вроде `innerHTML`, `outerHTML` или `insertAdjacentHTML`.
* **Макет на CSS Grid:** Основной скелет приложения построен с использованием `grid-template-areas`. Игровое поле представляет собой резиновую сетку, а карточки сохраняют идеальную квадратную форму благодаря `aspect-ratio: 1 / 1`.
* **Доступность (A11y):** Игра полностью адаптирована для управления с клавиатуры (`tabindex="0"`). Карточки снабжены динамическими атрибутами `aria-label`, которые озвучивают состояние карт для скринридеров.
* **Нативные модальные окна:** Окна победы и статистики реализованы через тег `<dialog>`, который нативно блокирует фокус внутри окна, предоставляет слой затемнения `::backdrop` и обрабатывает клавишу `Escape`.
* **Использование Temporal API:** Для фиксации даты триумфа и точной сортировки результатов в `localStorage` применен современный стандарт JavaScript `Temporal` API. Формат даты строго соответствует маске `ДД.ММ.ГГГГ`.

### 🚀 Инструкция для локального запуска
1. Склонируйте репозиторий на свой компьютер:
   ```bash
   git clone https://github.com/evgeniia-korolova/memory-game.git
   ```
2. Перейдите в папку с проектом:
   ```bash
   cd memory-game
   ```
3. Переключитесь на рабочую ветку:
   ```bash
   git checkout memory-game
   ```
4. Откройте файл `index.html` в любом современном браузере. Для корректной работы модулей рекомендуется запускать проект через локальный сервер (например, расширение **Live Server** в VS Code).