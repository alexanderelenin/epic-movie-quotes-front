<template>
  <div
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="bg-[#181623] md:bg-[#222030] h-screen w-full md:h-[700px] md:w-[400px] xl:h-[704px] xl:w-[600px] md:rounded-3xl flex flex-col absolute md:top-[80px] z-20"
  >
    <header class="text-center mt-[45px]">
      <h1 class="text-white text-[32px] font-medium">
        {{ $t("signUp.create_account") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D]">
        {{ $t("signUp.start_journey") }}
      </p>
    </header>
    <main class="flex flex-col items-center justify-around h-full">
      <Form @submit="handleRegister" class="flex flex-col justify-around">
        <div class="flex flex-col mb-4 relative">
          <label class="text-white mb-2" for="username">{{
            $t("signUp.name")
          }}</label>
          <Field
            v-slot="{ field, meta }"
            rules="required|lowercase|min:3|max:15"
            name="username"
          >
            <input
              type="text"
              :placeholder="$t('signUp.name_placeholder')"
              name="username"
              v-bind="field"
              id="username"
              class="w-[300px] self-center sm:w-[360px] h-[38px] bg-[#CED4DA] px-2 py-2 outline-none relative rounded-md"
              :class="[
                !meta.valid && meta.touched
                  ? 'outline-2 -outline-offset-2 outline-[#DC3545]'
                  : '',
                meta.valid && meta.touched
                  ? 'outline-2 -outline-offset-2 outline-[#198754]'
                  : '',
              ]"
            />
            <img
              v-if="!meta.valid && meta.touched"
              src="../../assets/icons/invalid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-2"
              alt=""
            />
            <img
              v-if="meta.valid && meta.touched"
              src="../../assets/icons/valid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-2"
              alt=""
            />
          </Field>
          <ErrorMessage
            name="username"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[67px]"
          />
        </div>
        <div class="flex flex-col mb-4 relative">
          <label class="text-white mb-2" for="email">{{
            $t("signUp.email")
          }}</label>
          <Field v-slot="{ field, meta }" name="email" rules="email|required">
            <input
              type="email"
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
            <img
              v-if="!meta.valid && meta.touched"
              src="../../assets/icons/invalid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-2"
              alt=""
            />
            <img
              v-if="meta.valid && meta.touched"
              src="../../assets/icons/valid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-2"
              alt=""
            />
          </Field>
          <ErrorMessage
            name="email"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[67px]"
          />
        </div>
        <div class="flex flex-col mb-4 relative">
          <label class="text-white mb-2" for="password">{{
            $t("signUp.password")
          }}</label>
          <Field
            v-slot="{ field, meta }"
            name="password"
            rules="required|min:8|max:15|lowercase"
          >
            <input
              v-bind="field"
              class="w-[300px] self-center sm:w-[360px] h-[38px] bg-[#CED4DA] px-2 py-2 outline-none rounded-md"
              :type="!passwordType ? 'password' : 'text'"
              name="password"
              id="password"
              :placeholder="$t('signUp.password_placeholder')"
              :class="[
                !meta.valid && meta.touched
                  ? 'outline-2 -outline-offset-2 outline-[#DC3545]'
                  : '',
                meta.valid && meta.touched
                  ? 'outline-2 -outline-offset-2 outline-[#198754]'
                  : '',
              ]"
            />
            <img
              v-if="!meta.valid && meta.touched"
              src="../../assets/icons/invalid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-5"
              alt=""
            />
            <img
              v-if="meta.valid && meta.touched"
              src="../../assets/icons/valid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-5"
              alt=""
            />
          </Field>
          <ErrorMessage
            name="password"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[67px]"
          />
          <img
            @click="togglePassword"
            src="../../assets/images/eye.png"
            class="absolute top-11 right-1 cursor-pointer"
            alt=""
          />
        </div>
        <div class="flex flex-col mb-5 relative">
          <label class="text-white mb-2" for="repeat_password">{{
            $t("signUp.password_confirmation")
          }}</label>
          <Field
            name="password_confirmation"
            rules="required|confirmed:@password"
            v-slot="{ field, meta }"
          >
            <input
              v-bind="field"
              id="password_confirmation"
              :type="!confirmType ? 'password' : 'text'"
              :placeholder="$t('signUp.password_confirmation_placeholder')"
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
            <img
              v-if="!meta.valid && meta.touched"
              src="../../assets/icons/invalid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-5"
              alt=""
            />
            <img
              v-if="meta.valid && meta.touched"
              src="../../assets/icons/valid.svg"
              class="w-[22px] h-[22px] absolute top-10 right-5"
              alt=""
            />
          </Field>
          <ErrorMessage
            name="password_confirmation"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[67px]"
          />
          <img
            @click="toggleConfirm"
            src="../../assets/images/eye.png"
            class="absolute top-11 right-1 cursor-pointer"
            alt=""
          />
        </div>
        <button
          type="submit"
          class="text-white rounded h-[38px] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] text-[16px]"
        >
          {{ $t("landingPage.get_started") }}
        </button>

        <form :action="backUrl + 'redirect'">
          <button
            class="text-white rounded h-[38px] border text-center w-full mt-4 flex items-center justify-center text-[16px]"
          >
            <img src="../../assets/images/google.svg" class="mr-2" alt="" />
            {{ $t("signUp.google_sign") }}
          </button>
        </form>
      </Form>

      <h2 class="text-white">
        {{ $t("signUp.have_account") }}
        <RouterLink to="/login" class="text-blue-500">{{
          $t("landingPage.log_in")
        }}</RouterLink>
      </h2>

      <button
        @click="handleClose"
        class="text-white px-4 py-2 border rounded-xl md:hidden"
      >
        {{ $t("logIn.close") }}
      </button>
      <LoadingDors v-if="loading" />
    </main>
  </dialog>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { RouterLink } from "vue-router";
import { useRegistrationStore } from "@/stores/registration.js";
import { useLocaleStore } from "@/stores/locale.js";
import LoadingDors from "@/components/LoadingDors.vue";
import { ref } from "vue";
import axios from "../../config/axios/index.js";
import router from "../../router";

const loading = ref(false);
const localeStore = useLocaleStore();
const backUrl = import.meta.env.VITE_API_BASE_URL;

const passwordType = ref(false);
const confirmType = ref(false);
const togglePassword = () => {
  passwordType.value = !passwordType.value;
};

const toggleConfirm = () => {
  confirmType.value = !confirmType.value;
};

const registrationStore = useRegistrationStore();
const handleClose = () => {
  router.push("/");
};

const handleRegister = (values, actions) => {
  loading.value = true;
  axios
    .post("register", {
      username: values.username,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation,
    })
    .then(() => {
      loading.value = false;
      router.push("/");
      registrationStore.registration = true;
    })
    .catch((error) => {
      loading.value = false;
      console.log(error.response);
      const errors = error.response.data.errors;
      for (const key in errors) {
        if (key === "username") {
          if (localeStore.locale === "en") {
            actions.setFieldError("username", "Username is already taken");
          } else if (localeStore.locale === "ka") {
            actions.setFieldError("username", "სახელი  დაკავებულია");
          }
        }

        if (key === "email") {
          if (localeStore.locale === "en") {
            actions.setFieldError("email", "Email is already taken");
          } else if (localeStore.locale === "ka") {
            actions.setFieldError("email", "მეილი დაკავებულია");
          }
        }
      }
    });
};
</script>
