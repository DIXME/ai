<script lang="ts" setup>
const X = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdinoanimals.com%2Fwp-content%2Fuploads%2F2023%2F03%2FDomestic-cat-19.jpg&f=1&nofb=1&ipt=6ae3d277397b0dfd7c373a1bfbab6f8ff2332800fe583ce30cf77c926f1df0d6"
const props = defineProps({
    src: {type:String,default:X},
    prompt: String
})
</script>

<template>
    <div class="image">
        <div class="status-overlay">
            <span>🔃 Loading...</span>
            <div class="loader"></div>
        </div>
        <div class="footer-overlay">
            <button class="btn" v-on:click="$emit('save-gallery')">🖼️</button>
            <button class="btn" v-on:click="$emit('delete')"      >🗑️</button>
            <button class="btn" v-on:click="$emit('save-file')"   >📄</button>
            <button class="btn" v-on:click="$emit('re-gen')"      >🔃</button>
            <button class="btn" v-on:click="$emit('info')"        >ℹ️</button>
        </div>
        <img :src="props.src" alt="BOI" />
    </div>
</template>

<style lang="css" scoped>
div {
    width: 256px;
    height: 256px;
    position: relative;
}
div img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
}
.footer-overlay {
    width: 100%;
    height: 100%;
    z-index: 5;
    position: absolute; 
    inset: 0;
    display: flex;
    justify-content: center;
}
.status-overlay {
    z-index: 6;
    position: absolute; 
    inset: 0;
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.592);
    border-radius: 10px;
}
.loader {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #514b82;
  animation:
    l20-1 0.8s infinite linear alternate,
    l20-2 1.6s infinite linear;
}
@keyframes l20-1{
   0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
   12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
   25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
   50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
   75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
   100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
}
@keyframes l20-2{ 
  0%    {transform:scaleY(1)  rotate(0deg)}
  49.99%{transform:scaleY(1)  rotate(135deg)}
  50%   {transform:scaleY(-1) rotate(0deg)}
  100%  {transform:scaleY(-1) rotate(-135deg)}
}
.status-overlay span {
    margin-top: 45%;
}
.footer-overlay * {
    display: flex;
    margin-top: auto;
    margin-inline: 3px;
}
.btn {
    border: 2px soid black;
    border-radius: 5px;
    padding: 3px;
    outline: none;
    border: 2px solid rgb(44, 44, 44);
    background-color: rgb(31, 31, 31);
    margin-bottom: 6px;
}
</style>