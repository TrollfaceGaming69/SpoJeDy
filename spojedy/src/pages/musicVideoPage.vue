<script setup>
import { useRouter } from 'vue-router';
import { assets, videoData } from '@/assets/assets';
import MusicVideoItem from '@/component/musicVideoItem.vue';

const navigate = useRouter();
</script>

<template>
    <div class="w-full m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <div class="flex items-center gap-2 mt-4">
            <p class="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">All</p>
            <p class="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
            <p class="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music Video</p>
        </div>

        <div class="mb-4">
            <h1 class="my-5 font-bold text-2xl">Music Videos</h1>

            <div class="flex overflow-auto">
                <MusicVideoItem v-for="video in videoData" :key="video.id" :id="video.id" :name="video.name" :artist="video.artist" :cover="video.cover"/>
            </div>
        </div>

    </div>
</template>