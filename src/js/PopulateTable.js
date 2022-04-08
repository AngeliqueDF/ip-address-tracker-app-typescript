class PopulateTable {
	displayFoundInfo(data) {
		const {
			ip,
			isp,
			location: { city, region, postalCode, timezone },
		} = data;
		const elements = [
			{ selector: "ip-address", data: ip },
			{ selector: "isp", data: isp },
			{ selector: "city", data: city },
			{ selector: "region", data: region },
			{ selector: "postal-code", data: postalCode },
			{ selector: "timezone", data: timezone },
		];

		const displayDataInDOM = (idSelector, elementData) => {
			const element = document.getElementById(idSelector);
			element.textContent = elementData;
		};

		elements.forEach((e) => displayDataInDOM(e.selector, e.data));
	}
}

export default PopulateTable;
