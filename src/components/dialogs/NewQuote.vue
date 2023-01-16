<template>
  <div
    class="w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>

  <dialog
    open
    class="w-full sm:w-[450px] md:w-[600px] xl:w-[750px] 2xl:w-[960px] max-w-[960px] px-5 md:px-0 bg-[#11101A] h-[700px] md:top-[100px] z-20 rounded-xl top-0"
  >
    <header
      class="relative text-white text-[20px] h-[100px] flex justify-center items-center border-b border-[#EFEFEF]-[0.5px]"
    >
      <p>{{ $t("newQuote.write_new") }}</p>

      <button @click="handleClose" class="absolute lg:top-4 top-[45%] right-4">
        <img src="@/assets/icons/close.svg" alt="" width="14" />
      </button>
    </header>
    <section class="px-[32px] py-[30px] h-auto flex flex-col">
      <div class="flex items-center">
        <img
          :src="photo"
          alt=""
          class="rounded-full mr-[16px] w-[40px] h-[40px] md:w-[52px] md:h-[52px] object-cover"
        />
        <p class="text-white text-[20px]">{{ user }}</p>
      </div>
    </section>
    <Form
      @submit="storeQuote"
      class="flex flex-col justify-around md:px-20 gap-5"
    >
      <Field
        v-slot="{ field, meta }"
        name="quote_en"
        rules="required|description_en|min:10|max:300"
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
          placeholder="დაიწყე ციტატის შექმნა"
        ></textarea>
      </Field>

      <DropZone
        @drop.prevent="drop"
        @change="selectedFile"
        @fileName="dropzoneFile"
      />

      <div class="relative">
        <div
          v-if="chosenMovie.length === 0"
          class="flex w-auto items-center absolute top-[25%] left-3"
        >
          <img src="@/assets/icons/camera.svg" alt="" />
          <p class="text-white text-[20px] ml-2 whitespace-nowrap">
            {{ $t("newQuote.choose_movie") }}
          </p>
        </div>

        <div class="w-auto">
          <Field
            v-slot="{ field, meta }"
            name="movie"
            rules="required"
            class="relative"
            v-model="chosenMovie"
          >
            <select
              v-bind="field"
              name="movie"
              id="movie"
              :class="[
                !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
                meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
              ]"
              class="bg-black text-white rounded-lg block w-full p-2.5 h-20"
            >
              <option
                v-for="movie in movies"
                :value="movie.id"
                :key="movie.id"
                class="text-white text-[20px]"
              >
                {{
                  localeStore.locale === "en" ? movie.title.en : movie.title.ka
                }}
              </option>
            </select>
          </Field>
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] h-[50px] text-white rounded-md"
      >
        {{ $t("newQuote.post") }}
      </button>
    </Form>
  </dialog>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import axios from "../../config/axios/index.js";
import { onBeforeMount, ref, defineEmits, computed } from "vue";
import { useLocaleStore } from "@/stores/locale.js";
import { useDropStore } from "@/stores/drop.js";
import DropZone from "@/components/DropZone.vue";
import { useProfileStore } from "@/stores/profile.js";

const profileStore = useProfileStore();

const user = computed(() => {
  return profileStore.username;
});

const photo = computed(() => {
  return profileStore.photo;
});
const dropStore = useDropStore();
const localeStore = useLocaleStore();

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
  dropStore.drop = "";
};

const header = {
  headers: { "Content-Type": "multipart/form-data" },
};

const movies = ref([]);
const chosenMovie = ref("");

let dropzoneFile = ref("");
const drop = (e) => {
  dropStore.drop = e.dataTransfer.files[0];
};
const selectedFile = () => {
  dropStore.drop = document.querySelector("#file").files[0];
};

const getMovies = () => {
  axios
    .get("movies")
    .then((response) => {
      movies.value = response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

onBeforeMount(() => {
  getMovies();
});

const storeQuote = (values, actions) => {
  axios
    .post(
      "store-quote",
      {
        quote_en: values.quote_en,
        quote_ka: values.quote_ka,
        thumbnail: dropStore.drop,
        movie_id: values.movie,
      },
      header
    )
    .then(() => {
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
