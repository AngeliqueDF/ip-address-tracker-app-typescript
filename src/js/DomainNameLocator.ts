/**
 * Validates the searched domain and finds a matching IP address.
 */
class DomainNameLocator {
	private apiBasicUrl = "http://ip-api.com/json";
	private domainSearch: string;

	/**
	 * Validates the search is a domain name using the `URL()` constructor.
	 */
	isValidDomain(search: string): boolean {
		const hasProtocol = /^(https?:\/\/)/.test(search);

		/**
		 * The URL constructor requires the protocol to work. We add it if it was omitted by the user.
		 */
		let newUrl = hasProtocol ? search : `https://${search}`;

		const isValidDomain = new URL(newUrl);
		if (isValidDomain) {
			// Saving the host property value of the URL instance to find its matching IP address
			this.domainSearch = isValidDomain.host;
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Finds the IP address of a domain.
	 * Displays an alert if the IP failed to process the search entry.
	 */
	async getIpFromDomain() {
		const requestUrl = `${this.apiBasicUrl}/${this.domainSearch}`;
		try {
			const response = await fetch(requestUrl);
			const jsonResponse = await response.json();

			if (jsonResponse.status === "fail") {
				alert(
					`Oops! There was an error with the search: ${jsonResponse.message} "${this.domainSearch}".`
				);

				// Return a falsy value because the request failed: the searched domain didn't match with any IP address
				return null;
			}

			return jsonResponse;
		} catch (error) {
			console.log(error);
		}
	}
}

export default DomainNameLocator;
