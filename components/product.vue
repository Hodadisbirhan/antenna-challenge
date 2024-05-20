<script setup>
import { useCartStore } from "~/store/useCartStore";
const router = useRouter();
const props = defineProps({
  id: { type: [String, Number] },
  name: {
    type: [String],
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  img_url: {
    type: [String],
    required: true,
  },
  price: {
    type: [Number, String],
  },
  rate: {
    type: [Number, String],
  },
});

const store = useCartStore();
const message = ref("");
const show = ref(false);

const addToCart = () => {
  store?.incrementCartQuantity(props.id, 1);
  message.value = "successfully added to cart";
  show.value = true;
};

const updateShow = (value) => {
  show.value = value;
};

const toDetail = () => {
  router.push({ name: "detail-id", params: { id: props.id } });
};
</script>

<template>
  <div
    class="card"
    @click="toDetail">
    <div>
      <Notification
        @update:show="updateShow"
        :show="show"
        ><template #content>{{ message }}</template></Notification
      >
    </div>

    <div class="image-container">
      <NuxtImg
        class="img"
        :src="img_url"
        :alt="name"></NuxtImg>
    </div>
    <hr class="hline" />
    <div class="text-section">
      <div>
        <h3 class="category">{{ category }}</h3>
        <p class="product-name">{{ name }}</p>
      </div>
      <div class="rate-container">
        <Icon
          class="icon"
          name="material-symbols:star-rounded"></Icon>

        <small>{{ rate }}</small>
      </div>

      <div class="card-bottom">
        <span>${{ price }}</span>

        <button
          class="btn"
          @click.stop="addToCart(id)">
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 12rem;
  min-height: 20rem;
  background-color: white;
  align-items: center;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 0px 0.01rem rgba(0, 0, 0, 0.1);
  transition-duration: 700ms;
  transition-property: all;
}
.card:hover {
  box-shadow: 0 4px 1rem rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.image-container {
  width: 100%;
  height: 60%;
  display: flex;
  justify-items: center;
  justify-content: center;
  padding: 0rem 0.1rem;
}
.img {
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 10rem;
}
.hline {
  width: 100%;
  opacity: 20%;
}

.text-section {
  display: flex;
  flex-direction: column;

  width: 100%;
  gap: 0.5rem;
  padding: 0rem 1rem;
  height: 100%;
  flex-grow: 1;

  justify-content: space-between;
}
.card-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.btn {
  padding: 0.5rem 0.6rem;
  background-color: rgb(103, 103, 220);
  color: white;
  border: none;
  font-size: 0.8rem;

  font-weight: 500;
  border-radius: 0.3rem;
  cursor: pointer;
}

.btn:hover {
  background-color: blue;
}

.category {
  color: rgb(156 163 175);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
  margin-bottom: 0.4rem;
}
.product-name {
  width: 100%;
  word-break: break-all;
  color: rgb(55 65 81);
  font-size: 0.9rem;
  font-weight: 500;
}
.card-bottom span {
  font-size: large;
  font-weight: 600;
}
.rate-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.02rem;
  justify-content: left;
}
.rate-container small {
  font-size: smaller;
  font-weight: 500;
  color: rgb(156 163 175);
}
.rate-container .icon {
  font-size: 1.2rem;
  margin-left: -0.1rem;
  color: yellowgreen;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>
