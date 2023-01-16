<template>
  <div
    class="w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="w-full sm:w-[500px] lg:w-[600px] 2xl:w-[960px] bg-[#11101A] h-auto z-20 rounded-xl top-0 md:top-[80px]"
  >
    <header
      class="relative text-white text-[20px] h-[92px] flex justify-center items-center border-b border-[#EFEFEF]-[0.5px]"
    >
      <p>{{ $t("addMovie.add") }}</p>

      <button @click="handleClose" class="absolute lg:top-4 top-[45%] right-4">
        <img src="@/assets/icons/close.svg" alt="" width="14" />
      </button>
    </header>
    <section class="md:px-[32px] py-[30px] h-auto flex flex-col">
      <div class="flex items-center">
        <img
          :src="photo"
          alt=""
          width="52"
          class="rounded-full mr-[16px] w-[40px] h-[40px] md:w-[52px] md:h-[52px] object-cover"
        />
        <p class="text-white text-[20px]">{{ user }}</p>
      </div>
    </section>
    <Form
      @submit="storeMovie"
      class="flex flex-col justify-around md:px-20 gap-5"
    >
      <Field
        v-slot="{ field, meta }"
        rules="required|min:2|max:100|description_en"
        name="title_en"
        class="w-full"
      >
        <input
          v-bind="field"
          name="title_en"
          type="text"
          id="title_en"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[48px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="Movie name"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
        />
      </Field>

      <Field
        name="title_ka"
        v-slot="{ field, meta }"
        rules="required|geo_film|min:3"
      >
        <input
          v-bind="field"
          name="title_ka"
          type="text"
          id="title_ka"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[48px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="ფილმის სახელი"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
        />
      </Field>
      <Field
        v-slot="{ field, meta }"
        :rules="requiredGenre"
        name="genre"
        id="genre"
      >
        <div
          @click="showItems"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
          v-bind="field"
          class="w-full flex flex-wrap items-center gap-2 relative bg-[#11101A] border border-[#6C757D]-1 min-h-[48px] rounded-md"
        >
          <div v-for="(chip, i) of chips" :key="i" class="h-auto px-2 py-2">
            <span
              class="text-white text-[14px] bg-[#6C757D] px-2 py-2 flex justify-between items-center inline-block min-w-[70px]"
              >{{ chip }}
              <button @click="removeGenre(i)">
                <img
                  src="@/assets/icons/close.svg"
                  alt=""
                  class="w-[9px] h-[9px] ml-2"
                /></button
            ></span>
          </div>
          <label
            for="genre"
            class="text-white text-[20px] px-2"
            v-if="chips.length < 1"
            >{{ $t("addMovie.genre") }}</label
          >
          <input
            v-bind="field"
            type="text"
            name="genre"
            disabled
            id="genre"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="hidden"
          />
          <ul
            class="absolute top-[50px] px-10 bg-[#11101A] z-2 rounded-md gap-2 flex flex-col justify-around py-3"
            v-if="items"
          >
            <li
              @click="setGenre(genre)"
              v-for="(genre, i) of genres"
              :key="i"
              class="text-white text-[20px] cursor-pointer"
            >
              {{ genre }}
            </li>
          </ul>
        </div>
      </Field>

      <Field
        v-slot="{ field, meta }"
        rules="required|director_en"
        name="director_en"
        id="director_en"
      >
        <input
          name="director_en"
          type="text"
          v-bind="field"
          id="director_en"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[48px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="Director"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
        />
      </Field>
      <Field
        v-slot="{ field, meta }"
        rules="required|year"
        name="year"
        id="year"
      >
        <input
          name="year"
          type="number"
          v-bind="field"
          id="year"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[48px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          :placeholder="$t('addMovie.year')"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
        />
      </Field>
      <Field
        name="director_ka"
        v-slot="{ field, meta }"
        rules="required|director_ka|min:5"
      >
        <input
          v-bind="field"
          name="director_ka"
          type="text"
          id="director_ka"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[48px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="რეჟისორი"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
        />
      </Field>

      <Field
        v-slot="{ field, meta }"
        rules="required|description_en|min:5|max:500"
        name="description_en"
        id="description_en"
      >
        <textarea
          name="description_en"
          id="description_en"
          v-bind="field"
          cols="30"
          rows="2"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="Movie description"
        ></textarea>
      </Field>
      <Field
        name="description_ka"
        rules="required|description_ka|min:5|max:500"
        v-slot="{ field, meta }"
      >
        <textarea
          name="description_ka"
          id="description_ka"
          v-bind="field"
          cols="30"
          rows="2"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="ფილმის აღწერა"
        ></textarea>
      </Field>
      <DropZone @drop.prevent="drop" @change="selectedFile" />
      <button
        type="submit"
        class="w-full bg-[#E31221] h-[50px] text-white rounded-md"
      >
        {{ $t("newQuote.post") }}
      </button>
    </Form>
  </dialog>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import axios from "../../config/axios/index.js";
import router from "../../router";
import { defineEmits, ref, computed } from "vue";

import DropZone from "@/components/DropZone.vue";
import { useDropStore } from "@/stores/drop.js";
import { useProfileStore } from "@/stores/profile.js";

const profileStore = useProfileStore();

const user = computed(() => {
  return profileStore.username;
});

const photo = computed(() => {
  return profileStore.photo;
});

const dropStore = useDropStore();

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
const header = {
  headers: { "Content-Type": "multipart/form-data" },
};
const items = ref(false);

const genres = ref([
  "Thriller",
  "Drama",
  "Action",
  "Fantasy",
  "Fiction",
  "Comedy",
  "Horror",
  "Animated",
  "Crime",
  "Documentary",
]);

const showItems = () => {
  items.value = !items.value;
};
const chips = ref([]);
const drop = (e) => {
  dropStore.drop = e.dataTransfer.files[0];
};
const selectedFile = () => {
  dropStore.drop = document.querySelector("#file").files[0];
};

const requiredGenre = () => {
  if (chips.value.length < 1) {
    return false;
  }
  return true;
};

const setGenre = (value) => {
  if (chips.value.includes(value)) {
    return;
  } else {
    chips.value.push(value);
  }
};

const removeGenre = (value) => {
  chips.value.splice(value, 1);
};

const storeMovie = (values, actions) => {
  axios
    .post(
      "store-movie",
      {
        title_en: values.title_en,
        title_ka: values.title_ka,
        genre: chips.value,
        director_en: values.director_en,
        director_ka: values.director_ka,
        year: values.year,
        description_en: values.description_en,
        description_ka: values.description_ka,
        thumbnail: dropStore.drop,
      },
      header
    )
    .then(() => {
      router.replace("/movie-list");
      emit("close");
      dropStore.drop = "";
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
