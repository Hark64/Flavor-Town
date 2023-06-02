<script setup>
import SearchBar from '../components/SearchBar.vue'
import Results from '../components/Querecipe.vue'
import { useSearchStore } from '@/stores/search';

const searchStore = useSearchStore();
</script>

<template>
  <div>
    <SearchBar />
    <div v-if="searchStore.results.length==0">
      <h1>Looks Like We Couldn’t Find Anything</h1>
      <h1>Try Modifying Your Search</h1>
    </div>
    <div v-else>
      <v-container fluid>
        <Results 
          v-for="result in searchStore.results"
          :key="result.id"
          :obj="result"
          :width="'1200px'"
        ></Results>
      </v-container>
    </div>
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
