<template>
  <ChangeUsername v-if="change" :username="username" @close="closeChange" />
  <main class="">
    <div class="px-5 py-5">
      <RouterLink to="/profile">
        <img src="@/assets/icons/back.svg" alt="back" />
      </RouterLink>
    </div>
    <Form @submit="saveUsername">
      <div
        class="bg-[#24222F] w-screen h-[170px] flex flex-col justify-center relative px-[32px] pt-2 pb-10 rounded-md"
      >
        <p class="text-white text-[16px] py-3">
          {{ $t("profilePage.new_username") }}
        </p>
        <Field
          v-slot="{ field, meta }"
          name="username"
          rules="required|lowercase|min:3|max:15"
        >
          <input
            v-bind="field"
            name="username"
            id="username"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-gray-300 border border-[#6C757D]-1 h-[50px] w-full text-[16px] md:text-[20px] px-2 rounded-md"
          />
          <p
            class="text-red-500 font-semibold text-[16px] absolute top-[125px]"
          >
            {{ usernameStore.username }}
          </p>
        </Field>
      </div>

      <div class="w-full flex justify-between mt-16 px-10">
        <RouterLink to="/profile" class="text-[#6C757D] px-3 py-2">{{
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
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import ChangeUsername from "./ChangeUsername.vue";
import { useUsernameStore } from "@/stores/username.js";
const usernameStore = useUsernameStore();
const username = ref("");
const change = ref(false);

const setChange = () => {
  change.value = true;
};

const closeChange = () => {
  change.value = false;
};
const saveUsername = (values) => {
  username.value = values.username;
  setChange();
};
</script>
