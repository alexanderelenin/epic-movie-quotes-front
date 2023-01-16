<template>
  <div v-if="movieStore.movie === true">
    <div
      class="w-screen h-full fixed top-0 left-0"
      @click="$emit('close')"
    ></div>
    <div
      class="fixed lg:hidden px-2 right-0 w-full h-[600px] md:h-[800px] top-0 righ h-auto 2xl:w-[960px] bg-[#12101A] h-auto z-20 rounded-xl"
    >
      <header
        class="relative flex text-white text-[20px] h-[92px] flex items-center border-b border-[#EFEFEF] px-2"
      >
        <button @click="movieStore.movie = false">
          <img src="@/assets/icons/back.svg" alt="" />
        </button>
        <Form @submit="submitSearch" class="w-full">
          <Field name="search">
            <div class="relative ml-3">
              <p
                v-if="search.length < 1"
                class="px-1 text-base text-white absolute top-1"
              >
                {{ $t("searchBar.search") }}
              </p>
              <input
                type="text"
                name="search"
                id="search"
                class="w-full bg-transparent"
                v-model="search"
              />
            </div>
          </Field>
        </Form>
      </header>
      <section class="pt-5 h-auto flex flex-col">
        <div class="px-10 flex flex-col gap-y-5">
          <p class="text-gray-500 text-base">Close to see results</p>
        </div>
      </section>
    </div>
  </div>
  <section class="w-auto lg:w-[90%] h-full py-4 md:mx-[5%] pb-10">
    <div class="bg-[#181624] rounded-xl px-[24px] mb-[40px]">
      <div class="flex justify-between mb-[56px] mt-5">
        <div class="flex flex-col md:flex-row w-full">
          <h1 class="text-white text-[20px] md:text-[24px] mr-2">
            {{ $t("movieList.my_list") }}
          </h1>
          <p class="text-white sm:text-[20px] md:text-[24px] self-start">
            ({{ $t("movieList.total") }} {{ length }})
          </p>
        </div>
        <div
          class="hidden lg:flex w-[250px] border-r border-white mr-2 flex items-center relative"
        >
          <button
            @click="enable"
            class="text-white flex items-center mr-2 text-[16px] md:text-[20px]"
          >
            <label for="search" class="cursor-pointer">
              <img
                v-if="search.length < 1"
                src="@/assets/icons/lupa.svg"
                alt=""
                class="absolute left-2 top-3"
              />
              <span
                v-if="search.length < 1"
                class="ml-2 text-[20px] absolute top-2 left-6"
                >{{ $t("movieList.search") }}</span
              ></label
            >

            <input
              type="text"
              name="search"
              id="search"
              class="bg-transparent text-white text-[20px] w-full h-[50px] outline-none"
              v-model="search"
            />
          </button>
        </div>

        <button
          @click="addMovie"
          class="flex items-center max-h-[50px] justify-center bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] px-[25px] py-[11px] rounded-md"
        >
          <img src="@/assets/icons/plus.svg" alt="" class="w-[16px]" />
          <p
            class="text-white text-[16px] whitespace-nowrap ml-[8px] 2xl:text-[20px]"
          >
            {{ $t("movieList.add_movie") }}
          </p>
        </button>
      </div>
      <AddMovie v-if="movie" @close="closeMovie" />

      <div>
        <div
          class="h-full flex flex-col items-center md:grid grid-cols-2 gap-y-[40px] lg:grid grid-cols-2 gap-[50px] gap-y-[80px] 2xl:grid-cols-3 gap-y-[40px] mb-10 mt-10"
        >
          <div
            @click="goSingle(movie.id)"
            v-for="movie in searchedMovies"
            :key="movie.id"
            class="max-w-[440px] h-full flex flex-col cursor-pointer"
          >
            <img
              :src="THUMBNAIL_URL + movie.thumbnail"
              alt=""
              class="w-auto min-h-[336px] max-h-[371px] rounded-xl object-cover"
            />

            <p class="text-white text-[20px] md:text-[24px] mt-[16px]">
              {{ localeStore.locale === "en" ? movie.title.en : movie.title.ka
              }}<span class="ml-2">({{ movie.year }})</span>
            </p>

            <div class="flex items-center mt-[16px]">
              <span class="text-white text-[16px] md:text-[20px] mr-2">{{
                movie.quotes.length
              }}</span>
              <img
                src="@/assets/icons/quote.svg"
                alt=""
                class="w-[32px] h-[29px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import axios from "../config/axios/index.js";
import { onBeforeMount, ref, computed } from "vue";
import router from "../router";
import AddMovie from "./dialogs/AddMovie.vue";

import { Form, Field } from "vee-validate";

import { useMovieStore } from "@/stores/movie.js";
import { useLocaleStore } from "@/stores/locale.js";

const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;

const localeStore = useLocaleStore();

const movieStore = useMovieStore();
const search = ref("");
const enabled = ref(false);
const movie = ref(false);
const movies = ref();
const length = ref(null);

const submitSearch = () => {
  movieStore.movie = false;
};

const addMovie = () => {
  movie.value = true;
};

const enable = () => {
  enabled.value = true;
};
const goSingle = (id) => {
  router.push({ name: "single-movie", params: { id: id } });
};
const refreshPage = () => {
  axios
    .get("movies")
    .then((response) => {
      movies.value = response.data;
      length.value = movies.value.length;
    })
    .catch((error) => {
      console.log(error.response);
    });
};
const searchedMovies = computed(() => {
  return movies.value
    ? movies.value.filter((item) => {
        if (item.title[localeStore.locale].includes(search.value)) {
          return item;
        } else if (search.value === "") {
          return item;
        }
      })
    : [];
});

onBeforeMount(() => {
  refreshPage();
});

const closeMovie = () => {
  movie.value = false;
  refreshPage();
};
</script>
