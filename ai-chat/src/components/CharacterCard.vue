<script setup type="ts">
import { computed } from 'vue'

const props = defineProps({
  username: {
    type: String,
    default: 'Mika'
  },
  pfp: String,
  id: String
})

const initials = computed(() =>
  props.username
    ?.split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)
</script>

<template>
  <div class="char">
    <!-- Avatar -->
    <div class="avatar">
      <img v-if="pfp" :src="pfp" />
      <div v-else class="fallback">{{ initials }}</div>
    </div>

    <!-- Name -->
    <div class="name">{{ username }} <span class="light"><{{ id }}></span></div>

    <!-- Actions -->
    <div class="actions">
      <button @click="$emit('edit')">✏️Edit</button>
      <button @click="$emit('delete')">🗑️Delete</button>
    </div>
  </div>
</template>

<style scoped>
.char {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: #2b2d31;
  border-radius: 8px;
  width: 100%;
}

/* Avatar */
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback {
  width: 100%;
  height: 100%;
  background: #5865f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: white;
}

/* Name */
.name {
  color: #f2f3f5;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

/* Actions */
.actions {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

button {
  font-size: 11px;
  padding: 2px 6px;
  border: none;
  border-radius: 4px;
  background: #3a3c41;
  color: #ddd;
  cursor: pointer;
}

button:hover {
  background: #4f545c;
}

.light {
  color: rgba(255, 255, 255, 0.523);
  font-size: 9px;
}
</style>