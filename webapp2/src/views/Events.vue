<script setup>
import { useEventStore } from '@/stores/event';
import { onMounted} from 'vue';
const store = useEventStore();


onMounted(() => {
        store.getEvent();
        store.getEventInZip();
    });

</script>
<template>
  
  <div class>
    <RouterLink class="postbutton" to="/createevent">Create Event</RouterLink>
    <div> 
    <v-card
    class="mx-auto"
    min-width="1200"
    min-height="210"
    variant="outlined"
    v-for="event in store.eventsListZip" :key="event.title"
    >
    <v-card-item>
      <div>
        <div class="text-overline mb-2">
          <h1> Location: </h1>
          {{event.location}} {{event.zipCode}}
        </div>
        <div class="text-h3 mb-1">
          {{event.title}}
        </div>
        <div > Details: {{event.description}} </div>
      </div>
    </v-card-item>
  </v-card>
  </div>
    <div> 
    <v-card
    class="mx-auto"
    min-width="1200"
    min-height="210"
    variant="outlined"
    v-for="event in store.eventsList" :key="event.title"
    >
    <v-card-item>
      <div>
        <div class="text-overline mb-2">
          <h1> Location: </h1>
          {{event.location}} {{event.zipCode}}
        </div>
        <div class="text-h3 mb-1">
          {{event.title}}
        </div>
        <div > Details: {{event.description}} </div>
      </div>
    </v-card-item>
  </v-card>
  </div>
</div>
</template>


<style scoped>
</style>
