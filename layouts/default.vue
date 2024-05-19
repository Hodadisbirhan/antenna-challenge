<script setup></script>

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
            <NuxtLink to="/cart"
              ><Icon
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
<style>
.screen {
  max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: center;
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
}

.cart {
  color: blueviolet;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
