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


};

window.addEventListener("DOMContentLoaded", async () => {
	displayData();

	const searchElement = document.querySelector(".search");
	searchElement.addEventListener("submit", async function (e) {
		e.preventDefault();

		const search = e.target["searchedAddress"].value;

		// If the field is empty, the value of ip in the URL is === "", therefore the API will return information about the client.
	});
});
