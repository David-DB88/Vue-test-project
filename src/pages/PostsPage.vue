<template>
  <div >
    <h3>Search</h3>
    <my-input v-focus :model-value="searchedQuery" @update:model-value="setSearchQuery"/>
    <div class="btns">
      <my-button @click="showDialog">Create Post</my-button>
      <my-select :model-value="selectedOption" @update:model-value="setSelectedOption" :options="postOption"/>
    </div>

    <my-dialog v-model:show="isVisibleDialog">
      <form-posts @createUpdate="addPost"/>
    </my-dialog>
        <post-list :posts="searchedSortedPosts" @remove="removePost" v-if="!isPostLoading"/>

    <div v-else>Loading. . .</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>

</template>

<script>
import PostList from "@/components/PostList";
import FormPosts from "@/components/FormPosts";
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
import {mapActions,mapMutations,mapGetters,mapState} from 'vuex'
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

    }
  },
  methods: {
    ...mapMutations({
      setCurrentPage: 'post/setCurrentPage',
      setSearchQuery: 'post/setSearchedQuery',
      setSelectedOption: 'post/setSelectedOption',
      setPosts: 'post/setPosts'
    }),
    ...mapActions({
      fetchComments: 'post/fetchComments',
      fetchPosts: 'post/fetchPosts',
      deletePost: 'post/deletePost',
      createPost: 'post/createPost',
      loadMorePosts: 'post/loadMorePosts'
    }),
    addPost(post){
      if(!post.id){
        this.createPost(post)
        this.isVisibleDialog = false
      }
          },
    removePost(post){
      if (post.id){
        this.deletePost(post.id)
        this.setPosts( this.posts.filter(item =>item.id !== post.id))
      }

    },
    showDialog(){
      this.isVisibleDialog = true
    },
  },
  computed: {
 ...mapState({
   posts: state => state.post.posts,
   isPostLoading: state => state.post.isPostLoading,
   selectedOption: state => state.post.selectedOption,
   searchedQuery: state => state.post.searchedQuery,
   currentPage: state => state.post.currentPage,
   totalPages: state => state.post.totalPages,
   limit: state => state.post.limit,
   postOption: state => state.post.postOption
 }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchedSortedPosts: 'post/searchedSortedPosts'
    })
  },
  mounted() {
    this.fetchPosts()
    this.fetchComments()

  }
}
</script>

<style>

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
.observer {
  height: 30px;
  background-color: #7171f6;
}

</style>