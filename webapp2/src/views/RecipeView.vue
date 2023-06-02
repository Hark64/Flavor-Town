<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    import { useRatingsStore } from '@/stores/ratings';
    const recipesStore = useRecipesStore();
    const ratingsStore = useRatingsStore();

    const state = reactive({
        score: 0,
        description: '',
        loading: false,
        validScore: true
    })

    onMounted(() => {
      state.loading=false;
        recipesStore.loadRecipes();
        recipesStore.recipes.forEach((recipe) => {
          ratingsStore.getRatings(recipe.recipe_id);
        });
        state.loading = true;
    });


    function postReview(recipeID) {
      const {score, description} = state;
      ratingsStore.postRating({score, description, recipeID}).then((error) => {
        if (!error) {
          console.log("Review Posted");
        }
      });
    }

    function deleteRecipe(recipe, recipeID) {
      deleteRatings(recipeID);
      recipesStore.deleteRecipe(recipe).then((error) => {
        if (!error) {
          console.log("Recipe Deleted");
        }
      })
    }

    function deleteRatings(recipeID) {
      ratingsStore.deleteRatings(recipeID).then((error) => {
        if (!error) {
          console.log("Ratings Deleted");
        }
      })
    }

    function checkScore() {
      if (state.score > 5 || state.score < 0) {
        state.validScore = false;
      }
    }


</script>
    
<template>
  <main>
    <v-card class="mx-auto" min-width="1200" variant="outlined" v-for="recipe in recipesStore.recipes" :key="recipe.recipe_id">
      <v-alert density="compact" type="warning" icon="$warning" title="There was an issue getting your recipes" v-if="recipesStore.hasError">{{ recipesStore.error }}</v-alert>
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            <h1> {{ recipe.recipe_title }} </h1>
          </div>
          <div class="text-h6 mb-1">
            Description: {{recipe.recipe_description}}
          </div>
          <div class="text-h6 mb-1" v-if="recipe.recipe_videoLink">
            Video Link: {{recipe.recipe_videoLink}}
          </div>
          <div class="text-h6 mb-1" v-if="recipe.avgScore">
            Score: {{recipe.avgScore}}
          </div>
          <img :src="recipe.recipe_fileName" alt="No Image" style="object-fit: contain;" width="500" height="500"/>
          <v-card class="mx-auto" min-width="1200" variant="outlined" v-if="state.loading" v-for="rating in ratingsStore.ratings[recipe.recipe_id]" :key="rating.id">
            <div class="text-h6 mb-1">
              Rating Score: {{rating.score}}
            </div>
            <div class="test-h6 mb-1">
              Description: {{rating.description}}
            </div>
          </v-card>
          <v-btn @click="deleteRecipe(recipe, recipe.recipe_id)">Delete Recipe</v-btn>
          <div>
            <v-btn>Post Review
              <v-dialog activator="parent" width="400">
                <v-card>
                  <v-card-text>
                    <v-form class="mt-2">
                      <v-text-field
                        label="Score (0-5)"
                        type="number"
                        min="0"
                        max="5"
                        step="0.5"
                        @input="checkScore"
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
                    <v-btn color="primary" @click="postReview(recipe.recipe_id)">Post Review</v-btn>
                  </v-card-actions>
                  <!-- <v-dialog v-if="!state.validScore" activator="parent" width="400">
                    <v-card>
                      <v-card-text >
                        There was an issue with your submission. Make sure the score is between 0 and 5.
                      </v-card-text>
                    </v-card>
                  </v-dialog> -->
                </v-card>
              </v-dialog>
            </v-btn>
          </div>
        </div>
      </v-card-item>
    </v-card>
  </main>
</template>