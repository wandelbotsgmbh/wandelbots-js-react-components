import deJSON from "./locales/de/translations.json"
import enJSON from "./locales/en/translations.json"
import i18next from "i18next"
import type { i18n } from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

const i18n: i18n = i18next.createInstance()

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
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
  })

export default i18n
