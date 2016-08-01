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
	var form, buttonAdd, buttonFullVersion, buttonCompactVersion, buttonFindMin, buttonFindMax;
	
	function reindexArray(arObjects) {
		var arTmp = [];
		var i;
		for (i = 0; i < arObjects.length; i++) {
			
			if ( i in arObjects ) {
				arTmp.push(arObjects[i]);
			}
		}
		return arTmp;
	}
	function showAllElements(arObjects, placeInDom) {
		var compiled, html;	
		arObjects = reindexArray(arObjects);
		compiled = _.template('<table><% _.forEach(arObjects, function(value, key) { %><tr><td><%- value.id %></td><td><%- value.city %></td><td><%- value.street %></td><td><%- value.countOfHouses %></td><td><button id="<%- key %>" class="js-delete-element">Delete</button></td></tr><% }); %></table>');
		html = compiled({'arObjects': arObjects});
		document.getElementById(placeInDom).innerHTML = html;
		return arObjects;
	}
	function showAllElementsCompact(arObjects, placeInDom) {
		var compiled, html;	
		arObjects = reindexArray(arObjects);
		compiled = _.template('<table><% _.forEach(arObjects, function(value, key) { %><tr><td><%- value.city %>, <%- value.street %> - <%- value.countOfHouses %></td><td><button id="<%- key %>" class="js-delete-element">Delete</button></td></tr><% }); %></table>');
		html = compiled({'arObjects': arObjects});
		document.getElementById(placeInDom).innerHTML = html;
		return arObjects;
	}
	function addElement(arObjects) {
		arObjects.push({
			id: document.getElementById('js-id-field').value,
			city: document.getElementById('js-city-field').value,
			street: document.getElementById('js-street-field').value,
			countOfHouses: document.getElementById('js-countOfHouses-field').value
		});
		arObjects = showAllElements(arObjects, 'js-table');
		return arObjects;
	}
	function deleteElement(arObjects, elementID) {
		delete arObjects[elementID];
		arObjects = showAllElements(arObjects, 'js-table');
		return arObjects;
	}
	function findMin(arObjects) {
		var minCount = _.minBy(arObjects, function(o) { return o.countOfHouses; });
		_.forEach(arObjects, function(value, key) {
			if(minCount.countOfHouses == value.countOfHouses) {
				document.getElementById(key).parentNode.parentNode.style.background = 'yellow';
			}
		});
		return arObjects;
	}
	function findMax(arObjects) {
		var maxCount = _.maxBy(arObjects, function(o) { return o.countOfHouses; });
		_.forEach(arObjects, function(value, key) {
			if(maxCount.countOfHouses == value.countOfHouses) {
				document.getElementById(key).parentNode.parentNode.style.background = 'green';
			}
		});
		return arObjects;
	}
	
	/* Full version view */
	buttonFullVersion = document.getElementById('js-full-version');
	buttonFullVersion.addEventListener('click', function(event) {
		arObjects = showAllElements(arObjects, 'js-table');
		event.stopPropagation();
	});
	/* Compact version view */
	buttonCompactVersion = document.getElementById('js-short-version');
	buttonCompactVersion.addEventListener('click', function(event) {
		arObjects = showAllElementsCompact(arObjects, 'js-table');
		event.stopPropagation();
	});
	/* Find min count of houses */
	buttonFindMin = document.getElementById('js-findmin-version');
	buttonFindMin.addEventListener('click', function(event) {
		arObjects = findMin(arObjects);
		event.stopPropagation();
	});
	/* Find max count of houses */
	buttonFindMax = document.getElementById('js-findmax-version');
	buttonFindMax.addEventListener('click', function(event) {
		arObjects = findMax(arObjects);
		event.stopPropagation();
	});
	/* Add element */
	buttonAdd = document.getElementById('js-add-button');
	buttonAdd.addEventListener('click', function(event) {
		arObjects = addElement(arObjects);
		event.stopPropagation();
	});
	/* Delete element */
	form = document.getElementById('js-table');
	form.addEventListener('click', function(event) {
		if(event.target.tagName === 'BUTTON') {
			arObjects = deleteElement(arObjects, event.target.id)
		}
	});
	
	showAllElements(arObjects, 'js-table');

})();