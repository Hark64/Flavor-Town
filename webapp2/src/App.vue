<script setup>
import router from './router/index.js'
import { RouterLink, RouterView } from 'vue-router'
import { reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const store = useUserStore();

const state = reactive({    // Kind of like a class- info we want to keep around.
  loginDialog: false,
  signupDialog: false,
  error: '',
  hasError: false,
  firstName: '',
  lastName: '',
  email: '',
  zipCode: '',
  password: '',
  showLogin: true,
  loggedIn: false,
  isButtonDisabled: false,
  searchQuery: '',
  isMenuOpen: false,

  methods: {
    // TO DO make method in app.vue to export. something like login state.
  }

});

function login() {
  const { email, password } = state;
  store.login({ email, password }).then((error) => {
    if (!error) {
      state.loginDialog = false;
      state.loggedIn = true;
      console.log('Logged in');
    }
  });
}

function signup() {
  const { firstName, lastName, email, zipCode, password } = state;
  store.signup({ firstName, lastName, email, zipCode, password }).then((error) => {
    if (!error) {
      state.signupDialog = false;
      state.loggedIn = true;
      console.log('Signed up');
      store.login({email, password});
    }
  });
}

function switchToSignup() {
  state.loginDialog = false;
  state.signupDialog = true;
}

function switchToLogin() {
  state.loginDialog = true;
  state.signupDialog = false;
}

function logOut() {
  store.logout().then((error) => {
    if (!error) {
      state.loggedIn = false;
      console.log('Logged out');
    }
  });
}

function toggleMenu(){
  state.isMenuOpen = !state.isMenuOpen;
}

function navigateTo(route) {
  if (!state.loggedIn && (route  != '/') && (route != '/recipes')){
    state.loginDialog = true;
    return;
  }
  router.push(route);
  toggleMenu(); 
}
</script>


<template>
  <head>
    <!-- Other meta tags, stylesheets, etc. -->
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
  </head>

  <div>
    <div class="topBar">
      <div class="barLeft">
        <v-btn class="hamburger" @click="toggleMenu" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <h1 class="logo" @click="navigateTo('/')">FlavorTown.com</h1>
      </div>

      <div class="menu" :class="{ 'menu-open': state.isMenuOpen }">
        <button class="close-button" @click="toggleMenu">&times;</button>
        <ul>
          <h1 class="menuBtn" @click="navigateTo('/')"><a>Home</a></h1>
          <h1 class="menuBtn" @click="navigateTo('/events')"><a>Events</a></h1>
          <h1 class="menuBtn" @click="navigateTo('/account')"><a>My Account</a></h1>
          <h1 class="menuBtn" @click="navigateTo('/postrecipes')"><a>Post Recipes</a></h1>
          <h1 class="menuBtn" @click="navigateTo('/recipes')"><a>My Recipes</a></h1>
        </ul>
      </div>

      <div class="buttonsContainer">
        <v-btn class="signLogBtn" id="login" v-if=!state.loggedIn>Login
          <v-dialog v-model="state.loginDialog" activator="parent" width="400">
            <v-card>
              <v-card-text>
                <v-alert density="compact" type="warning" icon="$warning" title="There was an issue logging in."
                  v-if="store.hasError">{{ store.error }}</v-alert>
                <v-form class="mt-2">
                  <v-text-field label="Email address" type="email" v-model="state.email"></v-text-field>
                  <v-text-field label="Password" type="password" v-model="state.password">
                  </v-text-field>
                  <p>Don't have an account?</p> <v-btn @click="switchToSignup">Sign Up</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex flex-row-reverse ma-2">
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-btn>
        <v-btn class="signLogBtn" id="signup" v-if=!state.loggedIn>Signup
          <v-dialog v-model="state.signupDialog" activator="parent" width="400">
            <v-card>
              <v-card-text>
                <v-alert density="compact" type="warning" icon="$warning" title="There was an issue signing up."
                  v-if="store.hasError">{{ store.error }}</v-alert>
                <v-form class="mt-2">
                  <!-- Make a checkbox. -->
                  <p>By signing up for FlavorTown.com, you are consenting to us using your location.</p> 
                  <v-text-field label="First Name" type="firstName" v-model="state.firstName"></v-text-field>
                  <v-text-field label="Last Name" type="lastName" v-model="state.lastName"></v-text-field>
                  <v-text-field label="Email address" type="email" v-model="state.email"></v-text-field>
                  <v-text-field label="ZipCode" type="zipcode" v-model="state.zipCode"></v-text-field>
                  <v-text-field label="Password" type="password" v-model="state.password">
                  </v-text-field>
                  <p>Already have an account?</p> <v-btn @click="switchToLogin">Log In</v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions class="d-flex flex-row-reverse ma-2">
                <v-btn color="primary" @click="signup">sign up</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        <v-btn v-if = state.loggedIn @click="logOut">Logout
        </v-btn>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>



<style>
li{
  color: white;
}
.logo {
  font-family: 'Pacifico', cursive;
  color: rgb(245, 185, 113);
  font-size: 42px;
  margin-left: 8px;
  cursor: pointer;
}

.topBar {
  margin-bottom: 4rem;
}

.barLeft {
  display: flex;
  align-items: center; /* Center the items vertically */
}

.hamburger {
  width: 40px;
  /* Adjust the width and height as needed */
  height: 40px;
  /* Add padding and box-sizing to adjust the size of the lines */
  margin: 20px;
  /* Add background color and other styles as desired */
  background-color: rgb(245, 185, 113);
  color: white;
  border-radius: 10%;

}

.hamburger-line {
  /* Set the height, width, and background color of each line */
  display: block;
  height: 4px;
  width: 100%;
  background-color: black;
  /* Add margin to separate the lines */
  margin-bottom: 6px;
}


.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: lightgrey;
  /* Adjust the background color as needed */
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 2;
  border-radius: 0px 10px 10px 0px;
}

.menu-open {
  transform: translateX(0);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
}

.menuBtn {
  margin: 10px;
  margin-left: 20px;
  cursor: pointer;
}

.signLogBtn {
  margin-left: 20px;
  width: 100px;
  height: 40px;
  font-size: 16px;
}


#login {
  background-color: rgb(245, 185, 113);
  color: white;
  height: 40px;
}

#signup {
  height: 40px;
}

.menu ul {
  list-style-type: none;
  padding: 0;
}

.menu li {
  margin-bottom: 20px;
}

.menu a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}

.buttonsContainer {
  position: fixed;
  top: 20px;
  right: 20px;
}
</style>