<template>
  <section
    class="w-full min-h-[1600px] py-4 lg:ml-24 lg:max-w-[960px] lg:mt-24 pb-10"
  >
    <div class="lg:hidden">
      <button class="px-5 py-5">
        <img src="@/assets/icons/back.svg" alt="back" />
      </button>
    </div>
    <RouterView />
    <PasswordChanged v-if="passwordStore.password" />
    <EmailAdded v-if="emailStore.email" />
    <UsernameChanged v-if="successStore.success" />
    <main class="w-auto">
      <Form @submit="updateUser">
        <section
          class="bg-[#24222F] lg:bg-[#11101A] h-auto lg:flex lg:items-center lg:justify-center md:px-20 mx-auto rounded-lg"
        >
          <div class="px-2 lg:transform lg:translate-y-[-15%]">
            <div
              class="flex flex-col items-center justify-center h-auto py-[40px]"
            >
              <img
                :src="user?.thumbnail"
                alt="default"
                class="h-[188px] w-[188px] rounded-full object-cover"
                id="image"
              />
              <label
                for="file"
                class="text-white text-[20px] mt-2 cursor-pointer"
                >{{ $t("profilePage.upload") }}</label
              >
            </div>
            <Field v-slot="{ handleChange, meta }" name="file">
              <label
                for="file"
                :class="[
                  !meta.valid && meta.touched
                    ? 'border-1 border-[#DC3545]'
                    : '',
                  meta.valid && meta.touched
                    ? 'border-1  border-[#198754]'
                    : '',
                ]"
                class="bg-[#11101A] text-white h-[80px] border border-white-1 px-2 flex items-center rounded-md hidden"
                @drop.prevent="dragFile"
                @dragover.prevent
              >
                <p class="text-white text-[20px]">
                  {{ file }}
                </p>

                <div v-if="file === null" class="flex items-center">
                  <img src="@/assets/icons/photo.svg" alt="" />

                  <p class="text-[16px] ml-1 md:hidden">Upload image</p>
                  <p
                    class="hidden md:block text-white text-[20px] ml-2 whitespace-nowrap"
                  >
                    Drag & drop your image here or
                  </p>
                  <p
                    class="bg-[#9747FF] text-white text-[16px] md:text-[20px] p-2 ml-2 rounded-md text-center"
                  >
                    Choose File
                  </p>
                </div>
              </label>
              <input
                id="file"
                name="file"
                type="file"
                class="bg-[#11101A] hidden border border-white-1 h-[80px] hidden w-full h-full"
                @input="setImage"
                @change="handleChange"
              />
            </Field>
            <Field
              name="username"
              v-slot="{ field, meta }"
              v-model="username"
              rules="lowercase|min:3|max:15"
              class="relative"
            >
              <div
                class="lg:flex lg:flex-col lg:border-b border-[#6C757D] lg:py-3"
              >
                <label for="username" class="text-white text-[16px]">{{
                  $t("profilePage.username")
                }}</label>

                <div
                  class="flex justify-between lg:flex lg:justify-start relative lg:gap-x-10 border-b border-[#6C757D]-1 py-3 lg:border-none"
                >
                  <p class="text-white text-[16px] lg:hidden">
                    {{ user.username }}
                  </p>
                  <input
                    v-bind="field"
                    type="text"
                    id="username"
                    name="username"
                    class="hidden lg:block bg-gray-300 w-[60%] rounded-md h-[50px] px-2"
                    :class="[
                      !meta.valid && meta.touched
                        ? 'outline-2 -outline-offset-2 outline-[#DC3545]'
                        : '',
                      meta.valid && meta.touched
                        ? 'outline-2 -outline-offset-2 outline-[#198754]'
                        : '',
                    ]"
                    :disabled="!editName"
                  /><button
                    type="button"
                    @click.prevent="setEditName"
                    class="hidden lg:block text-white text-[16px]"
                  >
                    {{ $t("profilePage.edit") }}
                  </button>
                  <RouterLink
                    :to="{ name: 'username-edit' }"
                    class="text-white text-[16px] lg:hidden"
                  >
                    {{ $t("profilePage.edit") }}</RouterLink
                  >
                  <ErrorMessage
                    v-if="editName"
                    name="username"
                    class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[67px]"
                  />
                </div>
              </div>
            </Field>
            <div class="mt-5 relative hidden lg:block lg:w-full">
              <img
                src="@/assets/icons/primary.svg"
                alt=""
                class="absolute top-16 right-[42%]"
              />
              <label for="password" class="text-[white] text-[16px]">{{
                $t("profilePage.email")
              }}</label>
              <div
                class="flex justify-between lg:flex lg:justify-start lg:gap-x-10 border-b border-[#6C757D]-1 lg:border-b border-[#6C757D] py-5 lg:w-[568px]"
              >
                <p class="text-white text-[16px] block lg:hidden">
                  ***********
                </p>
                <input
                  type="text"
                  id="password"
                  name="password"
                  class="hidden lg:block bg-[#132826] bg-gray-300 w-[60%] h-[50px] text-white rounded-md px-2"
                  :value="email"
                  disabled
                /><button
                  type="button"
                  @click="setEditPassword"
                  class="hidden lg:block text-white text-[16px]"
                >
                  {{ $t("profilePage.primary") }}
                </button>

                <RouterLink
                  :to="{ name: 'password-update' }"
                  class="text-white text-[16px] lg:hidden"
                >
                  {{ $t("profilePage.edit") }}
                </RouterLink>
              </div>
            </div>
            <div
              v-for="email in emails"
              class="mt-5 relative hidden lg:block"
              :key="email.id"
            >
              <img
                v-if="email.email_verified_at === null"
                src="@/assets/icons/unverified.svg"
                alt=""
                class="absolute top-16 right-[42%]"
              />
              <label for="password" class="text-[white] text-[16px]">{{
                $t("profilePage.email")
              }}</label>
              <div
                class="flex justify-between border-b border-[#6C757D]-1 lg:border-b border-[#6C757D] py-5 lg:w-[568px]"
              >
                <input
                  type="text"
                  :id="email.id"
                  name="password"
                  class="hidden lg:block bg-[#53381D] w-[60%] h-[50px] rounded-md px-2"
                  :class="[
                    email.email_verified_at !== null
                      ? 'bg-white text-black'
                      : '',
                    email.email_verified_at === null
                      ? 'bg-[#53381D]  text-black'
                      : '',
                  ]"
                  :value="email.email"
                  disabled
                /><span
                  v-if="email.email_verified_at === null"
                  class="hidden lg:block text-white text-[16px] whitespace-nowrap py-4 w-[100px]"
                >
                  {{ $t("profilePage.unverified") }}
                </span>
                <button
                  v-if="email.email_verified_at !== null"
                  type="button"
                  @click="makePrimary(email.id)"
                  class="hidden lg:block text-white text-[16px] whitespace-nowrap"
                >
                  {{ $t("profilePage.make_primary") }}
                </button>
                <button
                  @click="removeEmail(email.id)"
                  class="hidden lg:block text-white text-[16px]"
                >
                  {{ $t("profilePage.remove") }}
                </button>

                <RouterLink
                  :to="{ name: 'password-update' }"
                  class="text-white text-[16px] lg:hidden"
                >
                  {{ $t("profilePage.edit") }}
                </RouterLink>
              </div>
            </div>
            <div
              v-if="user.email_verified_at !== null"
              class="mt-3 flex flex-col gap-y-3 hidden lg:block"
            >
              <button
                @click="addEmail"
                class="border border-white rounded-md flex w-[150px] justify-center items-center py-2"
              >
                <img src="@/assets/icons/plus.svg" alt="" />
                <p class="text-white text-[14px] ml-2">
                  {{ $t("profilePage.add_new_email") }}
                </p>
              </button>
            </div>

            <div v-if="user.email_verified_at !== null" class="mt-5">
              <label for="old_password" class="text-[white] text-[16px]">{{
                $t("profilePage.password")
              }}</label>
              <div
                class="flex justify-between lg:flex lg:justify-start lg:gap-x-10 border-b border-[#6C757D]-1 lg:border-b border-[#6C757D] py-5 lg:w-[568px]"
              >
                <p class="text-white text-[16px] block lg:hidden">
                  ***********
                </p>
                <input
                  type="password"
                  id="old_password"
                  name="old_password"
                  class="hidden lg:block bg-gray-300 w-[60%] h-[50px] rounded-md px-2"
                  value="fladskjghlask"
                  disabled
                /><button
                  type="button"
                  @click="setEditPassword"
                  class="hidden lg:block text-white text-[16px]"
                >
                  {{ $t("profilePage.edit") }}
                </button>
                <RouterLink
                  :to="{ name: 'password-update' }"
                  class="text-white text-[16px] lg:hidden"
                >
                  {{ $t("profilePage.edit") }}
                </RouterLink>
              </div>
            </div>
            <EmailLarge
              v-if="add"
              @close="closeAddEmail"
              :id="user.id"
              @refresh="getMe()"
            />
            <div
              v-if="user.email_verified_at !== null"
              class="w-full flex justify-between py-[20px] lg:hidden"
            >
              <p class="text-white text-[16px]">
                {{ $t("profilePage.email") }}
              </p>
              <RouterLink :to="{ name: 'add-emails' }" class="p-2">
                <img src="@/assets/icons/next.svg" alt="" />
              </RouterLink>
            </div>
            <div v-if="editPic" class="flex justify-end lg:hidden">
              <div>
                <button @click="setEdits" class="text-white text-[20px]">
                  {{ $t("profilePage.cancel") }}
                </button>
                <button
                  type="submit"
                  class="text-white rounded h-[38px] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] text-[16px] mt-3 px-5 py-2 ml-4"
                >
                  {{ $t("profilePage.save") }}
                </button>
              </div>
            </div>

            <div v-if="editPassword" class="hidden lg:block">
              <div class="bg-transparent mt-3">
                <div class="bg-[#11101A] w-[364px] h-[134px]">
                  <div
                    class="flex flex-col p-[24px] border border-[#6C757D] rounded-md"
                  >
                    <p class="text-white text-[15px]">
                      {{ $t("profilePage.pass_should") }}
                    </p>
                    <div class="mt-4">
                      <div class="flex items-center">
                        <div
                          class="w-[4px] h-[4px] bg-[#9C9A9A] rounded-full"
                        ></div>
                        <p class="text-[#9C9A9A] text-[14px] ml-2">
                          {{ $t("profilePage.eight") }}
                        </p>
                      </div>
                      <div class="flex items-center">
                        <div
                          class="w-[4px] h-[4px] bg-[#198754] rounded-full"
                        ></div>
                        <p class="text-[#9C9A9A] text-[14px] ml-2">
                          {{ $t("profilePage.fifteen") }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col mb-4 relative">
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
                      class="w-full self-center w-full h-[50px] bg-[#CED4DA] px-2 outline-none rounded-md"
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
                      src="@/assets/icons/invalid.svg"
                      class="w-[22px] h-[22px] absolute top-11 right-10"
                      alt=""
                    />
                    <img
                      v-if="meta.valid && meta.touched"
                      src="@/assets/icons/valid.svg"
                      class="w-[22px] h-[22px] absolute top-11 right-10"
                      alt=""
                    />
                  </Field>
                  <ErrorMessage
                    name="password"
                    class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[80px]"
                  />
                  <img
                    @click="togglePassword"
                    src="@/assets/images/eye.png"
                    class="absolute top-[60%] right-5 cursor-pointer"
                    alt=""
                  />
                </div>
                <div class="flex flex-col mb-5 relative">
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
                      class="w-full self-center w-full h-[50px] bg-[#CED4DA] px-2 py-2 outline-none rounded-md"
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
                      src="@/assets/icons/invalid.svg"
                      class="w-[22px] h-[22px] absolute top-11 right-10"
                      alt=""
                    />
                    <img
                      v-if="meta.valid && meta.touched"
                      src="@/assets/icons/valid.svg"
                      class="w-[22px] h-[22px] absolute top-11 right-10"
                      alt=""
                    />
                  </Field>
                  <ErrorMessage
                    name="password_confirmation"
                    class="text-[14px] md:text-[16px] text-red-600 font-semibold absolute top-[80px]"
                  />
                  <img
                    @click="toggleConfirm"
                    src="@/assets/images/eye.png"
                    class="absolute top-[60%] right-5 cursor-pointer"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          v-if="editName || editPassword || editPic"
          class="lg:w-[90%] hidden lg:flex justify-end"
        >
          <div>
            <button @click="setEdits" class="text-white text-[20px]">
              {{ $t("profilePage.cancel") }}
            </button>
            <button
              type="submit"
              class="text-white rounded h-[38px] bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] text-[16px] mt-3 px-5 py-2 ml-4"
            >
              {{ $t("profilePage.save") }}
            </button>
          </div>
        </div>
      </Form>
    </main>
  </section>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import axios from "@/config/axios/index.js";
import axiosInstance from "../config/axios/jwt-axios.js";
import UsernameChanged from "./dialogs/UsernameChanged.vue";
import PasswordChanged from "./dialogs/PasswordChanged.vue";
import EmailAdded from "./dialogs/EmailAdded.vue";
import EmailLarge from "./dialogs/EmailLarge.vue";
import { usePasswordStore } from "@/stores/password.js";
import { useSuccessStore } from "@/stores/success.js";
import { useEmailStore } from "@/stores/email.js";
import { thumbnail } from "@/helpers/thubmnail/thumbnail";
import { useLocaleStore } from "@/stores/locale.js";
import { useProfileStore } from "@/stores/profile.js";

const passwordType = ref(false);
const confirmType = ref(false);

const togglePassword = () => {
  passwordType.value = !passwordType.value;
};
const toggleConfirm = () => {
  confirmType.value = !confirmType.value;
};
const profileStore = useProfileStore();
const localeStore = useLocaleStore();
const emailStore = useEmailStore();
const successStore = useSuccessStore();
const passwordStore = usePasswordStore();
const user = ref("");
const username = ref("");
const email = ref("");
const file = ref(null);
const src = ref("http://127.0.0.1:8000/storage/" + thumbnail.value);
const data = ref({});
const header = {
  headers: { "Content-Type": "multipart/form-data" },
};
const editName = ref(false);
const editPassword = ref(false);
const editPic = ref(false);
const add = ref(false);
const addEmail = () => {
  add.value = true;
};
const closeAddEmail = () => {
  add.value = false;
};

const setEdits = () => {
  editName.value = false;
  editPassword.value = false;
  editPic.value = false;
};
const setEditPassword = () => {
  editPassword.value = true;
};

const setEditName = () => {
  editName.value = true;
};

const setImage = function (event) {
  let output = document.getElementById("image");
  output.src = URL.createObjectURL(event.target.files[0]);
  src.value = event.target.value;
  editPic.value = true;

  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
};
const emails = ref({});
const getMe = () => {
  axiosInstance
    .get("me")
    .then((response) => {
      user.value = response.data.user;
      username.value = response.data.user.username;
      profileStore.username = response.data.user.username;
      profileStore.photo = response.data.user.thumbnail;
      email.value = response.data.user.email;
      emails.value = response.data.user.emails;
    })
    .catch((error) => {
      console.log(error.response);
    });
};
onMounted(() => {
  getMe();
});

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

const updateUser = (values, actions) => {
  data.value = {};
  if (values.username !== user.value.username) {
    data.value["username"] = values.username;
  }
  if (values.file !== null) {
    data.value["thumbnail"] = values.file;
  }
  if (values.password) {
    data.value["password"] = values.password;
  }

  axios
    .post(`user/update`, data.value, header)
    .then(() => {
      getMe();
      if (values.password) {
        passwordStore.password = true;
      }
      if (values.username !== user.value.username) {
        successStore.success = true;
      }

      setEdits();
    })
    .catch((error) => {
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
