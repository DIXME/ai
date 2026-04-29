<template>
  <div
    class="msg"
    :class="{
      'is-user': isUser,
      'is-grouped': grouped
    }"
  >
    <!-- Avatar -->
    <div v-if="!grouped" class="avatar">
      <img v-if="avatar" :src="avatar" />
      <div v-else class="fallback">{{ initials }}</div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Header -->
      <div v-if="!grouped" class="header">
        <span class="username" :class="{ bot }">
          {{ username }}
        </span>

        <span v-if="bot" class="bot-badge">BOT</span>

        <span class="time">{{ formattedTime }}</span>
      </div>

      <!-- Message -->
      <div
        class="text"
        v-html="renderedText"
      />

      <!-- Slot for reactions / extras -->
      <div class="extras">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  username: String,
  avatar: String,
  content: String,
  timestamp: [String, Date],
  isUser: Boolean,
  bot: Boolean,
  grouped: Boolean
})

const initials = computed(() =>
  props.username
    ?.split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
)

const formattedTime = computed(() => {
  if (!props.timestamp) return ''
  const d = new Date(props.timestamp)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

const renderedText = computed(() => {
  let text = props.content || ''

  return text
    .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
})
</script>

<style scoped>
.msg {
  display: flex;
  gap: 12px;
  padding: 6px 16px;
  transition: background 0.15s;
}

.msg:hover {
  background: #2b2d31;
}

.msg.is-grouped {
  margin-top: -4px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
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
  font-weight: bold;
  color: white;
}

.content {
  flex: 1;
  min-width: 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.username {
  font-weight: 600;
  color: #f2f3f5;
}

.username.bot {
  color: #5865f2;
}

.bot-badge {
  background: #5865f2;
  color: white;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 700;
}

.time {
  font-size: 12px;
  color: #949ba4;
}

.text {
  font-size: 15px;
  line-height: 1.4;
  color: #dbdee1;
  word-break: break-word;
}

/* Code */
.text code {
  background: #1e1f22;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
}

.text pre {
  background: #1e1f22;
  padding: 10px;
  border-radius: 6px;
  overflow-x: auto;
  margin-top: 6px;
}

.extras {
  margin-top: 4px;
}
</style>