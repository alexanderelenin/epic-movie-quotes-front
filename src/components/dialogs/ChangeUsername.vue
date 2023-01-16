<template>
  <div
    @click="handleClose"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
  ></div>
  <dialog
    open
    class="bg-[#222030] h-[211px] max-w-[364px] top-[10%] sm:h-[348px] sm:top-[100px] sm:w-[400px] sm:h-auto md:w-[538px] rounded-3xl flex flex-col md:top-[280px] absolute 4xl:top-[320px] z-20"
  >
    <header
      class="text-center flex flex-col border-b border-[#6C757D] pb-10 items-center mt-2"
    >
      <h1 class="text-white text-[20px] font-medium mt-6">
        {{ $t("profilePage.are_you_sure") }}
      </h1>
    </header>
    <main class="flex items-center justify-end md:justify-center h-full mt-2">
      <button
        @click="handleClose"
        class="text-white rounded h-[38px] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("profilePage.cancel") }}
      </button>
      <button
        @click="updateUsername"
        class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("profilePage.add") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import axios from "../../config/axios/index.js";
import router from "../../router";

import { defineEmits, defineProps } from "vue";
import { useSuccessStore } from "@/stores/success.js";
import { useUsernameStore } from "@/stores/username.js";
import { useLocaleStore } from "@/stores/locale.js";

const localeStore = useLocaleStore();
const usernameStore = useUsernameStore();
const successStore = useSuccessStore();
const props = defineProps({
  username: String,
});
const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};

const updateUsername = () => {
  axios
    .post(`user/update`, {
      username: props.username,
    })
    .then(() => {
      router.replace("/profile");
      successStore.success = true;
    })
    .catch((error) => {
      emit("close");
      usernameStore.username = error.response.data.errors[0];
      const errors = error.response.data.errors;

      for (const key in errors) {
        if (key === "username") {
          if (localeStore.locale === "en") {
            usernameStore.username = "Username is already taken";
          } else if (localeStore.locale === "ka") {
            usernameStore.username = "სახელი  დაკავებულია";
          }
        }
      }
    });
};
</script>
