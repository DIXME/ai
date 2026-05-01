<script setup lang="ts">
import ChatView from "./components/ChatView.vue"

import {ref,onBeforeUnmount} from "vue"

import * as ai from "./plugin.js"
import Message from "./components/Message.vue"

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

const SINGLE_PROMPT_ROLE_RULES = `
You are an AI character designer. Your task is to generate a strictly formatted, clean, and efficient character definition for use in roleplay systems.

RULES

Output MUST follow the exact structure below.
Do NOT add extra commentary, explanations, or formatting outside the template.
Be concise but descriptive.
Avoid redundancy.
All fields must be filled.
Use consistent tone and precise language.
No emojis, no markdown styling beyond what is shown.
`

function accelerate(){
  desc.value = ""
  return new Promise(resolve => {
    const r = ai.single(`
    ${SINGLE_PROMPT_ROLE_RULES}

    OUTPUT FORMAT

    CHARACTER_NAME:
    <short, distinctive name>

    PERSONALITY:

    <core trait>
    <core trait>
    <core trait>
    <optional additional traits>

    SPEECH_STYLE:

    Tone: <e.g., blunt, formal, sarcastic>
    Patterns: <speech quirks, sentence structure>
    Avoids: <what they never say or how they never speak>

    GOALS:

    <primary motivation>
    <secondary motivation>

    BEHAVIOR_RULES:

    <rule about actions>
    <rule about reactions>
    <rule about decision-making>
    <hard constraint they never break>

    LIMITATIONS:

    <knowledge limits>
    <emotional or physical limits>
    <social or moral constraints>

    INTERACTION_GUIDELINES:

    Respond in-character at all times
    Never break role
    Do not narrate other characters' internal thoughts
    Keep responses within the defined personality and goals
    GENERATION INSTRUCTIONS
    Make the character feel internally consistent and usable in live interaction.
    Avoid generic traits like "nice" or "mean" unless expanded.
    Prefer specificity over breadth.
    Ensure behavior rules align with personality and goals.

    Generate ONE character following this format.
    Current information (if none make them):
    ${username.value}
      ${desc.value}
    `, (chunk: string) => {desc.value+=chunk}).then(t => resolve(t))
  })
}

function examples(){
  desc.value += "\n\n"
  return new Promise(resolve => {
    const r = ai.single(`
    ${SINGLE_PROMPT_ROLE_RULES}

    make five of these senarios and seprate them by new lines. when describe the senario from a third person limtited omnicient point of view.
    you are aware of there feelings and thoughts just not the future.

    Current information (if none make them):
    ${username.value}
      ${desc.value}

    SENARIO FORMAT:
    3-5 sentence long example senario that reflects the charecters traits and common behaviors.
    `, (chunk: string) => {desc.value+=chunk}).then(t => resolve(t))
  })
}

function save(){
  const charecter: ai.AICharacter = new ai.AICharacter(username.value,desc.value)
  console.log(charecter)
}

const username = ref('username')
const pfp = ref('https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg')
const desc = ref('provide description here.')

ai.set_endpoint("/ai") // use ai on vite server

</script>

<template>
  <div id="c-creator">
    <Message :username="username" :avatar="pfp" content="Hello 😄"></Message>
    <input placeholder="pfp" v-model="pfp"></input><br>
    <input placeholder="name" v-model="username"></input><br>
    <textarea placeholder="desc" class="area" v-model="desc"></textarea>
    <button @click="accelerate">AI accelerate description 💫</button>
    <button @click="examples">Example senarios 👀</button>
    <button @click="save">Save character 📩</button>
  </div>
</template>

<style scoped>
body {
  text-align: center;
}
#c-creator {
  align-items: center;
  align-self: center;
  border: 2px solid black;
  border-radius: 10px;
  width: 50%;
  height: 50%;
  margin: 0 auto;
  padding: 10px;
}
#c-creator *:not(.msg *) {
  margin: 5px;
}
input, textarea, button {
  flex: 1;
  background: #191b1c;
  border: none;
  padding: 10px;
  color: white;
  border-radius: 5px;
  outline: none;
  width: 100%;
}
button {
  width: auto;
  transition: background 0.15s;
}
button:hover {
  background: #2b2d31;
}
.area {
  height: 200px;
}
</style>
