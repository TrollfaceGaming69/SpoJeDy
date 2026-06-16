<script setup>
import { assets } from '@/assets/assets';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { apiService } from '@/api/apiService';

const route = useRoute();
const albumsData = ref({});
const albumSongs = ref([]);

const navigate = useRouter();

const loadAlbum = async (albumId) => {
  const fetchedAlbum = await apiService.getAlbumById(albumId);
  if (fetchedAlbum) {
    albumsData.value = fetchedAlbum;
  }

  const allSongs = await apiService.getSongs();
  if (allSongs.length > 0) {
    if (albumsData.value.songs && albumsData.value.songs.length > 0) {
      albumSongs.value = allSongs.filter(song => albumsData.value.songs.includes(song.id));
    } else {
      albumSongs.value = allSongs;
    }
  }
};

onMounted(() => {
  loadAlbum(route.params.id);
});

watch(() => route.params.id, (newId) => {
  if (newId) {
    loadAlbum(newId);
  }
});

const goToMusicDetail = (songId) => {
    navigate.push(`/music/${songId}`);
};

</script>

<template>
    <div class="w-full m-2 px-6 rounded text-white overflow-auto lg:w-[75%] lg:ml-0" 
        :style="{backgroundImage: albumsData ? `linear-gradient(180deg, ${albumsData.bgColor}65 0%, #121212 100%)` : 'none', backgroundColor: '#121212'}">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <div class="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
            <img class="w-48 rounded" :src="albumsData.cover" alt="">
            <div class="flex flex-col">
                <p>Playlist</p>
                <h2 class="text-5xl font-bold mb-4 md:text-7xl">{{ albumsData.name }}</h2>
                <h4>{{ albumsData.artist }}</h4>
                <p class="mt-1">12 Songs</p>
            </div>
        </div>

        <div class="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
            <p><b class="mr-4">#</b>Title</p>
            <p>Album</p>
            <img class="m-auto w-4" :src="assets.clock_icon" alt="">
        </div>

        <hr class="h-px bg-white">

        <div v-for="(item, index) in albumSongs" :key="index" @click="goToMusicDetail(item.id)"
            class="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer">
            <p class="text-white">
                <b class="mr-4 text-[#a7a7a7]">{{ index + 1 }}</b>
                <img class="inline w-12 mr-5" :src="item.cover" alt="" />
                {{ item.name }}
            </p>

            <p class="text-[15px]">{{ albumsData.name }}</p>
            <p class="text-[15px] text-center">{{ item.duration }}</p>
        </div>
    </div>
</template>