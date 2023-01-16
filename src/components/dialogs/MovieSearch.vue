<template>
  <div>
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
        <Form @submit="search" class="w-full">
          <Field name="search">
            <div class="relative ml-3">
              <p class="px-1 text-base text-white absolute top-1">
                {{ $t("searchBar.search") }}
              </p>
              <input
                type="text"
                name="search"
                id="search"
                class="w-full bg-transparent"
              />
            </div>
          </Field>
        </Form>
      </header>
      <section class="pt-5 h-auto flex flex-col">
        <div class="px-10 flex flex-col gap-y-5">
          <p class="text-gray-500 text-base">
            {{ $t("searchBar.enter") }}
            <span class="text-white text-base">@</span>
            {{ $t("searchBar.movies") }}
          </p>
          <p class="text-gray-500 text-base">
            {{ $t("searchBar.enter") }}
            <span class="text-white text-base">#</span>
            {{ $t("searchBar.quote") }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { useMovieStore } from "@/stores/movie.js";
import { defineEmits } from "vue";

const emit = defineEmits(["search"]);

const movieStore = useMovieStore();

const search = () => {
  emit("search");
  movieStore.movie = false;
};
</script>
