/**
 * Validates the searched domain and finds a matching IP address.
 */
class DomainNameLocator {
	/**
	 * Finds the IP address of a domain.
	 * Displays an alert if the IP failed to process the search entry.
	 */
	async getIpFromDomain(): Promise<string> {
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

			return jsonResponse.query;
		} catch (error) {
			console.log(error);
		}
	}
}

export default DomainNameLocator;
