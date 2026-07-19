<script setup>
import { useRoute, useRouter } from 'vue-router';
import { assets } from '@/assets/assets';
import { ref, onMounted, watch } from 'vue';
import { apiService } from '@/api/apiService';

const route = useRoute();
const { id } = route.params;
const selectedVideo = ref(null);
const navigate = useRouter();

const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const videoElement = ref(null);

const loadVideo = async (videoId) => {
  console.log('Fetching video with ID:', videoId);
  const fetchedVideo = await apiService.getMusicVideoById(videoId);
  console.log('Fetched video:', fetchedVideo);
  if (fetchedVideo) {
    const normalizedVideo = {
      ...fetchedVideo,
      src: typeof fetchedVideo.src === 'string' ? fetchedVideo.src.trim() : fetchedVideo.src,
      cover: typeof fetchedVideo.cover === 'string' ? fetchedVideo.cover.trim() : fetchedVideo.cover,
    };

    selectedVideo.value = normalizedVideo;
    currentTime.value = 0;
    duration.value = 0;
  }
};

onMounted(() => {
  loadVideo(id);
});

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadVideo(newId);
  }
});

watch(() => selectedVideo.value, () => {
  if (videoElement.value && isPlaying.value) {
    setTimeout(() => {
      videoElement.value?.play();
    }, 100);
  }
});

const togglePlayPause = async () => {
  if (!videoElement.value) return;
  if (isPlaying.value) {
    videoElement.value.pause();
    isPlaying.value = false;
  } else {
    try {
      await videoElement.value.play();
      isPlaying.value = true;
    } catch (error) {
      console.warn('Video play failed:', error);
      isPlaying.value = false;
    }
  }
};

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const onTimeUpdate = () => {
  if (videoElement.value) {
    currentTime.value = videoElement.value.currentTime;
  }
};

const onLoadedMetadata = () => {
  if (videoElement.value) {
    duration.value = videoElement.value.duration;
  }
};

const onProgressClick = (event) => {
  if (!videoElement.value) return;
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  videoElement.value.currentTime = percent * duration.value;
};

const getProgressPercentage = () => {
  return duration.value ? (currentTime.value / duration.value) * 100 : 0;
};

const playNextVideo = () => {
  if (!selectedVideo.value) return;
  const nextId = parseInt(selectedVideo.value.id) + 1;
  isPlaying.value = false;
  navigate.push({ name: 'videodetail', params: { id: nextId } });
};

const playPreviousVideo = () => {
  if (!selectedVideo.value) return;
  const previousId = parseInt(selectedVideo.value.id) - 1;
  if (previousId < 0) return;
  isPlaying.value = false;
  navigate.push({ name: 'videodetail', params: { id: previousId } });
};

</script>

<template>
  <div class="w-full m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
    <div class="flex items-center gap-2 my-4">
      <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" @click="navigate.go(-1)">
      <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" @click="navigate.go(1)">
    </div>

    <div v-if="selectedVideo" class="relative w-full max-w-7xl mx-auto overflow-hidden bg-black rounded-lg group">

      <video ref="videoElement" class="w-full block cursor-pointer" :src="selectedVideo.src || selectedVideo.videoUrl" @click="togglePlayPause"
        @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" @ended="playNextVideo"></video>

      <div
        class="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
        <div class="flex items-center justify-center gap-8">
          <img class="w-6 cursor-pointer" :src="assets.prev_icon" alt="Previous" @click="playPreviousVideo">
          <img class="w-6 cursor-pointer" :src="isPlaying ? assets.pause_icon : assets.play_icon" alt="Play/Pause"
            @click="togglePlayPause">
          <img class="w-6 cursor-pointer" :src="assets.next_icon" alt="Next" @click="playNextVideo">
        </div>

        <div class="flex items-center gap-5">
          <p class="text-sm">{{ formatTime(currentTime) }}</p>
          <div class="flex-1 py-3 rounded-full cursor-pointer" @click="onProgressClick">
            <hr class="h-1 border-none bg-green-600 rounded-full" :style="{ width: getProgressPercentage() + '%' }">
          </div>
          <p class="text-sm">{{ formatTime(duration) }}</p>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8">
      <p class="text-gray-400">Loading video...</p>
    </div>

    <div v-if="selectedVideo" class="mt-6">
      <p class="text-2xl">{{ selectedVideo.name }}</p>
      <p class="text-gray-400">{{ selectedVideo.artist }}</p>
    </div>
  </div>
</template>