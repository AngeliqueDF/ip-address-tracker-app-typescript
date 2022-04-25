import L from "leaflet";

console.log(L);

/**
 * A wrapper around Leaftet's L class.
 * Controls the map element. Displays the marker and centers the map on first load.
 * Moves the marker and recenters the map after every search.
 */
class AddressMapControl extends L.Class {
	/**
	 * The element marks the address location
	 */
	private marker: L.Marker;

	/**
	 * The current location to display, received from IPIFY (which initializes it at the user's location)
	 */
	private latLng: L.LatLngExpression;

	/**
	 * The map displayed in the "div#map" HTML element
	 */
	private map: L.Map;

	/**
	 * The default zoom. The map's zoom is reset to this value after every search.
	 */
	private readonly ZOOM = 18;

	/**
	 * The custom svg icon for the marker
	 */
	private svgIcon = L.divIcon({
		html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
		className: "",
		iconSize: [24, 40],
		iconAnchor: [12, 40],
	});

	constructor(newLatLng: L.LatLngExpression = [0, 0]) {
		super();
		this.latLng = newLatLng;

		this.initializeMap();

		this.marker = L.marker(this.latLng, { icon: this.svgIcon }).addTo(this.map);
	}

	/**
	 * Renders the Leaflet map in the DOM
	 */
	initializeMap() {
		this.map = L.map("map", {
			center: this.latLng,
			zoom: this.ZOOM,
			zoomControl: false,
		});
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
		}).addTo(this.map);
	}

	/**
	 * Moves the marker.
	 */
	private displayMarker(newLatLng: L.LatLngExpression) {
		this.marker.setLatLng(newLatLng);
	}

	/**
	 * Centers centers the map on the new location and points the marker to it.
	 */
	updateMap(newLatLng: L.LatLngExpression) {
		this.map.setView(newLatLng, this.ZOOM);
		this.displayMarker(newLatLng);
	}
}

export default AddressMapControl;
