<script setup>
import { useRouter } from 'vue-router';

const videoItem = defineProps(["id", "name", "src", "cover", "artist"])
const navigate = useRouter();

const goToVideoDetail = ()=> {
    navigate.push({name: "videodetail", params: {id: videoItem.id}})
}

</script>

<template>
    <div class="min-w-[11.25rem] p-2 px-3 mr-4 rounded cursor-pointer hover:bg-[#ffffff26]" @click="goToVideoDetail">
        <img class="rounded w-[17.5rem]" :src="cover" alt="">
        <p class="font-bold mt-2 mb-1">{{ name }}</p>
        <p class="text-slate-200 text-sm">{{ artist }}</p>
    </div>
</template>