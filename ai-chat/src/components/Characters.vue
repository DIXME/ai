<script setup lang="ts">
import CharacterCard from "./CharacterCard.vue"
import { Storage } from "../localStoargeManager"
import { computed } from "vue"
import { AICharacter } from "@/plugin";
import { ref } from "vue"

const s = new Storage()
const i = ref(0)

function update(){i.value++}

function handle_delete(id: string) {
  console.log(`[handle_delete] removing [${id}] from list`)
  s.characters = s.characters.filter(c => c.id!=id)
  s.save()
  update()
}

function handle_edit(char: AICharacter) {
  const c: AICharacter | undefined = s.characters.find(c => c.id==char.id)
  if(c==undefined){
    throw Error(`[handle_edit] couldnt find char [${char.name}]!`)
  } else {
    // implement loading into char creator instance
  }
}
</script>

<template>
  <div class="list">
    <span style="display: none">{{ i }}</span>
    <CharacterCard 
      v-for="char in s.characters"
      :id="char.id"
      :username="char.name"
      :pfp="char.pfp"

      @delete="handle_delete(char.id)"
      @edit="handle_edit(char)"
    />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border: 3px solid black;
  border-radius: 10px;
  padding: 10px;
}
</style>