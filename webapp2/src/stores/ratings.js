import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const useRatingsStore = defineStore('ratings', () => {
    const hasError = ref(false);
    const error = ref("");
    const ratings = ref([[]]);


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

    function getRatings(recipeID) {
        return axios.get(`/api/recipes/${recipeID}/ratings`).then(
            (response) => {
                ratings.value[recipeID] = response.data.ratings;
            },
            (response) => {
                hasError.value = true;
                error.value = response.response.data.msg;
                return hasError;
            }
        )
    }

    function deleteRatings(recipeID) {
        return axios.delete(`/api/recipes/${recipeID}/ratings`).then(() => {
        })
    }
    
    return { error, hasError, ratings, postRating, deleteRatings, getRatings};
});