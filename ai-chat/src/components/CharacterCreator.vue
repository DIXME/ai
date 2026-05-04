<script setup lang="ts">
import {ref} from "vue"

import * as ai from "../plugin.js"
import Message from "./Message.vue"
import { Storage } from "../localStoargeManager.js"

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
  const descO: string = desc.value;
  desc.value = ""
  return new Promise(resolve => {
    const r = ai.single(`
    ${SINGLE_PROMPT_ROLE_RULES}

    Generate ONE character following this format.
    Current information (if none make them):

    ${username.value}
      ${descO}

    OUTPUT FORMAT

    :CHARACTER_NAME:
    <short, distinctive name>

    :PERSONALITY:

    <core trait>
    <core trait>
    <core trait>
    <optional additional traits>

    :PHYSICAL_APPEARANCE:
    <pysical desciption> 

    :SPEECH_STYLE:

    Tone - <e.g., blunt, formal, sarcastic>
    Patterns - <speech quirks, sentence structure>
    Avoids - <what they never say or how they never speak>

    :GOALS:

    Immediate Goal - <specific, short-term, tangible>
    Long-Term Goal - <clearly defined outcome>
    Personal Stake - <what they lose if they fail>

    :BEHAVIOR_RULES:

    <rule about actions>
    <rule about reactions>
    <rule about decision-making>
    <hard constraint they never break>

    :LIMITATIONS:

    <knowledge limits>
    <emotional or physical limits>
    <social or moral constraints>

    :INTERACTION_GUIDELINES:

    Respond in-character at all times
    Never break role
    Do not narrate other characters' internal thoughts
    Keep responses within the defined personality and goals
    GENERATION INSTRUCTIONS
    Make the character feel internally consistent and usable in live interaction.
    Avoid generic traits like "nice" or "mean" unless expanded.
    Prefer specificity over breadth.
    Ensure behavior rules align with personality and goals.
    `, (chunk: string) => {desc.value+=chunk}).then(t => {
      const info = t.split(":")
      info.shift()
      // just thought it would be cool if i could parse the information here
      // dont really need to though ngl
      const char = {}
      for(let i = 0; i < info.length; i+=2){
        char[info[i].toLowerCase()]=info[i+1]
      }
      
      
      resolve(t)
    })
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
  const charecter: ai.AICharacter = new ai.AICharacter(username.value,desc.value,pfp.value)
  storage.characters.push(charecter)
  storage.save()
}

function pfp_maker(){

}

const storage = new Storage()

const props = defineProps({
  username: String,
  pfp: String,
  desc: String
})

const username = ref(props.username ?? 'Mika')
const pfp = ref(props.pfp ?? 'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg')
const desc = ref(props.desc ?? 'Young loving mother')

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
    <button @click="pfp_maker">Create PFP 🖼️</button>
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
