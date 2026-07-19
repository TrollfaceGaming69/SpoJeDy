import { ref, watch } from 'vue';

export const currentSong = ref(null);
export const isPlaying = ref(false);
export const currentTime = ref(0);
export const duration = ref(0);
export const isLooping = ref(false);
export const allSongs = ref([]);

const audio = new Audio();

audio.addEventListener('timeupdate', () => {
  currentTime.value = audio.currentTime;
});

audio.addEventListener('loadedmetadata', () => {
  duration.value = audio.duration;
});

audio.addEventListener('ended', () => {
  if (!isLooping.value) {
    playNext();
  }
});

watch(isLooping, (newVal) => {
  audio.loop = newVal;
});

export const playSong = (song, songsList = []) => {
  const normalizedSong = song && typeof song === 'object'
    ? {
        ...song,
        src: typeof song.src === 'string' ? song.src.trim() : song.src,
        cover: typeof song.cover === 'string' ? song.cover.trim() : song.cover,
      }
    : song;

  if (!normalizedSong || !normalizedSong.src) return;

  if (songsList && songsList.length > 0) {
    allSongs.value = songsList;
  }

  if (!currentSong.value || currentSong.value.id !== normalizedSong.id) {
    currentSong.value = normalizedSong;
    audio.src = normalizedSong.src;
    audio.load();
  }

  audio.play()
    .then(() => {
      isPlaying.value = true;
    })
    .catch((err) => {
      console.warn('Audio play was prevented or failed:', err);
      isPlaying.value = false;
    });
};

export const pauseSong = () => {
  audio.pause();
  isPlaying.value = false;
};

export const togglePlayPause = () => {
  if (isPlaying.value) {
    pauseSong();
  } else if (currentSong.value) {
    audio.play()
      .then(() => {
        isPlaying.value = true;
      })
      .catch((err) => {
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
