import { translate } from "../lang"

export type TwoFactorAppsType = {
	appName: string
	bodyText: string
	linkAppleStore: string
	linkPlayStore: string
}

export const recommendedTwoFactorApps = (lang: string): TwoFactorAppsType[] => {
	return [
		{
			appName: "Microsoft Authenticator",
			bodyText: translate("recommended_apps_texts", lang, 0),
			linkAppleStore: "https://apps.apple.com/es/app/microsoft-authenticator/id983156458",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.azure.authenticator&hl=es_AR&gl=US",
		},
		{
			appName: "Google Authenticator",
			bodyText: translate("recommended_apps_texts", lang, 1),
			linkAppleStore: "https://apps.apple.com/es/app/google-authenticator/id388497605",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=es_AR&gl=US",
		},
		{
			appName: "Twilio Authy",
			bodyText: translate("recommended_apps_texts", lang, 2),
			linkAppleStore: "https://apps.apple.com/us/app/twilio-authy/id494168017",
			linkPlayStore:
				"https://play.google.com/store/apps/details?id=com.authy.authy&hl=es_AR&gl=US",
		},
	]
}
