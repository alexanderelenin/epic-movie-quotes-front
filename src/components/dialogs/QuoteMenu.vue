<template>
  <button
    @click="setMenu"
    class="absolute top-2 right-2 lg:absolute lg:right-[20px] lg:top-[20px]"
  >
    <img src="@/assets/icons/else.svg" alt="else" class="p-2" />
  </button>
  <section
    @blur="menu = false"
    v-if="menu"
    class="bg-[#24222F] rounded-lg w-full max-w-[250px] max-h-[200px] absolute top-12 right-1 z-20 flex flex-col gap-y-[32px] justify-center items-center p-[32px] pl-[40px]"
  >
    <button @click="handleOpen" class="flex justify-start items-center w-full">
      <img src="@/assets/icons/eye.svg" alt="eye" />
      <p class="text-white text-[20px] ml-4">View quote</p>
    </button>
    <button class="flex items-center h-auto w-full">
      <img src="@/assets/icons/edit.svg" alt="edit" />
      <p class="text-white text-[20px] ml-4">Edit</p>
    </button>
    <button @click="deleteQuote" class="flex items-center h-auto w-full">
      <img src="@/assets/icons/delete.svg" alt="delete" />
      <p class="text-white text-[20px] ml-4">Delete</p>
    </button>
  </section>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "../../config/axios/index.js";
import router from "../../router";
const props = defineProps({
  id: String,
});
const menu = ref(false);
const id = useRoute().params.id;
const setMenu = () => {
  menu.value = !menu.value;
};
const emit = defineEmits(["open"]);

const handleOpen = () => {
  emit("open");
};

const deleteQuote = (values, actions) => {
  axios
    .post(`delete-quote/${props.id}`)
    .then(() => {
      router.replace(`/movie-list/movie/${id}`);
      menu.value = false;
    })
    .catch((error) => {
      console.log(error.response);
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};
</script>
