<template>
  <v-snackbar v-model="show" :timeout="timeout">{{ text }}</v-snackbar>
</template>

<script>
  export default {
    name: 'Message',
    data() {
      return {
        show: false,
        text: '',
        timeout: 5000
      }
    },
    methods: {
      message(text, timeout = 5000) {
        if (text) {
          Object.assign(this, {
            show: true,
            text,
            timeout
          })
        }
      }
    }
  }
</script>

<style scoped>
  ::v-deep .v-snack__wrapper {
    min-width: 0;
  }
</style>
