import {computed, ref} from "vue";


export function useSearchedSortedPosts(sortedPosts){
    const searchedQuery = ref('')
    const searchedSortedPosts = computed(()=>{
        return sortedPosts.value.filter(item=>item.title.toLowerCase().includes(searchedQuery.value.toLowerCase()))
    })
    return{
        searchedSortedPosts,
        searchedQuery
    }
}