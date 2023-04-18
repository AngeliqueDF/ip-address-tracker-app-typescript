/**
 * Controls the view on the frontend.
 * - Updates the map.
 * - Populates the table.
 */

import SearchLocator from "./SearchLocator";
import PopulateTable from "./PopulateTable";
import AddressMapControl from "./AddressMapControl";

export default class DisplayData {
	private searchLocator = new SearchLocator();
	private infoDisplay = new PopulateTable();
	private appMap = new AddressMapControl();

	private searchElement;
	private searchTerm = "";

	constructor() {
		this.searchElement = document.querySelector(".search");

		this.searchElement.addEventListener("submit", async (e) => {
			e.preventDefault();
			this.searchTerm = e.target["searchedAddress"].value;
			await this.displayData();
		});
	}

	setSearchTerm(search: string) {
		this.searchTerm = search;
	}

	displayData() {
		return new Promise(async (resolve, reject) => {
			let json;
			try {
				json = await this.searchLocator.getSearchData(this.searchTerm);
			} catch (error: any) {
				console.trace(error);
				alert(json.message || "Could not locate this search.");
				reject();
			}
			if (!json) return;
			this.infoDisplay.populateTable({
				ip: json.ip,
				isp: json.isp,
				city: json.city,
				district: json.district,
				zipcode: json.zipcode,
				time_zone: json.time_zone,
			});
			this.appMap.updateMap([json.latitude, json.longitude]);
			resolve("");
		});
	}
}
