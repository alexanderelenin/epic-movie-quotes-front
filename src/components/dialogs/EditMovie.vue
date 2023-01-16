<template>
  <div
    class="w-full h-full fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="w-full md:w-[50%] h-auto max-w-[960px] bg-[#11101A] h-auto z-20 rounded-xl top-0 md:top-[80px]"
  >
    <header
      class="relative text-white text-[20px] h-[92px] flex justify-center items-center border-b border-[#EFEFEF]-[0.5px]"
    >
      <p>{{ $t("singleMovie.edit") }}</p>

      <button @click="handleClose" class="absolute lg:top-4 top-[45%] right-4">
        <img src="@/assets/icons/close.svg" alt="" width="14" />
      </button>
    </header>
    <section class="md:px-[32px] py-[30px] flex flex-col">
      <div class="flex items-center">
        <img
          :src="photo"
          alt=""
          width="52"
          class="rounded-full mr-[16px] w-[40px] h-[40px] md:h-[52px] md:w-[52px] object-cover"
        />
        <p class="text-white text-[20px]">{{ user }}</p>
      </div>
    </section>
    <Form
      @submit="updateMovie"
      class="flex flex-col justify-around md:px-20 gap-5 h-full"
    >
      <Field
        v-slot="{ field, meta }"
        rules="required|min:2|max:100|description_en"
        name="title_en"
        id="title_en"
        v-model="title_en"
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
        v-model="title_ka"
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
          class="w-full flex flex-wrap items-center gap-2 relative bg-[#11101A] border border-[#6C757D]-1 min-h-[48px] rounded-md"
        >
          <div
            v-for="(chip, i) of chips"
            :key="i"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="h-auto px-2 py-2 flex flex-wrap"
          >
            <span
              class="z-10 gap-2 text-white text-[14px] bg-[#6C757D] px-2 py-2 flex justify-between items-center inline-block min-w-[70px]"
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
            >Genre</label
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
            class="absolute top-[48px] px-10 bg-red-500 rounded-md gap-2 flex flex-col justify-around py-3"
            v-show="items"
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
        v-model="director_en"
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
        v-model="year"
      >
        <input
          name="year"
          type="number"
          v-bind="field"
          id="year"
          class="bg-[#11101A] border border-[#6C757D]-1 h-[48px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          placeholder="Year"
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
        v-model="director_ka"
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
        v-model="description_en"
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
        v-model="description_ka"
      >
        <textarea
          v-bind="field"
          name="description_ka"
          id="description_ka"
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
      <Field v-slot="{ field, meta }" name="file" id="file">
        <label
          for="file"
          :class="[
            !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
            meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
          ]"
          class="bg-[#11101A] text-white h-[80px] border border-white-1 px-2 flex items-center rounded-md"
        >
          <p class="text-white text-[20px] break-all w-full">
            {{ file }}
          </p>
          <div v-if="file === null" class="flex items-center">
            <img src="@/assets/icons/photo.svg" alt="" />

            <p class="text-[16px] ml-1 md:hidden">Upload image</p>
            <p class="hidden md:block text-white text-[20px] ml-2">
              Drag & drop your image here or
            </p>
            <p
              class="bg-[#9747FF] text-white text-[16px] md:text-[20px] p-2 ml-2 rounded-md"
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
          class="bg-[#11101A] border border-white-1 h-[80px]"
          hidden
          @input="setFile"
        />
      </Field>

      <button
        type="submit"
        class="w-full bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-[50px] text-white rounded-md"
      >
        {{ $t("addQuote.save") }}
      </button>
    </Form>
  </dialog>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import axios from "../../config/axios/index.js";
import { onMounted, ref } from "vue";
import router from "../../router";
import { useRoute } from "vue-router";
import { defineEmits, computed } from "vue";
// import axiosInstance from "@/config/axios/jwt-axios.js";
import { useProfileStore } from "@/stores/profile.js";

const profileStore = useProfileStore();

const user = computed(() => {
  return profileStore.username;
});
const photo = computed(() => {
  return profileStore.photo;
});

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};
const header = {
  headers: { "Content-Type": "multipart/form-data" },
};

const movie = ref([]);
const file = ref("");

const title_en = ref("");
const title_ka = ref("");
const director_en = ref("");
const director_ka = ref("");
const description_en = ref("");
const description_ka = ref("");
const year = ref(typeof Number);

const thumbnail = ref("");
const items = ref(false);
const showItems = () => {
  items.value = !items.value;
};

const genres = ref(["Thriller", "Drama", "Action", "Fantasy", "Avoeeeeeeeeee"]);

const chips = ref([]);
const setGenre = (value) => {
  chips.value.push(value);
};

const removeGenre = (value) => {
  chips.value.splice(value, 1);
};
const id = useRoute().params.id;

onMounted(() => {
  axios
    .get(`movie/${id}`)
    .then((response) => {
      movie.value = response.data[0];

      title_en.value = movie.value.title.en;
      title_ka.value = movie.value.title.ka;
      director_en.value = movie.value.director.en;
      director_ka.value = movie.value.director.ka;
      description_en.value = movie.value.description.en;
      description_ka.value = movie.value.description.ka;
      year.value = movie.value.year;
      chips.value = movie.value.genre;
      thumbnail.value = movie.value.thumbnail;
      file.value = movie.value.thumbnail;
    })
    .catch((error) => {
      console.log(error.response);
    });
});
const updateMovie = (values, actions) => {
  axios
    .post(
      `movie/${id}`,
      {
        title_en: values.title_en,
        title_ka: values.title_ka,
        director_en: values.director_en,
        director_ka: values.director_ka,
        genre: chips.value,
        description_en: values.description_en,
        description_ka: values.description_ka,
        year: values.year,
        thumbnail: values.file,
      },
      header
    )
    .then(() => {
      router.replace("/movie-list");
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
