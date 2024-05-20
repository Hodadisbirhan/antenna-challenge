<script setup>
import { useCartStore } from "../store/useCartStore";
const store = useCartStore();
</script>

<template>
  <div class="screen">
    <header class="header">
      <b>E-Antenna</b>
      <nav class="nav">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/cart"
              class="cart-wrapper">
              <span class="cart-counter">
                {{ store?.cart.length }}
              </span>
              <Icon
                class="cart"
                name="material-symbols:shopping-cart-checkout-sharp"></Icon
            ></NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>
<style scoped>
.screen {
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-left: auto;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 3rem;
  width: 100%;
  background-color: white;
}
.nav ul {
  display: flex;
  gap: 3rem;
  align-items: center;
}

li {
  list-style: none;
}
a {
  text-decoration: none;
  font-size: small;
  font-weight: 400;
}

.cart-wrapper {
  position: relative;
}
.cart-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 500;
  position: absolute;
  top: -0.27rem;
  right: -0.12rem;
  color: blue;

  border-radius: 100%;
  width: 1rem;
  height: 1rem;
  background-color: rgb(218, 209, 227);
}
.cart {
  font-size: 1.5rem;
  font-weight: 500;
}
.router-link-active {
  color: blue;
}
a:active {
  color: blueviolet;
}
</style>
