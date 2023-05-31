import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const useRecipesStore = defineStore('recipes', () => {
    const hasError = ref(false);
    const error = ref("");
    const loading = ref(false);
    const recipes = ref([]);
    

    function loadRecipes() {
        loading.value = true;
        return axios.get("/api/recipes").then(
            (response) => {
                recipes.value = response.data.recipes;
            },
            (response) => {
                hasError.value = true;
                error.value = response.response.data.msg;
                return hasError;
            }
        )
    }


    function postRecipe({ title, description, videoLink, file}) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('videoLink', videoLink);
        formData.append('uploaded_file', file);

        
        return axios.post("/api/recipes", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
        (response) => {
            console.log(response);
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }

    function deleteRecipe(recipe) {
        const idx = recipes.value.indexOf(recipe);
        return axios.delete(`/api/recipes/${recipe.id}`).then(() => {
            recipes.value.splice(idx, 1);
        })
    }

    return { error, hasError, loading, recipes, loadRecipes, postRecipe, deleteRecipe };
});