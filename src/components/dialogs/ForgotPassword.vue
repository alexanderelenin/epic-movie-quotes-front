<template>
  <div
    v-if="emailVerified"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    v-if="emailVerified"
    open
    class="bg-[#181623] md:bg-[#222030] h-screen w-full md:h-[402px] md:w-[600px] md:rounded-3xl flex flex-col absolute md:top-[120px] xl:top-[200px] 2xl:top-[320px] z-20"
  >
    <header class="text-center flex flex-col items-center">
      <h1 class="text-white text-[32px] font-medium mt-10">
        {{ $t("logIn.forgot_password") }}?
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] w-[300px]">
        {{ $t("logIn.forgot_instuction") }}
      </p>
    </header>
    <main class="flex flex-col items-center h-full mt-6">
      <Form @submit="handleReset" class="flex flex-col justify-around">
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

        <button
          type="submit"
          class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3"
        >
          {{ $t("logIn.send_instructions") }}
        </button>
      </Form>

      <button
        @click="handleBack"
        class="text-white px-4 py-2 flex items-center justify-between mt-2"
      >
        <img src="../../assets/icons/arrow-left.svg" alt="" class="mr-2" />
        {{ $t("logIn.back_to_login") }}
      </button>
    </main>
  </dialog>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";
import { useResetStore } from "@/stores/reset.js";
import router from "../../router";
import axios from "@/config/axios/index.js";

const resetStore = useResetStore();
const emailVerified = ref(true);

const handleClose = () => {
  router.push("/");
};

const handleBack = () => {
  router.push({ name: "login" });
};

const handleReset = (values, actions) => {
  axios
    .post("forgot-password", {
      email: values.email,
    })
    .then(() => {
      router.push("/");
      resetStore.reset = true;
    })
    .catch((error) => {
      console.log(error);
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};
</script>
