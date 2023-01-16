import { defineStore } from "pinia";
import { ref } from "vue";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref([]);
  return { comments };
});
