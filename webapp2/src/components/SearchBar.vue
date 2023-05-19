<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { reactive } from 'vue';
  import { useSearchStore } from '@/stores/search';

  const store = useSearchStore();

  const state = reactive({
    dialog: false,
  });

  function clearMessage () {
    store.$reset();
  }

</script>


<template>
<v-card
    class="pa-4"
    flat
    height="200px"
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

        <v-btn icon color="gray" dark @click="store.showZip = !store.showZip">
          <v-icon>{{ store.showZip ? 'mdi-map-marker': 'mdi-map-marker-off'}}</v-icon>
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

        <v-text-field v-if="store.showZip"
          hide-details
          prepend-inner-icon="mdi-magnify"
          single-line

          v-model="store.zip"
          variant="filled"
          clear-icon="mdi-close-circle"
          clearable
          label="Zipcode"
          counter
          maxlength="5"
          type="number"
          @click:clear="clearMessage"
        ></v-text-field>
  </v-card>
</template>