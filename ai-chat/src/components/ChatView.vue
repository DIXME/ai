<script setup lang="ts">
import Messages from './Messages.vue';
import Inputbar from './Inputbar.vue';


import {ref} from "vue"

import * as ai from "./plugin.js"   

function message(content: string, username: string = usernameG, avatar: string = avatarG, timestamp: number = Date.now()){
  messages.value.push({content,username,avatar,timestamp:Date.now()})
}

function send(txt: string){
  message(txt)
}

</script>

<template>
  <div class="chat-window">
    <Messages :messages="messages"></Messages>
    <Inputbar @send="send"></Inputbar>
  </div>
</template>

<style scoped>
.chat-window {
  height: 100%;          /* 🔥 REQUIRED */
  display: flex;
  flex-direction: column;
  overflow: hidden;       /* 🔥 REQUIRED */
  width: 100%;
}
</style>
