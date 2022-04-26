import { IpAddressData } from "./app";

/**
 * Using a utility type to omit the fields not needed in PopulateTable.
 */
type TableData = Omit<IpAddressData, "latitude" | "longitude">;

class PopulateTable {
	/**
	 * Populates the table with data received from the APIs.
	 */
	populateTable(data: TableData) {
		const { ip, isp, city, district, zipcode, time_zone } = data;

		/**
		 * Maps each HTML element to the response data
		 */
		const elements = [
			{ selector: "ip-address", data: ip },
			{ selector: "isp", data: isp },
			{ selector: "city", data: city },
			{ selector: "region", data: district },
			{ selector: "postal-code", data: zipcode },
			{
				selector: "timezone",
				data: `${time_zone.offset >= 0 ? "+" : ""}${time_zone.offset}`,
			},
		];

		/**
		 * Selects an element in the DOM and inserts matching data into it.
		 * @param {*} idSelector - document.getElementById() argument.
		 * @param {*} elementData - Data from the API response to insert in the element.
		 */
		const displayDataInDOM = (idSelector: string, elementData: string) => {
			const element = document.getElementById(idSelector);
			element.textContent = elementData;
		};

		elements.forEach((e) => displayDataInDOM(e.selector, e.data));
	}
}

export default PopulateTable;
