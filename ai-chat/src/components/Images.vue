<script lang="ts" setup>
import ImageView from './ImageView.vue';

type ImageViewT = InstanceType<typeof ImageView>

const props = defineProps({
    images: Array<ImageViewT>
})

function save_to_file(img: ImageViewT){
    console.log("save to gal")
}

function save_to_gallery(img: ImageViewT){
    console.log("save to file")
}

function delete_(img: ImageViewT){
    console.log("delete")
}

function re_gen(img: ImageViewT){
    console.log("re gen")
}
</script>

<template>
    <div class="images">
        <ImageView v-for="image in props.images" 
        :src="image.src"
        @save-file="save_to_file(image)"
        @save-gallery="save_to_gallery(image)"
        @delete="delete_(image)"
        @re-gen="re_gen(image)"
        ></ImageView>
    </div>
</template>

<style lang="css" scoped>
.images {
    border-radius: 10px;
    width: 800px;
    display: grid;
    grid-template-columns: auto auto auto;
}
.images .image {
    margin: 5px;
}
</style>