<script setup>
import { ref } from 'vue';

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'create']);

const playlistName = ref('');
const playlistDescription = ref('');
const coverImage = ref(null);
const coverFile = ref(null);
const fileInput = ref(null);

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    coverImage.value = URL.createObjectURL(file);
    coverFile.value = file;
  }
};

const handleClose = () => {
  playlistName.value = '';
  playlistDescription.value = '';
  coverImage.value = null;
  coverFile.value = null;
  emit('close');
};

const handleCreate = () => {
  emit('create', {
    name: playlistName.value,
    description: playlistDescription.value,
    cover: coverFile.value
  });
  handleClose();
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div class="bg-[#282828] w-full max-w-lg rounded-xl p-6 shadow-2xl relative text-white">

      <h2 class="text-2xl font-bold mb-6">Create Playlist</h2>

      <button @click="handleClose" class="absolute top-6 right-6 text-gray-400 hover:text-white rounded-full p-1 hover:bg-[#3E3E3E] transition-colors cursor-pointer">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        accept="image/*" 
        @change="handleFileChange"
      >

      <div class="flex flex-col md:flex-row gap-6 mb-6">

        <div 
          @click="triggerFileInput" 
          class="relative group cursor-pointer w-48 h-48 mx-auto md:mx-0 shrink-0 bg-[#181818] flex flex-col items-center justify-center rounded-md overflow-hidden shadow-md border border-[#3E3E3E] hover:border-zinc-500 transition-colors"
        >
          <img 
            v-if="coverImage"
            class="w-full h-full object-cover" 
            :src="coverImage" 
            alt="Playlist Cover Preview"
          >
          <div v-else class="flex flex-col items-center justify-center text-zinc-400 gap-2 p-4 text-center">
            <svg class="w-16 h-16 text-zinc-500 group-hover:text-zinc-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
            <span class="text-xs font-semibold select-none">Choose photo</span>
          </div>

          <div class="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-sm font-semibold">Choose photo</span>
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-white uppercase tracking-wider">Name</label>
            <input 
              v-model="playlistName" 
              type="text" 
              class="w-full bg-[#3E3E3E] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-white border border-transparent focus:border-zinc-500 transition-all text-sm placeholder:text-zinc-500"
              placeholder="My Playlist"
            >
          </div>
          
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-bold text-white uppercase tracking-wider">Description</label>
            <textarea 
              v-model="playlistDescription"
              class="w-full bg-[#3E3E3E] text-white px-4 py-3 rounded-md focus:outline-none focus:ring-1 focus:ring-white border border-transparent focus:border-zinc-500 transition-all text-sm resize-none h-24 placeholder:text-zinc-500"
              placeholder="Add an optional description"
            ></textarea>
          </div>
        </div>

      </div>

      <div class="flex justify-end gap-4 mt-6">
        <button 
          @click="handleClose" 
          class="px-6 py-2 rounded-full font-bold hover:bg-[#3E3E3E] transition-colors text-sm cursor-pointer"
        >
          Cancel
        </button>
        <button 
          @click="handleCreate" 
          class="px-6 py-2 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform text-sm cursor-pointer"
        >
          Create
        </button>
      </div>

    </div>
  </div>
</template>
