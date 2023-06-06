<template>
  <div v-if="posts?.length > 0">
    <transition-group name="post-list">
    <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
        :composition="this.composition"
    />
  </transition-group>
  </div>

  <div v-else style="color: red">There is no any posts</div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true
    },
    composition: {
      type: Boolean
    }
  }
}
</script>

<style scoped>

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 1s;
}
.post-list-enter, .post-list-leave-to /* .post-list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.post-list-move {
  transition: transform 1s;
}

</style>