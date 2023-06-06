<template>
<div class="navbar">
  <h1 @click="$router.push('/')">Vue</h1>
  <div class="navbar_btns">
    <my-button @click="$router.push('/posts')" style="margin-left: 15px" >Posts Page</my-button>
    <my-button @click="$router.push('/composition')" style="margin-left: 15px" >Composition</my-button>
    <my-button @click="logout" style="margin-left: 15px" >Logout</my-button>
  </div>
</div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import { mapMutations } from 'vuex'
export default {
  name: "NavBar",
  components: {MyButton},
  methods: {
    ...mapMutations({
      setLogOut: 'login/LogOut'
    }),
    logout() {
      this.setLogOut()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar{
  display: flex;
  justify-content: space-between;
  height: 50px;
  background-color: #5ed3f8;
  align-items: center;
  padding: 0 15px;
}

</style>