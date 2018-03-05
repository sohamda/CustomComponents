===================================
Detect User language 
===================================
Steps to use this custom component

1. Create an API key in Yandex : https://tech.yandex.com/translate/
2. Replace that in the JS file.
3. Update registry.js to use this custom component.
4. Add a String variable in dialog flow : detectedLocale. Example : detectedLocale: "string"
5. Use state in dialog flow.
	detectLanguage:
		component: "DetectLanguage"
	switch:
		component: "System.Switch"
		properties:
			variable: detectedLocale
			source:
			values:
				- "en"
				- "nl"
		transitions:
			actions:
				en: <ENGLISH_STATE>
				nl: <DUTCH_STATE>
				NONE: <EXCPETION_STATE>
	