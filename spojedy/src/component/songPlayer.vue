<script setup>
import { assets, musicData } from '@/assets/assets';
import { ref } from 'vue';

const selectedSong = ref(musicData[0])

</script>

<template>
    <div class="h-[6%] bg-black flex justify-between items-center text-white px-4">
        <div class="hidden lg:flex items-center gap-4">
            <img class="w-14" :src="selectedSong.cover" alt="">

            <div>
                <p>{{ selectedSong.name }}</p>
                <p class="text-gray-400">{{ selectedSong.artist }}</p>
            </div>
        </div>

        <div class="flex flex-col items-center gap-1 m-auto">
            <div class="flex gap-4">
                <img class="w-4 cursor-pointer" :src="assets.shuffle_icon" alt="">
                <img class="w-4 cursor-pointer" :src="assets.prev_icon" alt="">
                <img class="w-4 cursor-pointer" :src="assets.play_icon" alt="">
                <img class="w-4 cursor-pointer" :src="assets.next_icon" alt="">
                <img class="w-4 cursor-pointer" :src="assets.loop_icon" alt="">
            </div>

            <div class="flex items-center gap-5">
                <p>1:69</p>
                <div class="w-[60vh] max-w-125 bg-gray-300 rounded-full cursor-pointer">
                    <hr class="h-1 border-none w-0 bg-green-600 rounded-full">
                </div>
                <p>3:69</p>
            </div>
        </div>

        <div class="hidden lg:flex items-center gap-2 opacity-75">
            <img class="w-4" :src="assets.play_icon" alt="">
            <img class="w-4" :src="assets.mic_icon" alt="">
            <img class="w-4" :src="assets.queue_icon" alt="">
            <img class="w-4" :src="assets.speaker_icon" alt="">
            <img class="w-4" :src="assets.volume_icon" alt="">
            <div class="w-20 bg-slate-50 h-1 rounded">

            </div>
            <img class="w-4" :src="assets.mini_player_icon" alt="">
            <img class="w-4" :src="assets.zoom_icon" alt="">
        </div>
    </div>
</template>