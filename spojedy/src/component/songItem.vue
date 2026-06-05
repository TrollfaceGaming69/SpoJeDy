<script setup>
import { useRouter } from 'vue-router';

const songItem = defineProps(["id", "name", "src", "cover", "artist"])
const navigate = useRouter();

const goToMusicDetail = () => {
  navigate.push({ name: "musicdetail", params: { id: songItem.id } });
}
</script>

<template>
    <div class="min-w-[11.25rem] p-2 px-3 mr-4 rounded cursor-pointer hover:bg-[#ffffff26]" @click="goToMusicDetail">
        <img class="rounded w-[10.25rem]" :src="cover" alt="">
        <p class="font-bold mt-2 mb-1">{{ name }}</p>
        <p class="text-slate-200 text-sm">{{ artist }}</p>
    </div>
</template>