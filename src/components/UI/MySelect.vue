<template>
<select :value="modelValue" @change="selectedOption">
  <option disabled selected  value="">choose an option</option>
  <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
</select>
</template>

<script>
export default {
  name: "MySelect",
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: ()=>[]
    }

  },
  methods: {
    selectedOption(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>

</style>