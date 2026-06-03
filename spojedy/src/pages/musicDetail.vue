<script setup>
import { musicData, assets } from '@/assets/assets';
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';

const {id} = useRoute().params;
const selectedSong = ref(musicData[id] || musicData[0]);
const navigate = useRouter();

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const audioElement = ref(null);
const isLooping = ref(false);

onMounted(async () => {
  const fetchedSong = await apiService.getSongById(id);
  if (fetchedSong) {
    selectedSong.value = fetchedSong;
  }
});

const togglePlayPause = () => {
  if (isPlaying.value) {
    audioElement.value.pause();
    isPlaying.value = false;
  } else {
    audioElement.value.play();
    isPlaying.value = true;
  }
};

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const onTimeUpdate = () => {
  currentTime.value = audioElement.value.currentTime;
};

const onLoadedMetadata = () => {
  duration.value = audioElement.value.duration;
};

const onProgressClick = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  audioElement.value.currentTime = percent * duration.value;
};

const getProgressPercentage = () => {
  return duration.value ? (currentTime.value / duration.value) * 100 : 0;
};

const playNextSong = () => {
  const currentId = parseInt(selectedSong.value.id);
  const nextId = (currentId + 1) % musicData.length;
  selectedSong.value = musicData[nextId];
  navigate.push({ name: 'musicdetail', params: { id: nextId } });
};

const playPreviousSong = () => {
  const currentId = parseInt(selectedSong.value.id);
  const previousId = (currentId - 1 + musicData.length) % musicData.length;
  selectedSong.value = musicData[previousId];
  navigate.push({ name: 'musicdetail', params: { id: previousId } });
};

const toggleLoop = () => {
  isLooping.value = !isLooping.value;
};

const handleSongEnd = () => {
  if (isLooping.value) {
    audioElement.value.currentTime = 0;
    audioElement.value.play();
  } else {
    playNextSong();
  }
};

watch(selectedSong, () => {
  if (audioElement.value) {
    audioElement.value.load();
    audioElement.value.play();
    isPlaying.value = true;
  }
});

</script>

<template>
    <div class="w-full m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <audio ref="audioElement" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @ended="handleSongEnd">
            <source :src="selectedSong.src" type="audio/mpeg">
        </audio>

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
                    <hr class="h-1 border-none bg-green-600 rounded-full" :style="{ width: getProgressPercentage() + '%' }">
                </div>
                <p>{{ formatTime(duration) }}</p>
            </div>
        </div>
    </div>
</template>