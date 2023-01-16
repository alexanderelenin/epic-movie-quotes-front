<template>
  <main>
    <RouterLink to="/profile">
      <button class="px-5 py-5">
        <img src="@/assets/icons/back.svg" alt="back" />
      </button>
    </RouterLink>
    <div class="bg-[#24222F] w-screen pt-5">
      <div class="bg-[#11101A] w-[364px] h-[134px] m-auto">
        <div class="flex flex-col p-[24px]">
          <p class="text-white text-[15px]">
            {{ $t("profilePage.pass_should") }}
          </p>
          <div class="mt-4">
            <div class="flex items-center">
              <div class="w-[4px] h-[4px] bg-[#9C9A9A] rounded-full"></div>
              <p class="text-[#9C9A9A] text-[14px] ml-2">
                {{ $t("profilePage.eight") }}
              </p>
            </div>
            <div class="flex items-center">
              <div class="w-[4px] h-[4px] bg-[#198754] rounded-full"></div>
              <p class="text-[#9C9A9A] text-[14px] ml-2">
                {{ $t("profilePage.fifteen") }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Form @submit="updateUser" class="flex flex-col justify-around mt-10">
        <div class="flex flex-col mb-4 relative px-[32px]">
          <label class="text-white mb-2" for="password">
            {{ $t("profilePage.new_pass") }}
          </label>
          <Field
            v-slot="{ field, meta }"
            name="password"
            rules="required|min:8|max:15|lowercase"
          >
            <input
              v-bind="field"
              class="w-full self-center sm:w-[360px] h-[50px] bg-[#CED4DA] px-2 py-2 outline-none rounded-md"
              :type="!passwordType ? 'password' : 'text'"
              name="password"
              id="password"
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
              class="w-[22px] h-[22px] absolute top-11 right-14"
              alt=""
            />
            <img
              v-if="meta.valid && meta.touched"
              src="../../assets/icons/valid.svg"
              class="w-[22px] h-[22px] absolute top-11 right-14"
              alt=""
            />
          </Field>
          <ErrorMessage
            name="password"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[80px]"
          />
          <img
            @click="togglePassword"
            src="../../assets/images/eye.png"
            class="absolute top-[60%] right-10 cursor-pointer"
            alt=""
          />
        </div>
        <div class="flex flex-col mb-5 relative px-[32px]">
          <label class="text-white mb-2" for="repeat_password">{{
            $t("profilePage.confirm_new_pass")
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
              class="w-full self-center sm:w-[360px] h-[50px] bg-[#CED4DA] px-2 py-2 outline-none rounded-md"
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
              class="w-[22px] h-[22px] absolute top-11 right-14"
              alt=""
            />
            <img
              v-if="meta.valid && meta.touched"
              src="../../assets/icons/valid.svg"
              class="w-[22px] h-[22px] absolute top-11 right-14"
              alt=""
            />
          </Field>
          <ErrorMessage
            name="password_confirmation"
            class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[80px]"
          />
          <img
            @click="toggleConfirm"
            src="../../assets/images/eye.png"
            class="absolute top-[60%] right-10 cursor-pointer"
            alt=""
          />
        </div>

        <div
          class="bg-[#181624] flex justify-between items-center pt-10 px-[32px]"
        >
          <RouterLink to="/profile" class="text-white text-[16px] px-3 py-2">{{
            $t("profilePage.cancel")
          }}</RouterLink>
          <button
            type="submit"
            class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3 px-5 py-2"
          >
            {{ $t("profilePage.add") }}
          </button>
        </div>
      </Form>
    </div>
  </main>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { usePasswordStore } from "@/stores/password.js";
import axios from "../../config/axios/index.js";
import router from "../../router";
import { ref } from "vue";

const passwordStore = usePasswordStore();

const passwordType = ref(false);
const confirmType = ref(false);

const togglePassword = () => {
  passwordType.value = !passwordType.value;
};

const toggleConfirm = () => {
  confirmType.value = !confirmType.value;
};

const updateUser = (values) => {
  axios
    .post(`user/update`, {
      password: values.password,
    })
    .then(() => {
      router.replace("/profile");
      passwordStore.password = true;
    })
    .catch((error) => {
      console.log(error.response);
    });
};
</script>
