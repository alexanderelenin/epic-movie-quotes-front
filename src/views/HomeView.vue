<template>
  <main class="w-full h-screen flex flex-col bg-black relative">
    <header class="flex justify-between px-5 md:px-[70px] py-[24px]">
      <div class="flex flex-col justify-center">
        <h1 class="text-[#DDCCAA] text-base">
          {{ $t("landingPage.movie_quotes") }}
        </h1>
      </div>

      <nav class="flex md:w-[300px] justify-between md:justify-around">
        <button @click="showLangs" class="text-white relative mr-6">
          {{ language }}
          <ul v-if="langs" class="absolute">
            <li @click="setLanguage('en')" v-if="locale === 'ka'">Eng</li>
            <li @click="setLanguage('ka')" v-if="locale === 'en'">Geo</li>
          </ul>
          <img
            src="../assets/icons/dropdown.svg"
            class="absolute ml-8 top-5"
            alt=""
          />
        </button>

        <button
          @click="goSign"
          class="hidden md:block text-white rounded min-w-[110px] h-[38px] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] text-[16px] px-2"
        >
          {{ $t("landingPage.sign_up") }}
        </button>

        <button
          @click="goLog"
          class="text-white border border-white rounded-md py-[7px] px-[24px]"
        >
          {{ $t("landingPage.log_in") }}
        </button>
      </nav>
    </header>
    <RouterView />

    <RegistrationMessage v-if="registrationStore.registration === true" />
    <reset-password v-if="showReset" @close="goLog"></reset-password>
    <CheckPassword v-if="resetStore.reset === true" />
    <section class="flex flex-col items-center h-full justify-center">
      <h1
        class="text-[#DDCCAA] text-[24px] md:text-[60px] font-bold text-center"
      >
        {{ $t("landingPage.first_line_landing") }}<br />
        {{ $t("landingPage.second_line_landing") }}
      </h1>
      <button
        @click="goSign"
        class="text-white rounded px-[24px] py-[9px] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] text-xl mt-[24px]"
      >
        {{ $t("landingPage.get_started") }}
      </button>
    </section>
  </main>
  <div>
    <div
      style="
        background-image: url('/images/interstellar.png');
        box-shadow: inset 2em 0em 6em 6em #000;
      "
      class="w-full h-screen bg-fixed bg-cover bg-center px-[50px] md:px-[150px] flex flex-col items-start justify-center"
    >
      <section class="flex flex-col px-3 justify-between relative">
        <img
          class="w-[17px] md:w-[56px] absolute left-[-20px] md:left-[-60px] top-[20px] md:top-[40px]"
          src="../assets/images/horizontal.svg"
          alt=""
        />
        <h1 class="text-white font-bold text-[20px] md:text-[50px]">
          {{ $t("landingPage.interstellar_1") }} <br />
          {{ $t("landingPage.interstellar_2") }}
        </h1>
        <p class="text-white font-base text-[16px] md:text-[30px]">
          {{ $t("landingPage.interstellar") }}, 2014
        </p>
      </section>
    </div>
    <div
      style="
        background-image: url('/images/tenenbaum.png');
        box-shadow: inset 2em 0em 6em 6em #000;
      "
      class="w-full h-screen bg-fixed bg-cover bg-center px-[50px] md:px-[150px] flex flex-col items-start justify-center"
    >
      <section class="flex flex-col px-3 justify-between relative">
        <img
          class="w-[17px] md:w-[56px] absolute left-[-20px] md:left-[-60px] top-[20px] md:top-[40px]"
          src="../assets/images/horizontal.svg"
          alt=""
        />
        <h1 class="text-white font-bold text-[20px] md:text-[50px]">
          {{ $t("landingPage.tenenbaums_1") }} <br />
          {{ $t("landingPage.tenenbaums_2") }} <br />
          {{ $t("landingPage.tenenbaums_3") }}
        </h1>
        <p class="text-white font-base text-[16px] md:text-[30px]">
          {{ $t("landingPage.tenenbaums") }}, 2001
        </p>
      </section>
    </div>
    <div
      style="
        background-image: url('/images/lotr.png');
        box-shadow: inset 2em 0em 6em 6em #000;
      "
      class="w-full h-screen bg-fixed bg-cover px-[50px] md:px-[150px] flex flex-col items-start justify-center"
    >
      <section class="flex flex-col px-3 justify-between relative">
        <img
          class="w-[17px] md:w-[56px] absolute left-[-20px] md:left-[-60px] top-[20px] md:top-[40px]"
          src="../assets/images/horizontal.svg"
          alt=""
        />
        <h1 class="text-white font-bold text-[20px] md:text-[50px]">
          {{ $t("landingPage.lotr_1") }} <br />
          {{ $t("landingPage.lotr_2") }} <br />
          {{ $t("landingPage.lotr_3") }}
        </h1>
        <p class="text-white font-base text-[16px] md:text-[30px]">
          {{ $t("landingPage.lotr") }} , 2001
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import ResetPassword from "../components/dialogs/ResetPassword.vue";

import { ref, computed, onMounted } from "vue";
import i18n from "../../src/i18n";
import { setLocale } from "@vee-validate/i18n";
import { RouterView, useRoute } from "vue-router";
import RegistrationMessage from "../components/dialogs/RegistrationMessage.vue";
import CheckPassword from "../components/dialogs/CheckPassword.vue";
import { useRegistrationStore } from "@/stores/registration.js";
import { useResetStore } from "@/stores/reset.js";
import router from "../router";

const resetStore = useResetStore();
const registrationStore = useRegistrationStore();
const locale = computed(function () {
  return i18n.global.locale;
});
const language = computed(function () {
  if (i18n.global.locale === "en") {
    return "Eng";
  } else {
    return "Geo";
  }
});

const setLanguage = (value) => {
  i18n.global.locale = value;
  localStorage.setItem("locale", value);
  setLocale(value);
};
const langs = ref(false);

const showLangs = () => {
  langs.value = !langs.value;
};

const showReset = ref(false);

const goLog = () => {
  router.push({ name: "login" });
};
const goSign = () => {
  router.push({ name: "sign-up" });
};

onMounted(() => {
  const route = useRoute();
  if (route.query.token && route.query.email) {
    showReset.value = true;
  } else {
    showReset.value = false;
  }
});
</script>
