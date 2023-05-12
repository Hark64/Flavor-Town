<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    const recipesStore = useRecipesStore();

    const state = reactive({
        newRecipe: {
            title: '',
            description: '',
            done: false
        }
    })

    function postRecipe() {
        const { title, description } = state;
        recipesStore.postRecipe({title, description}).then((error) => {
            if (!error) {
                done = true;
            }
        });
    }


    
</script>
<template>
    <main>
        <h1 class="text-h1">Create Post</h1>
        <v-card v-if="!state.done">
            <v-card-text>
                <v-form class="mt-2">
                  <v-text-field
                    label="Title"
                    type="title"
                    v-model="state.title"
                  ></v-text-field>
                  <v-text-field
                    label="Description"
                    type="description"
                    v-model="state.description">
                  </v-text-field>
                  <v-card-text>Upload Photo</v-card-text>
                  <!-- <form action = "/recipe" method = "post" enctype="multipart/form-data">
                    <input type="file" name="image">
                  </form> -->
                </v-form>
            </v-card-text>
        </v-card>
        <h1 v-if="state.done">Done!</h1>
        <v-btn @click="postRecipe">Post Recipe </v-btn>
    </main>
</template>