import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const useRecipesStore = defineStore('recipes', () => {
    const hasError = ref(false);
    const error = ref("");
    

    // function postRecipe({ title, description, formData}) {
    //     return axios.post("/api/recipes", { title, description, formData}).then(
    //     (response) => {
    //         console.log(response);
    //     }, (response) => {
    //         hasError.value = true;
    //         error.value = response.response.data.msg;
    //         return hasError;
    //     });
    // }

    function postRecipe({ title, description, file}) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
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
    
    return { postRecipe };
});