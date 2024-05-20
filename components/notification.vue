<script setup>
const emits = defineEmits(["update:show"]);

const props = defineProps({
  show: { type: [Boolean] },
});

watch(
  () => props.show,
  (value) => {
    if (value) {
      setTimeout(() => {
        emits("update:show", false);
      }, 2000);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="show"
    class="notification"
    id="notification">
    <slot name="content"> Product added to cart! </slot>
  </div>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;

  color: gray;
  min-height: 3rem;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  z-index: 1000;
}
</style>
