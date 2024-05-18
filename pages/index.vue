<script setup>
import { onMounted } from "vue";

// const categories = ref(["shoes", "T-shirt", "cloth", "Jeans"]);
const cat = ref("");

const limit = ref(5);

const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "products",
  () =>
    $fetch(
      `https://fakestoreapi.com/products${
        cat.value ? "/category/" + cat.value : ""
      }${"?limit=" + limit.value}`
    ),
  {
    watch: [cat],
  }
);

const {
  data: categories,
  pending: catP,
  error: catE,
  refresh: catR,
} = await useAsyncData("categories", () =>
  $fetch("https://fakestoreapi.com/products/categories")
);
</script>

<template>
  <div class="index-page">
    <div class="banner"></div>
    <div class="page">
      <aside class="filter">
        {{ cat }}
        <div>
          <h3 class="title-name">Category</h3>
          <ul class="list-container">
            <li
              class="list"
              v-for="category in categories"
              :key="category">
              <input
                type="radio"
                name="category"
                :value="category"
                :id="category"
                v-model="cat" />
              <label :for="category">{{ category }}</label>
            </li>
          </ul>
          <div>
            <h3 class="title-name">Prices</h3>
          </div>
        </div>
      </aside>

      <main
        class="main"
        v-if="products">
        <product
          v-for="product in products"
          :key="product?.id"
          :id="product.id"
          :name="product?.title"
          :category="product?.category"
          :img_url="product?.image"
          :price="product?.price"></product>
      </main>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
  gap: 0.5;
  justify-content: center;
  align-items: center;
}
.filter {
  background-color: white;
  max-height: calc(100vh-10rem);
  min-width: 13rem;
  height: 15rem;
  border-radius: 0.2rem;
  box-shadow: 0 0px 0.01rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: sticky;
  top: 2rem;
}

.index-page {
  width: 100%;
}

.page {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  justify-content: start;
  align-items: start;
  padding: 1rem;
}
.main {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
}
.list {
  list-style: none;
  display: flex;
  flex-direction: row;
  gap: 0.3rem;
  align-items: center;
  color: rgb(112, 128, 144);
}
.list-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.4rem;
}
.title-name {
  color: rgb(100 116 139);
  font-size: medium;
  font-weight: 700;
  padding-bottom: 0.7rem;
}

.banner {
  display: flex;
  max-width: 1920px;
  background-color: blueviolet;
  height: 10rem;
  margin-bottom: 1rem;
}

@media only screen and (max-width: 200px) {
  .main {
    display: grid;
    grid-template-columns: auto !important;
  }

  .filter {
    display: none;
  }
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .main {
    display: grid;
    grid-template-columns: auto auto !important;
  }

  .filter {
    display: none;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) and (max-width: 768px) {
  .main {
    display: grid;
    grid-template-columns: auto auto !important;
  }

  .filter {
    display: none;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 769px) and (max-width: 992px) {
  .main {
    display: grid;
    grid-template-columns: auto auto auto;
  }
  .filter {
    display: none;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 993px) and (max-width: 1200px) {
  .main {
    display: grid;
    grid-template-columns: auto auto !important;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1201px) {
  .main {
    display: grid;
    grid-template-columns: auto auto auto auto;
  }
}
</style>
