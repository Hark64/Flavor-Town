<script setup>
import SearchBar from '../components/SearchBar.vue'
import Results from '../components/Querecipe.vue'

import { useUserStore } from '@/stores/user';
import { useSearchStore } from '@/stores/search';

  const userStore = useUserStore();
  const searchStore = useSearchStore();


</script>

<template>
  <div>
    <SearchBar />
    <div v-if="userStore.loggedIn==true">
      <h1>Sorry You Need To Be Logged In To Do That</h1>
    </div>
    <div v-else-if="searchStore.results.length==0">
      <h1>Looks Like We Couldn’t Find Anything</h1>
      <h1>Try Modifying Your Search</h1>
    </div>
    <div v-else>
      <Results 
        v-for="result in searchStore.results"
        :key="result.id"
        :obj="result"
      ></Results>
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
