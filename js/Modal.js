import { createDOMElement } from './utils.js';

/**
 * @param {string} titleText - Заголовок окна
 * @param {HTMLElement} contentNodes - DOM-элемент с содержимым (таблица или статистика)
 * @param {Array} additionalButtons - Дополнительные кнопки (например, "New Game" для окна победы)
 */
export function openModal(titleText, contentNodes, additionalButtons = []) { 
  document.body.style.overflow = 'hidden';
  
  const closeBtn = createDOMElement('button', { 
    class: 'btn btn-close-modal',
    'aria-label': 'Close modal window'
  }, 'Close');

  
  const actionsContainer = createDOMElement('div', { class: 'modal-actions' }, ...additionalButtons, closeBtn);

  
  const modalTitle = createDOMElement('h2', { id: 'modal-title' }, titleText);
  
  const dialog = createDOMElement('dialog', {
    class: 'modal-dialog',
    'aria-labelledby': 'modal-title',
    'aria-modal': 'true'
  }, 
    modalTitle,
    contentNodes, // здесь либо таблица лидеров, либо инфо о победе
    actionsContainer
  );

  
  const destroyModal = () => {
    document.body.style.overflow = ''; 
    dialog.close();
    dialog.remove(); 
  };

    
  closeBtn.addEventListener('click', destroyModal);
  
  additionalButtons.forEach(btn => {
    btn.addEventListener('click', destroyModal);
  });

  
  dialog.addEventListener('cancel', (event) => {    
    event.preventDefault();
    destroyModal();
  });

  
  dialog.addEventListener('click', (event) => {
    const rect = dialog.getBoundingClientRect();
    const isInModal = (
      rect.top <= event.clientY &&
      event.clientY <= rect.bottom &&
      rect.left <= event.clientX &&
      event.clientX <= rect.right
    );
    if (!isInModal) {
      destroyModal();
    }
  });

  
  document.body.appendChild(dialog);
  dialog.showModal(); 
}