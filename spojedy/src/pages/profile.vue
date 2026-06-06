<script setup>
import { ref } from 'vue';
import MusicVideoItem from '@/component/musicVideoItem.vue';
import { musicData, assets, videoData } from '@/assets/assets';
import SongItem from '@/component/songItem.vue';
import { useRouter } from 'vue-router';

const navigate = useRouter();

const profileImage = ref(null);
const fileInput = ref(null);
const isLightMode = ref(false);

const triggerFileInput = () => {
    fileInput.value.click();
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        profileImage.value = URL.createObjectURL(file);
    }
};

const toggleTheme = () => {
    isLightMode.value = !isLightMode.value;
    if (isLightMode.value) {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.remove('light');
    }
};
</script>

<template>
    <div class="w-full m-2 px-6 rounded overflow-auto lg:w-[75%] lg:ml-0">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <button @click="toggleTheme" class="switch-btn" :class="{ 'is-active' : isLightMode }">
                <span class="switch-knob"></span>
                <span class="switch-label">{{ isLightMode ? 'Light Mode' : 'Dark Mode' }}</span>
            </button>

        <div class="flex items-center gap-4">
            <!-- Hidden file input -->
            <input type="file" ref="fileInput" class="hidden" accept="image/*" @change="handleFileChange">
            
            <!-- Clickable Profile Image -->
            <img 
                class="w-80 h-80 rounded-full cursor-pointer object-cover bg-[#535353]" 
                :src="profileImage || assets.profile_icon" 
                alt="Profile Picture" 
                @click="triggerFileInput"
            >
            <div>
                <p class="">Profile</p>
                <h1 class="text-7xl font-bold">User Name</h1>
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
                    <SongItem v-for="song in musicData" :key="song.id" :id="song.id" :cover="song.cover" :name="song.name" :artist="song.artist"/>
                </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top music videos</h1>
                <div class="flex overflow-auto">
                    <MusicVideoItem v-for="video in videoData" :key="video.id" :id="video.id" :name="video.name" :artist="video.artist" :cover="video.cover"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.switch-btn {
    position: relative;
    width: 5rem;
    height: 2rem;
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: var(--bg-color);
    border: 1px solid var(--text-color);
    justify-content: center;
    border-radius: 17px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
}
.switch-knob {
    position: absolute;
    left: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--text-color);
    border-radius: 50%;
    transition: transform 0.3s ease;
}
.switch-btn.is-active .switch-knob {
    transform: translateX(2.5rem);
}
.switch-label {
    margin-left: 2rem;
    font-size: 0.875rem;
    font-weight: bold;
    color: var(--text-color);
    z-index: 1;
    mix-blend-mode: difference;
}
</style>