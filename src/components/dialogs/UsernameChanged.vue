<template>
  <div
    @click="handleClose"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
  ></div>
  <dialog
    open
    class="bg-[#D1E7DD] w-full h-auto top-[5%] sm:h-[348px] sm:top-[100px] sm:w-[400px] sm:h-auto md:w-[538px] rounded-md flex flex-col md:top-[100px] lg:left-[150px] absolute 4xl:top-[320px] z-20"
  >
    <header class="flex justify-between">
      <div class="flex">
        <img src="@/assets/icons/changed.svg" alt="" />
        <h1 class="text-green-600 text-[20px] font-base ml-2">
          {{ $t("profilePage.username_changed") }}
        </h1>
      </div>
      <button @click="successStore.success = false">
        <img src="@/assets/icons/closed.svg" alt="" />
      </button>
    </header>
  </dialog>
</template>

<script setup>
import { useSuccessStore } from "@/stores/success.js";

const successStore = useSuccessStore();

const handleClose = () => {
  successStore.success = false;
};
</script>
