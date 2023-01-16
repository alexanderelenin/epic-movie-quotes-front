<template>
  <div
    @click="handleClose"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
  ></div>
  <dialog
    open
    class="bg-[#181623] h-[400px] w-[90%] top-[25%] sm:h-[348px] rounded-md sm:top-[100px] md:py-20 gap-y-10 sm:w-[400px] sm:h-auto md:w-[538px] md:rounded-xl flex flex-col md:top-[280px] absolute 4xl:top-[320px] z-20"
  >
    <header class="text-center flex flex-col items-center mt-2">
      <img src="@/assets/icons/thankyou.svg" width="67" alt="" />
      <h1 class="text-white text-[32px] font-medium mt-6">
        {{ $t("signUp.thank_you") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] w-[300px] mt-2">
        {{ $t("landingPage.activated") }}
      </p>
    </header>
    <main
      class="flex flex-col items-center justify-center md:justify-center h-full mt-2"
    >
      <button
        @click="handleClose"
        class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 w-[250px]"
      >
        {{ $t("landingPage.go_profile") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import router from "../../router";

const handleClose = () => {
  router.push("/login");
};
</script>
