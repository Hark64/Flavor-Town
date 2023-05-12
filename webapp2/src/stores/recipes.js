import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const useRecipesStore = defineStore('recipes', () => {
    const hasError = ref(false);
    const error = ref("");
    

    function postRecipe({ title, description, imageURL}) {
        return axios.post("/api/recipes", { title, description}).then(
        (response) => {
            console.log(response);
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }
    
    return { postRecipe };
});