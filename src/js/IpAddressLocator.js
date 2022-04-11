import { IPIFY_KEY } from "./env.js";

class IpAddressLocator {
	#apiBasicUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${IPIFY_KEY}`;

	// Displayed when request fails to be sent on some browsers because of the CORS policy
	#API_UNREACHABLE_ERROR_MESSAGE = `Oops! There was an error.\nPlease check your internet connection is working, then try opening the app in another browser or in incognito mode.`;

	/**
	 * Displayed when the request is invalid, the API returns a 422 status code
	 */
	#CANT_PROCESS_REQUEST_MESSAGE =
		"Error: please input a correct IPv4 or IPv6 address, or a domain name.";

	/**
	 * Displayed when requests limit was reached.
	 */
	#REQUESTS_FORBIDDEN = "Sorry, we can't send more requests at this time!";

	/**
	 * Locates the IP address search.
	 * @param {string} search - An IP address or an empty quote.
	 * @returns The searched address' (or the client's if search === "") location details.
	 */
	async getLocationInfo(search = "") {
		try {
			const response = await fetch(`${this.#apiBasicUrl}&ipAddress=${search}`);

			const data = await response.json();

			if (response.status === 200) {
				return data;
			} else if (response.status === 422) {
				alert(this.#CANT_PROCESS_REQUEST_MESSAGE);
			} else if (response.status === 403) {
				alert(this.#REQUESTS_FORBIDDEN);
			}
		} catch (error) {
			console.log("Could not get data", error);
			alert(this.#API_UNREACHABLE_ERROR_MESSAGE);
		}
	}
}

export default IpAddressLocator;
