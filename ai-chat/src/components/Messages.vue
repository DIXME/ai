<template>
  <div class="list">
    <Message
      v-for="msg in messages"
      :username="msg.username"
      :content="msg.content"
      :timestamp="msg.timestamp"
      :avatar="msg.avatar"
    />
  </div>
</template>

<script setup>
import Message from './Message.vue';
import MessageT from './message.ts';

defineProps({
  messages: Array<MessageT>
})
</script>

<style>
.list {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  min-height: 0;
}

.input-box {
  display: flex;
  padding: 12px;
  background: #383a40;
  border-top: 1px solid #2b2d31;
}

input {
  flex: 1;
  background: #40444b;
  border: none;
  padding: 12px;
  color: white;
  border-radius: 8px;
  outline: none;
}

input::placeholder {
  color: #949ba4;
}

button {
  margin-left: 10px;
  background: #5865f2;
  border: none;
  padding: 0 16px;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #4752c4;
}
</style>