<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    const recipesStore = useRecipesStore();

    const state = reactive({
        title: '',
        description: '',
        videoLink: '',
        file: null,
        successDialog: false,
        invalidSubmit: false
    })

    function postRecipe() {
        const { title, description, videoLink, file} = state;

        recipesStore.postRecipe({title, description, videoLink, file}).then((error) => {
            if (!error) {
                console.log("Recipe Posted");
                alert('Profile updated successfully!')
                state.successDialog = true;
            }
            else {
              console.error("Recipe Post Failed", error);
            }
        });
    }

    function submitForm(event) {
      if (state.title !== '' && state.description !== '' && state.file !== null) {
        state.invalidSubmit = false;
        event.preventDefault(); // Prevent the default form submission
        postRecipe();
      }
      else {
        state.invalidSubmit = true;
        state.successDialog = false;
      }

    }

    function RecipeSuccessDialog() {
        state.successDialog= true;
    }

    function closeError() {
      state.invalidSubmit = false;
    }

    function closeSuccess() {
      state.successDialog=false;
    }
</script>

<template>
    <main>
        <h1 class="text-h1">Create Post</h1>
        <v-card v-if="!state.done">
            <v-card-text>
                <v-form class="mt-2" enctype="multipart/form-data">
                  <v-text-field
                    label="Title (required)"
                    type="text"
                    v-model="state.title"
                  ></v-text-field>
                  <v-text-field
                    label="Description (required)"
                    type="text"
                    v-model="state.description">
                  </v-text-field>
                  <v-text-field
                    label="Video Link (optional)"
                    type="text"
                    v-model="state.videoLink">
                  </v-text-field>
                  <v-card-text>Upload Photo (required, jpg only)</v-card-text>
                  <input type="file" name="uploaded_file" accept="image/jpeg" @change="state.file = $event.target.files[0]"/>
                </v-form>
                <v-btn @click="submitForm" ref="submitFormButton">Submit</v-btn>
                <v-dialog v-if="state.invalidSubmit" :activator="$refs.submitFormButton" @close="closeError()" width="400">
                  <v-card>
                    <v-card-text >
                      There was an issue with your submission. Make sure you have a title, description, and image.
                    </v-card-text>
                  </v-card>
                </v-dialog>
            </v-card-text>
        </v-card>
    </main>

</template>

<style scoped>
</style>