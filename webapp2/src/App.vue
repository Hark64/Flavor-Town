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


  <main>
    <RouterView />
  </main>
</template>

<style>
nav {
  position: relative;
  background-color: white;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.menu {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 2rem;
}

.f {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-left {
  display: flex;
  align-items: center;
}

.menu-left a {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
  padding: 0.5rem;
  background-color: lightgrey;
  border-radius: 8px;
}

.menu-center {
  display: flex;
  justify-content: space-between;
}

.menu-center>* {
  margin-right: 12px;
}

.menu-center>*:last-child {
  margin-right: 0;
}

.menu-center a svg {
  width: 1.5rem;
  height: 1.5rem;
}

.pfp {
  border-radius: 50%;
  width: 6rem;
}

.preview .text {
  justify-content: flex;
}

main {
  padding: 2rem 1rem;
}

.preview {
  padding-left: 12rem;
}

#prev {
  width: 12rem;
}
</style>
