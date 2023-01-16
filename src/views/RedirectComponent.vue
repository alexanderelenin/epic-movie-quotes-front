<template>
  <div
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="bg-[#222030] h-screen w-full md:h-[348px] md:w-[538px] rounded-3xl flex flex-col absolute 2xl:top-[280px] 4xl:top-[320px] z-20"
  >
    <header class="text-center flex flex-col items-center mt-5">
      <img src="@/assets/icons/success.svg" width="67" alt="" />
      <h1 class="text-white text-[32px] font-medium mt-10">
        {{ $t("profilePage.thank_you") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] w-[300px] mt-4">
        {{ $t("profilePage.new_email_verified") }}
      </p>
    </header>
    <main
      class="flex flex-col items-center justify-end md:justify-center h-full mt-6"
    >
      <button
        @click="handleClose"
        class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("profilePage.go_back") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "@/config/axios/index.js";
import router from "@/router";
onMounted(() => {
  if (useRoute().query.token) {
    axios
      .post("email-verify", {
        token: useRoute().query.token,
      })
      .then((res) => {
        console.log(res);
      });
  }
});

const handleClose = () => {
  router.push({ name: "profile-page" });
};
</script>
