<script setup>
//import mulltiSlider from "multi-range-slider-vue";
import "vue-double-range-input/dist/style.css";
import VueDoubleRangeInput from "vue-double-range-input";

const search_value = ref("");
const selected_category = ref("");
const max_price = ref(1000);
const min_price = ref(0);
const filter_contoler = ref(false);
const limit = ref(5);
const offset = ref(0);
const max = ref(1000);
const min = ref(0);

const clear = ref(false);

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
      }`
    ),
  {
    watch: [selected_category],
    lazy: true,
  }
);

const product_list = computed(() => {
  if (max_price.value)
    return products.value?.filter((element) => {
      return (
        element.price >= min_price.value && element.price <= max_price.value
      );
    });

  return products.value;
});

const product_list_with_paginate = computed(() => {
  if (product_list.value?.length >= 1)
    return product_list.value?.slice(offset.value, offset.value + limit.value);

  return product_list.value;
});

// for fetching the category

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

// for filtering category with thier name
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

const updateOffset = (value) => {
  offset.value = value;
};

const select_category = (item) => {
  console.log(item.value);
  selected_category.value = item.value;
};

watch(
  [selected_category, max_price, min_price, limit],
  ([sc, max_p, min_p, lim]) => {
    offset.value = 0;
  }
);
</script>

<template>
  <div class="index-page">
    <div class="banner">
      <h3 class="">Enjoy This E-commerce</h3>
    </div>
    <div class="filter-class">
      <div
        class="icon-container"
        @click="filter_contoler = true">
        <Icon
          class="icon"
          name="material-symbols-light:filter-alt-sharp">
        </Icon>
      </div>

      <div class="data_per_page">
        <label>Data per page</label>
        <select v-model="limit">
          <option
            v-for="i in [5, 10, 15, 20]"
            :key="i"
            :value="i">
            {{ i }}
          </option>
        </select>
      </div>
    </div>
    <div class="page">
      <aside :class="filter_contoler ? 'filter-mobile' : 'filter'">
        <div>
          <div>
            <div class="clear">
              <button
                type="button"
                @click="clearFilter"
                v-if="clear">
                clear
              </button>
            </div>
            <h3 class="title-name">Category</h3>

            <button
              class="x-btn"
              @click="filter_contoler = false">
              X
            </button>
          </div>

          <div class="drop_down">
            <ClientOnly>
              <selectDropDown
                :data="list_category"
                :withSearch="true"
                v-model="search_value"
                @click:item="select_category"
                placeholder="Select Category">
                <template #selectedOption="{ item }">
                  {{ item.value }}
                </template>
                <template #selectedValue="{ item }">
                  {{ item }}
                </template>
              </selectDropDown>
            </ClientOnly>
          </div>

          <div>
            <h3 class="title-name">Prices</h3>
            <ClientOnly>
              <VueDoubleRangeInput
                :min="0"
                :max="1000"
                track-height="4px"
                handler-width="18px"
                handler-height="18px"
                v-model:minValue="min_price"
                v-model:maxValue="max_price"
            /></ClientOnly>
          </div>
        </div>
      </aside>

      <span
        v-if="products_loading"
        class="main">
        <div
          v-for="i in 3"
          :key="i">
          <SkeletonLoading></SkeletonLoading>
        </div>
      </span>

      <div
        v-else-if="product_error"
        class="error-container">
        <Icon
          name="material-symbols-light:error-outline"
          class="error-icon"></Icon>
        <div class="error-message">
          <h2>Error</h2>
          <p>Something went wrong. Please try again later.</p>
        </div>
      </div>

      <main
        class="main"
        v-else="products">
        <product
          v-for="product in product_list_with_paginate"
          :key="product?.id"
          :id="product?.id"
          :name="product?.title"
          :category="product?.category"
          :img_url="product?.image"
          :price="product?.price"
          :rate="product?.rating?.rate"></product>
      </main>
    </div>
    <div
      v-if="product_list_with_paginate?.length < 1"
      class="not-found">
      <p>Product Not Found</p>
    </div>
    <div class="paginate">
      <pagination
        @updateOffset="updateOffset"
        :dataPerPage="limit"
        :offset="offset"
        :totalData="product_list?.length | 0"></pagination>
    </div>
  </div>
</template>

<style scoped>
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
.filter-mobile {
  background-color: white;
  max-height: calc(100vh-25rem);
  min-width: 13rem;
  height: 15rem;
  border-radius: 0.2rem;
  z-index: 4;
  padding: 1rem;
  position: absolute;
  top: 0rem;
  box-shadow: 0 4px 1rem rgba(0, 0, 0, 0.1);
  left: 0.5rem;
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
  position: relative;
}
.main {
  display: grid;

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
  background-image: url("/banner.jpeg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 14rem;
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

.data_per_page {
  display: flex;
  flex-direction: row;
  gap: 0.2rem;

  justify-content: end;
  align-items: center;
}

.filter-class {
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  justify-content: space-between;
  align-items: center;
  padding-right: 3rem;
  padding-left: 1rem;
}

.data_per_page > label {
  font-size: 0.8rem;
  font-weight: 500;
}

.data_per_page > select {
  outline: none;
  border: 0.08rem solid rgb(135, 97, 218);
  border-radius: 0.2rem;
  padding: 0.15rem 0.4rem;
  background-color: whitesmoke;
}

.icon-container {
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  background-color: rgb(226, 216, 237);
  cursor: pointer;
}
.icon-container .icon {
  font-size: 2rem;
  font-weight: 500;
  color: rgb(135, 97, 218);
}

.x-btn {
  font-size: medium;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  border: none;
  border: 1px solid red;
  position: absolute;
  top: 2px;
  right: 2px;
  cursor: pointer;
}

.paginate {
  width: 100%;
  padding: 1rem;
}

.loading-parent {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
}

.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
}

.error-icon {
  font-size: 50px;
  margin-right: 20px;
  color: #d9534f;
}

.error-message h2 {
  margin: 0 0 10px 0;
  color: #d9534f;
}

.error-message p {
  margin: 0;
  color: #333;
}
.not-found {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
}
.clear {
  width: 100%;
  display: flex;
  justify-content: end;
}

.clear button {
  font-size: small;
  font-weight: 500;
  border: none;
  outline: none;
  padding: 0.3rem 0.5rem;
  border-radius: 1rem;
  background-color: #ec807c;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .filter {
    display: none;
  }
}
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .filter {
    display: none;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 601px) and (max-width: 768px) {
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .filter {
    display: none;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 769px) and (max-width: 992px) {
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .filter {
    display: none;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 993px) and (max-width: 1200px) {
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .icon-container {
    display: none;
  }
  .filter-class {
    justify-content: end;
  }
  .filter-mobile {
    position: sticky;
    top: 4rem;
    overflow-y: auto;
  }
  .x-btn {
    display: none;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1201px) {
  .main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
  .icon-container {
    display: none;
  }
  .filter-class {
    justify-content: end;
  }
  .filter-mobile {
    position: sticky;
    top: 4rem;
    overflow-y: auto;
  }
  .x-btn {
    display: none;
  }
}
</style>
