<script lang="ts" setup>
const X = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdinoanimals.com%2Fwp-content%2Fuploads%2F2023%2F03%2FDomestic-cat-19.jpg&f=1&nofb=1&ipt=6ae3d277397b0dfd7c373a1bfbab6f8ff2332800fe583ce30cf77c926f1df0d6"
const props = defineProps({
    src: {type:String,default:X}
})
</script>

<template>
    <div>
        <div class="overlay">
            <button class="btn" v-on:click="$emit('gallery')">🖼️</button>
            <button class="btn" v-on:click="$emit('save')"   >🗑️</button>
            <button class="btn" v-on:click="$emit('file')"   >📄</button>
        </div>
        <img :src="props.src" alt="BOI" />
    </div>
</template>

<style lang="css" scoped>
div {
    width: 256px;
    height: 256px;
    position: relative;
    border: 2px solid rgb(44, 44, 44);
}
div img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
}
.overlay {
    width: 100%;
    height: 100%;
    border: 3px solid black;
    z-index: 5;
    position: absolute; 
    inset: 0;
    display: flex;
    justify-content: center;
}
.overlay * {
    display: flex;
    margin-top: auto;
    margin-left: 15px;
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