<script setup>
import { assets } from '@/assets/assets';
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';
import { apiService } from '@/api/apiService';
import { playSong } from '@/stores/playerStore';

const route = useRoute();
const navigate = useRouter();

const playlistData = ref({});
const playlistSongs = ref([]);
const allSongs = ref([]);
const showAddSongModal = ref(false);
const songSearchQuery = ref('');

const loadPlaylist = async (playlistId) => {
  const fetchedPlaylist = await apiService.getPlaylistById(playlistId);
  if (fetchedPlaylist) {
    playlistData.value = fetchedPlaylist;
  }

  const fetchedSongs = await apiService.getSongs();
  allSongs.value = fetchedSongs || [];

  if (fetchedSongs.length > 0 && playlistData.value.songs && playlistData.value.songs.length > 0) {
    const songMap = new Map(fetchedSongs.map(s => [s.id, s]));
    playlistSongs.value = playlistData.value.songs
      .map(id => songMap.get(id))
      .filter(Boolean);
  } else {
    playlistSongs.value = [];
  }
};

onMounted(() => {
  loadPlaylist(route.params.id);
});

watch(() => route.params.id, (newId) => {
  if (newId !== undefined && newId !== null && newId !== '') {
    loadPlaylist(newId);
  }
});

const playPlaylistSong = (song) => {
  if (playlistSongs.value && playlistSongs.value.length > 0) {
    playSong(song, playlistSongs.value);
  } else {
    playSong(song);
  }
  navigate.push(`/music/${song.id}`);
};

// Songs available to add (not already in playlist)
const availableSongs = computed(() => {
  const currentSongIds = new Set(playlistData.value.songs || []);
  const query = songSearchQuery.value.trim().toLowerCase();

  let filtered = allSongs.value.filter(s => !currentSongIds.has(s.id));

  if (query) {
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(query) ||
      (s.artist && s.artist.toLowerCase().includes(query))
    );
  }

  return filtered;
});

const addSong = async (song) => {
  const result = await apiService.addSongToPlaylist(playlistData.value.id, song.id);
  if (result.ok) {
    playlistData.value.songs = [...(playlistData.value.songs || []), song.id];
    playlistSongs.value = [...playlistSongs.value, song];
    window.dispatchEvent(new CustomEvent('playlist-updated'));
  }
};

const removeSong = async (song) => {
  const result = await apiService.removeSongFromPlaylist(playlistData.value.id, song.id);
  if (result.ok) {
    playlistData.value.songs = playlistData.value.songs.filter(id => id !== song.id);
    playlistSongs.value = playlistSongs.value.filter(s => s.id !== song.id);
    window.dispatchEvent(new CustomEvent('playlist-updated'));
  }
};

const openAddSongModal = () => {
  songSearchQuery.value = '';
  showAddSongModal.value = true;
};

const closeAddSongModal = () => {
  showAddSongModal.value = false;
  songSearchQuery.value = '';
};
</script>

