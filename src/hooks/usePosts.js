import axios from "axios";
import {ref, onMounted} from "vue";


export function usePosts (limit){

    const totalPages = ref(0)
    const posts = ref([])
    const isPostLoading = ref(true)

   const  fetchPosts = async() => {
       try {
           const response = await axios.get('https://json-server-vercel-vue.vercel.app/posts', {
               params: {
                   _page: 1,
                   _limit: limit,

               }
           });
           totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
           posts.value = response.data

       } catch (e) {
           console.log('error',e)
       }
       finally {
           isPostLoading.value = false;
       }
   }
       onMounted(fetchPosts)

    return {
        totalPages,
         posts,
        isPostLoading
    }
}