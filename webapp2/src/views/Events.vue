<script setup>
import { useEventStore } from '@/stores/event';

const store = useEventStore();


</script>
<template>
  <div class>
    <RouterLink class="postbutton" to="/createevent">Create Event</RouterLink>
    <div v-for="event in store.events" :key="event.title">
      {{event.title}}
      {{event.location}}
      {{event.description}}
    </div>
  </div>
</template>

<style>
  .postbutton {
    display: inline-block;
    padding: 10px 20px;
    border: 1px solid #d9c9c9;
    border-radius: 4px;
    position: fixed;
    top: 100px;
    left: 100px;
  }
</style>
