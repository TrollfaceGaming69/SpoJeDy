<script setup>
import { ref } from 'vue';
import { assets } from '@/assets/assets';
import { useRouter } from 'vue-router';
import CreatePlaylistModal from './createPlaylistModal.vue';
import { apiService } from '@/api/apiService';

const navigate = useRouter();
const isCreatePlaylistOpen = ref(false);

const goHome = () => {
  navigate.push({ name: 'home' });
};

const handleCreatePlaylist = async (playlistData) => {
  const formData = new FormData();
  formData.append('name', playlistData.name);
  formData.append('description', playlistData.description);
  if (playlistData.cover) {
    formData.append('cover', playlistData.cover);
  }

  const result = await apiService.createPlaylist(formData);
  if (result.ok) {
    console.log("playlist is created");
  } else {
    console.error("Failed to create playlist:", result.data?.message || result.data);
  }
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
                    <img @click="isCreatePlaylistOpen = true" class="w-5 cursor-pointer hover:bg-[#3E3E3E] rounded-full p-0.5" :src="assets.plus_icon" alt="">
                </div>
            </div>

            <div class="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start
        gap-1 pl-4">
                <h1 class="font-semibold">Create your Playlist</h1>
                <button @click="isCreatePlaylistOpen = true" class="px-4 py-1.5 bg-white text-[15px] text-black rounded-full
            mt-4 cursor-pointer hover:scale-105 transition-transform">Create Playlist</button>
            </div>
        </div>
    </div>

    <CreatePlaylistModal 
        :isOpen="isCreatePlaylistOpen" 
        @close="isCreatePlaylistOpen = false" 
        @create="handleCreatePlaylist"
    />
</template>
