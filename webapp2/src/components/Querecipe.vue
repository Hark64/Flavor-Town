<!-- 
  Get it? Its like query and recipe.
  Makes a little section on a page just for a recipe.
-->
<script>
  export default {
  props: ['obj', 'width', 'height']
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
        :height=height
        :width=width
        color="black"
        opacity=0.5
      >
          <div>
            {{obj.title}}
          </div>
          <div class="text-caption"> {{obj.description}} </div>
          <img :src="obj.fileName" alt="No Image" style="object-fit: contain;" width="250" height="250"/>
          <div v-if="obj.user!=null">
            {{obj.user.zipCode}}
          </div>
          <div v-if="obj.user!=null">
            By: {{obj.user.firstName}} {{obj.user.lastName}}
          </div>
      </v-card>
    </router-link>
</template>