<template>
  <main class="w-full min-h-[1500px] flex flex-col bg-[#181624] relative">
    <HeaderMain />

    <HeaderSmall />

    <section class="flex h-full justify-start">
      <PersonalDash class="mt-8" />

      <router-view></router-view>
    </section>
  </main>
</template>

<script setup>
import PersonalDash from "../components/PersonalDash.vue";

import HeaderMain from "../components/HeaderMain.vue";

import HeaderSmall from "@/components/HeaderSmall.vue";
</script>
