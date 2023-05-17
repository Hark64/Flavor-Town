<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { reactive } from 'vue';
  import { useSearchStore } from '@/stores/search';
  import { storeToRefs } from 'pinia';

  const store = useSearchStore;

  const state = reactive({
    dialog: false,
    // message: '',
    // tags: [{l: 'Thai', v: false}, {l: 'Greek', v: false}, {l: 'Mexican', v: false},
    //  {l: 'Sweet', v: false}, {l: 'Spicy', v: false}, {l: 'Salty', v: false}, 
    //  {l: 'Quick', v: false}, {l: 'Easy', v: false}, {l: 'Pro', v: false}, 
    //  {l: 'Cheap', v: false}, {l: 'Expensive', v: false}, {l: 'Free', v: false}]
  });

  // state.message = store.message;
  // state.tags = store.tags;

  // function sendMessage () {
  //   const { message, tags } = state;
  //   console.log(state.message)
  //   store.goSearch({message, tags}).then((error) => {
  //     if (!error) {
  //       state.dialog = false;
  //     }
  //   });
  // }

  function clearMessage () {
    //console.log(state.message)
    //state.message = ''

    //store.$reset();
    console.log(store.message)
    store.message='';
  }

</script>




<template>
<v-card
    class="pa-4"
    flat
    height="100px"
    color="transparent"
    opacity=0.5
  >
    <v-toolbar
      round
      floating
      color="transparent"
    >
      <v-text-field
        hide-details
        prepend-inner-icon="mdi-magnify"
        single-line

        v-model="store.message"
        variant="filled"
        clear-icon="mdi-close-circle"
        clearable
        label="Search"
        type="text"
        @click:clear="clearMessage"
      ></v-text-field>


        <v-btn icon color="gray" dark to="/search">
          <v-icon>mdi-send-variant</v-icon>
        </v-btn>



      <v-btn icon color="gray" dark @click="state.dialog = true">
        <v-icon>mdi-tag</v-icon>
        <v-dialog
        v-model="state.dialog"
        width="auto">
          <v-card color="black">
            <v-container fluid>
              <v-col v-for="tag in store.tags" :key="tag.id">
                      <v-checkbox
                        v-model="tag.val"
                        color="blue"
                        :id="index"
                        :label="tag.label"
                        value="blue"
                        hide-details
                      ></v-checkbox>
              </v-col>
            </v-container>
          </v-card>
        </v-dialog>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>