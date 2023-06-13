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
  <main>
    <div>
      <SearchBar />
    </div>

    <div v-if="isLoading">
      <h1>Loading...</h1>
      <v-progress-circular indeterminate color="purple"></v-progress-circular>
    </div>
    <div v-else-if="homeRecipes.length === 0">
      <div v-if="store.loggedIn">
        <h1>Looks Like No Recipes Are Available In Your Area</h1>
      </div>
      <div v-else>
        <h1>Looks Like No Recipes Are Available AT ALL. Try Signing Up and Making Your Own.</h1>
      </div>
    </div>
    <div v-else>
      <div v-if="store.loggedIn">
        <h1>
          Recipes in Your Area (Based On ZipCode)
        </h1>
      </div>
      <div v-else>
        <h1>
          Random Recipes
        </h1>
      </div>

      <v-sheet class="mx-auto" elevation="8" max-width="1600" max-height="1600" style="position: static;">
        <v-slide-group class="pa-4" show-arrows>
          <v-slide-group-item v-for="result in homeRecipes" :key="result.id">
            <Results :obj="result" :width="'300px'" :height="'400px'"></Results>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </main>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
