"use-strict";
import SearchLocator from "./SearchLocator";
import AddressMapControl from "./AddressMapControl";
import PopulateTable from "./PopulateTable";

const appMap = new AddressMapControl();
const searchLocator = new SearchLocator();
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
	let json = await searchLocator.getSearchData(ipAddress);

	// If json.data is undefined, it means there was a problem processing the request. There's no need to keep executing the function, hence the return statement. An alert is also displayed to inform the user.
	if (!json.data) return alert(json.message);

	// Populate the ".search + table" element with the relevant data
	infoDisplay.populateTable({
		ip: json.data.ip,
		isp: json.data.isp,
		city: json.data.city,
		district: json.data.district,
		zipcode: json.data.zipcode,
		time_zone: json.data.time_zone,
	});
	// Update the map so it displays the new location and moves the marker to point to it
	appMap.updateMap([json.data.latitude, json.data.longitude]);
};

window.addEventListener("DOMContentLoaded", async () => {
	displayData();

	const searchElement = document.querySelector(".search");
	searchElement.addEventListener("submit", async function (e) {
		e.preventDefault();

		const search = e.target["searchedAddress"].value;

		// If the field is empty, the value of ip in the URL is === "", therefore the API will return information about the client.
		if (search === "") displayData();
		// Otherwise, the search can be either an IP address, a domain name, or neither (an invalid input). The server will process the search input and return a response used in displayData
		displayData(search);
	});
});
