<template>
<button class="btn">
  <slot></slot>
</button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>
.btn {
  padding: 10px;
  border: 1px solid teal;
  background: none;
  cursor: pointer;
}
</style>