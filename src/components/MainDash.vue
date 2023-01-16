<template>
  <NewQuote v-if="quote" @close="handleClose" />
  <section class="w-[100%] lg:w-[50%] pb-10 h-full relative md:mx-[5%] mt-5">
    <div class="xl:flex w-full mb-[16px] items-center">
      <SearchBar v-if="searchStore.search === true" @search="search" />
      <div class="flex items-center justify-start">
        <button
          @click="newQuote"
          class="flex justify-center items-center pl-4 md:pl-[70px] lg:px-[16px] py-[11px] lg:bg-[#24222F] hover:bg-gray-600 rounded-xl lg:mr-[32px] lg:w-[218px]"
        >
          <img src="@/assets/icons/create.svg" alt="" />
          <p
            class="text-[16px] xl:text-[20px] text-white font-400 ml-[14px] w-full whitespace-nowrap"
          >
            {{ $t("newQuote.write_new") }}
          </p>
        </button>
      </div>

      <div class="hidden lg:block flex-grow border-b border-white-[2px]">
        <div
          :class="localeStore.locale === 'ka' ? 'overflow-hidden' : ''"
          class="flex items-center bg-[#191725] h-[52px] relative"
        >
          <img src="@/assets/icons/lupa.svg" width="20" alt="" />
          <label
            v-if="!valueStore.value"
            for="search"
            :class="localeStore.locale === 'ka' ? 'overflow-hidden' : ''"
            class="text-gray-500 text-[16px] 2xl:text-[20px] w-full whitespace-nowrap ml-3 hover:cursor-pointer absolute top-3 left-6"
            >{{ $t("searchBar.enter") }} <span class="text-white">@</span>
            {{ $t("searchBar.movies") }}, {{ $t("searchBar.enter") }}
            <span class="text-white">#</span>
            {{ $t("searchBar.quotes") }}</label
          >
          <input
            @keypress="search"
            id="search"
            name="search"
            v-model="valueStore.value"
            type="text"
            class="h-[30px] bg-[#191725] w-full ml-[16px] outline-none text-white text-[20px]"
          />
        </div>
      </div>
    </div>

    <div>
      <div
        v-for="quote in quotes"
        :key="quote"
        class="bg-[#11101A] rounded-xl p-[24px] mb-[80px]"
      >
        <div class="flex items-center mb-[16px]">
          <img
            :src="quote?.author?.thumbnail"
            alt=""
            class="rounded-full w-[40px] h-[40px] xl:w-[52px] xl:h-[52px] object-cover"
          />
          <h1 class="text-white ml-[16px] text-[16px] xl:text-[20px]">
            {{ quote?.author?.username }}
          </h1>
        </div>

        <p class="text-white text-[16px] xl:text-[20px] mb-[28px]">
          "{{
            localeStore.locale === "en" ? quote?.quote?.en : quote?.quote?.ka
          }}"<span class="ml-2"></span>-
          <span class="text-[#DDCCAA] text-[16px] xl:text-[20px]">{{
            localeStore.locale === "en"
              ? quote?.movie?.title?.en
              : quote?.movie?.title?.ka
          }}</span
          >.
          <span class="text-white xl:text-[20px]"
            >({{ quote?.movie?.year }})</span
          >
        </p>
        <div class="flex justify-center">
          <img
            :src="THUMBNAIL_URL + quote?.thumbnail"
            alt=""
            class="rounded-lg w-full"
          />
        </div>

        <div class="flex mt-[24px] border-b border-[#efefef4d] pb-[24px]">
          <button @click="likeQuote(quote)" class="flex mr-[24px]">
            <span class="text-white text-[16px] xl:text-[20px]">{{
              quote?.likes_count
            }}</span>

            <LikeComponent :isLiked="like(quote)" class="ml-[12px]" />
          </button>
          <div class="flex">
            <span class="text-white text-[16px] xl:text-[20px]">{{
              quote?.comments?.length
            }}</span>
            <img
              src="@/assets/icons/comment.svg"
              alt=""
              class="ml-[12px] w-[24px] xl:w-auto"
            />
          </div>
        </div>
        <div class="max-h-[400px] overflow-y-auto">
          <div
            v-for="comment in quote.comments"
            :key="comment"
            class="mt-[24px] flex justify-center h-auto"
          >
            <div class="flex items-start">
              <img
                :src="comment.author.thumbnail"
                alt=""
                class="w-[40px] h-[40px] xl:w-[52px] xl:h-[52px] object-cover rounded-full mr-[24px]"
              />
            </div>
            <div class="flex flex-col w-full">
              <p class="text-white text-[16px] xl:text-[20px] font-semibold">
                {{ comment.author.username }}
              </p>
              <p
                class="text-white text-[16px] xl:text-[20px] border-b border-[#efefef4d] pb-[24px] w-full mt-4"
              >
                {{ comment.body }}
              </p>
            </div>
          </div>
        </div>

        <EachComment
          @refresh="getQuotes"
          :id="quote?.id"
          :author="quote?.author?.id"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";

