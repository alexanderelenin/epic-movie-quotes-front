import { defineStore } from "pinia";
import { computed } from "vue";
import i18n from "@/i18n";

export const useLocaleStore = defineStore("locale", () => {
  const locale = computed(() => {
    return i18n.global.locale;
  });
  return { locale };
});
