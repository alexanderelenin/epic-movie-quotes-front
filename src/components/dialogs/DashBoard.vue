<template>
  <section
    class="w-[85%] sm:w-[50%] md:w-[40%] max-h-[658px] flex flex-col justify-start md:justify-center md:items-start h-screen bg-[#11101A] py-[40px] px-[40px] lg:hidden absolute top-0 left-0 z-10"
  >
    <button @click="closeDash">
      <img
        src="@/assets/icons/close.svg"
        class="w-[16px] absolute top-4 right-4"
        alt=""
      />
    </button>

    <main
      class="w-[233px] gap-[40px] flex flex-col justify-between md:items-center"
    >
      <div class="flex w-full md:flex items-center md:justify-center">
        <img
          :src="photo"
          alt=""
          class="rounded-full w-[40px] h-[40px] object-cover"
          :class="[
            activePhoto ? 'border border-red-500' : '',
            !activePhoto ? 'border-none' : '',
          ]"
        />

        <div class="ml-5">
          <h1 class="text-[20px] text-white">{{ user }}</h1>
          <button
            @click="goProfile"
            class="text-[14px] text-white whitespace-nowrap"
            :class="localeStore.locale === 'ka' ? 'whitespace-wrap' : ''"
          >
            {{ $t("personalDash.edit_profile") }}
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <div class="mr-4"><FeedIcon /></div>

        <button
          @click="goNewsfeed"
          class="text-[20px] text-center text-white ml-5 md:ml-10"
        >
          {{ $t("personalDash.newsfeed") }}
        </button>
      </div>

      <div class="flex items-center md:ml-3">
        <div class="md:ml-[10px]"><MoviesIcon /></div>

        <button
          @click="goMovies"
          class="text-[20px] text-center text-white ml-9 md:ml-10 md:whitespace-nowrap"
        >
          {{ $t("personalDash.list_of_movies") }}
        </button>
      </div>
    </main>

    <nav class="flex flex-col h-full justify-end items-center">
      <button
        @click="logoutHandler()"
        class="text-white border border-white rounded-md py-[7px] px-[24px] w-[150px] justify-end"
      >
        {{ $t("landingPage.log_out") }}
      </button>
    </nav>
  </section>
</template>

<script setup>
import axios from "../../config/axios/index.js";
import { useAuthStore } from "@/stores/auth";
import router from "../../router";
import axiosInstance from "@/config/axios/jwt-axios.js";
import { onMounted, computed } from "vue";
import { useLocaleStore } from "@/stores/locale.js";
import MoviesIcon from "@/components/MoviesIcon.vue";
import FeedIcon from "@/components/FeedIcon.vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";

const profileStore = useProfileStore();

const localeStore = useLocaleStore();
const authStore = useAuthStore();
const emit = defineEmits(["close"]);
const closeDash = () => {
  emit("close");
};
const activePhoto = computed(() => {
  return useRouter().currentRoute.value.path.includes("profile");
});
const user = computed(() => {
  return profileStore.username;
});
const photo = computed(() => {
  return profileStore.photo;
});
const goNewsfeed = () => {
  emit("close");
  router.push({ name: "newsfeed" });
};
const goMovies = () => {
  emit("close");
  router.push("/movie-list");
};

const goProfile = () => {
  emit("close");
  router.push("/profile");
};
const logoutHandler = async () => {
  try {
    await axios.post("logout");
    authStore.authenticated = false;
  } catch (err) {
    console.log(err);
  } finally {
    router.push({ name: "home" });
  }
};

onMounted(() => {
  axiosInstance
    .get("me")
    .then((response) => {
      user.value = response.data.user;
      user.value = response.data.user.username;
      photo.value = response.data.user.thumbnail;
    })
    .catch((error) => {
      console.log(error.response);
    });
});
</script>
