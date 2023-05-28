<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted} from 'vue';
const store = useUserStore();

onMounted(() => {
        store.getUser();    // TODO- idk why this doesnt work
        console.log(store.currentUser);
        
});
</script>

<template>

<nav>

    <div class="preview">
      <img src="https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg" class="pfp" id="prev">
      <div class="text">
        <h1>Shayan Daijavad</h1>
        <p>San Luis Obispo, CA</p>
      </div>
    </div>
  </nav>

<body>
  <main>
    <div class="button-container">
      <button class="recipes-button">Recipes</button>
    </div>
    <div class="posts-container">
      <div class="post">
        <img src="../assets/post.png" alt="Post 1">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 2">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 3">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 4">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 5">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 6">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 7">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 8">
      </div>
      <div class="post">
        <img src="../assets/post.png" alt="Post 9">
      </div>
    </div>
  </main>
</body>
</template>

<style scoped>
/* Global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  font-size: 16px;
}

header {
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


#hamburger-btn {
  margin-right: 20px;
}

#logout-btn {
  width: 165px;
  margin-right: 20px;
}

.header-left {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin: 10px;
}

.header-left img {
  width: 80px;
  height: 80px;
  border-radius: 50;
  margin: 20px;
}

h2 {
  margin-right: 20px;
}


.profile-info {
  display: flex;
  align-items: center;
  margin-left: 10%;
}

.profile-info img {
  width: 80px;
  height: 80px;
  border-radius: 50;
  margin: 20px;
}

.button-container {
  text-align: center;
}

.recipes-button {
  font-size: 24px;
  padding: 20px 40px;
  border-radius: 20px;
  border: none;
  background-color: lightgrey;
  margin: 20px;
  margin-bottom: 60px;
}



/* Layout for profile page */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.posts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 90%;  
  margin: 0 auto;
}

.posts-container .post {
  width: calc(33.33% - 20px);
  margin: 10px;
  box-sizing: border-box;
}

.posts-container img {
  width: 100%;
}

/* Layout for posts */
.post {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-description {
  padding: 10px;
}

.post-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.post-text {
  font-size: 14px;
  color: #666666;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
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

.hamburger-line {
  width: 100%;
  height: 4px;
  background-color: black;
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