<template>
  <main>
    <div class="px-5 py-5">
      <RouterLink to="/profile">
        <img src="@/assets/icons/back.svg" alt="back" />
      </RouterLink>
    </div>
    <Form @submit="saveUsername">
      <div
        class="bg-[#24222F] w-screen h-auto flex flex-col justify-center px-[32px] pt-2 pb-10 rounded-md"
      >
        <EmailAdded v-if="emailStore.email" />
        <div class="mt-5 relative border-b border-[#6C757D] pb-5">
          <img
            src="@/assets/icons/primary.svg"
            alt=""
            class="absolute top-16 right-2"
          />
          <p class="text-white text-[14px] py-3">
            {{ $t("profilePage.primary") }}
          </p>
          <input
            type="text"
            id="password"
            name="password"
            class="bg-[#132826] bg-gray-300 w-full h-[50px] border border-green-400 text-white rounded-md px-2 text-[14px]"
            :value="email"
            disabled
          />
        </div>

        <div class="mt-10">
          <p class="text-[16px] text-white">
            {{ $t("profilePage.change_primary") }}
          </p>

          <div
            v-for="email in emails"
            :key="email.id"
            class="border-b border-[#6C757D] pb-3 mt-2"
          >
            <p class="text-white text-[16px] my-3">{{ email.email }}</p>
            <div class="flex justify-between">
              <div
                v-if="email.email_verified_at === null"
                class="flex items-center"
              >
                <img
                  src="@/assets/icons/unverified.svg"
                  class="w-[16px] h-[16px]"
                  alt="unverified"
                />
                <p class="text-[16px] text-[#EC9524] ml-2">
                  {{ $t("profilePage.unverified") }}
                </p>
              </div>
              <button
                type="button"
                @click="makePrimary(email.id)"
                v-if="email.email_verified_at !== null"
                class="text-white text-[16px] border border-white px-3 py-2 rounded-md"
              >
                {{ $t("profilePage.make_primary") }}
              </button>
              <button
                @click="removeEmail(email.id)"
                class="text-white text-[16px] px-3 py-2"
              >
                {{ $t("profilePage.remove") }}
              </button>
            </div>
          </div>
        </div>
        <div class="mt-3 flex flex-col gap-y-3">
          <p class="text-white text-[14px]">
            {{ $t("profilePage.add_new_email") }}
          </p>

          <button
            @click="add"
            class="border border-white rounded-md flex w-full justify-center items-center py-2"
          >
            <img src="@/assets/icons/plus.svg" alt="" />
            <p class="text-white text-[14px] ml-2">
              {{ $t("profilePage.add") }}
            </p>
          </button>
        </div>
      </div>
    </Form>
  </main>
</template>

<script setup>
import { Form } from "vee-validate";
import { onMounted, ref } from "vue";

import axios from "../../config/axios/index.js";
import axiosInstance from "../../config/axios/jwt-axios.js";
import router from "../../router";
import EmailAdded from "./EmailAdded.vue";
import { useEmailStore } from "@/stores/email.js";

const emailStore = useEmailStore();
const email = ref("");
const emails = ref({});
const user = ref(null);
const add = () => {
  router.push({ name: "add-secondary" });
};
const getMe = () => {
  axiosInstance
    .get("me")
    .then((response) => {
      email.value = response.data.user.email;
      emails.value = response.data.user.emails;
      user.value = response.data.user.id;
    })
    .catch((error) => {
      console.log(error.response);
    });
};
const removeEmail = (value) => {
  axios.delete(`email/${value}`).then(() => {
    getMe();
  });
};

const makePrimary = (v) => {
  axios
    .post("email/update", {
      email_id: v,
      user_id: user.value,
      email_body: email.value,
    })
    .then(() => {
      getMe();
    });
};
onMounted(() => {
  getMe();
});
</script>
