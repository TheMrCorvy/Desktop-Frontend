import { PricingCardT, RecommendedAppsT, CharSizesT } from "./types"
import { translate } from "../lang"

export const maxSlots = {
	free: 5,
	semi_premium: 20,
}

export const recommendedTwoFactorApps = (lang: string): RecommendedAppsT[] => {
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

export const recommendedApps = (lang: string): RecommendedAppsT[] => {
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

export const pricingInfo = (lang: string): PricingCardT[] => {
	const freeCard: PricingCardT = {
		title: translate("tier_free", lang, 0),
		subtitle: translate("tier_free", lang, 1),
		listItems: [
			{
				icon: "sync-alt",
				text: translate("tier_free", lang, 2),
			},
			{
				icon: "lock",
				text: translate("tier_free", lang, 3),
			},
			{
				icon: "fingerprint",
				text: translate("tier_free", lang, 4),
			},
		],
		cardElevation: 0,
		buttonText: translate("navbar_register_btn", lang),
	}

	const semiPremiumCard: PricingCardT = {
		title: translate("tier_semi_premium", lang, 0),
		subtitle: translate("tier_semi_premium", lang, 1),
		listItems: [
			{
				icon: "sync-alt",
				text: translate("tier_semi_premium", lang, 2),
			},
			{
				icon: "lock",
				text: translate("tier_semi_premium", lang, 3),
			},
			{
				icon: "fingerprint",
				text: translate("tier_semi_premium", lang, 5),
			},
			{
				icon: "wallet",
				text: translate("tier_semi_premium", lang, 4),
			},
		],
		cardElevation: 1,
		buttonText: translate("navbar_register_btn", lang),
	}

	const premiumCard: PricingCardT = {
		title: translate("tier_premium", lang, 0),
		subtitle: translate("tier_premium", lang, 1),
		listItems: [
			{
				icon: "sync-alt",
				text: translate("tier_premium", lang, 2),
			},
			{
				icon: "lock-open",
				text: translate("tier_premium", lang, 3),
			},
			{
				icon: "fingerprint",
				text: translate("tier_premium", lang, 6),
			},
			// {
			// 	icon: "file-import",
			// 	text: translate("tier_premium", lang, 8),
			// },
			{
				icon: "users",
				text: translate("tier_premium", lang, 4),
			},
			{
				icon: "star",
				text: translate("tier_premium", lang, 5),
			},
		],
		cardElevation: 2,
		buttonText: translate("navbar_register_btn", lang),
	}

	return [freeCard, semiPremiumCard, premiumCard]
}

export const calcMaxChar = (option: CharSizesT): number => {
	//these values are the maximum characters that some columns in the database can store
	switch (option) {
		case "xs":
			return 50
		case "sm":
			return 190
		case "md":
			return 250
		case "lg":
			return 500
		case "xl":
			return 1000

		default:
			return 0
	}
}
