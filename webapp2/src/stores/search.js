import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchStore = defineStore('search', () => {

    const hasError = ref(false);
    const error = ref("");
    
    const message = '';
    const tags = [];

    function goSearch({ sentMessage, sentTags}) {
        console.log('Search')
        console.log(sentMessage, sentTags)
        message.value = sentMessage;
        tags.value = sentTags;
    }

    // function loadRecipes() {
    //     return axios.get("/api/recipes").then((_todos) => {
    //         todos.value = _todos.data.todos;
    //         loading.value = false;
    //     });
    // }

    // function updateTodo(todo) {
    //     const idx = todos.value.indexOf(todo);
    //     return axios.put(`/api/todos/${todo.id}`, todo).then((updatedTodo) => {
    //         todos.value[idx] = updatedTodo.data;
    //     });
    // }

    // function deleteTodo(todo) {
    //     const idx = todos.value.indexOf(todo);
    //     return axios.delete(`/api/todos/${todo.id}`).then(() => {
    //         todos.value.splice(idx, 1);
    //     });
    // }

    // function createTodo(todo) {
    //     return axios.post("/api/todos", todo).then((newTodo) => {
    //         todos.value.push(newTodo.data);
    //     });
    // }
    
    return { hasError, error, message, tags, goSearch };
});