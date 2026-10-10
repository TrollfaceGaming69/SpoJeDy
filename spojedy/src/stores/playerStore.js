import { ref, watch } from 'vue';
import { mediaCache } from '@/utils/mediaCache';

export const currentSong = ref(null);
export const isPlaying = ref(false);
export const currentTime = ref(0);
export const duration = ref(0);
export const isLooping = ref(false);
export const allSongs = ref([]);

// Restore volume from localStorage if available
const savedVolume = localStorage.getItem('player_volume');
const initialVolume = savedVolume !== null && !isNaN(parseFloat(savedVolume)) ? parseFloat(savedVolume) : 0.7;
export const volume = ref(initialVolume);

export const videoTogglePlayPause = ref(null);

const audio = new Audio();
audio.volume = volume.value;

let currentPlayRequestId = 0;

audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime;
});

audio.addEventListener('loadedmetadata', () => {
  duration.value = audio.duration;
});

audio.addEventListener('playing', () => {
  isPlaying.value = true;
});

audio.addEventListener('pause', () => {
  isPlaying.value = false;
});

audio.addEventListener('ended', () => {
  isPlaying.value = false;
  if (!isLooping.value) {
    playNext();
  }
});

watch(isLooping, (newVal) => {
  audio.loop = newVal;
});

watch(volume, (newVal) => {
  audio.volume = newVal;
  try {
    localStorage.setItem('player_volume', newVal.toString());
  } catch (err) {
    console.warn('Failed to save volume to localStorage:', err);
  }
});

function prefetchNextSong() {
  if (!allSongs.value || allSongs.value.length === 0 || !currentSong.value) return;
  const currentIndex = allSongs.value.findIndex((s) => s.id === currentSong.value.id);
  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % allSongs.value.length;
    const nextSong = allSongs.value[nextIndex];
    if (nextSong) {
      if (nextSong.src) mediaCache.prefetchMedia(nextSong.src, 'audio');
      if (nextSong.cover) mediaCache.prefetchMedia(nextSong.cover, 'image');
    }
  }
}

export const playSong = async (song, songsList = []) => {
  const normalizedSong = song && typeof song === 'object'
    ? {
        ...song,
        src: typeof song.src === 'string' ? song.src.trim() : song.src,
        cover: typeof song.cover === 'string' ? song.cover.trim() : song.cover,
      }
    : song;

  if (!normalizedSong || !normalizedSong.src) return;

  const requestId = ++currentPlayRequestId;

  if (songsList && songsList.length > 0) {
    allSongs.value = songsList;
  }

  const songIdChanged = !currentSong.value || currentSong.value.id !== normalizedSong.id;
  currentSong.value = normalizedSong;

  if (normalizedSong.cover) {
    mediaCache.prefetchMedia(normalizedSong.cover, 'image');
  }

  if (songIdChanged) {
    const mediaUrl = await mediaCache.getMediaUrl(normalizedSong.src, 'audio');
    if (requestId !== currentPlayRequestId) return;

    audio.src = mediaUrl;
    audio.load();
  }

  if (requestId !== currentPlayRequestId) return;

  audio.play().catch((err) => {
    console.warn('Audio play failed or was prevented:', err);
  });

  prefetchNextSong();
};

export const pauseSong = () => {
  audio.pause();
  isPlaying.value = false;
};

export const togglePlayPause = () => {
  if (isPlaying.value) {
    pauseSong();
  } else if (currentSong.value) {
    audio.play().catch((err) => {
      console.warn('Audio play failed:', err);
    });
  }
};

export const playNext = () => {
  if (allSongs.value.length === 0) return;
  const currentIndex = allSongs.value.findIndex((s) => s.id === currentSong.value?.id);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + 1) % allSongs.value.length;
  playSong(allSongs.value[nextIndex]);
};

export const playPrevious = () => {
  if (allSongs.value.length === 0) return;
  const currentIndex = allSongs.value.findIndex((s) => s.id === currentSong.value?.id);
  if (currentIndex === -1) return;
  const prevIndex = (currentIndex - 1 + allSongs.value.length) % allSongs.value.length;
  playSong(allSongs.value[prevIndex]);
};

export const toggleLoop = () => {
  isLooping.value = !isLooping.value;
};

export const seek = (time) => {
  if (isNaN(time) || time < 0) return;
  audio.currentTime = time;
  currentTime.value = time;
};

export const stopSong = () => {
  audio.pause();
  audio.currentTime = 0;
  isPlaying.value = false;
  currentSong.value = null;
};
