class SearchLocator {
	async getSearchData(search: string) {
		const requestUrl =
			(process.env.DOMAIN_LOCATOR_URL || "http://localhost:5000/api?search=") +
			search;

		try {
			const response = await fetch(requestUrl);
			const data = await response.json();
			return data;
		} catch (error) {
			console.trace(error);
		}
	}
}

export default SearchLocator;
