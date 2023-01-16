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
        {{ $t("logIn.success") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] w-[300px] mt-4">
        {{ $t("logIn.success_des") }}
      </p>
    </header>
    <main
      class="flex flex-col items-center justify-end md:justify-center h-full mt-6"
    >
      <button
        @click="handleClose"
        class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("logIn.go_newsfeed") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
</script>
