export function createDOMElement(tagName, attributes = {}, ...children) {
  const element = document.createElement(tagName);

  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class' || key === 'className') {
      if (Array.isArray(value)) {
        element.classList.add(...value.filter(Boolean));
      } else if (value) {
        element.classList.add(...value.split(' ').filter(Boolean));
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key.startsWith('data-')) {
      element.setAttribute(key, value);
    } else if (key.toLowerCase() === 'tabindex') {      
      element.tabIndex = parseInt(value, 10);
    } else {
      element[key] = value;
    }
  }

  // Добавляем дочерние элементы
  for (const child of children) {
    if (child === null || child === undefined) continue;
    if (typeof child === 'string' || typeof child === 'number') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }

  return element;
}
