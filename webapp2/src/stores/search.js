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
    const currentTag=ref('');
    const goodTags= ref([]);

    function $reset(){
        message.value='';
    }

    function addTag(){
        if(goodTags.value.includes(currentTag.value.toLowerCase().trim())==false && currentTag.value.trim()!=''){
            goodTags.value.push(currentTag.value.toLowerCase().trim());
        }
        currentTag.value = '';
    }

    function removeTag(index) {
        goodTags.value.splice(index, 1);
    }

    function loadResults() {
        zip.value = zip.value.trim();
        zip.value = zip.value.slice(0, 5);
        message.value = message.value.trim();
        const params = {};

        if (showZip.value==true && zip.value!='' && zip.value.length==5) {
          params.showZip = showZip.value;
          params.zip = zip.value;
        }

        // if(goodTags.value.length>0){
        //     params.tags=true;
        // }

        return axios.get("/api/search", { params }).then((_recipes) => {

            if(message.value=="" && (showZip.value==false || zip.value=='') && goodTags.value.length==0){
                results.value=[];
            } else {
                var temp = _recipes.data.recipes;
                console.log(temp);
                // if(goodTags.value.length>0){
                //     console.log(temp);
                // }
                temp = temp.sort(compareArrays);

                for (var i = temp.length - 1; i >= 0; --i) {
                    if (temp[i].user == -1 || temp[i].user===null) {
                        temp.splice(i,1);
                    }
                }

                results.value = temp;
            }
        });
    }

    function compareArrays(a, b){
        //cntTagsA = countMatches(a.tags, tags);
        let cntKeyWordsA = countMatches(message.value, a.title, true)
                    + countMatches(message.value, a.description, true);
        let cntKeyWordsB = countMatches(message.value, b.title, true)
                    + countMatches(message.value, b.description, true);
        if(a.user !=null && a.user!=-1){
            console.log(a);
            cntKeyWordsA+=countMatches(message.value, a.user.firstName, true)
                        +countMatches(message.value, a.user.lastName, true);
        }
        if(b.user !=null && b.user!=-1){
            console.log(b);
            cntKeyWordsB+=countMatches(message.value, b.user.firstName, true)
                        +countMatches(message.value, b.user.lastName, true);
        }
        if(cntKeyWordsA==0 && message.value!=''){
            a.user=-1;
        }
        if(cntKeyWordsB==0 && message.value!=''){
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

    function countMatches(arr1, arr2, isString){
        if(isString){
            arr1 = arr1.toLowerCase().split(" ");
            arr2 = arr2.toLowerCase().split(" ");
        }
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
    
    return { hasError, error, showZip, results, message, goodTags, currentTag, zip, $reset, addTag, removeTag, loadResults };
});