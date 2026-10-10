<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { assets } from '@/assets/assets';
import { useRouter } from 'vue-router';
import CreatePlaylistModal from './createPlaylistModal.vue';
import { apiService } from '@/api/apiService';

const navigate = useRouter();
const isCreatePlaylistOpen = ref(false);
const playlists = ref([]);
const isLoggedIn = ref(false);

const loadPlaylists = async () => {
  if (!isLoggedIn.value) return;
  const data = await apiService.getPlaylists();
  if (Array.isArray(data)) {
    playlists.value = data;
  }
};

onMounted(() => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
  loadPlaylists();
  window.addEventListener('playlist-updated', loadPlaylists);
});

onUnmounted(() => {
  window.removeEventListener('playlist-updated', loadPlaylists);
});

const goHome = () => {
  navigate.push({ name: 'home' });
};

const goToPlaylist = (playlist) => {
  navigate.push({ name: 'playlistdetail', params: { id: playlist.id } });
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
    await loadPlaylists();
    if (result.data?.playlist?.id !== undefined) {
      navigate.push({ name: 'playlistdetail', params: { id: result.data.playlist.id } });
    }
  } else {
    console.error("Failed to create playlist:", result.data?.message || result.data);
  }
};

const hasPlaylists = computed(() => playlists.value.length > 0);
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

        <div class="bg-[#121212] h-[85%] rounded flex flex-col overflow-hidden">
            <div class="p-4 flex items-center justify-between flex-shrink-0">
                <div class="flex items-center gap-3">
                    <img class="w-8" :src="assets.stack_icon" alt="">
                    <p class="font-semibold">Your Library</p>
                </div>

                <div class="flex items-center gap-3">
                    <img class="w-5" :src="assets.arrow_icon" alt="">
                    <img @click="isCreatePlaylistOpen = true" class="w-5 cursor-pointer hover:bg-[#3E3E3E] rounded-full p-0.5" :src="assets.plus_icon" alt="">
                </div>
            </div>

            <!-- Playlist list -->
            <div v-if="hasPlaylists" class="flex-1 overflow-y-auto px-2 pb-2 space-y-0.5">
                <div v-for="playlist in playlists" :key="playlist.id"
                    @click="goToPlaylist(playlist)"
                    class="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-[#ffffff15] transition-colors group">
                    
                    <!-- Cover image or default icon -->
                    <img v-if="playlist.cover" :src="playlist.cover" alt="" 
                        class="w-12 h-12 rounded object-cover flex-shrink-0">
                    <div v-else class="w-12 h-12 rounded bg-[#282828] flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-zinc-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                    </div>

                    <div class="flex-1 min-w-0">
                        <p class="font-semibold text-sm text-white truncate">{{ playlist.name }}</p>
                        <p class="text-zinc-400 text-xs truncate">Playlist • {{ playlist.songs ? playlist.songs.length : 0 }} songs</p>
                    </div>
                </div>
            </div>

            <!-- Empty state: create playlist prompt -->
            <div v-else class="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
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
