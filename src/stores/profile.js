import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const username = ref("");
  const photo = ref("");
  return { username, photo };
});
