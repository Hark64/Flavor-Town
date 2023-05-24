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
  
</template>

<style>
  .postbutton {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid #d9c9c9;
    border-radius: 4px;
    position: fixed;
    top: 20px;
    left: 100px;
  }

  h1 {
  display: inline-block;
  margin: 5px;
  font-size: 15px;
  font-family: "Playfair Display", serif;
  color: #338d33;
  border-bottom: 4px double black;
}


</style>
