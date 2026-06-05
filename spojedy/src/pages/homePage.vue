<script setup>
import { ref, onMounted } from 'vue';
import { assets} from '@/assets/assets';
import { useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';
import AlbumItem from '@/component/albumItem.vue';
import SongItem from '@/component/songItem.vue';
import MusicVideoItem from '@/component/musicVideoItem.vue';

const navigate = useRouter();

const albums = ref([]);
const songs = ref([]);
const videos = ref([]);
const activeFilter = ref('all');

onMounted(async () => {
  const fetchedAlbums = await apiService.getAlbums();
  if (fetchedAlbums.length > 0) {
    albums.value = fetchedAlbums;
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
    <div class="w-full m-2 px-6 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <div class="flex items-center gap-2 mt-4">
            <p 
              @click="activeFilter = 'all'"
              :class="activeFilter === 'all' ? 'bg-white text-black' : 'bg-black'"
              class="px-4 py-1 rounded-2xl cursor-pointer transition-colors"
            >
              All
            </p>
            <p 
              @click="activeFilter = 'music'"
              :class="activeFilter === 'music' ? 'bg-white text-black' : 'bg-black text-white'"
              class="px-4 py-1 rounded-2xl cursor-pointer transition-colors"
            >
              Music
            </p>
            <p 
              @click="activeFilter = 'musicVideo'"
              :class="activeFilter === 'musicVideo' ? 'bg-white text-black' : 'bg-black text-white'"
              class="px-4 py-1 rounded-2xl cursor-pointer transition-colors"
            >
              Music Video
            </p>
        </div>

        <div v-if="activeFilter === 'all' || activeFilter === 'all'" class="mb-4">
            <h1 class="my-5 font-bold text-2xl">Featured Charts</h1>
            <div class="flex overflow-auto">
                <AlbumItem v-for="album in albums" :key="album.id" :id="album.id" :cover="album.cover"
                    :name="album.name" :artist="album.artist" />
            </div>
        </div>

        <div v-if="activeFilter === 'all' || activeFilter === 'music'" class="mb-4">
            <h1 class="my-5 font-bold text-2xl">This Month Hits</h1>
            <div class="flex overflow-auto">
                <SongItem v-for="song in songs" :key="song.id" :id="song.id" :cover="song.cover" :name="song.name"
                    :artist="song.artist" />
            </div>
        </div>

        <div v-if="activeFilter === 'all' || activeFilter === 'musicVideo'" class="mb-4">
            <h1 class="my-5 font-bold text-2xl">MV to Smooth Your Brain</h1>
            <div class="flex overflow-auto">
                <MusicVideoItem v-for="video in videos" :key="video.id" :id="video.id" :name="video.name" :artist="video.artist" :cover="video.cover"/>
            </div>
        </div>
    </div>
</template>