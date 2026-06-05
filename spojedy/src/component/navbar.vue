<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { assets } from '@/assets/assets';

const navigate = useRouter();
const isLoggedIn = ref(false);

onMounted(() => {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;
});

const goToProfile = () => {
    if (isLoggedIn.value) {
        navigate.push({ name: "profile" });
    }
};

const goToLogin = () => {
    navigate.push({ name: "login" });
};

const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    navigate.push({ name: "home" });
};
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

        <div class="flex items-center gap-4">
            <img v-if="isLoggedIn" :src="assets.logout" alt="" class="w-10 cursor-pointer" @click="logout">
             <p v-if="!isLoggedIn" class="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer" @click="goToLogin">Login</p>

            <img v-if="isLoggedIn" class="w-7 h-7 rounded-full cursor-pointer" src="" alt="" @click="goToProfile">
        </div>
    </div>
</template>