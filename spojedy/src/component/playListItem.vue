<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  songs: {
    type: Array,
    default: () => []
  }
});

const navigate = useRouter();

const navigateToPlaylist = () => {
  navigate.push({ name: 'playlistdetail', params: { id: props.id } });
};
</script>

<template>
  <div 
    @click="navigateToPlaylist" 
    class="min-w-[11.25rem] max-w-[11.25rem] p-2 px-3 mr-4 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors flex flex-col group"
  >
    <!-- Playlist cover or Spotify-like placeholder -->
    <img 
      v-if="cover" 
      class="rounded aspect-square w-full object-cover shadow-md" 
      :src="cover" 
      :alt="name"
    >
    <div 
      v-else 
      class="rounded aspect-square w-full bg-gradient-to-br from-[#282828] to-[#181818] flex items-center justify-center shadow-md flex-shrink-0"
    >
      <svg class="w-16 h-16 text-zinc-500 group-hover:text-zinc-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </div>

    <p class="font-bold mt-2 mb-1 truncate text-white" :title="name">{{ name }}</p>
    <p class="text-zinc-400 text-sm truncate">
      {{ description ? description : (songs && songs.length ? `${songs.length} songs` : 'Playlist') }}
    </p>
  </div>
</template>
