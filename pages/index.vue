<script setup>
import mulltiSlider from "multi-range-slider-vue";

const search_value = ref("");
const selected_category = ref("");
const max_price = ref(100);
const min_price = ref(10);

const limit = ref(10);

const {
  data: products,
  pending: products_loading,
  error: product_error,
  refresh: product_refetch,
} = await useAsyncData(
  "products",
  () =>
    $fetch(
      `https://fakestoreapi.com/products${
        selected_category.value ? "/category/" + selected_category.value : ""
      }${"?offset=" + limit.value}`
    ),
  {
    watch: [selected_category],
    lazy: true,
  }
);

const product_list = computed(() => {
  if (min_price.value && max_price.value)
    return products.value?.filter((element) => {
      return (
        element.price >= min_price.value && element.price <= max_price.value
      );
    });

  return products;
});

const {
  data: categories,
  pending: catP,
  error: catE,
  refresh: catR,
} = await useAsyncData(
  "categories",
  () => $fetch("https://fakestoreapi.com/products/categories"),
  {
    lazy: true,
  }
);

const list_category = computed(() => {
  if (search_value.value)
    return categories.value
      ?.filter((element) => {
        return element?.includes(search_value.value.toLowerCase());
      })
      .map((element) => {
        return { value: element };
      });
  return categories.value?.map((element) => {
    return { value: element };
  });
});

const select_category = (item) => {
  selected_category.value = item.value;
};
</script>

<template>
  <div class="index-page">
    <div class="banner">
      <h3 class="">Enjoy This E-commerce</h3>
    </div>
    <div class="page">
      <aside class="filter">
        <div>
          <h3 class="title-name">Category</h3>
          <div class="drop_down">
            <selectDropDown
              :data="list_category"
              :withSearch="true"
              v-model="search_value"
              @click:item="select_category"
              placeholder="Select Category">
              <template #selectedOption="{ item }">
                {{ item.value }}
              </template>
              <template #selectedValue="{ item }"> {{ item }} </template>
            </selectDropDown>
          </div>

          <div>
            <h3 class="title-name">Prices</h3>
            <mulltiSlider
              :max="100"
              :min="0"
              style="background-color: white; box-shadow: none; border: none">
            </mulltiSlider>
          </div>
        </div>
      </aside>
      <span v-if="products_loading">loading</span>
      <main
        class="main"
        v-else="products">
        <product
          v-for="product in product_list"
          :key="product?.id"
          :id="product.id"
          :name="product?.title"
          :category="product?.category"
          :img_url="product?.image"
          :price="product?.price"></product>
      </main>
    </div>
    <pagination
      :dataPerPage="5"
      :totalData="50"></pagination>
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
  top: 4rem;
  overflow-y: auto;
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
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
}

.drop_down {
  width: 100%;
  margin-bottom: 2rem;
}

.banner h3 {
  font-size: xx-large;
  font-weight: bolder;
  color: white;
}

@media only screen and (max-width: 300px) {
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
