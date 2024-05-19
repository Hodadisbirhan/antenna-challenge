<script setup>
useHead({
  title: "antenna-challenge",
  meta: [
    { name: "description", content: "single Page e-commerce application" },
  ],
  link: [
    {
      rel: "icon",
      href: "/e-comm.webp",
    },
  ],
});
</script>
<template>
  <div class="parent">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<style>
*::after,
*::before,
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
body {
  background-color: whitesmoke;
}
.parent {
  width: 100%;
}
</style>
