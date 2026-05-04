<script setup lang="ts">
import CharacterCreator from "./components/CharacterCreator.vue"
import Characters from "./components/Characters.vue";
import ChatView from "./components/ChatView.vue";
import { AICharacterConversation } from "./plugin";
import { Storage } from "./localStoargeManager";
const s = new Storage()

const c = new AICharacterConversation(s.characters)
</script>

<template>
  <CharacterCreator></CharacterCreator>
  <Characters></Characters>
  <ChatView></ChatView>
</template>