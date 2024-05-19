<script setup>
useHead({
  title: "Antenna-Challenge",
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
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
}
body {
  background-color: whitesmoke;
}
.parent {
  width: 100%;
}
</style>
