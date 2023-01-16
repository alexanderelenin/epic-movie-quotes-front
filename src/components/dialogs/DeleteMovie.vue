<template>
  <div
    @click="handleClose"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
  ></div>
  <dialog
    open
    class="bg-[#222030] h-screen w-full top-0 sm:h-[348px] sm:top-[100px] sm:w-[400px] sm:h-auto md:w-[538px] rounded-3xl flex flex-col md:top-[280px] absolute 4xl:top-[320px] z-20"
  >
    <header class="text-center flex flex-col items-center mt-2">
      <img src="@/assets/icons/success.svg" width="67" alt="" />
      <h1 class="text-white text-[32px] font-medium mt-6">
        {{ $t("singleMovie.planning") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] w-[300px] mt-2">
        {{ $t("singleMovie.des") }}
      </p>
    </header>
    <main
      class="flex flex-col items-center justify-end md:justify-center h-full mt-2"
    >
      <button
        @click="deleteMovie"
        class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("singleMovie.delete") }}
      </button>
      <button
        @click="handleClose"
        class="text-white rounded h-[38px] bg-green-400 text-[16px] mt-3 w-[250px]"
      >
        {{ $t("singleMovie.cancel") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import axios from "../../config/axios/index.js";
import router from "../../router";
import { useRoute } from "vue-router";
const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};

const id = useRoute().params.id;

const deleteMovie = (values, actions) => {
  axios
    .delete(`movie-delete/${id}`)
    .then(() => {
      router.replace("/movie-list");
    })
    .catch((error) => {
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};
</script>
