<script setup>
import { reactive } from 'vue';
import { useEventStore } from '@/stores/event';

const store = useEventStore();

const state = reactive({
  title: '',
  location: '',
  description: ''
});

function postEvent() {
  const { title, location, description } = state;
  store.postEvent({ title, location, description}).then((error) => {
    if (!error) {
      console.log('Event posted');
    }
  });
  
}

</script>

<template>
    <div>
      <header>
        <h1 class="createevent">Create Event</h1>
      </header>
      <v-form class="form">
    <v-text-field label="Enter Title (Required)" type="title" v-model="state.title"></v-text-field>
    <v-text-field label="Enter Location (Required)" type="location" v-model="state.location"></v-text-field>
    <v-text-field label="Enter Description" type="description" v-model="state.description"></v-text-field>
    <router-link tag="v-btn" to="events" @click="postEvent">Post Event</router-link>
  </v-form>
      
    </div>
</template>

<style>
.createevent{
  position: fixed;
  top: 100px;
  left: 100px;
}
.form{
  position: fixed;
  left: 100px;
  width: 1000px;
}
</style>