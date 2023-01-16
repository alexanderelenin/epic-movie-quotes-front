<template>
  <main
    class="w-full h-screen bg-[#181623] flex flex-col justify-center items-center"
  >
    <div class="flex flex-col items-center h-[420px]">
      <div
        class="flex flex-col justify-center items-center h-[50%] min-w-[200px] w-[360px] relative"
      >
        <img
          src="../assets/icons/elipses.svg"
          width="121"
          alt=""
          class="w-[240px]"
        />
        <img
          src="../assets/icons/gandalf.svg"
          alt=""
          class="absolute bottom-[-10px] z-10 self-center"
        />
      </div>

      <div class="flex flex-col items-center h-[50%] justify-around">
        <h1 class="text-white text-[47px] text-center">
          {{ $t("shallNot.shall_not") }}
        </h1>
        <h1 class="text-white text-[24px] text-center">
          {{ $t("shallNot.sorry") }}
        </h1>
        <button
          @click="goHome"
          type="button"
          class="text-white bg-[#E31221] w-[150px] text-[20px] px-4 py-2 self-center rounded-md outline-none"
        >
          {{ $t("shallNot.home") }}
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
