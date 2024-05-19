<script setup>
import { useCartStore } from "~/store/useCartStore";

const props = defineProps({
  id: { type: [String, Number] },
  image: {
    type: [String],
  },
  category: {
    type: [String],
  },
  title: {
    type: [String],
  },
  price: {
    type: [String, Number],
  },
});
const store = useCartStore();
const quantity = ref(store.getQuantityByID(props.id));

const remove = () => {
  store.removeFromCart(props.id);
};

watch(quantity, (newValue) => {
  store.setCartQuantity(props.id, newValue);
});

const max_value = computed(() => {
  return quantity.value > 10 ? quantity.value : 10;
});
</script>

<template>
  <div class="img-name">
    <div class="img-container">
      <NuxtImg
        class="img"
        :src="image"
        alt=""></NuxtImg>
    </div>
    <div class="name">
      <h5>{{ title }}</h5>
      <span>{{ category }}</span>
    </div>
  </div>
  <div class="add-cart-value">
    <select v-model="quantity">
      <option
        v-for="i in max_value"
        :key="i"
        :value="i">
        {{ i }}
      </option>
    </select>
    <div class="price">
      <h5>${{ price * quantity }}</h5>
      <span>${{ price }}/per item</span>
    </div>
  </div>

  <button
    class="btn"
    @click="remove">
    Remove
  </button>
</template>

<style scoped>
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
</style>
