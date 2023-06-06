<template>
  <div >

    <div  v-if="!isPostLoading">
      <h3>Search</h3>
      <my-input  v-model="searchedQuery"/>
      <div class="btns">
        <my-select v-model="selectedOption" :options="postOption"/>
      </div>
      <post-list :posts="searchedSortedPosts" :composition="true"/>
    </div>

    <div v-else>Loading. . .</div>

  </div>

</template>

<script>
import PostList from "@/components/PostList";
import FormPosts from "@/components/FormPosts";
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
import {useSortedPosts} from "@/hooks/sortedPosts";
import {usePosts} from "@/hooks/usePosts";
import {useSearchedSortedPosts} from "@/hooks/useSearchedSortedPosts";
export default {
  components: {
    MyInput,
    MyButton,
    PostList, FormPosts
  },
  name: "App",
  data(){
    return{
      isVisibleDialog: false,
      postOption: [
        {value: 'title', name: 'Post Name'},
        {value: 'body', name: 'Post Description'}
      ]
    }
  },
  setup(props){
     const {totalPages, posts, isPostLoading}= usePosts(10)
    const {selectedOption, sortedPosts} = useSortedPosts(posts)
    const {searchedSortedPosts,searchedQuery} = useSearchedSortedPosts(sortedPosts)

    return{
      totalPages,
      isPostLoading,
      selectedOption,
      searchedSortedPosts,
      searchedQuery
    }
  }
}
</script>

<style>

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

</style>