<template>
        <div >
            <div v-if="!onePostLoading">
              <h1>Title</h1>
              <p>{{this.post.title}}</p>
              <h1>Description</h1>
              <p>{{this.post.body}}</p>
              <h1>Comments</h1>
              <ul v-for="item in comments" :key="item.id" style="margin-left: 15px">
                <div v-if="item.postId == this.id" style="margin-top: 10px">
                  <h3>{{ item.name }}</h3>
                  <li>{{ item.comment }}</li>
                </div>

              </ul>
            </div>
          <div v-else>Loading. . .</div>
        </div>

</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "PostIdPage",
  data(){
    return {
      id: ''
    }
  },
  methods: {
    ...mapActions({
      fetchComments: 'post/fetchComments',
      fetchPost: 'post/fetchPost',
    }),
  },
  mounted() {
        this.id = this.$route.params.id,
        this.fetchPost(this.id)
        this.fetchComments()
  },


  computed: {
    ...mapState({
      post: state => state.post.post,
      onePostLoading: state => state.post.onePostLoading,
      comments: state => state.post.comments
    }),
  },



}
</script>

<style scoped>

</style>