<template>

  <form class="registration" @submit.prevent>
      <h2>Type your name</h2>
    <my-input type="text" v-model="name"  placeholder="Name"/>
    <my-button style="margin-top: 15px" @click="login">Submit</my-button>
  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {MyButton, MyInput},
  data() {
    return {
      name: ''
    }
  },
  methods: {
    ...mapMutations({
      setUser: 'login/setUser'
    }),
    login() {

      if (this.name) {
        this.setUser(this.name)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.registration {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>