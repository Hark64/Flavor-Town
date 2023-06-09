<script setup>
import { reactive } from 'vue';
import { useEventStore } from '@/stores/event';

const store = useEventStore();

const state = reactive({
  title: '',
  location: '',
  description: '',
  zipCode: ''
});

// Function to validate the zip code
function validateZipCode(zipCode) {
  const regex = /^\d{5}$/; // Regular expression to match 5 digits
  return regex.test(zipCode);
}

// when user clicks post, posts to database and to events page
// check
function handleEvent() {
  const { title, location, description, zipCode } = state;
  if (title.trim() === '') {
    alert('Please enter a title.');
    return;
  }

  if (location.trim() === '') {
    alert('Please enter a location.');
    return;
  }

  if (zipCode.trim() === '') {
    alert('Please enter a zip code.');
    return;
  }
  
  if (!validateZipCode(zipCode)) {
    alert('Please enter a valid 5-digit zip code.');
    return;
  }

  if (description.trim() === '') {
    alert('Please enter a description.');
    return;
  }
  store.postEvent({ title, location, description, zipCode}).then((error) => {
    if (!error) {
        store.getEvent().then((error) => {
        if (!error) {
          console.log('Event posted');
        }
      });
      store.getEventInZip().then((error) => {
        if (!error) {
          console.log('Event in zip posted');
        }
      });

      console.log('Event posted to database');
    }})}

</script>

<template>
    <div>
      <header>
        <h1 class="createevent">Create Event</h1>
      </header>
      <v-form class="form">
    <v-text-field label="Enter Title (Required)" type="title" v-model="state.title"></v-text-field>
    <v-text-field label="Enter Location (Required)" type="location" v-model="state.location"></v-text-field>
    <v-text-field label="Enter Zip Code (Required)" type="zipCode" v-model="state.zipCode"></v-text-field>
    <v-text-field label="Enter Description (Required)" type="description" v-model="state.description"></v-text-field>
    <router-link tag="v-btn" to="events" @click="handleEvent">Post Event</router-link>
  </v-form>
      
    </div>
</template>

<style scoped>
.createevent{
  position: fixed;
  top: 150px;
  left: 100px;
}
.form{
  position: fixed;
  left: 100px;
  width: 1000px;
}
</style>