<script setup lang="ts">
import CharacterCreator from "./components/CharacterCreator.vue"
import Characters from "./components/Characters.vue";
import ChatView from "./components/ChatView.vue";
import { AICharacterConversation } from "./plugin";
import { Storage } from "./localStoargeManager";
import { createVNode, ref, Ref } from "vue";
import {generateImage, set_endpoint} from "./plugin"
import ImageView from "./components/ImageView.vue";
import Messages from "./components/Messages.vue";
import Images from "./components/Images.vue";

const s = new Storage()
var prompt: string = "";
const container: Ref<HTMLElement | null> = ref(null)

async function send() {
  const x = await generateImage({ prompt });
  x.forEach(i => {
    container.value?.appendChild(i)  // just drop the element straight into the DOM
    console.log(i)
  })
}
type ImageViewT = InstanceType<typeof ImageView>
var images = []

for(var i = 0; i < 9; i++){
  images.push(createVNode(ImageView))
}

set_endpoint("/ai")
</script>

<template>
  <input placeholder="prompt" v-model="prompt" />
  <button @click="send">Gen💫</button>
  <div ref="container" />  <!-- images land here directly -->
  <Images :images="images"></Images>
</template>