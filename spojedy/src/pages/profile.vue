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
const username = ref('');

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
    <div class="w-full m-2 px-6 rounded text-white overflow-auto lg:w-[75%] lg:ml-0">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <div class="flex items-center gap-4">
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange">

            <img 
                class="w-80 h-80 rounded-full cursor-pointer object-cover bg-[#535353]" 
                :src="profileImage || assets.profile_icon" 
                alt="Profile Picture" 
                @click="triggerFileInput"
            >
            <div>
                <p class="">Profile</p>
                <h1 class="text-7xl font-bold">{{ username }}</h1>
            </div>
        </div>

        <div class="">
            <img src="" alt="">

            <div>
                <div>
                    <h1 class="my-5 font-bold text-2xl">Your Playlists</h1>
                    <div class="flex overflow-auto">

                    </div>
                </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top tracks</h1>
                <div class="flex overflow-auto">
                    <SongItem v-for="song in songs" :key="song.id" :id="song.id" :cover="song.cover" :name="song.name" :artist="song.artist"/>
                </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top music videos</h1>
                <div class="flex overflow-auto">
                    <MusicVideoItem v-for="video in videos" :key="video.id" :id="video.id" :name="video.name" :artist="video.artist" :cover="video.cover"/>
                </div>
            </div>
        </div>
    </div>
</template>