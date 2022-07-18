import { DOMAIN_LOCATOR_URL } from "./env.js";

/**
 * Validates the searched domain and finds a matching IP address.
 */
class DomainNameLocator {
	/**
	 * Finds the IP address of a domain.
	 * Displays an alert if the IP failed to process the search entry.
	 */
	async getIpFromDomain(search: string): Promise<string | undefined> {
		const requestUrl = DOMAIN_LOCATOR_URL + search;
		try {
			const response = await fetch(requestUrl);

			if (response.status === 400) {
				// If the status code is 400, the search was an IP address.
				return search;
			} else {
				const jsonResponse = await response.json();
				if (response.status === 404) {
					// If there was an error with the search (it is invalid), the server returns a status code 404.
					throw new Error(jsonResponse.message);
				} else if (response.status === 200) {
					return jsonResponse.result;
				}
			}
		} catch (error) {
			console.trace(error);
		}
	}
}

export default DomainNameLocator;
