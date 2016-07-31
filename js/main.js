"use strict";
(function() {

	var arObjects = [
		{
			id: 1,
			city: 'Samara',
			street: 'Michurina',
			countOfHouses: 78
		},
		{
			id: 2,
			city: 'Moscow',
			street: 'Lenina',
			countOfHouses: 34
		}
	]
	var form, buttonAdd, buttonDelete, i, arDeleteButtons;

	function showAllElements(arObjects, $placeInDom) {
		var compiled, html;

		compiled = _.template('<table><% _.forEach(arObjects, function(key) { %><tr><td><%- key.id %></td><td><%- key.city %></td><td><%- key.street %></td><td><%- key.countOfHouses %></td><td><button id="<%- key.id %>" class="js-delete-element">Delete</button></td></tr><% }); %></table>');
		html = compiled({'arObjects': arObjects});
		document.getElementById($placeInDom).innerHTML = html;
	}
	function addElement(arObjects) {
		arObjects.push({
			id: document.getElementById('js-id-field').value,
			city: document.getElementById('js-city-field').value,
			street: document.getElementById('js-street-field').value,
			countOfHouses: document.getElementById('js-countOfHouses-field').value
		});
		showAllElements(arObjects, 'js-table');
	}

	function deleteElement(arObjects, elementID) {
		delete arObjects[elementID-1];
		console.log(arObjects);
		showAllElements(arObjects, 'js-table');
	}

	buttonAdd = document.getElementById('js-add-button');
	buttonAdd.addEventListener('click', function(event) {
		addElement(arObjects);
		event.stopPropagation();
		event.stopEvent();
	});


	form = document.getElementById('js-table');
	form.addEventListener('click', function(event) {
		if(event.target.tagName === 'BUTTON') {
			deleteElement(arObjects, event.target.id)
		}
	});
	showAllElements(arObjects, 'js-table');

})();