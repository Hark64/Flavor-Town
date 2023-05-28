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
    })

    function postRecipe() {
        const { title, description, videoLink, file} = state;

        recipesStore.postRecipe({title, description, videoLink, file}).then((error) => {
            if (!error) {
                console.log("Recipe Posted");
                //RecipeSuccessDialog();  TODO - Ideally we want this here but it's not running. Probably async stuff.
            }
        });
    }

    function submitForm(event) {
        event.preventDefault(); // Prevent the default form submission
        postRecipe();
        RecipeSuccessDialog();  // TODO- Right now, THIS ALWAYS SHOWS even if post fails. 
                                // TODO make dialog disapear after time or put x button

    }

    function RecipeSuccessDialog() {
        state.successDialog= true;
    }
</script>

<template>
    <main>
        <h1 class="text-h1">Create Post</h1>
        <v-dialog  v-if=state.successDialog activator="parent" width="400">
            <v-card>
              <v-card-text >
                Recipe successfully and deliciously submitted. 
              </v-card-text>
            </v-card>
          </v-dialog>
        <v-card v-if="!state.done">
            <v-card-text>
                <v-form class="mt-2" enctype="multipart/form-data">
                  <v-text-field
                    label="Title"
                    type="text"
                    v-model="state.title"
                  ></v-text-field>
                  <v-text-field
                    label="Description"
                    type="text"
                    v-model="state.description">
                  </v-text-field>
                  <v-text-field
                    label="Video Link"
                    type="text"
                    v-model="state.videoLink">
                  </v-text-field>
                  <v-card-text>Upload Photo</v-card-text>
                  <input type="file" name="uploaded_file" @change="state.file = $event.target.files[0]"/>
                </v-form>
                <v-btn @click="submitForm">Submit</v-btn>
            </v-card-text>
        </v-card>
    </main>

</template>