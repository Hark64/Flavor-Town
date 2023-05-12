<!--To use this component, just put
    <SearchBar />
    in the <main> section of your <template> section and import
    import SearchBar from '../components/SearchBar.vue'
    
    This tag is just one thing, it is both the opening and closing tag 
    so you DO NOT NEED <SearchBar></SearchBar>
    I'm not even sure if that will work
-->
<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { reactive } from 'vue';
  import { useSearchStore } from '@/stores/search';

  const store = useSearchStore;

  const state = reactive({
    dialog: false,
    message: '',
    tags: ['Thai', 'Greek', 'Mexican',
        'Sweet', 'Spicy', 'Salty',
        'Quick', 'Easy', 'Pro',
        'Cheap', 'Expensive', 'Free'],
  });

  // state.message = store.message;
  // state.tags = store.tags;

  function sendMessage () {
    const { message, tags } = state;
    store.goSearch({message, tags})
  }

  function clearMessage () {
    console.log(state.message)
    state.message = ''
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

        v-model="state.message"
        :prepend-icon="icon"
        variant="filled"
        clear-icon="mdi-close-circle"
        clearable
        label="Search"
        type="text"
        @click:clear="clearMessage"
      ></v-text-field>

      <RouterLink to="/search">
        <v-btn icon color="gray" dark @click="sendMessage">
          <v-icon>mdi-send-variant</v-icon>
        </v-btn>
      </RouterLink>


      <v-btn icon color="gray" dark @click="state.dialog = true">
        <v-icon>mdi-tag</v-icon>
        <v-dialog
        v-model="state.dialog"
        width="auto">
          <v-card color="black">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-checkbox
                    v-model="state.tags"
                    label="Thai"
                    color="red"
                    value="red"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.tags"
                    label="Greek"
                    color="red-darken-3"
                    value="red-darken-3"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-checkbox
                    v-model="state.tags"
                    label="Mexican"
                    color="indigo"
                    value="indigo"
                    style="width: 150px;"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.tags"
                    label="Sweet"
                    color="indigo-darken-3"
                    value="indigo-darken-3"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-checkbox
                    v-model="state.tags"
                    label="Spicy"
                    color="orange"
                    value="orange"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.tags"
                    label="Salty"
                    color="orange-darken-3"
                    value="orange-darken-3"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-row class="mt-0">
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-checkbox
                    v-model="state.tags"
                    label="Quick"
                    color="primary"
                    value="primary"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.tags"
                    label="Easy"
                    color="secondary"
                    value="secondary"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-checkbox
                    v-model="state.tags"
                    label="Pro"
                    color="success"
                    value="success"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.tags"
                    label="Cheap"
                    color="info"
                    value="info"
                    hide-details
                  ></v-checkbox>
                </v-col>
                <v-col
                  cols="12"
                  sm="4"
                  md="4"
                >
                  <v-checkbox
                    v-model="state.tags"
                    label="Expensive"
                    color="warning"
                    value="warning"
                    style="width: 150px;"
                    hide-details
                  ></v-checkbox>
                  <v-checkbox
                    v-model="state.tags"
                    label="Free"
                    color="error"
                    value="error"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-btn>

    </v-toolbar>
  </v-card>
</template>