<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    import { useRatingsStore } from '@/stores/ratings';
    const recipesStore = useRecipesStore();
    const ratingsStore = useRatingsStore();

    const state = reactive({
        score: 0,
        description: '',
    })

    onMounted(() => {
        recipesStore.loadScores();
        recipesStore.loadRecipes();
    });


    function postReview(recipeID) {
      const {score, description} = state;
      ratingsStore.postRating({score, description, recipeID}).then((error) => {
        if (!error) {
          console.log("Review Posted");
        }
      });
    }
    

</script>
    
<template>
  <main>
    <v-card class="mx-auto" min-width="1200" variant="outlined" v-for="recipe in recipesStore.recipes" :key="recipe.id">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            <h1> {{ recipe.title }} </h1>
          </div>
          <div class="text-h6 mb-1">
            {{recipe.description}}
          </div>
          <div class="text-h6 mb-1">
            {{recipe.videoLink}}
          </div>
          <div class="text-h6 mb-1">
            {{recipe.score}}
          </div>
          <img :src="recipe.fileName" alt="No Image" style="object-fit: contain;" width="500" height="500"/>
          <div>
            <v-btn>Post Review
              <v-dialog activator="parent" width="400">
                <v-card>
                  <v-card-text>
                    <v-form class="mt-2">
                      <v-text-field
                        label="Score"
                        type="number"
                        min="0"
                        max="5"
                        step="0.5"
                        v-model="state.score"
                      ></v-text-field>
                      <v-text-field
                        label="Description"
                        type="text"
                        v-model="state.description">
                      </v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="d-flex flex-row-reverse ma-2">
                    <v-btn color="primary" @click="postReview(recipe.id)">Post Review</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </main>
</template>

<style scoped>
</style>