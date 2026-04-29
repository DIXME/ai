<script setup lang="ts">
import Message from './components/Message.vue';
</script>

<template>
  <Message username="anon" content="hello, what color is the sky?" :timestamp="Date.now()"></Message>
</template>

<style scoped>

</style>
