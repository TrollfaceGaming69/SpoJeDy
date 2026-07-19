<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { assets } from '@/assets/assets';
import { apiService } from '@/api/apiService';

const navigate = useRouter();
const isLoggedIn = ref(false);
const profilePicture = ref('');

const searchQuery = ref('');
const isFocused = ref(false);
const songs = ref([]);
const albums = ref([]);
const musicVideos = ref([]);

const onProfileUpdated = (event) => {
    if (event.detail && event.detail.profilePicture) {
        profilePicture.value = event.detail.profilePicture;
    }
};

onMounted(async () => {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;

    // Fetch profile picture if logged in
    if (isLoggedIn.value) {
        const profile = await apiService.getProfile();
        if (profile && profile.profilePicture) {
            profilePicture.value = profile.profilePicture;
        }
    }

    // Listen for profile updates from the profile page
    window.addEventListener('profile-updated', onProfileUpdated);

    try {
        const [fetchedSongs, fetchedAlbums, fetchedVideos] = await Promise.all([
            apiService.getSongs(),
            apiService.getAlbums(),
            apiService.getMusicVideos()
        ]);
        songs.value = fetchedSongs || [];
        albums.value = fetchedAlbums || [];
        musicVideos.value = fetchedVideos || [];
    } catch (error) {
        console.error('Error fetching search data:', error);
    }
});

onUnmounted(() => {
    window.removeEventListener('profile-updated', onProfileUpdated);
});

const filteredResults = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return [];

    const results = [];

    songs.value.forEach(song => {
        if (song.name.toLowerCase().includes(query) || (song.artist && song.artist.toLowerCase().includes(query))) {
            results.push({
                ...song,
                type: 'song',
                typeLabel: 'Song'
            });
        }
    });

    albums.value.forEach(album => {
        if (album.name.toLowerCase().includes(query) || (album.artist && album.artist.toLowerCase().includes(query))) {
            results.push({
                ...album,
                type: 'album',
                typeLabel: 'Album'
            });
        }
    });

    musicVideos.value.forEach(video => {
        if (video.name.toLowerCase().includes(query) || (video.artist && video.artist.toLowerCase().includes(query))) {
            results.push({
                ...video,
                type: 'video',
                typeLabel: 'Music Video'
            });
        }
    });

    return results;
});

const handleBlur = () => {
    setTimeout(() => {
        isFocused.value = false;
    }, 200);
};

const selectItem = (item) => {
    searchQuery.value = '';
    isFocused.value = false;
    if (item.type === 'song') {
        navigate.push({ name: 'musicdetail', params: { id: item.id } });
    } else if (item.type === 'album') {
        navigate.push({ name: 'albumdetail', params: { id: item.id } });
    } else if (item.type === 'video') {
        navigate.push({ name: 'videodetail', params: { id: item.id } });
    }
};

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
    localStorage.removeItem('username');
    localStorage.removeItem('profilePicture');
    profilePicture.value = '';
    isLoggedIn.value = false;
    navigate.push({ name: "home" });
};
</script>

<template>
    <div class="w-full flex justify-between items-center font-semibold px-4 py-3">
        <h1 class="font-bold text-2xl text-white">SpoJeDy</h1>

        <div class="relative w-full max-w-md">
            <input
                v-model="searchQuery"
                @focus="isFocused = true"
                @blur="handleBlur"
                class="w-full rounded-full bg-[#121212] text-white placeholder:text-zinc-400 p-3 pl-6 pr-16 focus:outline-none border border-transparent focus:border-zinc-700"
                type="text" placeholder="What do you want to play?">

            <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                <svg class="w-5 h-5 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                </svg>
            </div>

            <div v-if="isFocused && searchQuery.trim() !== ''" class="absolute top-full left-0 right-0 mt-2 bg-[#121212] border border-zinc-700 rounded-lg max-h-80 overflow-y-auto z-50 shadow-2xl p-2">
                <div v-if="filteredResults.length === 0" class="p-3 text-center text-zinc-400 text-sm">
                    No results found
                </div>
                <div v-else v-for="item in filteredResults" :key="item.type + '-' + item.id" @click="selectItem(item)" class="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors">
                    <img :src="item.cover" alt="" class="w-10 h-10 rounded object-cover flex-shrink-0">
                    <div class="flex-1 min-w-0">
                        <p class="font-bold text-sm text-white truncate">{{ item.name }}</p>
                        <p class="text-zinc-400 text-xs truncate">{{ item.artist }} • {{ item.typeLabel }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center gap-4">
            <img v-if="isLoggedIn" :src="assets.logout" alt="" class="w-10 cursor-pointer" @click="logout">
             <p v-if="!isLoggedIn" class="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer" @click="goToLogin">Login</p>

            <img 
                v-if="isLoggedIn && profilePicture" 
                class="w-7 h-7 rounded-full cursor-pointer object-cover" 
                :src="profilePicture" 
                alt="Profile" 
                @click="goToProfile"
            >
            <div 
                v-else-if="isLoggedIn" 
                class="w-7 h-7 rounded-full cursor-pointer bg-[#535353] flex items-center justify-center"
                @click="goToProfile"
            >
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
        </div>
    </div>
</template>