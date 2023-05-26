<script setup>
import { useEventStore } from '@/stores/event';
import { onMounted, reactive } from 'vue';
const store = useEventStore();


onMounted(() => {
        store.getEvent();
    });

</script>
<template>
  <div class>
    <RouterLink class="postbutton" to="/createevent">Create Event</RouterLink>
    <v-card
    class="mx-auto"
    min-width="1200"
    variant="outlined"
    v-for="event in store.eventsList" :key="event.title"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          <h1> Location: </h1>
          {{event.location}}
        </div>
        <div class="text-h6 mb-1">
          {{event.title}}
        </div>
        <div class="text-caption"> {{event.description}} </div>
      </div>
    </v-card-item>
  </v-card>
  </div>
  
</template>


<style scoped>
</style>
