<template>
  <main
    class="w-full h-screen bg-[#181623] flex flex-col justify-center items-center"
  >
    <div class="flex flex-col items-center h-[420px]">
      <div class="flex flex-col justify-end h-[50%]">
        <img src="../assets/icons/ghost.svg" width="121" alt="" />
        <img
          src="../assets/icons/splash.svg"
          width="117"
          alt=""
          class="mt-10"
        />
      </div>

      <div class="flex flex-col items-center h-[50%] justify-around">
        <h1 class="text-white text-[47px] text-center">
          {{ $t("notFound.woops") }}
        </h1>
        <h1 class="text-white text-[24px] text-center">
          {{ $t("notFound.cant") }}
        </h1>
        <button
          @click="goHome"
          type="button"
          class="text-white bg-[#E31221] w-[150px] text-[20px] px-4 py-2 self-center rounded-md outline-none"
        >
          {{ $t("notFound.home") }}
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import router from "../router";

const goHome = () => {
  router.replace("/");
};
</script>
