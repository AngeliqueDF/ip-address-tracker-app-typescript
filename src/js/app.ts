import DisplayData from "./DisplayData";

window.addEventListener("DOMContentLoaded", async () => {
	const view = new DisplayData();
	await view.displayData();
});
