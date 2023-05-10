<script setup>
    import { onMounted, reactive } from 'vue';

    const state = reactive({
        newRecipe: {
            title: '',
            description: '',
            imageURL: '',
            task: ''
        }
    })

    function handleFileInput(event) {
        const file = event.target.files[0];
        this.imageUrl = URL.createObjectURL(file);
    }
    
</script>
<template>
    <main>
        <h1 class="text-h1">Create Post</h1>
        <v-card>
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
                  <input type="file" @change="handleFileInput"/>
                </v-form>
            </v-card-text>
        </v-card>
        <v-btn>Post Recipe </v-btn>
    </main>
</template>