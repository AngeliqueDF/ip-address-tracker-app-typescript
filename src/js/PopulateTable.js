class PopulateTable {
	/**
	 * Populates the table with data received from the APIs.
	 * @param {Object} data
	 */
	populateTable(data) {
		const {
			ip,
			isp,
			location: { city, region, postalCode, timezone },
		} = data;

		/**
		 * Maps each HTML element to the response data
		 */
		const elements = [
			{ selector: "ip-address", data: ip },
			{ selector: "isp", data: isp },
			{ selector: "city", data: city },
			{ selector: "region", data: region },
			{ selector: "postal-code", data: postalCode },
			{ selector: "timezone", data: timezone },
		];

		/**
		 * Selects an element in the DOM and inserts matching data into it.
		 * @param {*} idSelector - HTML element selected by its id
		 * @param {*} elementData - Data from the API response
		 */
		const displayDataInDOM = (idSelector, elementData) => {
			const element = document.getElementById(idSelector);
			element.textContent = elementData;
		};

		elements.forEach((e) => displayDataInDOM(e.selector, e.data));
	}
}

export default PopulateTable;
