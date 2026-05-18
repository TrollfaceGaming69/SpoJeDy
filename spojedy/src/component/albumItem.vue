<script setup>
import { useRoute, useRouter } from 'vue-router';

const albumItem = defineProps(["id", "cover", "name", "artist"]);
const navigate = useRouter();

const navigateToAlbum = () =>{
    navigate.push(`/album/${albumItem.id}`);
}
</script>

<template>
    <div @click="navigateToAlbum" class="min-w-45 p-2 px-3 mr-4 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img class="rounded w-50" :src="cover" alt="">
        <p class="font-bold mt-2 mb-1">{{ name }}</p>
        <p class="text-slate-200 text-sm">{{ artist }}</p>
    </div>
</template>