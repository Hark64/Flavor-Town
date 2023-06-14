<script setup>
  import SearchBar from '../components/SearchBar.vue'
  import Results from '../components/Querecipe.vue'
  import { onMounted, ref, watch, reactive } from 'vue';
  import axios from 'axios'
  import { useUserStore } from '@/stores/user';

const store = useUserStore();

  const params = reactive({ count: 10 });
  const homeRecipes = ref([]);
  const isLoading = ref(true);

  const fetchData = async () => {
    isLoading.value = true;

    if (store.loggedIn) {
      await store.getUser({});
      if (!store.hasError) {
        params.showZip = true;
        params.zip = store.currentUser[0].zipCode;
      }
    } else {
      delete params.showZip;
      delete params.zip;
      delete params.top;
    }

    await axios.get("/api/search", { params }).then((_recipes) => {
        homeRecipes.value = _recipes.data.recipes;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  onMounted(fetchData);

  watch(() => store.loggedIn, async () => {
    fetchData();
  });
</script>

<template>
  <div id="background"></div>

  <div class="search">
    <SearchBar />
  </div>

  <div class="content">
    <h1 class="headers">For you</h1>
    <div class="posts-container">
      <v-sheet class="mx-auto" elevation="8" max-width="800">
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-group-item v-for="result in homeRecipes" :key="result.id">
          <Results :obj="result" :width="'300px'" :height="'200px'"></Results>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
    </div>
  </div>
</template>



<style scoped>
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(245, 185, 113);
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('../assets/groceries.webp');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.search {
  display: flex;
  justify-content: center; /* Align items horizontally in the center */
  align-items: center; /* Align items vertically in the center */
  padding: 12rem 0 16rem 0;
}

.content {
  background-color: rgb(255, 217, 152);
  border-radius: 30px 30px 0 0;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 auto;
}
.posts-container {
  display: flex;
  justify-content: flex-start;
}

.headers {
  margin: 1em;
}
</style>
