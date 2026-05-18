<script setup>
import { useRouter } from 'vue-router';

const navigate = useRouter();

const goToProfile = () => {
    navigate.push({ name: "profile" });
}
</script>

<template>
    <div class="w-full flex justify-between items-center font-semibold px-4 py-3">
        <h1 class="font-bold text-2xl text-white">SpoJeDy</h1>

        <div class="relative w-full max-w-md">
            <input
                class="w-full rounded-full bg-[#121212] text-white placeholder:text-zinc-400 p-3 pl-6 pr-16 focus:outline-none border border-transparent focus:border-zinc-700"
                type="text" placeholder="What do you want to play?">

            <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                <svg class="w-5 h-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                </svg>
            </div>
        </div>

        <div class="flex items-center gap-4 cursor-pointer">
            <img class="w-7 h-7 rounded-full" src="" alt="" @click="goToProfile">
        </div>
    </div>
</template>