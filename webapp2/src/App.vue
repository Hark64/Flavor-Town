<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { reactive } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import Signup from './components/Signup.vue'
import { useUserStore } from '@/stores/user';

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
      console.log('Logged in');
    }
  });
}

function signup() {
  const { firstName, lastName, email, password } = state;
  store.signup({ firstName, lastName, email, password }).then((error) => {
    if (!error) {
      state.dialog = false;
      state.loggedIn = !state.loggedIn;
      console.log('Signed in');
    }
  });
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/todos" v-if="store.loggedIn">Todos</RouterLink>
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
                <v-btn v-if="!state.showLogin" color="primary" @click="signup">Complete Signup</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        <v-btn v-if="state.loggedIn">Logged In (Going to be logout in future)
        </v-btn>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>