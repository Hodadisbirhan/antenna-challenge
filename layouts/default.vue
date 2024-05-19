<script setup></script>

<template>
  <div class="screen">
    <header class="header">
      <b>Home</b>
      <nav class="nav">
        <ul>
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/cart">cart</NuxtLink>
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
  padding: 1rem 3rem;
  position: fixed;
  top: 0;
  left: 0;

  height: 3rem;
  width: 100%;
  background-color: aqua;
}
.nav ul {
  display: flex;
  gap: 3rem;
}

li {
  list-style: none;
}
</style>
