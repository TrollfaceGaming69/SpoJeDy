<script setup>
import { assets } from '@/assets/assets';
import { useRouter } from 'vue-router';

const navigate = useRouter();

const goHome = () => {
  navigate.push({ name: 'home' });
};
</script>

<template>
    <div class="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
        <div class="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
            <div class="flex items-center gap-3 pl-8 cursor-pointer" @click="goHome">
                <img class="w-6" :src="assets.home_icon" alt="">
                <p class="font-bold">Home</p>
            </div>

            <div class="flex items-center gap-3 pl-8 cursor-pointer">
                <img class="w-6" :src="assets.search_icon" alt="">
                <p class="font-bold">Search</p>
            </div>
        </div>

        <div class="bg-[#121212] h-[85%] rounded">
            <div class="p-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img class="w-8" :src="assets.stack_icon" alt="">
                    <p class="font-semibold">Your Library</p>
                </div>

                <div class="flex items-center gap-3">
                    <img class="w-5" :src="assets.arrow_icon" alt="">
                    <img class="w-5" :src="assets.plus_icon" alt="">
                </div>
            </div>

            <div class="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start
        gap-1 pl-4">
                <h1 class="font-semibold">Create your Playlist</h1>
                <button class="px-4 py-1.5 bg-white text-[15px] text-black rounded-full
            mt-4 cursor-pointer">Create Playlist</button>
            </div>
        </div>
    </div>
</template>