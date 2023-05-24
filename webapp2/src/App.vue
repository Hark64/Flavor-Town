<script setup>
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
  loggedIn: false
});

function login() {
  const { email, password } = state;
  store.login({ email, password }).then((error) => {
    if (!error) {
      state.dialog = false;
      console.log('Logged in');
    }
  });
}

function signup() {
  const { firstName, lastName, email, zipCode, password } = state;
  store.signup({ firstName, lastName, email, zipCode, password }).then((error) => {
    if (!error) {
      state.signupDialog = false;
      state.loggedIn = !state.loggedIn;
      console.log('Signed up');
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

</script>


<template>
  <div>
    <div class="topBar">
      <v-btn class="hamburger" @click="toggleMenu">
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
        <div class="hamburger-line"></div>
      </v-btn>

      <div class="menu" :class="{ 'menu-open': isMenuOpen }">
        <button class="close-button" @click="toggleMenu">&times;</button>
        <ul>
          <li @click="navigateTo('home')"><a>Home</a></li>
          <li @click="navigateTo('events')"><a>Events</a></li>
          <li @click="navigateTo('account')"><a>Account</a></li>
          <li @click="navigateTo('postrecipes')"><a>Post Recipes</a></li>
          <li @click="navigateTo('recipes')"><a>Recipes</a></li>
        </ul>
      </div>

      <div class="buttonsContainer">
        <v-btn>Login
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
        <v-btn>Signup
          <v-dialog v-model="state.signupDialog" activator="parent" width="400">
            <v-card>
              <v-card-text>
                <v-alert density="compact" type="warning" icon="$warning" title="There was an issue signing up."
                  v-if="store.hasError">{{ store.error }}</v-alert>
                <v-form class="mt-2">
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
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    navigateTo(route) {
      this.$router.push({ name: route });
      this.isMenuOpen = false;
    }
  }
};
</script>

<style>
.topBar {
  margin-bottom: 4rem;
}

.hamburger {
  top: 20px;
  left: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.hamburger-line {
  width: 100%;
  height: 4px;
  background-color: rgb(237, 221, 221);
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: lightgray;
  /* Adjust the background color as needed */
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 2;
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

.container {
  display: flex;
  justify-content: center;
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