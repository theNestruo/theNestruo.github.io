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

function decorateLinks() {
	const biByDomain = {
		"bsky.app": "bluesky",
		"github.com": "github",
		"gist.github.com": "github",
		"thenestruo.itch.io": "controller",
		"marketplace.visualstudio.com": "microsoft",
		"msxcartridgeshop.com": "cart",
		"open-vsx.org": "plugin",
		"twitter.com": "twitter",
		"es.wikipedia.org": "wikipedia",
		"x.com": "twitter-x",
	};

	for (const a of document.querySelectorAll("details a:not(:has(i))")) {
		if (a.href.startsWith("https://")) {
			const bi = biByDomain[a.href.substring(8, a.href.indexOf("/", 9))] ?? "link-45deg";
			a.innerHTML = `<i class="bi-${bi}"></i> ${a.innerHTML}`;
		}
	}
}

function openDetailsForLocation(location) {
	if (location?.hash) {
		document.querySelector(`details:has(a${location.hash})`)?.setAttribute("open", true);
	}
}

const isDarkPreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;
updateThemeVisibility(isDarkPreferred);
decorateLinks();
openDetailsForLocation(document.location);
