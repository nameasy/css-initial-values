const listElement = document.querySelector('.property-list');

async function init() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    renderData(data);
    setupSearchListener();
  } catch (error) {
    console.error(error);
  }
}

function renderData(data) {
  data.forEach(({ property, value }) => {
    /*const itemElement = createListItem(property, value || 'Value not yet set');*/
    const itemElement = createListItem(
      property,
      value === undefined || value === '' ? 'Value not yet set' : value,
    );
    listElement.append(itemElement);
  });
}

function createListItem(property, value) {
  const itemElement = document.createElement('li');
  itemElement.classList.add('property-list__item');
  const propertyElement = createElement(
    'div',
    'property-list__property',
    property,
  );
  const valueElement = createElement('div', 'property-list__value', value);
  itemElement.append(propertyElement, valueElement);
  return itemElement;
}

function createElement(tagName, className, textContent) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
}

function setupSearchListener() {
  const searchInput = document.querySelector('.search-field__input');
  searchInput.addEventListener('input', handleSearch);
}

function handleSearch() {
  const searchQuery = this.value.trim().toLowerCase();
  const itemElements = listElement.querySelectorAll('.property-list__item');
  itemElements.forEach((itemElement) => {
    const propertyText = itemElement
      .querySelector('.property-list__property')
      .textContent.toLowerCase();
    const valueText = itemElement
      .querySelector('.property-list__value')
      .textContent.toLowerCase();
    const matches =
      propertyText.includes(searchQuery) || valueText.includes(searchQuery);
    itemElement.style.display = matches ? 'grid' : 'none';
    highlightMatches(itemElement, searchQuery);
  });
}

function highlightMatches(itemElement, searchQuery) {
  const elementsToHighlight = itemElement.querySelectorAll(
    '.property-list__property, .property-list__value',
  );
  elementsToHighlight.forEach((element) => {
    const text = element.textContent;
    if (searchQuery) {
      const highlightedText = text.replace(
        new RegExp(searchQuery, 'gi'),
        (match) => `<span class="highlight">${match}</span>`,
      );
      element.innerHTML = highlightedText;
    } else {
      element.innerHTML = text;
    }
  });
}

init();
