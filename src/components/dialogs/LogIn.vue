<template>
  <div
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="bg-[#181623] md:bg-[#222030] h-screen md:h-[562px] w-full md:h-[500px] md:w-[400px] xl:h-[704px] xl:w-[600px] md:rounded-3xl flex flex-col absolute md:top-[100px] z-20"
  >
    <header class="text-center mt-[45px]">
      <h1 class="text-white text-[32px] font-medium">
        {{ $t("logIn.log_in") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D]">
        {{ $t("logIn.welcome") }}
      </p>
    </header>
    <main class="flex flex-col items-center justify-around h-full">
      <Form @submit="handleLogin" class="flex flex-col justify-around">
        <div class="flex flex-col mb-4 relative">
          <label class="text-white mb-2" for="email">{{
            $t("signUp.email")
          }}</label>
          <Field v-slot="{ field, meta }" name="email" rules="required|login">
            <input
              type="text"
              :placeholder="$t('signUp.email_placeholder')"
              v-bind="field"
              id="email"
              name="email"
              class="w-[300px] self-center sm:w-[360px] h-[38px] bg-[#CED4DA] px-2 py-2 outline-none rounded-md"
              :class="[
                !meta.valid && meta.touched
                  ? 'outline-2 -outline-offset-2 outline-[#DC3545]'
                  : '',
                meta.valid && meta.touched
                  ? 'outline-2 -outline-offset-2 outline-[#198754]'
                  : '',
              ]"
            />
            <h1
              v-if="!meta.valid && meta.touched"
              class="text-[14px] md:text-[14px] text-red-600 font-semibold absolute top-[67px]"
            >
              {{ $t("logIn.error") }}
            </h1>
          </Field>

          <h1
            v-if="errorMessage"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[67px]"
          >
            {{ errorValue }}
          </h1>
        </div>
        <div class="flex flex-col mb-4 relative">
          <label class="text-white mb-2" for="password">{{
            $t("signUp.password")
          }}</label>
          <Field
            id="password"
            :type="!passwordType ? 'password' : 'text'"
            :placeholder="$t('logIn.password_placeholder')"
            name="password"
            class="w-[300px] self-center sm:w-[360px] h-[38px] bg-[#CED4DA] px-2 py-2 outline-none rounded-md"
          />

          <img
            @click="togglePassword"
            src="../../assets/images/eye.png"
            class="absolute top-11 right-4 cursor-pointer"
            alt=""
          />
        </div>
        <div class="flex justify-between mb-2">
          <div>
            <Field name="remember" v-slot="{ field }">
              <input
                v-bind="field"
                type="checkbox"
                id="remember"
                name="remember"
                true-value="yes"
                false-value="no"
                v-model="checked"
              />
              <label for="remember" class="text-white ml-1">{{
                $t("logIn.remember")
              }}</label>
            </Field>
          </div>
          <RouterLink to="/forgot-password" class="text-blue-500">
            {{ $t("logIn.forgot_password") }}
          </RouterLink>
        </div>

        <button
          class="text-white rounded h-[38px] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] text-[16px]"
        >
          {{ $t("logIn.sign_in") }}
        </button>
        <form :action="backUrl + 'redirect'">
          <button
            class="text-white rounded h-[38px] border text-center w-full mt-4 flex items-center justify-center text-[16px]"
          >
            <img src="../../assets/images/google.svg" class="mr-2" alt="" />
            {{ $t("logIn.google_log") }}
          </button>
        </form>
      </Form>

      <h2 class="text-white">
        {{ $t("logIn.dont_have_acc") }}
        <RouterLink to="/sign-up" class="text-blue-500">{{
          $t("logIn.sign_up")
        }}</RouterLink>
      </h2>
      <button
        @click="handleClose"
        class="text-white px-4 py-2 border rounded-xl md:hidden"
      >
        {{ $t("logIn.close") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { ref } from "vue";

import axiosInstance from "../../config/axios/jwt-axios.js";
import { useAuthStore } from "@/stores/auth";
import { useLocaleStore } from "@/stores/locale.js";
import router from "../../router";

const backUrl = import.meta.env.VITE_API_BASE_URL;
const localeStore = useLocaleStore();
const authStore = useAuthStore();

const passwordType = ref(false);

const togglePassword = () => {
  passwordType.value = !passwordType.value;
};

const handleClose = () => {
  router.push("/");
};

const errorMessage = ref(false);
const errorValue = ref("");

const checked = ref("");

const handleLogin = async (values) => {
  try {
    const response = await axiosInstance.post(`/login`, {
      email: values.email,
      password: values.password,
      remember: values.remember,
    });

    authStore.authenticated = true;
    router.replace({ name: "newsfeed" });
    console.log(response);
  } catch (error) {
    if (error.response.data.error === "Email is not verified") {
      if (localeStore.locale === "en") {
        errorValue.value = "Email is not verified";
        errorMessage.value = true;
      } else if (localeStore.locale === "ka") {
        errorValue.value = "მეილი არ არის ვერიფიცირებული";
        errorMessage.value = true;
      }
    } else if (error.response.data.error === "wrong email or password") {
      if (localeStore.locale === "en") {
        errorValue.value = "Wrong email or password";
      } else if (localeStore.locale === "ka") {
        errorValue.value = "არასწორი მეილი ან პაროლი";
      }
    }

    errorMessage.value = true;
  }
};
</script>
