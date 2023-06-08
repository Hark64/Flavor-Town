import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// Store goes to API, gets current user, then sticks it to a variable. 

export const useUserStore = defineStore('user', () => {

    const loggedIn = ref(false);
    const hasError = ref(false);
    const error = ref("");
    const currentUser = ref();
    const followers = ref([]);
    

    
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
        console.log("sign up email in user store", email);
        return axios.post("/api/signup", {firstName, lastName, email, password, zipCode}).then(
        (response) => {
            console.log(response);
            loggedIn.value = true;
        }, (response) => {
            console.log("error signing up, ", response.response.data.msg);
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

    function saveEdit({id, firstName, lastName, email, zipCode}) {
        console.log("in save edit, id is:", id);
        return axios.put("/api/user", {id, firstName, lastName, email, zipCode}).then(
        (response) => {
            console.log(response);
            loggedIn.value = true;
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }


     function  isEmailRegistered(email) {
        return false
        // TODO - not waiting for the return. need to somehow wait. 
          //return axios.get(`/api/check-email?email=${email}`).then((response) => {
          //const { emailRegistered } = response.data;
        //   console.log("email registered ", {emailRegistered}, {email});

        //   return emailRegistered;
        // });
      }

    function deleteUser(id) {
        return axios.delete(`/api/user/${id}`).then(() => {
            console.log("user deleted in webapp2 user store")
        })
    }

    function followUser(userId){
        console.log("following user ", userId)
        return axios.post(`/api/user/follow/${userId}`).then(() => {
        })
    }

    function unfollowUser(userId){
        console.log("unfollowing user ", userId)
        return axios.delete(`/api/user/follow/${userId}`).then(() => {
        })
    }


    function getIsFollowing(userId){
        //return axios.get(`/api/user/follow/${userId}`).then(() => {
            // TODO Return true or false if we are following this account
            // TODO make API 
        //})
    }

    function getAllFollowers(){
        console.log("requesting users in user store");
        return axios.get('/api/user/followers').then(
            // TODO pass information back
            (response) => {
                console.log("GOT RESPONSE GETALLFOLLOWERS",response.data.users);
                followers.value=response.data.users;
            }, (response) => {
                console.log("GOT ERROR RESPONSE GETALLFOLLOWERS",response.response.data.msg);

                hasError.value = true;
                error.value = response.response.data.msg;
                return hasError;
            })
    }

  

    return { loggedIn, error, hasError, currentUser, followers, login, signup, isEmailRegistered, logout, ping, getUser, saveEdit, deleteUser, followUser, unfollowUser, getIsFollowing, getAllFollowers};


});