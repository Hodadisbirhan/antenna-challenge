<script setup>
import { useCartStore } from "~/store/useCartStore";

const store = useCartStore();
const route = useRoute();
const message = ref("");
const show = ref(false);
const {
  data: product,
  pending: is_loading,
  error: is_error,
  refresh,
} = await useAsyncData(
  "product",
  () => $fetch(`https://fakestoreapi.com/products/${route.params.id}`),
  { lazy: true }
);

const addToCart = () => {
  store.incrementCartQuantity(Number(route.params?.id), 1);
  message.value = "successfully added to cart";
  show.value = true;
};

const updateShow = (value) => {
  show.value = value;
};
</script>

<template>
  <div class="detail-parent">
    <Notification
      @update:show="updateShow"
      :show="show"
      ><template #content>{{ message }}</template></Notification
    >
    <p v-if="is_loading">Loading...</p>
    <p v-else-if="is_error">Error Please Try again</p>
    <div
      class="container"
      v-else-if="product">
      <div class="product-image">
        <NuxtImg
          :src="product?.image"
          :alt="product?.title" />
      </div>
      <div class="product-details">
        <div>
          <h1 class="product-name">{{ product?.title }}</h1>
          <div class="category-rating">
            <p class="product-category">{{ product?.category }}</p>
            <div class="product-rating">
              <Icon
                class="icon"
                name="material-symbols:star-rounded"></Icon>
              <span>{{ product?.rating?.rate }}</span>
              <small
                >{{ product?.rating.count }} people rated this product</small
              >
            </div>
          </div>
          <p class="product-description">
            {{ product?.description }}
          </p>
        </div>
        <div class="price-add-cart">
          <div class="product-price">${{ product?.price }}</div>
          <div class="add-to-cart">
            <button @click="addToCart">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.detail-parent {
  margin: 5rem auto;
}

.container {
  max-width: 1920px;

  display: flex;
  flex-wrap: wrap;
}

.icon {
  font-size: 1.5rem;
  font-weight: 400;
  color: yellowgreen;
}

.product-image {
  flex: 1;

  text-align: center;
  margin-bottom: 20px;
}

.product-image img {
  max-width: 100%;
  height: 25rem;
  object-fit: contain;
  object-position: center;
}

.product-details {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.product-name {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.product-category {
  font-size: medium;
  font-weight: 400;
  color: gray;
  margin-bottom: 10px;
}

.product-description {
  margin-top: 20px;
  color: rgb(51 65 85);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 10px;
}

.category-rating {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.product-rating span {
  font: 0.3rem;
  font-weight: 400;
  color: cadetblue;
}

.product-rating small {
  color: rgb(137, 80, 191);
}
.product-price {
  font-size: 20px;
  font-weight: bold;
}

.add-to-cart {
  text-align: center;
}

.price-add-cart {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  align-items: center;
  margin-top: 2rem;
}

.add-to-cart button {
  padding: 10px 100px;
  flex: 2;
  font-size: 0.8rem;
  border: none;
  background-color: #1b61ad;
  color: #fff;
  border-radius: 0.3rem;
  cursor: pointer;
}
button:hover {
  background-color: blue;
}
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .product-details,
  .product-image {
    order: unset;
    width: 100%;
  }

  .product-image {
    margin-bottom: 0;
  }
}
</style>
