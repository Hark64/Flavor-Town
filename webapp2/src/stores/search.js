import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchStore = defineStore('search', () => {

    const hasError = ref(false);
    const error = ref("");
    
    const message = ref('');
    const tags = ref( [{id: 1, label: 'Thai', val: false}, {id: 2, label: 'Greek', val: false}, {id: 3, label: 'Mexican', val: false},
    {id: 4, label: 'Sweet', val: false}, {id: 5, label: 'Spicy', val: false}, {id: 6, label: 'Salty', val: false}, 
    {id: 7, label: 'Quick', val: false}, {id: 8, label: 'Easy', val: false}, {id: 9, label: 'Pro', val: false}, 
    {id: 10, label: 'Cheap', val: false}, {id: 11, label: 'Expensive', val: false}, {id: 12, label: 'Free', val: false}]);

    function $reset(){
        message.value=''
        tags.value=[{id: 1, label: 'Thai', val: false}, {id: 2, label: 'Greek', val: false}, {id: 3, label: 'Mexican', val: false},
        {id: 4, label: 'Sweet', val: false}, {id: 5, label: 'Spicy', val: false}, {id: 6, label: 'Salty', val: false}, 
        {id: 7, label: 'Quick', val: false}, {id: 8, label: 'Easy', val: false}, {id: 9, label: 'Pro', val: false}, 
        {id: 10, label: 'Cheap', val: false}, {id: 11, label: 'Expensive', val: false}, {id: 12, label: 'Free', val: false}]
    }

    // function goSearch({ sentMessage, sentTags}) {
    //     console.log('Search')
    //     console.log(sentMessage, sentTags)
    //     message.value = sentMessage;
    //     tags.value = sentTags;
    // }

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
    
    return { hasError, error, message, tags, goSearch, $reset };
});