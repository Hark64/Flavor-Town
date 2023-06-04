import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// Store goes to API, gets current user, then sticks it to a variable. 

export const useUserStore = defineStore('user', () => {

    const loggedIn = ref(false);
    const hasError = ref(false);
    const error = ref("");
    const currentUser = ref();
    

    
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

    function signup({firstName, lastName, email, password, zipCode}) {
        return axios.post("/api/signup", {firstName, lastName, email, password, zipCode}).then(
        (response) => {
            console.log(response);
            loggedIn.value = true;
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }


    function logout() {
        return axios.get("/api/logout").then(() => {
            loggedIn.value = false;
        });
    }

    function deleteAccount() {
        return axios.get("/api/logout").then(() => {
            loggedIn.value = false;
        });
    }


    function ping() {
        return axios.get("/api/ping").then(() => {
            loggedIn.value = true;
        }, () => {
            loggedIn.value = false;
        });
    }

    function getUser() {
        return axios.get("/api/user").then(
        (response) => {
            currentUser.value=response.data.user;
            loggedIn.value = true;
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }

    function isEmailRegistered(email) {
        return axios.get(`/api/check-email?email=${email}`).then((response) => {
          const { emailRegistered } = response.data;
          return emailRegistered;
        });
      }
    return { loggedIn, error, hasError, currentUser, login, signup, isEmailRegistered, logout, ping, getUser, deleteAccount};

});