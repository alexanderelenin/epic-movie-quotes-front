import { defineStore } from "pinia";
import { ref } from "vue";

export const useResetStore = defineStore("reset", () => {
  const reset = ref(false);
  return { reset };
});
