import { translate } from "../lang"

export type RecommendedAppsType = {
	appName: string
	bodyText: string
	linkAppleStore: string
	linkPlayStore: string
	linkOfficialPage?: string
}

export const recommendedTwoFactorApps = (lang: string): RecommendedAppsType[] => {
	return [
		{
			appName: "Microsoft Authenticator",
			bodyText: translate("recommended_apps_texts", lang, 0),
			linkAppleStore: "https://apps.apple.com/es/app/microsoft-authenticator/id983156458",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=en_US&gl=US",
		},
		{
			appName: "Google Authenticator",
			bodyText: translate("recommended_apps_texts", lang, 1),
			linkAppleStore: "https://apps.apple.com/es/app/google-authenticator/id388497605",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_US&gl=US",
		},
		{
			appName: "Twilio Authy",
			bodyText: translate("recommended_apps_texts", lang, 2),
			linkAppleStore: "https://apps.apple.com/us/app/twilio-authy/id494168017",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.authy.authy&hl=en_US&gl=US",
		},
	]
}

export const recommendedApps = (lang: string): RecommendedAppsType[] => {
	return [
		{
			appName: "Firefox Focus",
			bodyText: translate("recommended_apps_texts", lang, 3),
			linkAppleStore: "https://apps.apple.com/us/app/firefox-focus-privacidad/id1055677337",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=org.mozilla.focus&hl=en_US&gl=US",
		},
		{
			appName: "Tor Web Browser",
			bodyText: translate("recommended_apps_texts", lang, 4),
			linkAppleStore: "https://apps.apple.com/us/app/onion-browser/id519296448",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=org.torproject.torbrowser&hl=en_US&gl=US",
			linkOfficialPage: "https://www.torproject.org/",
		},
		{
			appName: "Duck Duck Go",
			bodyText: translate("recommended_apps_texts", lang, 5),
			linkAppleStore: "https://apps.apple.com/app/duckduckgo-privacy-browser/id663592361",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.duckduckgo.mobile.android",
			linkOfficialPage: "https://duckduckgo.com/",
		},
	]
}
