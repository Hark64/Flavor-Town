<script setup>
  import SearchBar from '../components/SearchBar.vue'
  import Results from '../components/Querecipe.vue'
  import { onMounted, ref } from 'vue';
  import axios from 'axios'
  import { useUserStore } from '@/stores/user';

  const store = useUserStore();

  const params = {};
  let homeRecipes = ref([]);

  params.count=10;

onMounted(() => {
    if (store.loggedIn==true) {
      store.getUser({}).then((error) => {
        if(!error){
          console.log(store.currentUser, store.hasError);
          params.showZip = true;
          params.zip = store.currentUser.zipCode.value;
        }
      });
    }

    axios.get("/api/search", { params }).then((_recipes) => {
        homeRecipes.value = _recipes.data.recipes;
      },
      (error) => {
        console.error(error);
      });

});
</script>

<template>
  <main>
    <SearchBar />

    <div v-if="homeRecipes.length==0">
      <h1>Looks Like No Recipes Are Available</h1>
    </div>
    <div v-else>
      <div v-if="store.loggedIn==true">
        <h1>
          Recipes in Your Area (Based On ZipCode *DOESNT_WORK*)
        </h1>
      </div>
      <div v-else>
        <h1>
          Random Recipes
        </h1>
      </div>
      
      <v-sheet
        class="mx-auto"
        elevation="8"
        max-width="800"
      >
        <v-slide-group
          class="pa-4"
          show-arrows
        >
          <v-slide-group-item
            v-for="result in homeRecipes"
            :key="result.id"
          >
            <Results
              :obj="result"
              :width="'300px'"
              :height="'200px'"
            ></Results>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </main>
</template>


