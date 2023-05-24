<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    const recipesStore = useRecipesStore();

    onMounted(() => {
        recipesStore.loadRecipes();
    });

</script>
    
<template>
  <main>
    <v-card class="mx-auto" min-width="1200" variant="outlined" v-for="recipe in recipesStore.recipes" :key="recipe.id">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            <h1> Title </h1>
            {{recipe.title}}
          </div>
          <div class="text-h6 mb-1">
          {{recipe.description}}
          </div>
          <img :src="recipe.fileName" alt="No Image" style="object-fit: contain;" width="500" height="500"/>
        </div>
      </v-card-item>
    </v-card>
  </main>
</template>