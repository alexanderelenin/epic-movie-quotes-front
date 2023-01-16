<template>
  <div
    @click="handleClose"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
  ></div>
  <dialog
    open
    class="bg-[#D1E7DD] w-full h-auto top-[5%] sm:h-[348px] sm:top-[100px] sm:w-[400px] sm:h-auto md:w-[538px] md:top-[100px] lg:left-[150px] rounded-md flex flex-col absolute 4xl:top-[320px] z-20"
  >
    <header class="flex justify-between">
      <div class="flex">
        <img src="@/assets/icons/changed.svg" alt="" />
        <h1 class="text-green-600 text-[16px] md:text-[20px] font-base ml-2">
          {{ $t("profilePage.verify_new_email") }}
        </h1>
      </div>
      <button @click="handleClose">
        <img src="@/assets/icons/closed.svg" alt="" />
      </button>
    </header>
  </dialog>
</template>

<script setup>
import { useEmailStore } from "@/stores/email.js";

const emailStore = useEmailStore();

const handleClose = () => {
  emailStore.email = false;
};
</script>
