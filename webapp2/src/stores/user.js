import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', () => {

    const loggedIn = ref(false);
    const hasError = ref(false);
    const error = ref("");
    

    const signedUp = ref(false);

    function login({ email, password }) {
        console.log("login")
        return axios.post("/api/login", { email, password }).then(
        (response) => {
            console.log(response);
            loggedIn.value = true;
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }
    
    function signup({ firstName, lastName, email, password }) {
        console.log(firstName, lastName, password, email)
        return axios.post("/api/signup", { firstName, lastName, password, email }).then(
        (response) => {
            console.log(response);
            signedUp.value = true;
            return login({email, password});    // Promise chaining. Now front end can work on success of login. 
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }


    function logout() {
        return axios.get("/api/logout").then(() => {
            loggedIn = false;
        });
    }

    return { loggedIn, error, hasError, login, logout, signup };
    

});