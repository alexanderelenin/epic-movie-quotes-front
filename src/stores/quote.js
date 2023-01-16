import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuoteStore = defineStore("quote", () => {
  const quote = ref(false);
  return { quote };
});
