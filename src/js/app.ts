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

		// If the field is empty, the value of ip in the URL is === "", therefore the API will return information about the client.
		if (search === "") {
			return displayData();
		} else {
			// Otherwise we will use the search input to rerender the app
			// First, check the input is a valid domain
			const domainLocator = new DomainNameLocator();
			if (domainLocator.isValidDomain(search)) {
				/**
				 * A valid URL (according to the constructor) doesn't necessarily match with an IP address we can use in the app.
				 * `ipFromDomain` will be either null (falsy) or an object with the new data to display
				 */
				const ipFromDomain = await domainLocator.getIpFromDomain();

				// Check we received a truthy value
				if (ipFromDomain) {
					displayData(ipFromDomain);
				}
			}
		}
	});
});