import router from "../router";
import NewQuote from "./dialogs/NewQuote.vue";
import EachComment from "./EachComment.vue";
import LikeComponent from "./LikeComponent.vue";

import axios from "../config/axios/index.js";
import axiosInstance from "../config/axios/jwt-axios.js";
import { useCountStore } from "@/stores/count.js";
import { useValueStore } from "@/stores/value.js";
import { useSearchStore } from "@/stores/search.js";
import { useLocaleStore } from "@/stores/locale.js";
import SearchBar from "@/components/dialogs/SearchBar.vue";

const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;
const localeStore = useLocaleStore();
const searchStore = useSearchStore();
const valueStore = useValueStore();

const countStore = useCountStore();
const user = ref("");
const liked = ref(false);
const quote = ref(false);

function like(value) {
  const active = ref(false);
  if (value.likes) {
    value.likes.forEach((like) => {
      if (like.author.id === user.value && like.quote_id === value.id) {
        active.value = true;
      }
    });
  }
  return active.value;
}

const newQuote = () => {
  quote.value = true;
};

const quotes = ref([]);

const getQuotes = () => {
  axios
    .get(`quotes`)
    .then((response) => {
      quotes.value = response.data.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const handleClose = () => {
  quote.value = false;
  getQuotes();
};

const load = () => {
  axios
    .get(`quotes?page=${countStore.count++}`)
    .then((response) => {
      quotes.value = quotes.value.concat(response.data.data);
    })
    .catch((error) => {
      console.log(error.response);
    });
};
onMounted(() => {
  axiosInstance
    .get("me")
    .then((response) => {
      user.value = response.data.user.id;
    })
    .catch((error) => {
      console.log(error.response);
    });
});

const likeQuote = (value) => {
  axios
    .post(
      `quotes/${value}`,
      {
        quote_id: value.id,
        user_id: user.value,
        quote_author: value.author.id,
        type: "like",
      },
      (liked.value = !liked.value)
    )
    .then(() => {
      router.replace("/");
    });
};

const search = () => {
  axios
    .post("quote-search", {
      search: valueStore.value,
    })
    .then((res) => {
      quotes.value = res.data;
    });
};

window.onscroll = function () {
  if (
    Math.ceil(window.innerHeight + window.scrollY) >=
    Math.round(document.body.clientHeight)
  ) {
    load();
  }
};

// scroll();
const refresh = () => {
  axios
    .post(`refresh`, {
      number: quotes.value.length,
    })
    .then((response) => {
      quotes.value = response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

onMounted(() => {
  getQuotes();
});
window.Echo.channel("like-channel").listen(".new-like", () => {
  refresh();
});
window.Echo.channel("comment-channel").listen(".new-comment", () => {
  refresh();
});
</script>
