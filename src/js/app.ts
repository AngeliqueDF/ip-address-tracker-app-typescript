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
 * Inserts information received from the IP Geolocation API in the table and updates the map.
 */
const displayData = async (ipAddress = "") => {
	let data: IpAddressData;
	data = await locator.getIpAddressInfo(ipAddress);

	// Populate the ".search + table" element with the relevant data
	infoDisplay.populateTable(data);

	// Update the map so it displays the new location
	appMap.updateMap([data.latitude, data.longitude]);
};

window.addEventListener("DOMContentLoaded", async () => {
	/**
	 * Locates and displays the information found about the client when the page is first loaded.
	 */
	displayData();

	const searchElement = document.querySelector(".search");
	searchElement.addEventListener("submit", async function (e) {
		e.preventDefault();

		const search = e.target["searchedAddress"].value;
		let ipAddress = search;

		displayData(ipAddress);
	});
});
