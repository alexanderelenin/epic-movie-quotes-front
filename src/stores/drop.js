import { defineStore } from "pinia";
import { ref } from "vue";

export const useDropStore = defineStore("drop", () => {
  const drop = ref("");
  return { drop };
});
