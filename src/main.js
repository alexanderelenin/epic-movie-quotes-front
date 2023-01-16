/* eslint-disable no-unused-vars */
import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import i18n from "./i18n";
import App from "./App.vue";
import router from "./router";
import "./config/messages.js";
import "./config/rules.js";

import "./style.css";
import { watch } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { isAuthenticated } from "./router/guards";
const app = createApp(App);

const watchAuth = watch(() => {
  if (isAuthenticated) {
    Pusher.Runtime.createXHR = function () {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      return xhr;
    };
    window.Echo = new Echo({
      authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      withCredentials: true,
      enabledTransports: ["ws", "wss"],
    });
  }
});

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
