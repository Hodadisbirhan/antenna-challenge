<script setup>
import { useCartStore } from "~/store/useCartStore";
const router = useRouter();
const store = useCartStore();
const {
  data: products,
  pending: is_loading,
  error: is_error,
  refresh,
} = await useAsyncData(
  "carts",
  () => $fetch("https://fakestoreapi.com/products"),
  {
    lazy: true,
  }
);

const cart_product_ids = computed(() => {
  return store?.cart.map((element) => {
    return element?.id;
  });
});

const cart_products = computed(() => {
  return products.value?.filter((element) => {
    return cart_product_ids.value?.includes(element?.id);
  });
});

const total_price = computed(() => {
  return cart_products.value?.reduce((total, element) => {
    return total + element?.price * store.getQuantityByID(element?.id);
  }, 0);
});

const backHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="wrapper-cart">
    <section class="cart-section">
      <h1>Shopping Cart</h1>
      <p
        v-if="error"
        class="error">
        Error Please Try Again
      </p>
      <p
        v-else-if="is_loading"
        class="loading">
        Loading...
      </p>
      <ul
        class="cart-list-wrapper"
        v-else-if="products">
        <li
          v-for="product in cart_products"
          :key="product.id">
          <cart
            :id="product?.id"
            :image="product?.image"
            :category="product?.category"
            :title="product?.title"
            :price="product?.price"></cart>
        </li>
      </ul>
      <p
        v-else-if="products?.length < 1"
        class="not-found">
        No Cart
      </p>
    </section>
    <section class="checkout_coupen">
      <div class="coupen">
        <label for="coupen"> Do you have Coupen?</label>
        <div class="input-wrapper">
          <input
            id="coupen"
            placeholder="Coupen Code" />
          <button>Apply</button>
        </div>
      </div>
      <div class="checkout">
        <div class="total-price">
          <span>Total Price</span>
          <p>${{ total_price }}</p>
        </div>
        <div class="total-price">
          <span>discount Price</span>
          <p>-$5</p>
        </div>
        <div class="total-price">
          <span>Tax Price</span>
          <p>$10</p>
        </div>

        <hr />
        <div class="total-price">
          <span>Total Price</span>
          <p>${{ total_price + 5 }}</p>
        </div>

        <button class="checkout-btn">Check out</button>
        <button
          class="back-to-btn"
          @click="backHome">
          back to shop
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.wrapper-cart {
  width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  margin: 3rem auto;
  margin-top: 5rem;
}
.cart-section {
  display: flex;
  flex-direction: column;
  flex: 2;
  gap: 1rem;
  background-color: white;
  min-height: 15rem;
  border-radius: 0.5rem;
  padding: 2rem;
}
.checkout_coupen {
  min-height: 15rem;
  display: flex;

  flex-direction: column;
  gap: 1rem;
}
.cart-section h1 {
  font-size: medium;
  font-weight: 600;
  color: slategray;
}
.cart-list-wrapper {
  display: flex;

  flex-direction: column;
  gap: 1.5rem;
}
.cart-list-wrapper li {
  list-style: none;
  display: flex;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.input-wrapper {
  display: flex;
  gap: 0;
}

.coupen {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: white;
  border-radius: 0.3rem;
  padding: 1rem;
}

.input-wrapper input {
  width: 60%;
  padding: 0.4rem 0.4rem;
  border-right: none;
  border: 0.08rem solid rgb(135, 97, 218);
  outline: none;
  border-radius: 0.2rem 0rem 0rem 0.2rem;
}
.input-wrapper button {
  background-color: rgb(135, 97, 218);
  border: none;
  color: white;
  font-size: small;
  font-weight: 400;
  padding: 0.2rem 0.4rem;
  border-radius: 0rem 0.2rem 0.2rem 0rem;
}
.coupen label {
  font-size: 0.8rem;
  font-weight: 700;
  color: slategray;
}
.checkout {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  background-color: white;
  border-radius: 0.3rem;
  padding: 1rem;
}

.total-price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: slategray;
  font-size: 0.7rem;
  font-weight: 500;
}
.checkout hr {
  background-color: blueviolet;
  opacity: 50%;
  margin: 0.7rem 0rem;
}
.checkout button {
  padding: 0.4rem 0;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 0.2rem;
  cursor: pointer;
}

.checkout-btn {
  border: none;
  background-color: rgb(135, 97, 218);
  color: whitesmoke;
}
.back-to-btn {
  border: 0.1rem solid rgb(135, 97, 218);
  color: rgb(135, 97, 218);
}
</style>
