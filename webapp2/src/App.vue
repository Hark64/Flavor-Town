<script setup>
import { RouterLink, RouterView, createRouter } from 'vue-router'
import { reactive, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
// import Signup from './components/Signup.vue'
import { useUserStore } from '@/stores/user';
import AccountPage from './views/Account.vue';

const store = useUserStore();

const state = reactive({
  dialog: false,
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  showLogin: true,
  loggedIn: false
});

function toggleSignup() {
  state.showLogin = !state.showLogin;
}

function login() {
  const { email, password } = state;
  store.login({ email, password }).then((error) => {
    if (!error) {
      state.dialog = false;
      state.loggedIn = !state.loggedIn;
    }
  });
}

function signup() {
  const { firstName, lastName, email, password } = state;
  store.signup({ firstName, lastName, email, password }).then((error) => {
    if (!error) {
      state.dialog = false;
      state.loggedIn = !state.loggedIn;
    }
  });
}

onMounted(() => {
  store.ping();
});

</script>


<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="right-menu">
          <RouterLink to="/account">Account</RouterLink>
          <div class="login-buttons">
            <v-btn v-if="!state.loggedIn">Login
              <v-dialog v-model="state.dialog" activator="parent" width="400">
                <v-card>
                  <v-card-text>
                    <v-alert density="compact" type="warning" icon="$warning" title="There was an issue logging in."
                      v-if="store.hasError">{{ store.error }}</v-alert>
                    <v-form class="mt-2" v-if="state.showLogin">
                      <v-text-field label="Email address" type="email" v-model="state.email"></v-text-field>
                      <v-text-field label="Password" type="password" v-model="state.password">
                      </v-text-field>
                    </v-form>
                    <v-form v-if="!state.showLogin">
                      <v-text-field label="First Name" type="firstName" v-model="state.firstName"></v-text-field>
                      <v-text-field label="Last Name" type="lastName" v-model="state.lastName"></v-text-field>
                      <v-text-field label="Email address" type="email" v-model="state.email"></v-text-field>
                      <v-text-field label="Password" type="password" v-model="state.password"></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions class="d-flex flex-row-reverse ma-2">
                    <v-btn v-if="state.showLogin" color="primary" @click="login">Login</v-btn>
                    <v-btn v-if="state.showLogin" color="primary" @click="toggleSignup">Signup</v-btn>
                    <v-btn v-if="!state.showLogin" color="primary" @click="signup">Finish Signup</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
            <v-btn v-if="state.loggedIn">Logged In
            </v-btn>
          </div>
        </div>
      </nav>
    </div>


    <router-view></router-view>
  </header>
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
body {
  background-color: #ffffff;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.hamburger-line {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  /* Add the following styles to move the account and login buttons to the top right */
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.search-bar {
  width: 300px; /* Adjust the width as needed */
}

.menu ul {
  list-style-type: none;
  padding: 0;
  margin: 50px 20px;
}

.menu li {
  margin-bottom: 20px;
}

.menu a {
  text-decoration: none;
  color: black;
  font-size: 18px;
}
</style>
