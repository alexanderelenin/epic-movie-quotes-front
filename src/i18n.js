import { createI18n } from "vue-i18n";
import en from "./config/localization/en.js";
import ka from "./config/localization/ka.js";

const i18n = createI18n({
  locale: localStorage.getItem("locale") || "en",
  fallbackLocale: "en",
  messages: {
    ...en,
    ...ka,
  },
});

export default i18n;
