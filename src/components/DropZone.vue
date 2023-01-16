<template>
  <label
    for="file"
    @dragenter.prevent
    @dragleave.prevent
    @dragover.prevent
    @drop.prevent
    class="flex items-center relative w-full z-40 h-[60px] border border-gray-500 rounded-md px-2 py-3"
  >
    <div v-if="dropStore.drop === ''" class="flex items-center">
      <img src="@/assets/icons/photo.svg" alt="" />
      <p class="text-[16px] text-white ml-1 md:hidden whitespace-nowrap">
        {{ $t("newQuote.upload") }}
      </p>
      <label
        for="file"
        class="text-white whitespace-nowrap mx-2 hidden md:block"
        >{{ $t("newQuote.drag") }}</label
      >
      <label
        for="file"
        class="px-3 text-white cursor-pointer ml-3 text-base whitespace-nowrap bg-[#9747ff] xl:whitespace-nowrap py-3 px-2 rounded-md"
      >
        {{ $t("newQuote.choose") }}
      </label>
    </div>
    <p
      v-if="dropStore.drop !== ''"
      class="text-white text-[20px] lg:whitespace-nowrap"
    >
      {{ dropStore.drop.name }}
    </p>

    <Field type="file" class="invisible" id="file" name="image" />
    <ErrorMessage
      class="text-red-500 absolute top-16 left-[-17px] border-red-500"
      name="file"
    />
  </label>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

import { useDropStore } from "@/stores/drop.js";

const dropStore = useDropStore();
</script>
