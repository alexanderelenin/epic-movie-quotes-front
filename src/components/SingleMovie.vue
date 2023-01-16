<template>
  <EditMovie v-if="edit" @close="closeEdit" />
  <DeleteMovie v-if="remove" @close="closeDelete" />

  <AddQuote v-if="addQuote" :data="movie" @close="closeAddQuote" />
  <section class="w-auto lg:w-full h-full py-4 2xl:pl-16 md:px-10 pb-10">
    <div class="bg-[#181624] rounded-xl px-[24px] mb-[40px]">
      <div class="flex mb-[56px] mt-5">
        <div class="flex flex-col md:flex-row w-full">
          <h1 class="text-white text-[20px] md:text-[24px] mr-2">
            {{ $t("singleMovie.movie_description") }}
          </h1>
        </div>
      </div>

      <div class="h-full">
        <div class="h-full flex flex-col mb-10 mt-10">
          <div class="w-auto h-full lg:mb-[60px] flex flex-col lg:flex-row">
            <div class="w-full lg:w-[50%] xl:w-[60%]">
              <img
                :src="THUMBNAIL_URL + movie?.thumbnail"
                alt=""
                class="w-full min-h-[336px] max-h-[441px] max-w-[880px] rounded-xl object-cover"
              />
            </div>

            <div
              class="flex flex-grow flex-col lg:ml-[21px] w-full lg:w-[50%] xl:w-[40%]"
            >
              <div class="flex justify-between mt-5 lg:mt-0 w-auto">
                <h1
                  class="text-[#DDCCAA] text-[20px] 2xl:text-[24px] font-bold"
                >
                  {{ localeStore.locale === "en" ? title_en : title_ka }}
                  <span class="text-[#DDCCAA] text-[20px] xl:text-[24px]"
                    >({{ movie.year }})</span
                  >
                </h1>

                <div
                  class="flex w-[144px] rounded-md bg-[#24222F] flex items-center justify-center py-[10px]"
                >
                  <button
                    @click="openEdit"
                    class="w-[50%] h-auto flex items-center justify-center border-r border-[#6C757D]-[1px]"
                  >
                    <img src="@/assets/icons/edit.svg" alt="" />
                  </button>

                  <button
                    @click="openDelete"
                    class="w-[50%] h-auto flex items-center justify-center"
                  >
                    <img src="@/assets/icons/delete.svg" alt="" />
                  </button>
                </div>
              </div>
              <div class="flex flex-wrap gap-3 w-auto h-auto mt-[24px]">
                <p
                  v-for="gen of movie.genre"
                  :key="gen"
                  class="px-[12px] mx-2 py-[6px] bg-[#6C757D] rounded-md text-white font-bold capitalize inline-block"
                >
                  {{ gen }}
                </p>
              </div>
              <div class="mt-[20px] px-2">
                <h1 class="text-white text-[20px]">
                  {{ $t("singleMovie.director") }}
                  <span class="font-bold ml-2">{{
                    localeStore.locale === "en" ? director_en : director_ka
                  }}</span>
                </h1>
              </div>

              <div class="mt-[20px] px-2">
                <p class="text-white text-[18px] h-full max-w-[578px]">
                  {{
                    localeStore.locale === "en"
                      ? description_en
                      : description_ka
                  }}
                </p>
              </div>
            </div>
          </div>

          <div class="flex items-center mt-5 lg:mt-0">
            <p
              class="text-white text-[20px] pr-[16px] border-r border-[#6C757D]"
            >
              {{ $t("singleMovie.quotes") }} ({{ $t("singleMovie.total") }}
              {{ quotes.length }})
            </p>
            <button
              @click="openAddQuote"
              class="flex items-center ml-[16px] max-h-[50px] justify-center bg-[#E31221] hover:bg-[#CC0E10] active:bg-[#B80D0F] px-[25px] py-[11px] rounded-md"
            >
              <img src="@/assets/icons/plus.svg" alt="" class="w-[16px]" />
              <p
                class="text-white text-[16px] whitespace-nowrap ml-[8px] 2xl:text-[20px]"
              >
                {{ $t("singleMovie.add_quote") }}
              </p>
            </button>
          </div>
        </div>
      </div>
      <EditQuote
        v-if="editMain"
        :data="quoteID"
        @delete="deleteQuote(quoteID)"
        @close="closeEditQuote"
      />
      <ViewQuote
        v-if="quoteMain"
        @close="closeQuote"
        :data="quoteID"
        @delete="deleteQuote(quoteID)"
        @goEdit="goEdit"
      />
      <div
        class="w-full lg:w-full my-10"
        v-for="quote in quotes"
        :key="quote.id"
      >
        <div
          :key="quote.id"
          class="max-w-[880px] bg-[#11101A] px-[32px] py-[24px] rounded-lg relative"
        >
          <div>
            <div
              v-if="menuID === quote.id"
              class="w-full h-screen fixed top-0 left-0 backdrop-none"
              @click="menuID = null"
            ></div>
            <div>
              <button
                @click="setMenu(quote.id)"
                class="absolute top-2 right-2 lg:absolute lg:right-[20px] lg:top-[20px]"
              >
                <img src="@/assets/icons/else.svg" alt="else" class="p-2" />
              </button>
              <section
                @blur="menu = false"
                v-if="menuID === quote.id"
                class="bg-[#24222F] rounded-lg w-full max-w-[250px] max-h-[200px] absolute top-12 right-1 z-20 flex flex-col gap-y-[32px] justify-center items-center p-[32px] pl-[40px]"
              >
                <button
                  @click="openQuote(quote.id)"
                  class="flex justify-start items-center w-full"
                >
                  <img src="@/assets/icons/eye.svg" alt="eye" />
                  <p class="text-white text-[20px] ml-4">
                    {{ $t("quoteMenu.view") }}
                  </p>
                </button>
                <button
                  @click="goSingle(quote.id)"
                  class="flex items-center h-auto w-full"
                >
                  <img src="@/assets/icons/edit.svg" alt="edit" />
                  <p class="text-white text-[20px] ml-4">
                    {{ $t("quoteMenu.edit") }}
                  </p>
                </button>
                <button
                  @click="deleteQuote(quote.id)"
                  class="flex items-center h-auto w-full"
                >
                  <img src="@/assets/icons/delete.svg" alt="delete" />
                  <p class="text-white text-[20px] ml-4">
                    {{ $t("quoteMenu.delete") }}
                  </p>
                </button>
              </section>
            </div>
          </div>

          <div
            class="flex mt-4 md:mt-0 flex-col md:flex-row justify-start items-center object-fit border-b border-[#EFEFEF]-[0.5px] pb-[24px]"
          >
            <img
              :src="THUMBNAIL_URL + quote?.thumbnail"
              class="w-full h-auto max-w-[226px] max-h-[140px] object-cover rounded-lg"
              alt="quote"
            />
            <p
              class="mt-3 text-center md:mt-0 text-white text-[24px] italic md:ml-[34px] py-2"
            >
              "{{
                localeStore.locale === "en" ? quote.quote.en : quote.quote.ka
              }}"
            </p>
          </div>
          <div class="flex mt-[24px]">
            <div class="flex">
              <span class="text-white text-[16px] xl:text-[20px]">{{
                quote.comments.length
              }}</span>
              <img
                src="@/assets/icons/comment.svg"
                alt=""
                class="ml-[12px] w-[24px] xl:w-auto"
              />
            </div>
            <div class="flex ml-[20px]">
              <span class="text-white text-[16px] xl:text-[20px]">{{
                quote.likes_count
              }}</span>
              <img
                src="@/assets/icons/like.svg"
                alt=""
                class="ml-[12px] w-[24px] xl:w-auto"
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import EditMovie from "@/components/dialogs/EditMovie.vue";
import DeleteMovie from "@/components/dialogs/DeleteMovie.vue";
import ViewQuote from "./dialogs/ViewQuote.vue";
import EditQuote from "@/components/dialogs/EditQuote.vue";
import AddQuote from "@/components/dialogs/AddQuote.vue";
import router from "../router";
import { useLocaleStore } from "@/stores/locale.js";

