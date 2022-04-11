"use-strict";
import IpAddressLocator from "./IpAddressLocator";
import AddressMapControl from "./AddressMapControl";
import PopulateTable from "./PopulateTable";

window.addEventListener("DOMContentLoaded", async () => {
	/**
	 * Inserts information received from the APIs in the table and updates the map.
	 * @param {*} data
	 */
	const displayData = (data) => {
		console.log(data);
		if (data) {
			const { latitude, longitude } = data;
			infoDisplay.populateTable(data);
			appMap.updateMap([latitude, longitude]);
		}
	};

	const appMap = new AddressMapControl();
	const locator = new IpAddressLocator();
	const infoDisplay = new PopulateTable();

	const locationInfo = await locator.getLocationInfo();

	displayData(locationInfo);

	const searchElement = document.querySelector(".search");
	searchElement.addEventListener("submit", async function (e) {
		e.preventDefault();
		const search = e.target.searchedAddress.value;

		const newLocationInfo = await locator.getLocationInfo(search);

		displayData(newLocationInfo);
	});
});
