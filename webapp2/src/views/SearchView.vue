<script setup>
import SearchBar from '../components/SearchBar.vue'
</script>

<template>
  <div class="about">
    <SearchBar />
    <h1>Results...</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
