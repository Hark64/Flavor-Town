<!-- 
  Get it? Its like query and recipe.
  Makes a little section on a page just for a recipe.
-->
<script>
  export default {
  props: ['obj']
  }
</script>


<template>
  <router-link
    :to="{
      name: 'singleRecipe',
      params: {
        id: obj.id
      }
    }">
      <v-card
        class="pa-4"
        flat
        height="200px"
        width="1200px"
        color="white"
        opacity=0.5
      >
          <div>
            <!-- <h1> User: </h1>
            {{obj.user}}
            seems to crash when user is null =( -->
          </div>
          <div>
            {{obj.title}}
          </div>
          <div class="text-caption"> {{obj.description}} </div>
          <img :src="obj.fileName" alt="No Image" style="object-fit: contain;" width="250" height="250"/>
      </v-card>
    </router-link>
</template>