"use-strict";
import IpAddressLocator from "./IpAddressLocator";
import AddressMapControl from "./AddressMapControl";
import PopulateTable from "./PopulateTable";
import DomainNameLocator from "./DomainNameLocator";

const appMap = new AddressMapControl();
const locator = new IpAddressLocator();
const infoDisplay = new PopulateTable();

export type IpAddressData = {
	ip: string;
	isp: string;
	city: string;
	district: string;
	zipcode: string;
	latitude: number;
	longitude: number;
	time_zone: { offset: number };
};

/**
 * Locates and displays the information found about the client.
 * Called when the page is first loaded.
 */
const displayData = async (ipAddress = "") => {
	let data: IpAddressData = await locator.getIpAddressInfo(ipAddress);

	// Populate the ".search + table" element with the relevant data
	infoDisplay.populateTable(data);

	// Update the map so it displays the new location and moves the marker to it
	appMap.updateMap([data.latitude, data.longitude]);
};

window.addEventListener("DOMContentLoaded", async () => {
	displayData();

	const searchElement = document.querySelector(".search");
	searchElement.addEventListener("submit", async function (e) {
		e.preventDefault();

		const search = e.target["searchedAddress"].value;

		// If the field is empty, the value of ip in the URL is === "", therefore the API will return information about the client.
		if (search === "") {
			return displayData();
		} else {

			}
		}
	});
});
