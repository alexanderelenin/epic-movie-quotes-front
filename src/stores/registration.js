import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegistrationStore = defineStore("registration", () => {
  const registration = ref(false);
  return { registration };
});
