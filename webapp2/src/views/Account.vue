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
        recipesStore.loadScores();
        recipesStore.loadRecipes();
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
    <!-- v-for="recipe in recipesStore.recipes" :key="recipe.id" -->
    <div v-for="recipe in recipesStore.recipes" :key="recipe.id">
      <!--<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></img>-->
      <h1>PROFILE</h1>
      <p>First Name: {{ userStore.currentUser.firstName }} </p>
      <p>Last Name:  boop boop </p>
      <p>Email: nonya@business.com</p>
      <p>ZipCode: 1234</p>
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
            <!-- Deleted Post Review Button because user does not need to comment on their own recipes. -->
            <!-- TODO I don't know why it blacks out the whole screen. -->
            <!-- TODO make the button an ellipses. <svg-icon type="mdi" :path="path"></svg-icon> -->
            <v-btn @click="openDeletePostDialog">Delete Post
              <v-dialog v-model="state.showDeletePostDialog" width="400">
                <v-card>
                  <v-card-text>
                    <v-form class="mt-2">
                      <p>Are you sure you want to delete this yummy post?</p>
                      <v-btn @click="deletePost">Delete</v-btn>
                      <v-btn @click="abortDeletePost">NOOOOOO</v-btn>
                    </v-form>
                  </v-card-text>
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