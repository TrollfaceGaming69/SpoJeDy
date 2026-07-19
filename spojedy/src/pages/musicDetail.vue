<script setup>
import { assets } from '@/assets/assets';
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';
import {
  currentSong,
  isPlaying,
  currentTime,
  duration,
  isLooping,
  allSongs as globalAllSongs,
  playSong,
  togglePlayPause,
  playNext,
  playPrevious,
  toggleLoop,
  seek
} from '@/stores/playerStore';

const route = useRoute();
const selectedSong = ref({});
const allSongs = ref([]);
const navigate = useRouter();

const loadSong = async (songId) => {
  const fetchedSong = await apiService.getSongById(songId);
  if (fetchedSong) {
    const normalizedSong = {
      ...fetchedSong,
      src: typeof fetchedSong.src === 'string' ? fetchedSong.src.trim() : fetchedSong.src,
      cover: typeof fetchedSong.cover === 'string' ? fetchedSong.cover.trim() : fetchedSong.cover,
    };

    selectedSong.value = normalizedSong;

    if (!currentSong.value || currentSong.value.id !== normalizedSong.id) {
      playSong(normalizedSong, allSongs.value);
    }
  }
};

onMounted(async () => {
  const songs = await apiService.getSongs();
  if (songs.length > 0) {
    allSongs.value = songs;
    globalAllSongs.value = songs;
  }
  await loadSong(route.params.id);
});

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadSong(newId);
  }
});

watch(() => currentSong.value, (newSong) => {
  if (newSong && newSong.id != null && newSong.id !== Number(route.params.id)) {
    navigate.push({ name: 'musicdetail', params: { id: newSong.id } });
  }
});

const playNextSong = () => {
  playNext();
};

const playPreviousSong = () => {
  playPrevious();
};

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const onProgressClick = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  seek(percent * duration.value);
};

const getProgressPercentage = () => {
  return duration.value ? (currentTime.value / duration.value) * 100 : 0;
};
</script>

<template>
    <div class="w-full m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" @click="navigate.go(1)">
        </div>

        <div class="flex flex-col items-center gap-6 text-center mt-50">
            <div>
                <img class="w-120 rounded-2xl" :src="selectedSong.cover" alt="">
            </div>

            <div>
                <p class="text-2xl">{{ selectedSong.name }}</p>
                <p class="text-gray-400">{{ selectedSong.artist }}</p>
            </div>

            <div class="flex gap-8">
                <img class="w-6 cursor-pointer" :src="assets.shuffle_icon" alt="">
                <img class="w-6 cursor-pointer" :src="assets.prev_icon" alt="" @click="playPreviousSong">
                <img class="w-6 cursor-pointer" :src="isPlaying ? assets.pause_icon : assets.play_icon" alt="" @click="togglePlayPause">
                <img class="w-6 cursor-pointer" :src="assets.next_icon" alt="" @click="playNextSong">
                <img class="w-6 cursor-pointer" :src="isLooping ? assets.loop_active : assets.loop_icon" alt="" @click="toggleLoop">
            </div>

            <div class="flex items-center gap-5">
                <p>{{ formatTime(currentTime) }}</p>
                <div class="w-[60vh] max-w-125 p-3 rounded-full cursor-pointer" @click="onProgressClick">
                    <div class="w-full bg-[#3e3e3e] rounded-full h-1">
                        <hr class="h-1 border-none bg-green-600 rounded-full" :style="{ width: getProgressPercentage() + '%' }">
                    </div>
                </div>
                <p>{{ formatTime(duration) }}</p>
            </div>
        </div>
    </div>
</template>