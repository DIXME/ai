<template>
  <div class="input-box">
    <input
      v-model="text"
      @keydown.enter="send"
      placeholder="Message..."
    />
    <button @click="send">Send</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send'])
const text = ref('')

function send() {
  if (!text.value.trim()) return
  emit('send', text.value)
  text.value = ''
}
</script>

<style>
.input-box {
  padding: 10px;

  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  /* Optional styling */
  background-color: #151212;
  color: white;
  padding: 1rem;
  z-index: 1000;
}

input, textarea {
  flex: 1;
  background: #191b1c;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
  outline: none;
}

button {
  margin-left: 10px;
}
</style>