<script setup lang="ts">
import Message from './components/Message.vue';
import Messages from './components/Messages.vue';
import Inputbar from './components/Inputbar.vue';

import {ref} from "vue"

import * as ai from "./plugin.js"

const usernameG = "anon"
const avatarG = "https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=2500w"

const messages = ref([
  {username:"anon",timestamp:Date.now(),content:"ping",avatar:avatarG},
  {username:"bot",timestamp:Date.now(),content:"pong",avatar:avatarG},
  {username:"anon",timestamp:Date.now(),content:"cool!",avatar:avatarG}
])

function message(content: string, username: string = usernameG, avatar: string = avatarG, timestamp: number = Date.now()){
  messages.value.push({content,username,avatar,timestamp:Date.now()})
}

function send(txt: string){
  message(txt)
}

</script>

<template>
  <div class="app">
    <Messages :messages="messages"></Messages>
    <Inputbar @send="send"></Inputbar>
  </div>
</template>

<style scoped>
.app {
  height: 100vh;          /* 🔥 REQUIRED */
  display: flex;
  flex-direction: column;
  overflow: hidden;       /* 🔥 REQUIRED */
  width: 100vw;
}
</style>
