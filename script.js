const DEBOUNCE_DELAY = 250;
const inputElement = document.querySelector('.search-field__input');
const listElement = document.querySelector('.property-list');
const textElement = document.querySelector('.section__text');

async function init() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    filterAndDisplayResults(data);
    inputElement.addEventListener(
      'input',
      debounce(() => filterAndDisplayResults(data), DEBOUNCE_DELAY),
    );
  } catch (error) {
    console.error(error);
  }
}

function filterAndDisplayResults(data) {
  const searchQuery = inputElement.value.trim().toLowerCase();
  const filteredData = filterData(data, searchQuery);
  displayFilteredResults(filteredData, searchQuery);
}

function filterData(data, query) {
  return data.filter((item) => {
    const propertyName = item.property.toLowerCase();
    const propertyValue = (item.value || '').toLowerCase();
    return propertyName.includes(query) || propertyValue.includes(query);
  });
}

function displayFilteredResults(filteredData, query) {
  listElement.innerHTML = '';
  if (filteredData.length === 0) {
    textElement.style.display = 'block';
  } else {
    textElement.style.display = 'none';
    filteredData.forEach((item) => {
      const itemElement = createItemElement(item.property, item.value, query);
      listElement.append(itemElement);
    });
  }
}

function createItemElement(property, value, query) {
  const itemElement = document.createElement('li');
  itemElement.classList.add('property-list__item');
  const propertyElement = document.createElement('div');
  propertyElement.classList.add('property-list__property');
  propertyElement.innerHTML = highlightMatches(property, query);
  const valueElement = document.createElement('div');
  valueElement.classList.add('property-list__value');
  valueElement.innerHTML = highlightMatches(
    value || 'Value not yet set',
    query,
  );
  itemElement.append(propertyElement, valueElement);
  return itemElement;
}

function highlightMatches(text, query) {
  if (!query) {
    return text;
  }
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedQuery, 'gi');
  return text.replace(
    regex,
    (match) => `<span class="highlight">${match}</span>`,
  );
}

function debounce(callback, delay) {
  let timeoutId;
  return (event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(event);
    }, delay);
  };
}

init();
