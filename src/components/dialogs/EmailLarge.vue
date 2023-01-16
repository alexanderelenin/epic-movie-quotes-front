<template>
  <div
    class="z-32 w-screen h-screen fixed top-0 left-0"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="bg-[#11101A] h-screen w-full md:h-[348px] md:w-[538px] rounded-3xl flex flex-col absolute 2xl:top-[280px] 4xl:top-[320px] z-20"
  >
    <Form @submit="saveEmail">
      <p class="text-white text-[20px] py-5 border-b border-white-1 mb-2">
        {{ $t("profilePage.add_new_email") }}
      </p>
      <div class="flex flex-col">
        <Field v-slot="{ field, meta }" name="email" rules="required|email"
          ><label for="email" class="text-white text-[16px] mb-5">{{
            $t("profilePage.new_email")
          }}</label>
          <input
            v-bind="field"
            name="email"
            id="email"
            placeholder="Enter new email"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-gray-300 border border-[#6C757D]-1 h-[50px] w-full text-[16px] md:text-[20px] px-2 rounded-md"
          />
        </Field>
        <ErrorMessage
          name="email"
          class="text-[14px] md:text-[16px] text-red-600 font-semibold"
        />
      </div>

      <div class="w-full flex justify-between mt-16 px-10">
        <button @click="handleClose" class="text-[#6C757D] px-3 py-2">
          {{ $t("profilePage.cancel") }}
        </button>
        <button
          type="submit"
          class="text-white text-[16px] text-center px-[20px] py-2 bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] rounded-md"
        >
          {{ $t("profilePage.add") }}
        </button>
      </div>
      <LoadingDors v-if="loading" />
    </Form>
  </dialog>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import axios from "../../config/axios/index.js";
import { useEmailStore } from "@/stores/email.js";
import { useLocaleStore } from "@/stores/locale.js";
import LoadingDors from "@/components/LoadingDors.vue";
const localeStore = useLocaleStore();

const emailStore = useEmailStore();

const emit = defineEmits(["close", "refresh"]);
const handleClose = () => {
  emit("close");
};

const loading = ref(false);

const props = defineProps({
  id: String,
});

const saveEmail = (values, actions) => {
  loading.value = true;
  axios
    .post("email/add", {
      email: values.email,
      user_id: props.id,
    })
    .then(() => {
      emit("refresh");
      emit("close");
      loading.value = false;
      emailStore.email = true;
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
