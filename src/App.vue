<script setup></script>

<template>
  <main
    style="
      background: linear-gradient(
        180deg,
        #11101a 0%,
        #08080d 50.52%,
        rgba(0, 0, 0, 0) 100%
      );
    "
  >
    <RouterView />
  </main>
</template>

<style>
* {
  font-family: "Helvetica", "Neue";
}

::-webkit-scrollbar {
  width: 0.2rem;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}
</style>
