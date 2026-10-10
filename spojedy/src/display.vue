<script setup>
import Navbar from '@/component/navbar.vue';
import SideBar from '@/component/sideBar.vue';
import SongPlayer from '@/component/songPlayer.vue';
import { useRoute } from 'vue-router';
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { currentSong, stopSong, togglePlayPause, videoTogglePlayPause } from '@/stores/playerStore';

const route = useRoute();

const showSongPlayer = computed(() => {
  return currentSong.value &&
         currentSong.value.id != null &&
         route.name !== 'musicdetail' &&
         route.name !== 'videodetail';
});

watch(() => route.name, (newName) => {
  if (newName === 'videodetail') {
    stopSong();
  }
}, { immediate: true });

const handleKeydown = (event) => {
  if (event.code !== 'Space') return;

  const tag = event.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || event.target.isContentEditable) return;

  event.preventDefault();

  if (videoTogglePlayPause.value) {
    videoTogglePlayPause.value();
  } else if (currentSong.value) {
    togglePlayPause();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
    <div class="h-screen bg-black flex flex-col justify-between overflow-hidden">
        <Navbar/>
        <div class="flex-1 flex overflow-hidden">
            <SideBar/>
            <router-view />
        </div>
        <SongPlayer v-if="showSongPlayer"/>
    </div>
</template>