<template>
  <div class="w-full m-2 px-6 rounded text-white overflow-auto lg:w-[75%] lg:ml-0"
    :style="{ backgroundImage: `linear-gradient(180deg, #1a3a5c65 0%, #121212 100%)`, backgroundColor: '#121212' }">
    
    <!-- Navigation arrows -->
    <div class="flex items-center gap-2 my-4">
      <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
      <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
    </div>

    <!-- Playlist header -->
    <div class="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
      <img v-if="playlistData.cover" class="w-48 h-48 rounded shadow-2xl object-cover" :src="playlistData.cover" alt="">
      <!-- Default playlist cover when no image -->
      <div v-else class="w-48 h-48 rounded shadow-2xl bg-gradient-to-br from-[#282828] to-[#181818] flex items-center justify-center">
        <svg class="w-20 h-20 text-zinc-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </div>
      <div class="flex flex-col">
        <p class="text-sm font-medium uppercase tracking-wider text-zinc-300">Playlist</p>
        <h2 class="text-5xl font-bold mb-4 md:text-7xl">{{ playlistData.name }}</h2>
        <p v-if="playlistData.description" class="text-zinc-400 text-sm mb-1">{{ playlistData.description }}</p>
        <p class="mt-1 text-zinc-300">{{ playlistSongs.length }} Songs</p>
      </div>
    </div>

    <!-- Action bar -->
    <div class="flex items-center gap-4 mt-8 mb-4">
      <button @click="openAddSongModal"
        class="flex items-center gap-2 px-5 py-2.5 bg-[#1db954] hover:bg-[#1ed760] text-black font-bold rounded-full cursor-pointer transition-all hover:scale-105 text-sm">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
        </svg>
        Add Song
      </button>
    </div>

    <!-- Song list header -->
    <div class="grid grid-cols-3 sm:grid-cols-4 mt-6 mb-4 pl-2 text-[#a7a7a7]">
      <p><b class="mr-4">#</b>Title</p>
      <p>Artist</p>
      <p class="hidden sm:block"></p>
      <img class="m-auto w-4" :src="assets.clock_icon" alt="">
    </div>

    <hr class="h-px bg-white">

    <!-- Empty state -->
    <div v-if="playlistSongs.length === 0" class="flex flex-col items-center justify-center py-16 text-zinc-400">
      <svg class="w-16 h-16 mb-4 text-zinc-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
      <p class="text-lg font-semibold text-zinc-300">No songs yet</p>
      <p class="text-sm mt-1">Click "Add Song" to start building your playlist.</p>
    </div>

    <!-- Song rows -->
    <div v-for="(item, index) in playlistSongs" :key="item.id"
      class="group grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded transition-colors">
      <p class="text-white flex items-center" @click="playPlaylistSong(item)">
        <b class="mr-4 text-[#a7a7a7] w-5 text-right inline-block">{{ index + 1 }}</b>
        <img class="inline w-12 mr-5 rounded" :src="item.cover" alt="" />
        <span class="truncate">{{ item.name }}</span>
      </p>

      <p class="text-[15px] truncate" @click="playPlaylistSong(item)">{{ item.artist }}</p>
      <p class="text-[15px] text-center hidden sm:block"></p>

      <div class="flex items-center justify-center gap-3">
        <span class="text-[15px]">{{ item.duration }}</span>
        <button @click.stop="removeSong(item)"
          class="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-400 transition-all cursor-pointer p-1 rounded-full hover:bg-[#ffffff15]"
          title="Remove from playlist">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Add Song Modal -->
    <div v-if="showAddSongModal" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" @click.self="closeAddSongModal">
      <div class="bg-[#282828] w-full max-w-xl rounded-xl shadow-2xl relative text-white overflow-hidden flex flex-col max-h-[80vh]">

        <!-- Modal header -->
        <div class="p-6 pb-4">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Add Songs</h2>
            <button @click="closeAddSongModal"
              class="text-gray-400 hover:text-white rounded-full p-1 hover:bg-[#3E3E3E] transition-colors cursor-pointer">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Search input -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
            </svg>
            <input
              v-model="songSearchQuery"
              type="text"
              class="w-full bg-[#3E3E3E] text-white pl-10 pr-4 py-2.5 rounded-md focus:outline-none focus:ring-1 focus:ring-white border border-transparent focus:border-zinc-500 transition-all text-sm placeholder:text-zinc-500"
              placeholder="Search for songs..."
              autofocus
            >
          </div>
        </div>

        <!-- Song list -->
        <div class="flex-1 overflow-y-auto px-6 pb-6">
          <div v-if="availableSongs.length === 0" class="text-center text-zinc-400 py-8">
            <p class="text-sm">{{ songSearchQuery ? 'No songs found' : 'All songs are already in this playlist' }}</p>
          </div>

          <div v-for="song in availableSongs" :key="song.id"
            class="flex items-center gap-3 p-2.5 rounded-md hover:bg-[#ffffff15] transition-colors group">
            <img :src="song.cover" alt="" class="w-10 h-10 rounded object-cover flex-shrink-0">
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm text-white truncate">{{ song.name }}</p>
              <p class="text-zinc-400 text-xs truncate">{{ song.artist }}</p>
            </div>
            <button @click="addSong(song)"
              class="opacity-0 group-hover:opacity-100 px-4 py-1.5 border border-zinc-500 text-white rounded-full text-xs font-bold hover:border-white hover:scale-105 transition-all cursor-pointer">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
