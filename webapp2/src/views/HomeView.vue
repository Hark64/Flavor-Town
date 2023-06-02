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
  <div id="background"></div>
  
  
  <div class="search">
    <SearchBar />
  </div>

  <div class="content">
    <h1>For you</h1>
    <div class="post">
        <img src="../assets/post.png" alt="Post 1">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 2">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 3">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 4">
      </div>
  </div>

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

.post{
  width: 20%;
  margin: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

.post img {
  width: 100%;
  height: 100%;
}
</style>