const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;
const localeStore = useLocaleStore();

const movie = ref([]);
const id = useRoute().params.id;
const menuID = ref();
const edit = ref(false);
const remove = ref(false);
const quoteMain = ref(false);
const addQuote = ref(false);
const quotes = ref([]);

const title_en = ref("");
const title_ka = ref("");
const director_en = ref("");
const director_ka = ref("");
const description_en = ref("");
const description_ka = ref("");
const editMain = ref(false);
const quoteID = ref();

const setQuoteID = (value) => {
  quoteID.value = value;
};

const setMenu = (value) => {
  menuID.value = value;
};

const openAddQuote = () => {
  addQuote.value = true;
};

const closeAddQuote = () => {
  addQuote.value = false;
  getMovie();
};
const openQuote = (value) => {
  quoteMain.value = true;
  setQuoteID(value);
  menuID.value = null;
};

const closeQuote = () => {
  quoteMain.value = false;
};

const goSingle = (value) => {
  editMain.value = true;
  setQuoteID(value);
  menuID.value = null;
};
const openEdit = () => {
  edit.value = true;
};
const openDelete = () => {
  remove.value = true;
};

const closeEdit = () => {
  edit.value = false;
};
const closeDelete = () => {
  remove.value = false;
};

const closeEditQuote = () => {
  editMain.value = false;
  getMovie();
};
const goEdit = () => {
  quoteMain.value = false;
  editMain.value = true;
};
const getMovie = () => {
  axios
    .get(`movie/${id}`)
    .then((response) => {
      movie.value = response.data[0];
      quotes.value = response.data.quotes;
      title_en.value = movie.value.title.en;
      title_ka.value = movie.value.title.ka;
      director_en.value = movie.value.director.en;
      director_ka.value = movie.value.director.ka;
      description_en.value = movie.value.description.en;
      description_ka.value = movie.value.description.ka;
    })
    .catch((error) => {
      console.log(error.response);
      router.push({ name: "dash" });
    });
};

const deleteQuote = (value, actions) => {
  axios
    .post(`delete-quote/${value}`)
    .then(() => {
      router.replace(`/movie-list/movie/${id}`);
      quoteMain.value = false;
      getMovie();
    })
    .catch((error) => {
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};

onMounted(() => {
  getMovie();
});
</script>
