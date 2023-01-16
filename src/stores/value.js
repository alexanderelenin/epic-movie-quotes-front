import { defineStore } from "pinia";
import { ref } from "vue";

export const useValueStore = defineStore("value", () => {
  const value = ref("");

  return { value };
});
