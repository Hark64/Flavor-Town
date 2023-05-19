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
  <nav>
    <div class="menu">
      <div class="f">
        <div class="menu-left">
          <a href="#" class="text-xl">Recipes.com</a>
        </div>

        <div class="menu-center">
          <a href="#" class="text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </a>

          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z">
              </path>
            </svg>
          </a>

          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0">
              </path>
            </svg>
          </a>

          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
          </a>
        </div>

        <div class="menu-right">
          <a href="#">
            <img src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg" class="pfp">
          </a>
        </div>
      </div>
    </div>

    <div class="preview">
      <img src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg" class="pfp" id="prev">
      <div class="text">
        <h1>Shayan Daijavad</h1>
        <p>San Luis Obispo, CA</p>
      </div>
    </div>
  </nav>

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
