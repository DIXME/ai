<script setup lang="ts">
import CharacterCard from "./CharacterCard.vue"
import { Storage } from "../localStoargeManager"
import { computed } from "vue"

const s = new Storage()

const props = defineProps<{
  characters?: any[]
}>()

// source of truth: props if provided, otherwise storage
const characters = computed(() => props.characters ?? s.characters)
console.log(s.characters)

// actions
function handleDelete(index: number) {
  s.characters.splice(index, 1)
  s.save()
}

function handleCopy(char: any) {
  navigator.clipboard.writeText(JSON.stringify(char, null, 2))
}

function handleEdit(char: any) {
  console.log("edit", char)
  // you'll implement later
}
</script>

<template>
  <div class="list">
    <CharacterCard 
      v-for="(char, i) in characters"
      :key="char.id ?? i"
      :username="char.name"
      :pfp="char.pfp"

      @delete="handleDelete(i)"
      @copy="handleCopy(char)"
      @edit="handleEdit(char)"
    />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>