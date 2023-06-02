<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    import { useRatingsStore } from '@/stores/ratings';
    import { useUserStore } from '@/stores/user';
    //import { SvgIcon } from '@jamescoyle/vue-icon';
    //import { mdiDotsVertical } from '@mdi/js';


    const userStore = useUserStore();
    const recipesStore = useRecipesStore();
    const ratingsStore = useRatingsStore();

    const state = reactive({
        score: 0,
        description: '',
        showEditAccountDialog: false, // Popup for Editing Account details.
        showConfirmDeleteDialog: false, // Popup for confirming delete Account request. 
        showDeletePostDialog: false,
    })

    onMounted(() => {
      state.loading=false;
      recipesStore.loadRecipes();
      recipesStore.recipes.forEach((recipe) => {
        ratingsStore.getRatings(recipe.recipe_id);
      });
      state.loading = true;
      userStore.getUser();
    });

    function openEditAccountDialog() {
      console.log("Opened edit dialog.");
      state.showEditAccountDialog = true;
    }

    function postReview(recipeID) {
      const {score, description} = state;
      ratingsStore.postRating({score, description, recipeID}).then((error) => {
        if (!error) {
          console.log("Review posted.");
        }
      });
    }

    function saveAccountInfo() {
      console.log("Changes to account information saved.")
      // TODO need to tie to backend. Will be a put instead of a post.
      state.showEditAccountDialog = false;
    }

    function logOut() {
      // TODO not tied to backend
        userStore.logout().then((error) => {
        console.log("Error during logout", error)
      });
      
    }

    function askConfirmationToDeleteAccount(){
      console.log("Popup opened: asking confirmation to delete account.")
      state.showConfirmDeleteDialog = true;
    }

    function deleteAccount(){
      console.log()
      // TODO Actually Delete Account (api call)
      // TODO Actually remove popups and logout
      state.showConfirmDeleteDialog = false;
      state.showEditAccountDialog = false;
      logOut();
      alert("Account successfully deleted.");
    }

    function abortDelete(){
      console.log("User decided not to delete account.")
      state.showConfirmDeleteDialog = false;
    }

    function openDeletePostDialog(){
      console.log("Popup opened: asking confirmation to delete account.")
      state.showDeletePostDialog = true;
    }

    function deletePost(){
      // TODO Actually delete the post from front end and back end?? 
      console.log("Post deleted.")
      state.showDeletePostDialog = false;
      alert("Your delicious post has been deleted.")  // TODO It would be nice to have the alert appear AFTER popup goes away.
    }

    function abortDeletePost(){
      console.log("Post not deleted.")
      state.showDeletePostDialog = false;
    }


</script>
    
<template>   
  <main>
    <div>
      <!--<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></img>-->
      <h1>PROFILE</h1>
      <div v-if="userStore.currentUser">
        <p>First Name: {{ userStore.currentUser[0].firstName }} </p>
        <p>Last Name: {{ userStore.currentUser[0].lastName }} </p>
        <p>Email: {{ userStore.currentUser[0].email }}</p>
        <p>ZipCode: {{ userStore.currentUser[0].zipCode }}</p>
      </div>
    </div>
    <!-- TODO HTML img tag of profile pic -->

    <!-- This button (and pop up) lets user edit their account. -->
    <v-btn class="editAccBtn" id="editAccount" @click="openEditAccountDialog">Edit Account</v-btn>
          <v-dialog v-model="state.showEditAccountDialog"  width="400">
            <v-card>
              <v-card-text>
                <v-form class="mt-2">
                  <v-text-field label="First Name" type="firstName" v-model="state.firstName"></v-text-field>
                  <v-text-field label="Last Name" type="lastName" v-model="state.lastName"></v-text-field>
                  <v-text-field label="Email address" type="email" v-model="state.email"></v-text-field>
                  <v-text-field label="ZipCode" type="zipcode" v-model="state.zipCode"></v-text-field>
                  <p>Delete my account.</p> 
                  <!-- This button (and pop up) gives user a chance to confirm account deletion. -->
                  <v-btn @click="askConfirmationToDeleteAccount">Delete
                    <v-dialog v-model="state.showConfirmDeleteDialog" width="400">
                      <v-card>
                        <v-card-text>
                          <v-form class="mt-2">
                            <p>Are you sure you want to delete your account?</p>
                            <v-btn @click="deleteAccount">Delete</v-btn>
                            <v-btn @click="abortDelete">NOOOOOO</v-btn>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-dialog>
                  </v-btn> 
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex flex-row-reverse ma-2">
                <!-- This button lets user save changes. -->
                <v-btn color="primary" @click="saveAccountInfo">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    

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
                        <v-dialog v-if="state.invalidScore" activator="parent" @close="closeScoreChecker()" width="400">
                          <v-card>
                            <v-card-text>
                              There was an issue with your submission. Make sure the score is between 0 and 5.
                            </v-card-text>
                          </v-card>
                        </v-dialog>
                        <v-dialog v-if="state.reviewPosted" activator="parent" @close="closeReviewPosted()" width="400">
                          <v-card>
                            <v-card-text >
                              Review Posted!
                            </v-card-text>
                          </v-card>
                        </v-dialog>
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

<style>

.editAccountBtn {
  margin-left: 20px;
  width: 100px;
  height: 40px;
  font-size: 16px;
}

</style>