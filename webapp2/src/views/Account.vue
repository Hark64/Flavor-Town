<script>

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

</style>