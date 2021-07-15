<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout">{{ text }}</v-snackbar>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: 'Message',
    data() {
      return {
        show: false,
        text: '',
        timeout: 3000,
        color: 'success'
      }
    },
    methods: {
      message(text, timeout = 3000, color = 'success') {
        if (text) {
          Object.assign(this, {
            show: true,
            text,
            timeout,
            color
          })
        }
      }
    },
    mounted() {
      Vue.prototype.$message = this.message
    }
  }
</script>

<style scoped>
  ::v-deep .v-snack__wrapper {
    min-width: 0;
  }
</style>
