<script setup>
import SearchBar from '../components/SearchBar.vue'
</script>

<template>
  <div class="main">
    <SearchBar />
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center; /* Align items horizontally in the center */
  align-items: center; /* Align items vertically in the center */
  width: 80%;
}
</style>
