<script setup>
const maxPrice = ref(100);
const minPrice = ref(0);
</script>

<template>
  <div class="slider-wrapper">
    <div class="slider-container">
      <div class="slider-track"></div>
      <input
        type="range"
        name="min"
        :min="0"
        :max="maxPrice"
        v-model="minPrice" />
      <input
        type="range"
        name="max"
        :min="minPrice"
        :max="100"
        v-model="maxPrice" />
    </div>
  </div>
</template>

<style scoped>
.slider-wrapper {
  width: 100%;
  position: relative;
  background-color: white;
}
.slider-container {
  position: relative;
  width: 100%;
}
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  outline: none;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  background-color: transparent;
  pointer-events: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  height: 0.4rem;
}

input[type="range"]::-moz-range-track {
  -webkit-appearance: none;
  height: 0.4rem;
}
input[type="range"]::-ms-track {
  -webkit-appearance: none;
  height: 0.4rem;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  background-color: blueviolet;
  cursor: pointer;
  pointer-events: auto;
  border-radius: 10px;
  margin-top: -3px;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  background-color: blueviolet;
  cursor: pointer;
  border-radius: 50%;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  background-color: blueviolet;
  cursor: pointer;
  border-radius: 50%;
  background-color: blueviolet;
}

input[type="range"]:active::-webkit-slider-thumb {
  background-color: white;
}

.slider-track {
  width: 100%;
  height: 0.4rem;
  background-color: bisque;
  position: absolute;
  top: 0;
  bottom: 0;
  border-radius: 5px;
}
</style>
