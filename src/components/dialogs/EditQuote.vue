<template>
  <div
    class="w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="w-full h-auto sm:w-[500px] lg:w-[600px] 2xl:w-[960px] bg-[#11101A] h-auto z-30 rounded-xl absolute top-0 md:top-[80px]"
  >
    <header
      class="relative text-white text-[20px] h-[92px] flex justify-center items-center border-b border-[#EFEFEF]-[0.5px]"
    >
      <div
        class="w-full max-w-[144px] rounded-md flex py-[10px] absolute left-2"
      >
        <button
          @click="handleDelete"
          class="h-auto flex items-center justify-center"
        >
          <img src="@/assets/icons/delete.svg" alt="" />
          <p class="ml-2">{{ $t("quoteMenu.delete") }}</p>
        </button>
      </div>
      <p class="hidden lg:block">{{ $t("addQuote.edit") }}</p>

      <button @click="handleClose" class="absolute lg:top-4 top-[45%] right-4">
        <img src="@/assets/icons/close.svg" alt="" width="14" />
      </button>
    </header>
    <section class="md:px-[32px] py-[30px] h-full flex flex-col">
      <div class="flex items-center">
        <img
          :src="userAvatar"
          alt=""
          width="52"
          class="rounded-full mr-[16px] w-[40px] h-[40px] md:w-[52px] md:h-[52px] object-cover"
        />
        <p class="text-white text-[20px]">{{ username }}</p>
      </div>
    </section>
    <section class="flex flex-col justify-around md:px-5 mb-10 gap-5">
      <Form
        @submit="updateQuote"
        class="flex flex-col justify-around md:px-20 gap-5"
      >
        <Field
          v-slot="{ field, meta }"
          name="quote_en"
          rules="required|description_en|min:10|max:300"
          v-model="quote_en"
        >
          <textarea
            v-bind="field"
            name="quote_en"
            id="quote_en"
            cols="30"
            rows="2"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-[#11101A] border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
            placeholder="Start creating new quote"
          ></textarea>
        </Field>

        <Field
          v-slot="{ field, meta }"
          name="quote_ka"
          rules="required|description_ka|min:10|max:300"
          v-model="quote_ka"
        >
          <textarea
            v-bind="field"
            name="quote_ka"
            id="quote_ka"
            cols="30"
            rows="2"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-[#11101A] border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
            placeholder="Start creating new quote"
          ></textarea>
        </Field>

        <Field v-slot="{ field, meta }" name="file">
          <label
            for="file"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
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
            v-bind="field"
            id="file"
            name="file"
            type="file"
            class="bg-[#11101A] hidden border border-white-1 h-[80px] hidden w-full h-full"
            @change="setImage"
          />
        </Field>
        <div
          class="relative w-full border border-white-1 min-h-[80px] rounded-lg"
        >
          <img
            :src="THUMBNAIL_URL + quote?.thumbnail"
            alt=""
            class="w-auto h-auto"
            id="image"
          />
          <label
            for="file"
            class="cursor-pointer bg-black opacity-[0.6] w-[135px] h-[84px] flex flex-col items-center justify-center rounded-xl absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]"
          >
            <img
              src="@/assets/icons/photo.svg"
              alt=""
              class="z-10 w-[18px] h-auto"
            />
            <p class="text-white text-[16px] whitespace-nowrap">Change photo</p>
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-[50px] text-white rounded-md"
        >
          {{ $t("addQuote.save") }}
        </button>
      </Form>
    </section>
  </dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Form, Field } from "vee-validate";
import axios from "@/config/axios/index.js";
import router from "../../router";

const header = {
  headers: { "Content-Type": "multipart/form-data" },
};

const thumbnail = ref("");
const movie_id = ref("");
const quote_en = ref("");
const quote_ka = ref("");
const quote = ref([]);
const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;
const emit = defineEmits(["close"]);

const props = defineProps(["data"]);

const src = ref("http://127.0.0.1:8000/storage/" + thumbnail.value);

const handleClose = () => {
  emit("close");
};
const setImage = function (event) {
  let output = document.getElementById("image");
  output.src = URL.createObjectURL(event.target.files[0]);
  src.value = event.target.value;

  output.onload = function () {
    URL.revokeObjectURL(output.src);
  };
};
const username = ref("");
const userAvatar = ref(null);
const getQuote = () => {
  axios
    .get(`quote/${props.data}`)
    .then((response) => {
      quote.value = response.data;
      quote_en.value = quote.value.quote.en;
      quote_ka.value = quote.value.quote.ka;
      thumbnail.value = quote.value.thumbnail;
      movie_id.value = quote.value.movie_id;
      username.value = response.data.author.username;
      userAvatar.value = response.data.author.thumbnail;
    })
    .catch((error) => {
      console.log(error.response);
    });
};
const updateQuote = (values, actions) => {
  axios
    .post(
      `quote/${props.data}`,
      {
        quote_en: values.quote_en,
        quote_ka: values.quote_ka,
        thumbnail: values.file,
        movie_id: movie_id.value,
      },
      header
    )
    .then(() => {
      emit("close");
      router.push(`/movie-list/movie/${movie_id.value}`);
    })
    .catch((error) => {
      console.log(error.response);
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};

onMounted(() => {
  getQuote();
});

const handleDelete = (value, actions) => {
  axios
    .post(`delete-quote/${props.data}`)
    .then(() => {
      emit("close");
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
