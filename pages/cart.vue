<script setup>
const {
  data: products,
  pending,
  error,
  refresh,
} = await useAsyncData("carts", () =>
  $fetch("https://fakestoreapi.com/products")
);
</script>

<template>
  <div class="wrapper-cart">
    <section class="cart-section">
      <h1>Shopping Cart</h1>

      <ul
        class="cart-list-wrapper"
        v-if="products">
        <li
          v-for="product in products"
          :key="product.id">
          <div class="img-name">
            <div class="img-container">
              <NuxtImg
                class="img"
                :src="product.image"
                alt=""></NuxtImg>
            </div>
            <div class="name">
              <h5>{{ product.title }}</h5>
              <span>{{ product.category }}</span>
            </div>
          </div>
          <div class="add-cart-value">
            <select>
              <option
                v-for="i in 10"
                :key="i"
                :value="i">
                {{ i }}
              </option>
            </select>
            <div class="price">
              <h5>$1400</h5>
              <span>$393/per item</span>
            </div>
          </div>

          <button class="btn">Remove</button>
        </li>
      </ul>
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
          <p>$545</p>
        </div>
        <div class="total-price">
          <span>discount Price</span>
          <p>-$545</p>
        </div>
        <div class="total-price">
          <span>Tax Price</span>
          <p>$54</p>
        </div>

        <hr />
        <div class="total-price">
          <span>Total Price</span>
          <p>$545</p>
        </div>

        <button class="checkout-btn">Check out</button>
        <button class="back-to-btn">back to shop</button>
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

.img-container {
  width: 2rem;
  height: 2.5rem;
}

.img {
  object-fit: contain;
  object-position: center;
  width: 2rem;
  height: 2.5rem;
}

.img-name {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 0.3rem;
}

.name {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.name h5 {
  font-size: 0.6rem;
  width: 10rem;
  font-weight: 500;
  color: darkgray;
}
.name span {
  font-size: 0.5rem;
  font-weight: 600;
  color: rgb(189, 205, 209);
}
.add-cart-value {
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  align-items: center;
}
.add-cart-value select {
  outline: none;
  border: 0.08rem solid rgb(135, 97, 218);
  border-radius: 0.2rem;
  padding: 0.15rem 0.4rem;
  background-color: whitesmoke;
}
.add-cart-value h5 {
  font-size: 0.8rem;
}
.add-cart-value span {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgb(189, 205, 209);
}

.btn {
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  color: rgb(135, 97, 218);
  border: 0.08rem solid rgb(135, 97, 218);
  border-radius: 0.2rem;
  cursor: pointer;
}

.btn:hover {
  color: white;
  background-color: rgb(135, 97, 218);
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
