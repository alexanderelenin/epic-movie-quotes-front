<template>
  <Form v-slot="{ handleSubmit }">
    <Field name="comment" rules="required" v-model="comment" v-slot="{ field }">
      <div class="flex mt-[24px] relative">
        <img
          :src="thumbnail"
          alt=""
          width="52"
          height="52"
          class="rounded-full w-[52px] h-[52px] object-cover"
        />

        <textarea
          @keypress.enter.prevent="handleSubmit($event, postComment)"
          v-bind="field"
          name="comment"
          id="comment"
          cols="30"
          rows="2"
          :placeholder="$t('eachComment.new_comment')"
          class="w-full bg-[#24222F] min-h-[60px] h-auto outline-none ml-[16px] text-white text-[16px] md:text-[20px] px-2 rounded-lg overflow-hidden resize-none"
        ></textarea>
      </div>
    </Field>
  </Form>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import { onMounted, ref, defineProps, computed } from "vue";
import router from "../router";
import axiosInstance from "../config/axios/jwt-axios.js";
import axios from "../config/axios/index.js";
import { useCommentStore } from "../stores/comment.js";
import { useProfileStore } from "@/stores/profile.js";

const profileStore = useProfileStore();
const commentStore = useCommentStore();
const props = defineProps({
  id: Number,
  author: Number,
});

const quote_id = ref(typeof Number);
const user = ref("");
const comment = ref("");
const username = ref("");
const thumbnail = computed(() => {
  return profileStore.photo;
});

onMounted(() => {
  axiosInstance
    .get("me")
    .then((response) => {
      user.value = response.data.user.id;

      quote_id.value = props.id;
      username.value = response.data.user.username;
    })
    .catch((error) => {
      console.log(error);
    });
});

const postComment = (values, actions) => {
  axios
    .post(`quotes/${quote_id.value}/comments`, {
      body: values.comment,
      user_id: user.value,
      quote_id: quote_id.value,
      quote_author: props.author,
      type: "comment",
    })
    .then(() => {
      router.replace("/");
      commentStore.comments.push({
        body: values.comment,
        username: username.value,
      });
      comment.value = "";
    })
    .catch((error) => {
      const errors = error.response.data.errors;
      for (const key in errors) {
        actions.setFieldError(key, errors[key]);
      }
    });
};
</script>
