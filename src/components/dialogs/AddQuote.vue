<template>
  <div
    class="w-full h-screen fixed top-0 left-0 backdrop-blur-sm"
    @click="handleClose"
  ></div>
  <dialog
    open
    class="w-full sm:w-[500px] lg:w-[600px] 2xl:w-[960px] bg-[#11101A] pb-10 h-auto z-20 rounded-xl absolute top-0 md:top-[80px]"
  >
    <header
      class="relative text-white text-[20px] h-[92px] flex justify-center items-center border-b border-[#EFEFEF]-[0.5px]"
    >
      <p>{{ $t("singleMovie.add_quote") }}</p>

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
          class="rounded-full mr-[16px] w-[40px] h-[40px] md:h-[52px] md:w-[52px] object-cover"
        />
        <p class="text-white text-[20px]">{{ user }}</p>
      </div>
    </section>
    <div class="md:px-[35px]">
      <div
        class="w-full h-full lg:mb-[60px] mb-10 flex flex-row justify-start items-center bg-black md:bg-transparent p-2 rounded-lg"
      >
        <div class="w-auto md:w-[50%] lg:w-auto">
          <img
            :src="THUMBNAIL_URL + props.data?.thumbnail"
            alt=""
            class="w-[112px] md:w-[290px] h-[82px] md:h-[160px] rounded-xl object-cover"
          />
        </div>

        <div
          class="w-[50%] flex flex-grow flex-col justify-center md:gap-y-5 ml-[20px] lg:items-start w-full"
        >
          <div class="flex justify-between lg:mt-0 w-auto">
            <h1 class="text-[#DDCCAA] text-[16px] 2xl:text-[24px] font-bold">
              {{
                localeStore.locale === "en"
                  ? props.data.title.en
                  : props.data.title.ka
              }}
              <span class="text-[#DDCCAA] text-[16px] xl:text-[24px]"
                >({{ props.data.year }})</span
              >
            </h1>
          </div>
          <div class="flex w-auto h-auto">
            <p
              v-for="gen of props.data.genre"
              :key="gen"
              class="px-[12px] py-[6px] bg-[#6C757D] rounded-md text-white font-bold capitalize inline-block"
            >
              {{ gen }}
            </p>
          </div>
          <div class="flex whitespace-wrap">
            <h1 class="text-white text-[16px]">
              {{ $t("singleMovie.director") }}
              <span class="font-bold ml-2 text-[16px]">{{
                localeStore.locale === "en"
                  ? props.data.director.en
                  : props.data.director.ka
              }}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
    <Form
      @submit="storeQuote"
      class="flex flex-col justify-around md:px-[35px] gap-5"
    >
      <div class="relative">
        <Field
          v-slot="{ field, meta }"
          rules="required|description_en|min:5|max:500"
          name="quote_en"
          id="quote_en"
          v-model="engDes"
        >
          <label
            v-if="engDes.length === 0"
            for="qupote"
            class="text-white text-[16px] md:text-[20px] italic absolute top-0 px-3"
            >"Quote in English"</label
          >
          <textarea
            name="quote_en"
            id="quote_en"
            v-bind="field"
            cols="30"
            rows="2"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-[#11101A] w-full border border-[#6C757D]-1 h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          ></textarea>
        </Field>
      </div>
      <div class="relative">
        <Field
          name="quote_ka"
          rules="required|description_ka|min:5|max:500"
          v-slot="{ field, meta }"
          v-model="geoDes"
        >
          <label
            v-if="geoDes.length === 0"
            for="quote_ka"
            class="text-white text-[16px] md:text-[20px] italic absolute top-0 px-3"
            >"ციტატა ქართულად"</label
          >
          <textarea
            name="quote_ka"
            id="quote_ka"
            v-bind="field"
            cols="30"
            rows="2"
            :class="[
              !meta.valid && meta.touched ? 'border-1 border-[#DC3545]' : '',
              meta.valid && meta.touched ? 'border-1  border-[#198754]' : '',
            ]"
            class="bg-[#11101A] border border-[#6C757D]-1 w-full h-[80px] text-white text-[16px] md:text-[20px] px-2 rounded-md"
          ></textarea>
        </Field>
      </div>

      <DropZone
        @drop.prevent="drop"
        @change="selectedFile"
        @fileName="dropzoneFile"
      />

      <button
        type="submit"
        class="w-full bg-[#E31221] h-[50px] text-white rounded-md"
      >
        {{ $t("singleMovie.add_quote") }}
      </button>
    </Form>
  </dialog>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import axios from "../../config/axios/index.js";
import router from "../../router";
import { defineEmits, ref, computed } from "vue";
import { defineProps } from "vue";
import { useLocaleStore } from "@/stores/locale.js";
import { useProfileStore } from "@/stores/profile.js";
import DropZone from "@/components/DropZone.vue";
import { useDropStore } from "@/stores/drop.js";

const dropStore = useDropStore();
const profileStore = useProfileStore();

const user = computed(() => {
  return profileStore.username;
});

const THUMBNAIL_URL = import.meta.env.VITE_THUMBNAIL_URL;

const photo = computed(() => {
  return profileStore.photo;
});

const localeStore = useLocaleStore();

const props = defineProps({
  data: Object,
});
const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
  dropStore.drop = "";
};
const header = {
  headers: { "Content-Type": "multipart/form-data" },
};

const engDes = ref("");
const geoDes = ref("");

let dropzoneFile = ref("");
const drop = (e) => {
  dropStore.drop = e.dataTransfer.files[0];
};
const selectedFile = () => {
  dropStore.drop = document.querySelector("#file").files[0];
};

const storeQuote = (values, actions) => {
  axios
    .post(
      "store-quote",
      {
        quote_en: values.quote_en,
        quote_ka: values.quote_ka,
        thumbnail: dropStore.drop,
        movie_id: props.data.id,
      },
      header
    )
    .then(() => {
      emit("close");
      dropStore.drop = "";
      router.push(`/movie-list/movie/${props.data.id}`);
    })
    .catch((error) => {
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};
</script>
