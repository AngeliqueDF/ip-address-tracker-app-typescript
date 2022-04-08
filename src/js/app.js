"use-strict";
import IpAddressLocator from "./IpAddressLocator";
import AddressMapControl from "./AddressMapControl";
import PopulateTable from "./PopulateTable";

window.addEventListener("DOMContentLoaded", async () => {
	const appMap = new AddressMapControl();
	const locator = new IpAddressLocator();
	const infoDisplay = new PopulateTable();

	const locationInfo = await locator.getLocationInfo();

	if (locationInfo) {
		infoDisplay.displayFoundInfo(locationInfo.data);
		appMap.displayAddress([
			locationInfo.data.location.lat,
			locationInfo.data.location.lng,
		]);
	}

	const searchElement = document.querySelector(".search");
	searchElement.addEventListener("submit", async function (e) {
		e.preventDefault();

		const search = e.target.searchedAddress.value;

		const newLocationInfo = await locator.getLocationInfo(search);

		if (newLocationInfo) {
			infoDisplay.displayFoundInfo(newLocationInfo.data);
			appMap.displayAddress([
				newLocationInfo.data.location.lat,
				newLocationInfo.data.location.lng,
			]);
		}
	});
});
