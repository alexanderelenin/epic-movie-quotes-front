import { defineStore } from "pinia";
import { ref } from "vue";

export const useSuccessStore = defineStore("success", () => {
  const success = ref(false);
  return { success };
});
