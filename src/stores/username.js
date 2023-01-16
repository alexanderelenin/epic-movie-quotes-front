import { defineStore } from "pinia";
export const useUsernameStore = defineStore("username", {
  state: () => ({
    username: null,
  }),
  actions: {
    toggleShowForm() {
      this.showForm = !this.showForm;
    },
  },
});
