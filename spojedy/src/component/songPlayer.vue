<script setup>
import { assets } from '@/assets/assets';
import { useRouter } from 'vue-router';
import {
  currentSong,
  isPlaying,
  currentTime,
  duration,
  isLooping,
  togglePlayPause,
  playNext,
  playPrevious,
  toggleLoop,
  seek
} from '@/stores/playerStore';

const navigate = useRouter();

const formatTime = (time) => {
  if (!time || isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const getProgressPercentage = () => {
  return duration.value ? (currentTime.value / duration.value) * 100 : 0;
};

const onProgressClick = (event) => {
  const progressBar = event.currentTarget;
  const rect = progressBar.getBoundingClientRect();
  const percent = (event.clientX - rect.left) / rect.width;
  seek(percent * duration.value);
};

const goToDetail = () => {
  if (currentSong.value && currentSong.value.id != null) {
    navigate.push({ name: 'musicdetail', params: { id: currentSong.value.id } });
  }
};
</script>

<template>
    <div class="h-20 bg-black flex justify-between items-center text-white px-6 border-t border-[#282828]">
        <div class="hidden lg:flex items-center gap-4 w-[30%]">
            <img class="w-14 h-14 rounded object-cover" :src="currentSong?.cover" alt="">

            <div class="truncate">
                <p class="font-semibold truncate">{{ currentSong?.name }}</p>
                <p class="text-xs text-gray-400 truncate">{{ currentSong?.artist }}</p>
            </div>
        </div>

        <div class="flex flex-col items-center gap-1.5 flex-1 max-w-2xl">
            <div class="flex items-center gap-6">
                <img class="w-4 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" :src="assets.shuffle_icon" alt="">
                <img class="w-4 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" :src="assets.prev_icon" alt="" @click="playPrevious">
                <img class="w-5 hover:scale-110 cursor-pointer transition-transform" :src="isPlaying ? assets.pause_icon : assets.play_icon" alt="" @click="togglePlayPause">
                <img class="w-4 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" :src="assets.next_icon" alt="" @click="playNext">
                <img class="w-4 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" :src="isLooping ? assets.loop_active : assets.loop_icon" alt="" @click="toggleLoop">
            </div>

            <div class="flex items-center gap-5 w-full text-xs text-gray-400">
                <p class="w-10 text-right">{{ formatTime(currentTime) }}</p>
                <div class="flex-1 py-3 cursor-pointer flex items-center" @click="onProgressClick">
                    <div class="w-full bg-gray-300 rounded-full h-1">
                        <hr class="h-1 border-none bg-green-600 rounded-full" :style="{ width: getProgressPercentage() + '%' }">
                    </div>
                </div>
                <p class="w-10 text-left">{{ formatTime(duration) }}</p>
            </div>
        </div>

        <div class="hidden lg:flex items-center justify-end gap-3 w-[30%] opacity-75">
            <img class="w-4" :src="assets.play_icon" alt="">
            <img class="w-4" :src="assets.mic_icon" alt="">
            <img class="w-4" :src="assets.queue_icon" alt="">
            <img class="w-4" :src="assets.speaker_icon" alt="">
            <img class="w-4" :src="assets.volume_icon" alt="">
            <div class="w-20 bg-zinc-700 h-1 rounded-full overflow-hidden">
                <div class="bg-white h-full w-[70%]"></div>
            </div>
            <img class="w-4" :src="assets.mini_player_icon" alt="">
            <img class="w-4 cursor-pointer hover:opacity-100" :src="assets.zoom_icon" alt="" @click="goToDetail">
        </div>
    </div>
</template>