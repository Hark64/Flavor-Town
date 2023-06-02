<script setup>
import SearchBar from '../components/SearchBar.vue'
</script>

<template>
  <div id="background"></div>
  
  
  <div class="search">
    <SearchBar />
  </div>

  <div class="content">
    <h1>For you</h1>
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
  </div>
</template>

<style scoped>
#background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(245, 185, 113);
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('../assets/groceries.webp');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.search {
  display: flex;
  justify-content: center; /* Align items horizontally in the center */
  align-items: center; /* Align items vertically in the center */
  padding: 12rem 0 16rem 0;
}

.content {
  background-color: rgb(255, 217, 152);
  border-radius: 30px 30px 0 0;
  height: 800px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 0 auto;
}

.post{
  width: 20%;
  margin: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  box-sizing: border-box;
}

.post img {
  width: 100%;
  height: 100%;
}
</style>
