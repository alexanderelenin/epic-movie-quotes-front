<template>
  <ChangeUsername v-if="change" :username="username" @close="closeChange" />
  <main>
    <div class="px-5">
      <RouterLink :to="{ name: 'add-emails' }" class="px-5 py-5">
        <img src="@/assets/icons/back.svg" alt="back" />
      </RouterLink>
    </div>
    <Form @submit="saveEmail">
      <div
        class="bg-[#24222F] w-screen h-[170px] flex flex-col justify-center relative px-[32px] pt-2 pb-10 rounded-md"
      >
        <p class="text-white text-[16px] py-3">
          {{ $t("profilePage.add_new_email") }}
        </p>
        <Field v-slot="{ field, meta }" name="email" rules="required|email">
          <input
            v-bind="field"
            name="email"
            id="email"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-gray-300 border border-[#6C757D]-1 h-[50px] w-full text-[16px] md:text-[20px] px-2 rounded-md"
          />
        </Field>
        <ErrorMessage
          name="email"
          class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[125px]"
        />
      </div>

      <div class="w-full flex justify-between mt-16 px-10">
        <RouterLink to="add-emails" class="text-[#6C757D] px-3 py-2">{{
          $t("profilePage.cancel")
        }}</RouterLink>
        <button
          type="submit"
          class="text-white text-[16px] text-center px-[20px] py-2 bg-[#E31221] rounded-md"
        >
          {{ $t("profilePage.add") }}
        </button>
      </div>
    </Form>
  </main>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted, ref } from "vue";
import ChangeUsername from "./ChangeUsername.vue";
import axios from "../../config/axios/index.js";
import router from "../../router";
import axiosInstance from "../../config/axios/jwt-axios.js";
import { useEmailStore } from "@/stores/email.js";
import { useLocaleStore } from "@/stores/locale.js";

const localeStore = useLocaleStore();

const emailStore = useEmailStore();
const username = ref("");
const change = ref(false);
const user = ref(null);
const saveEmail = (values, actions) => {
  axios
    .post("email/add", {
      email: values.email,
      user_id: user.value,
    })
    .then(() => {
      router.push({ name: "add-emails" });
      emailStore.email = true;
    })
    .catch((error) => {
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

const closeChange = () => {
  change.value = false;
};

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
</script>
