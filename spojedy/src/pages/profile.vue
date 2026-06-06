<script setup>
import { ref, onMounted } from 'vue';
import MusicVideoItem from '@/component/musicVideoItem.vue';
import { assets} from '@/assets/assets';
import SongItem from '@/component/songItem.vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';

const navigate = useRouter();

const profileImage = ref(null);
const fileInput = ref(null);
const songs = ref([]);
const videos = ref([]);
const username = ref('User'); 

const isModalOpen = ref(false);
const editUsername = ref('');

const openModal = () => {
    editUsername.value = username.value;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const saveProfile = () => {
    username.value = editUsername.value;
    localStorage.setItem('username', username.value);
    closeModal();
};

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        profileImage.value = URL.createObjectURL(file);
    }
};

onMounted(async () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        username.value = savedUsername;
    }
    
    const fetchedSongs = await apiService.getSongs();
    if (fetchedSongs.length > 0) {
        songs.value = fetchedSongs;
    }

    const fetchedVideos = await apiService.getMusicVideos();
    if (fetchedVideos.length > 0) {
        videos.value = fetchedVideos;
    }
});
</script>

<template>
    <div class="w-full m-2 px-6 rounded text-white overflow-auto lg:w-[75%] lg:ml-0 relative">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange">

        <div class="flex items-center gap-6">
            <div class="relative group cursor-pointer" @click="openModal">
                <img 
                    class="w-64 h-64 lg:w-80 lg:h-80 rounded-full object-cover bg-[#535353] shadow-lg group-hover:opacity-80 transition-all duration-300" 
                    :src="profileImage || assets.profile_icon" 
                    alt="Profile Picture" 
                >
                <div class="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span class="font-bold text-lg text-white">Edit Profile</span>
                </div>
            </div>
            
            <div>
                <p class="text-sm font-semibold uppercase tracking-wider">Profile</p>
                <h1 class="text-5xl lg:text-7xl font-bold mt-2 cursor-pointer hover:underline" @click="openModal">{{ username }}</h1>
            </div>
        </div>

        <div class="mt-8">
            <div>
                <h1 class="my-5 font-bold text-2xl">Your Playlists</h1>
                <div class="flex overflow-auto">
                    </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top tracks</h1>
                <div class="flex overflow-auto gap-4">
                    <SongItem v-for="song in songs" :key="song.id" :id="song.id" :cover="song.cover" :name="song.name" :artist="song.artist"/>
                </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top music videos</h1>
                <div class="flex overflow-auto gap-4">
                    <MusicVideoItem v-for="video in videos" :key="video.id" :id="video.id" :name="video.name" :artist="video.artist" :cover="video.cover"/>
                </div>
            </div>
        </div>

        <div v-if="isModalOpen" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div class="bg-[#282828] w-full max-w-md rounded-xl p-6 shadow-2xl relative">
                <h2 class="text-2xl font-bold mb-6">Profile details</h2>
                
                <button @click="closeModal" class="absolute top-6 right-6 text-gray-400 hover:text-white rounded-full p-1 hover:bg-[#3E3E3E] transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div class="flex flex-col sm:flex-row gap-6 mb-6">
                    <div class="relative group cursor-pointer w-40 h-40 mx-auto sm:mx-0 shrink-0" @click="triggerFileInput">
                        <img 
                            class="w-full h-full rounded-full object-cover bg-[#535353] shadow-md" 
                            :src="profileImage || assets.profile_icon" 
                            alt="Edit Profile Picture"
                        >
                        <div class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span class="text-sm font-semibold">Choose photo</span>
                        </div>
                    </div>

                    <div class="flex-1 flex items-center">
                        <input 
                            v-model="editUsername" 
                            type="text" 
                            class="w-full bg-[#3E3E3E] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-white transition-all"
                            placeholder="Add a name"
                            @keyup.enter="saveProfile"
                        >
                    </div>
                </div>

                <div class="flex justify-end gap-4 mt-6">
                    <button @click="closeModal" class="px-6 py-2 rounded-full font-bold hover:bg-[#3E3E3E] transition-colors">
                        Cancel
                    </button>
                    <button @click="saveProfile" class="px-6 py-2 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>