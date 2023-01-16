<template>
  <div
    v-if="passwordReset"
    class="z-10 w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    v-if="passwordReset"
    open
    class="bg-[#222030] h-screen w-full md:h-[484px] md:w-[600px] rounded-3xl flex flex-col absolute md:top-[120px] xl:top-[180px] 2xl:top-[250px] z-20"
  >
    <header class="text-center flex flex-col items-center">
      <h1 class="text-white text-[32px] font-medium mt-6">
        {{ $t("logIn.create_password") }}
      </h1>
      <p class="text-white text-[16px] text-[#6C757D] max-w-[300px]">
        {{ $t("logIn.create_description") }}
      </p>
    </header>

    <main class="flex flex-col items-center h-full mt-6">
      <Form @submit="handleReset" class="flex flex-col justify-around">
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
              type="password"
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
            src="../../assets/images/eye.png"
            class="absolute top-11 right-1"
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
              type="password"
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
            src="../../assets/images/eye.png"
            class="absolute top-11 right-1"
            alt=""
          />
        </div>
        <button
          type="submit"
          class="text-white rounded h-[38px] bg-[#E31221] text-[16px] mt-3"
        >
          {{ $t("logIn.reset_password") }}
        </button>
      </Form>

      <button
        @click="handleClose"
        class="text-white px-4 py-2 border rounded-xl md:hidden"
      >
        {{ $t("logIn.close") }}
      </button>
    </main>
  </dialog>
  <reset-success @close="handleClose" v-if="success"></reset-success>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { defineEmits, onBeforeMount, ref } from "vue";
import ResetSuccess from "../dialogs/ResetSuccess.vue";

import { useRoute } from "vue-router";
import axios from "../../config/axios/index.js";
import router from "../../router";

const emit = defineEmits(["close"]);

const email = ref("");
const token = ref("");
const passwordReset = ref(true);
const success = ref(false);
const handleClose = () => {
  success.value = false;
  emit("close");
};
onBeforeMount(() => {
  const route = useRoute();
  email.value = route.query.email;
  token.value = route.query.token;
});
const handleReset = (values, actions) => {
  axios
    .post("reset-password", {
      email: email.value,
      password: values.password,
      password_confirmation: values.password_confirmation,
      token: token.value,
    })
    .then(() => {
      passwordReset.value = false;
      success.value = true;
      router.push("/");
    })
    .catch((error) => {
      console.log(error.response);
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};
</script>
