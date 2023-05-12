import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';


export const useEventStore = defineStore('event', () => {

    const hasError = ref(false);
    const error = ref("");
    const events = ref([{title: "testing", location: "slo", description:"testing again"}, 
    {title: "testing 2", location: "slo", description:"testing again"},
    {title: "testing 3", location: "slo", description:"testing again"}]);

    function postEvent({ title, location, description }) {
        return axios.post("/api/createevent", { title, location, description }).then(
        (response) => {
            console.log(response);
        }, (response) => {
            hasError.value = true;
            error.value = response.response.data.msg;
            return hasError;
        });
    }
    return {events, error, hasError, postEvent};

});


