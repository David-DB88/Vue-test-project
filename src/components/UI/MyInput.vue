<template>
  <input :value="modelValue" @input="updateInput" class="input" :placeholder="placeholder">
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
    placeholder: [String, Number]
  },
  methods: {
    updateInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  padding: 10px 15px;
  width: 100%;
  border: 1px solid teal;
  margin-top: 15px;
}
</style>