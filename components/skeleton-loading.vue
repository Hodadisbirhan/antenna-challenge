<script setup></script>

<template>
  <div class="card">
    <div class="skeleton skeleton-img"></div>
    <div class="skeleton skeleton-text skeleton-text-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text"></div>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.skeleton {
  background-color: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-img {
  width: 100%;
  height: 200px;
}

.skeleton-text {
  height: 20px;
  width: 100%;
}

.skeleton-text-title {
  width: 60%;
  height: 30px;
}

@keyframes skeleton-loading {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style>
