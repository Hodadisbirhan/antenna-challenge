<script setup>
const props = defineProps({
  totalData: {
    type: [Number],
    required: true,
  },
  dataPerPage: {
    type: [Number],
    required: true,
  },
  offset: {
    type: [Number],
    default: 1,
  },
});
const emits = defineEmits(["updateOffset"]);
const currentPage = ref(props.offset);
const styleDisabled = reactive({
  color: "rgb(203 213 225)",
});

const numberOfPages = computed(() => {
  return Math.ceil(props.totalData / props.dataPerPage);
});

const show = (item) => {
  return (
    item == currentPage.value ||
    numberOfPages.value < 6 ||
    item <= 2 ||
    item >= numberOfPages.value - 1 ||
    (item <= currentPage.value + 2 && item >= currentPage.value - 2) ||
    (currentPage.value >= numberOfPages.value - 2 &&
      currentPage.value <= numberOfPages.value &&
      item >= numberOfPages.value - 5 &&
      item <= numberOfPages.value) ||
    (currentPage.value >= 1 && currentPage.value < 6 && item >= 1 && item <= 6)
  );
};

const next = () => {
  if (currentPage.value < numberOfPages.value) {
    currentPage.value++;
    emits("updateOffset", (currentPage.value - 1) * props.dataPerPage);
  }
};
const prev = () => {
  if (currentPage.value !== 1) {
    currentPage.value--;
    emits("updateOffset", (currentPage.value - 1) * props.dataPerPage);
  }
};

const updatePage = (value) => {
  emits("updateOffset", (value - 1) * props.dataPerPage);
  currentPage.value = value;
};
const firstThree = computed(() => {
  if (numberOfPages.value >= 6) return currentPage.value >= 6;
  return false;
});

const lastThree = computed(() => {
  if (numberOfPages.value >= 6)
    return currentPage.value < numberOfPages.value - 4;
});
</script>

<template>
  <div class="wrapper">
    <div class="line"></div>
    <div class="inner-wrapper">
      <button
        :disabled="currentPage === 1"
        @click="prev"
        class="btn"
        :style="currentPage === 1 ? styleDisabled : ''">
        <Icon name="material-symbols:arrow-back-ios" />
      </button>
      <div class="list-container">
        <div
          v-for="item in numberOfPages"
          :key="item"
          :style="show(item) ? { display: 'block' } : { display: 'none' }">
          <a
            class="three-dot"
            v-if="item == numberOfPages - 1 && lastThree"
            herf="#"
            >...</a
          >

          <a
            v-if="show(item)"
            href="#"
            :class="[currentPage === item ? 'tag-a-active' : 'normal-a']"
            @click.prevent="updatePage(item)"
            class="tag-a"
            >{{ item }}</a
          >
          <a
            class="end-tag"
            v-if="item == 2 && firstThree"
            herf="#"
            >...</a
          >
        </div>
      </div>

      <button
        :disabled="currentPage === numberOfPages"
        @click="next"
        class="disabled:text-slate-300 text-blue-600">
        <Icon name="material-symbols:arrow-forward-ios-rounded" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
}

.line {
  width: 100%;
  height: 0.125rem;
  background-color: rgb(234, 230, 237);
  margin-bottom: 0.4rem;
}
.inner-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  color: rgb(37 99 235);
}
.list-container {
  display: flex;
  flex-direction: row;
  gap: 5;
  align-items: center;
  justify-items: center;
}
.three-dot {
  padding-left: 5px;
  padding-right: 5px;
}
.tag-a {
  text-decoration: none;
  position: relative;
  top: -0.35rem;
  color: rgb(37 99 235);
  margin-top: 0.2rem;
}

.tag-a-active {
  text-decoration: none;
  position: relative;

  margin-top: 0.12rem;
  color: rgb(30 58 138);
  font-weight: bold;
  scale: 1.5;
}

.tag-a-active::before {
  content: "";
  left: 0%;
  top: -0.2rem;
  right: 0%;
  height: 0.125rem;
  background-color: rgb(30 58 138);
  position: absolute;
}
.normal-a {
  color: rgb(71 85 105);
  font-size: small;
}
.end-tag {
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
