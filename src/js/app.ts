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
	let data: IpAddressData = await locator.getIpAddressInfo(ipAddress);

	// Populate the ".search + table" element with the relevant data
	infoDisplay.populateTable(data);

	// Update the map so it displays the new location and moves the marker to it
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

		// The field is empty the API will return information about the client.
		if (search === "") {
			return displayData();
		} else {
			// Otherwise we use the search input to rerender the app, if it is valid.
			const domainLocator = new DomainNameLocator();
			if (domainLocator.isValidDomain(search)) {
				const ipFromDomain = await domainLocator.getIpFromDomain();

				if (ipFromDomain) {
					ipAddress = ipFromDomain.query;
				} else {
					// Stops the code execution a valid IP address from the domain searched wasn't found.
					return;
				}
			}
			displayData(ipAddress);
		}
	});
});
