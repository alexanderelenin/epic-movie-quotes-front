<template>
  <div class="w-screen h-full fixed top-0 left-0" @click="$emit('close')"></div>
  <div
    class="fixed lg:hidden px-2 right-0 w-full h-[600px] md:h-[800px] top-0 righ h-auto 2xl:w-[960px] bg-[#12101A] h-auto z-20 rounded-xl"
  >
    <header
      class="relative flex text-white text-[20px] h-[92px] flex items-center border-b border-[#EFEFEF] px-2"
    >
      <button @click="searchStore.search = false">
        <img src="@/assets/icons/back.svg" alt="" />
      </button>
      <Form @submit="search" class="w-full">
        <Field name="search">
          <div class="relative ml-3">
            <p
              v-if="valueStore.value < 1"
              class="px-1 text-base text-white absolute top-1"
            >
              {{ $t("searchBar.search") }}
            </p>
            <input
              type="text"
              name="search"
              id="search"
              class="w-full bg-transparent"
              v-model="valueStore.value"
            />
          </div>
        </Field>
      </Form>
    </header>
    <section v-if="searchValue.length < 1" class="pt-5 h-auto flex flex-col">
      <div class="px-10 flex flex-col gap-y-5">
        <p class="text-gray-500 text-base">
          {{ $t("searchBar.enter") }}
          <span class="text-white text-base">@</span>
          {{ $t("searchBar.movies") }}
        </p>
        <p class="text-gray-500 text-base">
          {{ $t("searchBar.enter") }}
          <span class="text-white text-base">#</span>
          {{ $t("searchBar.quotes") }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { useSearchStore } from "@/stores/search.js";
import { ref, defineEmits } from "vue";
import { useValueStore } from "@/stores/value.js";

const emit = defineEmits(["search"]);

const search = () => {
  emit("search");
  searchStore.search = false;
};

const valueStore = useValueStore();

const searchStore = useSearchStore();
const searchValue = ref("");
</script>
