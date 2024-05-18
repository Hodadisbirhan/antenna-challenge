<script setup>
const props = defineProps({
  id: { type: [String, Number] },
  name: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  img_url: {
    type: [String],
    required: true,
  },
  price: {
    type: [Number, String],
  },
});
</script>

<template>
  <div class="card">
    <div class="image-container">
      <NuxtImg
        class="img"
        :src="img_url"
        :alt="name"></NuxtImg>
    </div>
    <hr class="hline" />
    <div class="text-section">
      <div>
        <h3 class="category">{{ category }}</h3>
        <p class="product-name">{{ name }}</p>
      </div>
      <div class="card-bottom">
        <b>${{ price }}</b>

        <button class="btn">Add To Cart</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 12rem;
  min-height: 20rem;
  background-color: white;
  align-items: center;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 0px 0.01rem rgba(0, 0, 0, 0.1);
  transition-duration: 700ms;
  transition-property: all;
}
.card:hover {
  box-shadow: 0 4px 1rem rgba(0, 0, 0, 0.1);
}
.image-container {
  width: 100%;
  height: 60%;
  display: flex;
  justify-items: center;
  justify-content: center;
  padding: 0rem 0.1rem;
}
.img {
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 10rem;
}
.hline {
  width: 100%;
  opacity: 20%;
}

.text-section {
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 0.5rem;
  padding: 0rem 1rem;
  height: 100%;
  flex-grow: 1;

  justify-content: space-between;
}
.card-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.4rem 0.5rem;
  background-color: rgb(103, 103, 220);
  color: white;
  border: none;
  font-size: small;
  font-weight: 700;
  border-radius: 0.3rem;
  cursor: pointer;
}
.category {
  color: rgb(203 213 225);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 0.4rem;
}
.product-name {
  width: 100%;
  word-break: break-all;
  color: rgb(112, 128, 144);
  font-size: 0.9rem;
  font-weight: 500;
  text-justify: inter-ideograph;
}
</style>
