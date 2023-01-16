<template>
  <section class="hidden lg:block">
    <header
      class="flex justify-between px-5 md:px-[70px] py-[24px] bg-[#1F1D2A]"
    >
      <div class="flex flex-col justify-center">
        <h1 class="text-[#DDCCAA] text-base">
          {{ $t("landingPage.movie_quotes") }}
        </h1>
      </div>

      <nav class="relative flex md:w-[300px] justify-between md:justify-around">
        <button>
          <div class="relative">
            <img
              @click="setNotification"
              src="../assets/icons/bell.svg"
              class="w-[28px] h-[32px]"
              alt=""
            />
            <img
              v-if="notificationStore.notification"
              src="@/assets/icons/triangle.svg"
              class="absolute bottom-[-30px]"
              alt=""
            />

            <div
              @click="setNotification"
              v-if="unreadNotifications.length > 0"
              class="bg-[#E33812] w-full h-full rounded-full p-2 absolute top-[-10px] right-[-15px] text-white text-[20px] text-center flex items-center justify-center"
            >
              <p>{{ unreadNotifications.length }}</p>
            </div>
          </div>

          <NotificationLarge
            :data="notifications"
            v-if="notificationStore.notification"
            @close="closeNot"
            @refresh="refreshNotifications"
          />
        </button>
        <button @click="showLangs" class="text-white relative mr-6">
          {{ language }}
          <ul v-if="langs" class="absolute">
            <li @click="setLanguage('en')" v-if="locale === 'ka'">Eng</li>
            <li @click="setLanguage('ka')" v-if="locale === 'en'">Geo</li>
          </ul>
          <img
            src="../assets/icons/dropdown.svg"
            class="absolute ml-8 top-[18px]"
            alt=""
          />
        </button>

        <button
          @click="logoutHandler()"
          class="text-white border border-white rounded-md py-[7px] px-[24px]"
        >
          {{ $t("landingPage.log_out") }}
        </button>
      </nav>
    </header>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import i18n from "../../src/i18n";
import { setLocale } from "@vee-validate/i18n";
import router from "../router";
import axios from "../config/axios/index.js";
import { useAuthStore } from "@/stores/auth";
import NotificationLarge from "./dialogs/NotificationLarge.vue";
import axiosInstance from "../config/axios/jwt-axios.js";
import { useNotificationStore } from "@/stores/notification";
const authStore = useAuthStore();
const user = ref("");
const notificationStore = useNotificationStore();
const setNotification = () => {
  notificationStore.notification = !notificationStore.notification;
};

const notifications = ref([]);
const unreadNotifications = ref([]);

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

const setLanguage = (value) => {
  i18n.global.locale = value;
  setLocale(value);
  localStorage.setItem("locale", value);
};
const langs = ref(false);

const showLangs = () => {
  langs.value = !langs.value;
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
</script>
