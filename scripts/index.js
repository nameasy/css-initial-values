const listElement = document.querySelector('.property-list');

fetch('data.json')
	.then((response) => response.json())
	.then((data) => {
		data.forEach((item) => {
			const { property, value } = item;
			const itemElement = document.createElement('li');
			itemElement.classList.add('property-list__item');
			const propertyElement = document.createElement('div');
			propertyElement.classList.add('property-list__property');
			propertyElement.textContent = property;
			const valueElement = document.createElement('div');
			valueElement.classList.add('property-list__value');
			valueElement.textContent = value ? value : 'Value not yet set';
			itemElement.append(propertyElement, valueElement);
			listElement.append(itemElement);
		});
		const searchInput = document.querySelector('.search-field__input');
		searchInput.addEventListener('input', () => {
			const searchQuery = searchInput.value.toLowerCase().trim();
			const itemElements = listElement.querySelectorAll('.property-list__item');
			itemElements.forEach((itemElement) => {
				const propertyText = itemElement.querySelector('.property-list__property').textContent.toLowerCase();
				const valueText = itemElement.querySelector('.property-list__value').textContent.toLowerCase();
				if (propertyText.includes(searchQuery) || valueText.includes(searchQuery)) {
					itemElement.style.display = 'flex';
					itemElement.querySelector('.property-list__property').innerHTML = propertyText.replace(new RegExp(searchQuery, 'gi'), (match) => `<span class="highlight">${match}</span>`);
					itemElement.querySelector('.property-list__value').innerHTML = valueText.replace(new RegExp(searchQuery, 'gi'), (match) => `<span class="highlight">${match}</span>`);
				} else {
					itemElement.style.display = 'none';
				}
			});
		});
	})
	.catch((error) => console.error(error));
