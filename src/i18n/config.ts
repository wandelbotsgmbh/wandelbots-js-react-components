import type { i18n as I18NInstance } from "i18next"
import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import deJSON from "./locales/de/translations.json"
import enJSON from "./locales/en/translations.json"

const i18n: I18NInstance = i18next.createInstance()

i18n.use(LanguageDetector).init({
  supportedLngs: ["en", "de"],
  resources: {
    en: {
      translations: enJSON,
    },
    de: {
      translations: deJSON,
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
  detection: {
    order: ["navigator", "htmlTag"],
    // Keep nothing in the app's storage: an app's own language detector
    // uses the same localStorage key
    caches: [],
  },
})

export { i18n }
