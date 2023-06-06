<template>
  <form @submit.prevent>
    <h1 v-if="!creatUpdatePost.id">Create post</h1>
    <h1 v-else>Edit post</h1>
    <my-input v-focus v-model="creatUpdatePost.title"  placeholder="name"/>
    <my-input v-model="creatUpdatePost.body" class="input" placeholder="description"/>
    <my-button class="btn" style="align-self: self-end; margin-top: 15px" @click="createUpdatePost">Submit</my-button>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
export default {
  name: "FormPosts",
  components: {MyInput},
  props: {
    post: {
      required: false
    }
  },
  data(){
    return {
      creatUpdatePost: {
        id: this.post?.id ? this.post.id: null ,
        title: this.post && this.post.title,
        body: this.post && this.post.body
      }

    }
  },
  methods: {
    createUpdatePost() {
      this.$emit('createUpdate', this.creatUpdatePost)
      if(!this.creatUpdatePost.id){
        this.creatUpdatePost = {
          title: '',
          body: ''
        }
      }

    },


  }
}
</script>

<style scoped>


form {
  display: flex;
  flex-direction: column;
}
</style>