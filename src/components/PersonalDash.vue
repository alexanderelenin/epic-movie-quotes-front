<template>
  <section class="w-[20%] h-screen px-[35px] 2xl:px-[70px] hidden lg:block">
    <main class="h-[212px] w-full flex flex-col justify-around">
      <div class="flex w-full items-center">
        <img
          :src="photo"
          alt=""
          class="rounded-full w-[40px] h-[40px] 2xl:w-[60px] 2xl:h-[60px] object-cover"
          :class="[
            activePhoto ? 'border border-red-500 border-2' : '',
            !activePhoto ? 'border-none' : '',
          ]"
        />

        <div class="ml-5">
          <h1 class="text-[16px] 2xl:text-[24px] text-white whitespace-nowrap">
            {{ user }}
          </h1>
          <RouterLink
            to="/profile"
            class="text-[14px] 2xl:text-[16px] text-white text-base 3xl:whitespace-nowrap"
            :class="[
              localeStore.locale === 'ka' ? 'whitespace-wrap' : '',
              localeStore.locale === 'en' ? 'whitespace-nowrap' : '',
            ]"
          >
            {{ $t("personalDash.edit_profile") }}
          </RouterLink>
        </div>
      </div>

      <div
        class="flex items-center"
        :class="localeStore.locale === 'ka' ? 'mt-4' : 'mt-0'"
      >
        <div><FeedIcon class="ml-[10px]" @active="getActive" /></div>

        <RouterLink
          to="/newsfeed"
          class="text-[16px] 2xl:text-[24px] text-center text-white ml-5 2xl:ml-10"
          >{{ $t("personalDash.newsfeed") }}</RouterLink
        >
      </div>

      <div
        class="flex items-center"
        :class="localeStore.locale === 'ka' ? 'mt-4' : 'mt-0'"
      >
        <div><MoviesIcon class="ml-[10px]" /></div>

        <RouterLink
          to="/movie-list"
          class="text-[16px] 2xl:text-[24px] text-center text-white ml-5 2xl:ml-10 3xl:whitespace-nowrap"
          :class="[
            localeStore.locale === 'ka' ? 'whitespace-wrap text-start' : '',
            localeStore.locale === 'en' ? 'whitespace-nowrap text-center' : '',
          ]"
          >{{ $t("personalDash.list_of_movies") }}</RouterLink
        >
      </div>
    </main>
  </section>
</template>

<script setup>
import axiosInstance from "@/config/axios/jwt-axios.js";
import { onMounted, computed } from "vue";
import FeedIcon from "@/components/FeedIcon.vue";
import MoviesIcon from "@/components/MoviesIcon.vue";
import { useRouter } from "vue-router";
import { useLocaleStore } from "@/stores/locale.js";
import { useProfileStore } from "@/stores/profile.js";

const profileStore = useProfileStore();
const localeStore = useLocaleStore();

const user = computed(() => {
  return profileStore.username;
});
const photo = computed(() => {
  return profileStore.photo;
});

const getActive = () => {
  return useRouter().currentRoute.value.name === "newsfeed";
};

const activePhoto = computed(() => {
  return useRouter().currentRoute.value.path.includes("profile");
});
onMounted(() => {
  axiosInstance
    .get("me")
    .then((response) => {
      user.value = response.data.user;
      user.value = response.data.user.username;
      profileStore.username = response.data.user.username;
      profileStore.photo = response.data.user.thumbnail;
    })
    .catch((error) => {
      console.log(error.response);
    });
});
</script>
