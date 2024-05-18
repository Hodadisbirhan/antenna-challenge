<script setup>
// const categories = ref(["shoes", "T-shirt", "cloth", "Jeans"]);
const cat = ref("jewelery");

const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "products",
  () => $fetch(`https://fakestoreapi.com/products/category/${cat.value}`),
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

const click = () => {
  cat.value = "electronics";
  // refresh();
};
</script>

<template>
  <div class="page">
    {{ cat }}
    <aside class="filter">
      <div>
        <h3 class="title-name">Category</h3>
        <ul class="list-container">
          <!-- <li
            class="list"
            v-for="category in categories"
            :key="category">
            <input
              type="checkbox"
              :value="category"
              :id="category"
              v-model="cat" />
            <label :for="category">{{ category }}</label>
          </li> -->
        </ul>
        <div>
          <h3 class="title-name">Prices</h3>
          <input type="range" />
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
    <button @click="click">e</button>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.filter {
  background-color: white;
  max-height: calc(100vh-10rem);
  min-height: 10rem;

  border-radius: 0.2rem;
  box-shadow: 0 0px 0.01rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: sticky;
  top: 0;
}
.page {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  width: 100%;
  justify-content: start;
  align-items: start;
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
/* 
@media screen and (min-width: 700px) {
  .main {
    margin-left: 13rem;
  }
} */
</style>
