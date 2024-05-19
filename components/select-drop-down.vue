<script setup>
import { vOnClickOutside } from "@vueuse/components";

const show = ref(false);

const target = ref();
const ignoreElRef = ref();
const value = ref("");

const vFocus = {
  mounted: (el) => el.focus(),
};
const onClickOutsideHandler = [
  (ev) => {
    console.log(ev);
    show.value = false;
  },
  { ignore: [ignoreElRef, target] },
];

const emits = defineEmits(["update:modelValue", "click:item"]);
const props = defineProps({
  data: {
    type: [Array, Object],
  },
  withSearch: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },

  loading: {
    type: Boolean,
    default: false,
  },
});

const search = defineModel();

const clickItem = (item) => {
  show.value = false;
  value.value = item.value;
  emits("click:item", item);
};
</script>

<template>
  <div class="select-wrapper">
    <button
      type="button"
      ref="target"
      class="btn"
      @click="show = !show">
      <slot
        name="selectedValue"
        :item="value" />
      <span v-if="!value">
        {{ placeholder }}
      </span>

      <Icon
        v-if="show"
        class="icon"
        name="material-symbols:keyboard-arrow-up"></Icon>

      <Icon
        v-else
        class="icon"
        name="material-symbols:keyboard-arrow-down"></Icon>
    </button>

    <ul
      ref="ignoreElRef"
      v-on-click-outside="onClickOutsideHandler"
      class="list-container"
      v-if="show">
      <input
        v-if="withSearch"
        class="search-input"
        v-model="search"
        v-focus />

      <div
        v-show="loading"
        class="loading-indicator"></div>
      <template v-if="data">
        <li
          v-for="item in data"
          :key="item.value"
          class="list-selection"
          @click="clickItem(item)">
          <slot
            name="selectedOption"
            :item="item" />
        </li>
      </template>

      <li>
        <slot name="footer"> </slot>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select-wrapper {
  width: 100%;
  position: relative;
}
.select-wrapper .btn {
  border: 1px solid blueviolet;
  position: relative;
  padding: 10px;
  width: 100%;
  border-radius: 0.3rem;
}
.btn:hover {
  border-color: blueviolet;
}
.icon {
  font-size: small;
  font-weight: 500;
  position: absolute;
  top: 30%;
  right: 2px;
}

.list-container {
  display: flex;
  position: absolute;
  flex-direction: column;
  gap: 0.2rem;
  top: 110%;
  background-color: white;
  z-index: 5;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 1rem rgba(0, 0, 0, 0.1);
  max-height: 10rem;
  overflow-y: auto;
  border-radius: 0.2rem;
}
.search-input {
  width: 100%;
  border-radius: 0.1rem;
  border: 1.5px solid slateblue;
  padding: 4px 7px;
  outline: none;
}

.loading-indicator {
  background-color: slategray;
  height: 100%;
}

.list-selection {
  padding: 4px;
  cursor: pointer;
}
</style>
