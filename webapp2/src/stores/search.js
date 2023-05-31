import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSearchStore = defineStore('search', () => {

    const hasError = ref(false);
    const error = ref("");
    
    const showZip = ref(false);
    const results=ref([]);

    const zip = ref('');
    const message = ref('');
    const tags = ref( [{id: 1, label: 'Thai', val: false}, {id: 2, label: 'Greek', val: false}, {id: 3, label: 'Mexican', val: false},
    {id: 4, label: 'Sweet', val: false}, {id: 5, label: 'Spicy', val: false}, {id: 6, label: 'Salty', val: false}, 
    {id: 7, label: 'Quick', val: false}, {id: 8, label: 'Easy', val: false}, {id: 9, label: 'Pro', val: false}, 
    {id: 10, label: 'Cheap', val: false}, {id: 11, label: 'Expensive', val: false}, {id: 12, label: 'Free', val: false}]);

    function $reset(){
        message.value=''
        zip.value = ''
        tags.value=[{id: 1, label: 'Thai', val: false}, {id: 2, label: 'Greek', val: false}, {id: 3, label: 'Mexican', val: false},
        {id: 4, label: 'Sweet', val: false}, {id: 5, label: 'Spicy', val: false}, {id: 6, label: 'Salty', val: false}, 
        {id: 7, label: 'Quick', val: false}, {id: 8, label: 'Easy', val: false}, {id: 9, label: 'Pro', val: false}, 
        {id: 10, label: 'Cheap', val: false}, {id: 11, label: 'Expensive', val: false}, {id: 12, label: 'Free', val: false}]
    }


    function loadResults() {

        return axios.get("/api/recipes").then((_recipes) => {
            var temp = _recipes.data.recipes;
            temp.sort(compareArrays);

            for (var i = temp.length - 1; i >= 0; --i) {
                if (temp[i].user == -1) {
                    temp.splice(i,1);
                }
            }

            console.log(temp);
            results.value = temp;
            //loading.value = false;
        });
    }

    function compareArrays(a, b){
        //cntTagsA = countMatches(a.tags, tags);

        const cntKeyWordsA = countMatches(message.value.split(" "), a.title.split(" "))
                    + countMatches(message.value.split(" "), a.description.split(" "));
        const cntKeyWordsB = countMatches(message.value.split(" "), b.title.split(" "))
                    + countMatches(message.value.split(" "), b.description.split(" "));
        if(cntKeyWordsA==0){
            a.user=-1;
        }
        if(cntKeyWordsB==0){
            b.user=-1;
        }

        if(cntKeyWordsA > cntKeyWordsB){
            return 1;
        } else if(cntKeyWordsA < cntKeyWordsB){
            return -1;
        } else{
            return 0;
        }

                    // if (ob1.strength > ob2.strength) {
                    //     return 1;
                    // } else if (ob1.strength < ob2.strength) { 
                    //     return -1;
                    // }
                
                    // // Else go to the 2nd item
                    // if (ob1.name < ob2.name) { 
                    //     return -1;
                    // } else if (ob1.name > ob2.name) {
                    //     return 1
                    // } else { // nothing to split them
                    //     return 0;
                    // }
    }

    function countMatches(arr1, arr2){
        arr1.sort();
        arr2.sort();
        let count = 0;

        for(let i=0; i<arr1.length; i++){
            for(let j=0; j<arr2.length; j++){
                if(arr1[i] == arr2[j]){
                    count++;
                }
            }
        }

        return count;
    }

    // function loadTodos() {
    //     loading.value = true;
    //     return axios.get("/api/todos").then((_todos) => {
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
    
    return { hasError, error, showZip, results, message, tags, zip, $reset, loadResults };
});