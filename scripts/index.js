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
	data.forEach((item) => {
		const { property, value } = item;
		const itemElement = createListItem(property, value);
		listElement.append(itemElement);
	});
}

function createListItem(property, value) {
	const itemElement = document.createElement('li');
	itemElement.classList.add('property-list__item');
	const propertyElement = createElement('div', 'property-list__property', property);
	const valueElement = createElement('div', 'property-list__value', value ? value : 'Value not yet set');
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
	const searchQuery = this.value.toLowerCase().trim();
	const itemElements = listElement.querySelectorAll('.property-list__item');
	itemElements.forEach((itemElement) => {
		const propertyText = itemElement.querySelector('.property-list__property').textContent.toLowerCase();
		const valueText = itemElement.querySelector('.property-list__value').textContent.toLowerCase();
		const propertyMatch = propertyText.includes(searchQuery);
		const valueMatch = valueText.includes(searchQuery);
		if (propertyMatch || valueMatch) {
			itemElement.style.display = 'grid';
			highlightMatches(itemElement, searchQuery);
		} else {
			itemElement.style.display = 'none';
		}
	});
}

function highlightMatches(itemElement, searchQuery) {
	const propertyElement = itemElement.querySelector('.property-list__property');
	const valueElement = itemElement.querySelector('.property-list__value');
	highlightText(propertyElement, searchQuery);
	highlightText(valueElement, searchQuery);
}

function highlightText(element, searchQuery) {
	const text = element.textContent;
	const highlightedText = text.replace(new RegExp(searchQuery, 'gi'), (match) => `<span class="highlight">${match}</span>`);
	element.innerHTML = highlightedText;
}

init();
