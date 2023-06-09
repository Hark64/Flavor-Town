<script setup>
import SearchBar from '../components/SearchBar.vue'
import Results from '../components/Querecipe.vue'
import { onMounted, ref } from 'vue';
import axios from 'axios'
import { useUserStore } from '@/stores/user';

const store = useUserStore();

const params = {};
let homeRecipes = ref([]);

params.count = 10;

onMounted(() => {
  if (store.loggedIn == true) {
    store.getUser({}).then((error) => {
      if (!error) {
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
    <h1 class="headers">For you</h1>
    <div class="posts-container">
      <v-container class="post">
        <v-row justify="space-around">
          <v-card width="260">
            <v-img height="160" src="https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg" cover
              class="text-white">
            </v-img>
            <v-card-text>
              <div class="ms-1 mb-3">
                30-40 min
              </div>
              <div class="font-weight-bold ms-1 mb-2">
                Tangy Orange Chicken
              </div>
              <v-timeline density="compact">
                <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                  size="x-small">
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <v-container class="post">
        <v-row justify="space-around">
          <v-card width="260">
            <v-img height="160" src="https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg" cover
              class="text-white">
            </v-img>
            <v-card-text>
              <div class="ms-1 mb-3">
                30-40 min
              </div>
              <div class="font-weight-bold ms-1 mb-2">
                Tangy Orange Chicken
              </div>
              <v-timeline density="compact">
                <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                  size="x-small">
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <v-container class="post">
        <v-row justify="space-around">
          <v-card width="260">
            <v-img height="160" src="https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg" cover
              class="text-white">
            </v-img>
            <v-card-text>
              <div class="ms-1 mb-3">
                30-40 min
              </div>
              <div class="font-weight-bold ms-1 mb-2">
                Tangy Orange Chicken
              </div>
              <v-timeline density="compact">
                <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                  size="x-small">
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <v-container class="post">
        <v-row justify="space-around">
          <v-card width="260">
            <v-img height="160" src="https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg" cover
              class="text-white">
            </v-img>
            <v-card-text>
              <div class="ms-1 mb-3">
                30-40 min
              </div>
              <div class="font-weight-bold ms-1 mb-2">
                Tangy Orange Chicken
              </div>
              <v-timeline density="compact">
                <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                  size="x-small">
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
      <v-container class="post">
        <v-row justify="space-around">
          <v-card width="260">
            <v-img height="160" src="https://www.kitchensanctuary.com/wp-content/uploads/2020/01/Orange-Chicken-square-1200.jpg" cover
              class="text-white">
            </v-img>
            <v-card-text>
              <div class="ms-1 mb-3">
                30-40 min
              </div>
              <div class="font-weight-bold ms-1 mb-2">
                Tangy Orange Chicken
              </div>
              <v-timeline density="compact">
                <v-timeline-item v-for="message in messages" :key="message.time" :dot-color="message.color"
                  size="x-small">
                  <div class="mb-4">
                    <div class="font-weight-normal">
                      <strong>{{ message.from }}</strong> @{{ message.time }}
                    </div>
                    <div>{{ message.message }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </div>
  </div>

  <div v-if="homeRecipes.length == 0">
    <h1>Looks Like No Recipes Are Available</h1>
  </div>
  <div v-else>
    <div v-if="store.loggedIn == true">
      <h1>
        Recipes in Your Area (Based On ZipCode *DOESNT_WORK*)
      </h1>
    </div>
    <div v-else>
      <h1>
        Random Recipes
      </h1>
    </div>

    <v-sheet class="mx-auto" elevation="8" max-width="800">
      <v-slide-group class="pa-4" show-arrows>
        <v-slide-group-item v-for="result in homeRecipes" :key="result.id">
          <Results :obj="result" :width="'300px'" :height="'200px'"></Results>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
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
  justify-content: center;
  /* Align items horizontally in the center */
  align-items: center;
  /* Align items vertically in the center */
  padding: 12rem 0 16rem 0;
}

.content {
  background-color: rgb(255, 217, 152);
  margin: 3px;
  border-radius: 30px 30px 0 0;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.posts-container {
  display: flex;
  justify-content: flex-start;
}

.headers {
  margin: 1em;
}

.post {
  cursor: pointer;
}

.post img {
  width: 100%;
  height: 100%;
}
</style>
