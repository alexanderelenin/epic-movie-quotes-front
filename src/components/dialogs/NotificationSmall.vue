<template>
  <div class="w-screen h-full fixed top-0 left-0" @click="$emit('close')"></div>
  <div
    class="absolute lg:hidden px-2 right-0 md:right-[50px] w-full h-auto top-[80px] righ h-auto sm:w-[500px] lg:w-[600px] 2xl:w-[960px] bg-black h-auto z-20 rounded-xl"
  >
    <header
      class="relative flex text-white text-[20px] h-[92px] flex justify-between items-center border-b border-[#EFEFEF]-[0.5px]"
    >
      <img
        src="@/assets/icons/triangle.svg"
        class="absolute top-[-10px] right-1"
        alt=""
      />
      <p class="px-4">{{ $t("notificationBar.notifications") }}</p>

      <button @click.prevent="markAsRead" class="mx-4 border-b border-white-1">
        {{ $t("notificationBar.mark") }}
      </button>
    </header>
    <section class="md:px-[32px] py-[30px] h-auto flex flex-col">
      <div
        v-for="notification in notifications"
        :key="notification"
        class="flex justify-between border border-[#6C757D] p-2 rounded-md my-2"
      >
        <div class="flex items-center">
          <img
            :src="notification.sender.thumbnail"
            alt=""
            width="52"
            class="rounded-full w-[44px] h-[44px] xl:w-[80px] xl:h-[80px] object-cover"
          />
          <div class="flex flex-col items-start ml-[16px]">
            <p class="text-white text-[14px] xl:text-[20px] mb-2">
              {{ notification.sender.username }}
            </p>
            <div class="flex items-center">
              <div v-if="notification.type === 'comment'">
                <img
                  src="@/assets/icons/quote.svg"
                  alt=""
                  class="min-w-[24px] min-h-[24px]"
                />
              </div>
              <div v-if="notification.type === 'like'">
                <img
                  src="@/assets/icons/liked.svg"
                  alt=""
                  class="w-[24px] h-[24px]"
                />
              </div>
              <p
                v-if="notification.type === 'comment'"
                class="text-white text-[14px] xl:text-[20px] w-full ml-1"
              >
                {{ $t("notificationBar.commented") }}
              </p>
              <p
                v-if="notification.type === 'like'"
                class="text-white text-[14px] xl:text-[20px] w-full ml-1"
              >
                {{ $t("notificationBar.liked") }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-col text-end">
          <p class="text-white text-[14px] xl:text-[20px]">
            {{ timeAgo(notification.created_at) }}
          </p>
          <p
            v-if="notification.read === 0"
            class="text-green-400 text-[14px] xl:text-[20px]"
          >
            {{ $t("notificationBar.new") }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, ref } from "vue";
import axios from "../../config/axios/index.js";
const props = defineProps({
  data: String,
});
const emit = defineEmits(["close", "refresh"]);
const notifications = ref([]);

function timeAgo(input) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}
const markAsRead = () => {
  axios
    .post("mark")
    .then(() => {
      emit("refresh");
    })
    .catch((error) => {
      console.log(error.response);
    });
};

onMounted(() => {
  notifications.value = props.data;
});
</script>
