<template>
  <div style="margin: 15px" v-if="comments?.length > 0"><strong>Comments</strong>
    <div v-for="item in comments" :key="item.id">

      <ul v-if="item.postId == post.id">
        <li style="margin: 15px"><strong>{{item.name}}</strong>
          <div v-if=" isShowInput.find(id=> id == item.id)" >
            <input type="text" :value="item.comment" @input="editedValue = $event.target.value">
            <save-icon class="icons" @update="saveEditedValue(item.id)"/>
            <close-icon class="icons" @close="closeInput(item.id)"/>
          </div>
          <div v-else >{{item.comment}} <pencil-icon class="icons" @update="showInput(item.id)"/> </div>
        </li>
       </ul>

     </div>
 </div>
  <form @submit.prevent v-if="isAddedComment" class="add-comment">
    <input v-model="textarea.name" class="comment-input" type="text" placeholder="Name">
    <textarea v-model="textarea.text" class="textarea" name="" id="" cols="30" rows="10"></textarea>
    <my-button  @click="send">Send</my-button>
    <my-button  @click="showCloseTextarea">Close</my-button>
  </form>
    <my-button v-else @click="showCloseTextarea">add comment</my-button>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import PencilIcon from "@/components/Icons/PencilIcon";
import SaveIcon from "@/components/Icons/SaveIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import {mapActions, mapState} from "vuex";
import MyInput from "@/components/UI/MyInput";

export default {
  name: "Conversation",
  components: {CloseIcon, MyInput, SaveIcon, PencilIcon, MyButton },
  props: {
    post: {
      type: Object
    },
    comments: {
      type: Array
    }
  },
  data(){
    return{
      isShowInput: [],
      isAddedComment: false,
      editedValue: '',
      textarea: {
        name: '',
        text: '',
      }

    }
  },
  methods: {
    ...mapActions({
      createComment: 'post/createComment',
      editComment: 'post/editComment'
    }),
    showInput(id){
      this.isShowInput.push(id)
    },
    closeInput(id){
      this.isShowInput= this.isShowInput.filter(item => item !== id)
    },
    saveEditedValue(id){
      this.editComment({id, comment: this.editedValue})
      this.closeInput(id)

    },
    showCloseTextarea(){
      this.isAddedComment = !this.isAddedComment

      this.textarea= {
        name: '',
        text: ''
      }
    },
    send(){
      this.createComment({...this.textarea, postId: this.post.id})
      this.isAddedComment = false
      this.textarea= {
        name: '',
        text: ''
      }
    }
  },

}
</script>

<style scoped>

.add-comment {
  max-width: 400px;
}
.textarea {
  width: 400px;
}
.comment-input {
  height: 20px;
  width: 400px;
}
.icons {
  margin-left: 10px;
}
</style>