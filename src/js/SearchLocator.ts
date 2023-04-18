class SearchLocator {
	private serverBaseUrl = process.env.SERVER_API_URL;

	async getSearchData(search: string = "") {
		try {
			const response = await fetch(this.serverBaseUrl + search);
			const data = await response.json();
			return data;
		} catch (error) {
			console.trace(error);
		}
	}
}

export default SearchLocator;
