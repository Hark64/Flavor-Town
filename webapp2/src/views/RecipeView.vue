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
    
  </main>
</template>