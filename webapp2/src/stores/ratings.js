import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const useRatingsStore = defineStore('ratings', () => {
    const hasError = ref(false);
    const error = ref("");


    function postRating({ score, description, recipeID}) {
        return axios.post(`/api/recipes/${recipeID}/ratings`, { score, description, recipeID }).then(
        (response) => {
            console.log(response);
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }


    function deleteRatings(recipe) {
        return axios.delete(`/api/recipes/${recipe.id}/ratings`).then(() => {
        })
    }
    
    return { error, hasError, postRating, deleteRatings };
});