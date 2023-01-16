<template>
  <div
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="bg-[#181623] md:bg-[#222030] h-[340px] w-[90%] top-[100px] md:h-[348px] md:w-[538px] md:top-[120px] lg:top-[220px] 2xl:top-[320px] rounded-3xl flex flex-col absolute z-20"
  >
    <header class="text-center flex flex-col items-center mt-5">
      <img src="../../assets/icons/message.svg" width="57" alt="" />
      <h1 class="text-white text-[32px] font-medium mt-10">
        {{ $t("logIn.check_email") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] w-[300px]">
        {{ $t("logIn.check_pass_des") }}
      </p>
    </header>
    <main class="flex flex-col items-center justify-end h-full mt-6">
      <button
        @click="handleClose"
        class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("logIn.close") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import { useResetStore } from "@/stores/reset.js";

const resetStore = useResetStore();

const handleClose = () => {
  resetStore.reset = false;
};
</script>
