const lightWaterCssUrl = "https://cdn.jsdelivr.net/npm/water.css@2/out/light.min.css";
const darkWaterCssUrl = "https://cdn.jsdelivr.net/npm/water.css@2/out/dark.min.css";

function onBtnDarkClick() {
	waterStylesheet.href = darkWaterCssUrl;
	return updateThemeVisibility(true);
}

function onBtnLightClick() {
	waterStylesheet.href = lightWaterCssUrl;
	return updateThemeVisibility(false);
}

function updateThemeVisibility(dark) {
	Array.from(document.getElementsByClassName("hidden-dark")).forEach(e => e.classList.toggle("hidden", dark));
	Array.from(document.getElementsByClassName("hidden-light")).forEach(e => e.classList.toggle("hidden", !dark));
	return true;
}

function openDetailsForLocation(location) {
	if (location?.hash) {
		document.querySelector(`details:has(a${location.hash})`)?.setAttribute("open", true);
	}
}

const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
updateThemeVisibility(isDarkPreferred);
openDetailsForLocation(document.location);
