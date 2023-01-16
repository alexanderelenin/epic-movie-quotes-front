<template>
  <DashBoard v-if="dashBoard" @close="closeDashboard" />

  <section class="lg:hidden relative">
    <NotificationSmall
      :data="notifications"
      v-if="notificationStore.notification"
      @close="closeNot"
      @refresh="refreshNotifications"
    />
    <header
      class="flex justify-between px-5 md:px-[70px] py-[24px] bg-[#222030] h-[86px]"
    >
      <div class="flex flex-col justify-center">
        <button @click="personalDash">
          <img src="@/assets/icons/hamburger.svg" alt="" />
        </button>
      </div>

      <nav class="flex xl:w-[300px] justify-between md:justify-around">
        <button v-if="newsfeed" @click="searchStore.search = true">
          <img
            src="@/assets/icons/lupa.svg"
            alt=""
            class="w-[24px] h-[24px] mr-[20px]"
          />
        </button>
        <button v-if="!newsfeed && !singleMovie && !profile" @click="findMovie">
          <img
            src="@/assets/icons/lupa.svg"
            alt=""
            class="w-[24px] h-[24px] mr-[20px]"
          />
        </button>

        <button @click="setNotification" class="relative">
          <div class="relative">
            <img
              src="../assets/icons/bell.svg"
              class="w-[28px] h-[32px]"
              alt=""
            />

            <div
              v-if="unreadNotifications.length > 0"
              class="bg-[#E33812] w-full h-full rounded-full p-2 absolute top-[-10px] right-[-15px] text-white text-[20px] text-center flex items-center justify-center"
            >
              <p>{{ unreadNotifications.length }}</p>
            </div>
          </div>
        </button>
      </nav>
    </header>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

import axios from "../config/axios/index.js";
import NotificationSmall from "./dialogs/NotificationSmall.vue";
import axiosInstance from "../config/axios/jwt-axios.js";
import DashBoard from "./dialogs/DashBoard.vue";
import { useNotificationStore } from "@/stores/notification";
import { useMovieStore } from "@/stores/movie.js";
import { useSearchStore } from "@/stores/search.js";
import { useRouter } from "vue-router";
const movieStore = useMovieStore();
const searchStore = useSearchStore();

const findMovie = () => {
  movieStore.movie = true;
};
const notificationStore = useNotificationStore();
const setNotification = () => {
  notificationStore.notification = !notificationStore.notification;
};

const newsfeed = computed(() => {
  return useRouter().currentRoute.value.name === "newsfeed";
});

const singleMovie = computed(() => {
  return useRouter().currentRoute.value.name === "single-movie";
});

const profile = computed(() => {
  return useRouter().currentRoute.value.path.includes("profile");
});
const dashBoard = ref(null);
const personalDash = () => {
  dashBoard.value = true;
};
const closeDashboard = () => {
  dashBoard.value = false;
};
const user = ref("");

const notifications = ref([]);
const unreadNotifications = ref([]);

const closeNot = () => {
  notificationStore.notification = false;
};
const getNotifications = () => {
  axios.get("notifications").then((res) => {
    notifications.value = res.data;
  });
};
onMounted(() => {
  getNotifications();
});
const getUnread = () => {
  axios.get("unread").then((res) => {
    unreadNotifications.value = res.data;
  });
};
onMounted(() => {
  getUnread();
});
onMounted(() => {
  axiosInstance
    .get("me")
    .then((response) => {
      user.value = response.data.user.id;
    })
    .catch((error) => {
      console.log(error.response);
    });
});

setTimeout(() => {
  window.Echo.private("notification-channel." + user.value).listen(
    ".new-notification",
    () => {
      getNotifications();
      getUnread();
    }
  );
}, 3000);

const refreshNotifications = () => {
  getNotifications();
  getUnread();
};
</script>
