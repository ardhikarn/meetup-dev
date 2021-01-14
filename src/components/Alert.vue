<template>
  <v-alert
    class="mx-auto"
    max-width="350"
    dismissible
    elevation="1"
    type="error"
    @input="onClose"
    :value="true"
  >
    {{ pesan }}</v-alert
  >
</template>

<script>
export default {
  name: 'Alert',
  props: ['pesan'],
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
