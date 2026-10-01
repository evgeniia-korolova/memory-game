export function createDOMElement(tagName, attributes = {}, ...children) {
  const element = document.createElement(tagName);

  // Перебираем атрибуты (классы, дата-атрибуты, события и т.д.)
  for (const [key, value] of Object.entries(attributes)) {
    if (key === 'class' || key === 'className') {
      // Поддержка как строки "btn active", так и массива ["btn", "active"]
      if (Array.isArray(value)) {
        element.classList.add(...value.filter(Boolean));
      } else if (value) {
        element.classList.add(...value.split(' ').filter(Boolean));
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      // Навешивание событий: onclick -> click
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else if (key.startsWith('data-')) {
      // Дата-атрибуты
      element.setAttribute(key, value);
    } else {
      // Любые другие свойства (id, disabled, href и т.д.)
      element[key] = value;
    }
  }

  // Добавляем дочерние элементы (текст или другие DOM-узлы)
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