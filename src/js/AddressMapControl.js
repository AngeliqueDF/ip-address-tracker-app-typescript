class AddressMapControl {
	// The svg icon which marks the address location
	#marker;

	/**
	 * The current location to display, received from IPIFY (which initializes it at the user's location)
	 */
	#latLng;

	// The map displayed in div#map
	#map;

	// The default zoom
	#ZOOM = 14;

	// The element that will display the custom icon
	#svgIcon = L.divIcon({
		html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
		className: "",
		iconSize: [24, 40],
		iconAnchor: [12, 40],
	});

	constructor(newLatLng = [0, 0]) {
		this.#latLng = newLatLng;

		this.displayMap();

		this.#marker = L.marker(this.latLng, { icon: this.#svgIcon }).addTo(
			this.#map
		);
	}

	// Puts the Leaflet map in the DOM
	displayMap() {
		this.#map = L.map("map", {
			center: this.#latLng,
			zoom: this.#ZOOM,
			zoomControl: false,
		});
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
		}).addTo(this.#map);
	}

	// Moves the marker
	#displayMarker(latLngDisplayed) {
		this.#marker.setLatLng(latLngDisplayed);
	}

	/**
	 * Centers centers the map on the new location and moves the marker.
	 * @param {*} newLatLng
	 */
	updateMap(newLatLng) {
		this.#map.setView(newLatLng, this.#ZOOM);
		this.#displayMarker(newLatLng);
	}
}

export default AddressMapControl;

