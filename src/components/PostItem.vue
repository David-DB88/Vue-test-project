<template>
  <div class="post">

    <div class="post__section">
      <div><strong>Title</strong> :{{post.title}}</div>
      <div style="margin-top: 10px"><strong>Description</strong> :{{post.body}}</div>
        <conversation :post="post" :comments="comments"/>
    </div>

    <div class="post__btns">
      <my-button class="btns" @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      <my-button class="btns" @click="showDialog" v-if="!this.composition">Edit</my-button>
      <my-dialog v-model:show="isVisibleDialog">
        <form-posts @createUpdate="updatePost" :post="post"/>
      </my-dialog>
      <my-button class="btns" @click="deletePost(post)" v-if="!this.composition">Delete</my-button>
    </div>
  </div>

</template>

<script>
import MyButton from "@/components/UI/MyButton";
import FormPosts from "@/components/FormPosts";
import {mapActions, mapState} from "vuex";
import Conversation from "@/components/Conversation";
export default {
  name: "PostItem",
  components: {Conversation, FormPosts, MyButton},
  data(){
    return{
      isVisibleDialog: false,

    }
  },
  props: {
    post: {
      type: Object
    },
    composition: {
      type: Boolean
    }
  },
  methods: {
    ...mapActions({
      editPost: 'post/editPost',
    }),
    updatePost(post) {
      this.editPost(post)
      this.isVisibleDialog = false
    },
    deletePost(event){
      this.$emit('remove', event)
    },
    showDialog(){
      this.isVisibleDialog = true
    },
  },
  computed: {
    ...mapState({
      comments: state => state.post.comments,
    })
  }

}
</script>

<style scoped>
.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post__section {
  max-width: 700px;
}
.post__btns {
  display: flex;
  flex-direction: column;
}
.btns {
  margin-left: 10px;
}
</style>