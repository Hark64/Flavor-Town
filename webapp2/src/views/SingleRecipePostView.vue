<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRecipesStore } from '@/stores/recipes';
    const recipesStore = useRecipesStore();
</script>

<template>
  <main>
    <div>Recipe ID {{ $route.params.id }}</div>
  </main>
</template>