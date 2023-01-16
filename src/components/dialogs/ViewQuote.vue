<template>
  <div
    class="w-screen h-screen fixed top-0 left-0 backdrop-blur-sm"
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
        class="flex w-full min-w-[80px] max-w-[144px] rounded-md flex items-center justify-center py-[10px] absolute left-2"
      >
        <button
          @click="goSingle"
          class="w-[50%] h-auto flex items-center justify-center border-r border-[#6C757D]-[1px]"
        >
          <img src="@/assets/icons/edit.svg" alt="" />
        </button>

        <button
          @click="handleDelete"
          class="w-[50%] h-auto flex items-center justify-center"
        >
          <img src="@/assets/icons/delete.svg" alt="" />
        </button>
      </div>
      <p class="hidden lg:block">{{ $t("addQuote.view") }}</p>

      <button @click="handleClose" class="absolute lg:top-4 top-[45%] right-4">
        <img src="@/assets/icons/close.svg" alt="" width="14" />
      </button>
    </header>
    <section class="md:px-[32px] py-[30px] h-auto flex flex-col">
      <div class="flex items-center">
        <img
          :src="thumbnail"
          alt=""
          width="52"
          class="rounded-full mr-[16px] w-[40px] md:w-[52px] md:h-[52px] object-cover"
        />
        <p class="text-white text-[20px]">{{ username }}</p>
      </div>
    </section>
    <section class="flex flex-col justify-around md:px-5 mb-10 gap-5">
      <div
        class="bg-[#11101A] border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
      >
        {{ quote_en }}
      </div>
      <div
        class="bg-[#11101A] border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
      >
        {{ quote_ka }}
      </div>
      <div class="w-full">
        <img :src="THUMBNAIL_URL + quote?.thumbnail" alt="" class="w-full" />
      </div>
      <div class="flex">
        <div class="flex">
          <span class="text-white text-[16px] xl:text-[20px]">{{
            comments.length
          }}</span>
          <img
            src="@/assets/icons/comment.svg"
            alt=""
            class="ml-[12px] w-[24px] xl:w-auto"
          />
        </div>
        <div class="flex ml-[20px]">
          <span class="text-white text-[16px] xl:text-[20px]">{{ likes }}</span>
          <img
            src="@/assets/icons/like.svg"
            alt=""
            class="ml-[12px] w-[24px] xl:w-auto"
          />
        </div>
      </div>

      <div class="max-h-[300px] overflow-y-auto">
        <div
          v-for="comment in quote.comments"
          :key="comment"
          class="mt-[24px] flex justify-center"
        >
          <div class="flex items-start">
            <img
              :src="comment.author.thumbnail"
              alt=""
              class="w-[40px] xl:w-[52px] rounded-full mr-[24px]"
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
    </section>
  </dialog>
</template>

<script setup>
import { defineEmits, defineProps, onMounted, ref } from "vue";
import axios from "@/config/axios/index.js";

const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;
const props = defineProps({
  data: Number,
});
const emit = defineEmits(["close", "delete", "goEdit"]);
const handleClose = () => {
  emit("close");
};

const handleDelete = () => {
  emit("delete");
};

const goSingle = () => {
  emit("goEdit");
};
const quote = ref([]);
const quote_en = ref("");
const quote_ka = ref("");
const comments = ref([]);
const likes = ref(typeof Number);

const thumbnail = ref(null);
const username = ref(null);
const getQuote = () => {
  axios
    .get(`quote/${props.data}`)
    .then((response) => {
      quote.value = response.data;
      thumbnail.value = quote.value.author.thumbnail;
      username.value = quote.value.author.username;
      comments.value = quote.value.comments;
      likes.value = quote.value.likes_count;
      quote_en.value = quote.value.quote.en;
      quote_ka.value = quote.value.quote.ka;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

onMounted(() => {
  getQuote();
});
</script>
