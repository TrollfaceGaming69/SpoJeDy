<script setup>
import { useRouter } from 'vue-router'
import Navbar from '@/component/navbar.vue';
import SideBar from '@/component/sideBar.vue';
import SongPlayer from '@/component/songPlayer.vue';
import LoginPage from './pages/loginPage.vue';

const router = useRouter()
</script>

<template>
      <div class="h-screen">
        <Navbar/>
        <div class="h-[90%] flex">
            <SideBar/>
            <router-view />
        </div>
        
        <audio src="" preload="auto"></audio>
    </div>
</template>


<style>
:root {
  --bg-color: #121212;
  --text-color: #ffffff;    
  --card-bg: #1e1e1e;

  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s ease;
}

:root.light {
  --bg-color: #f0f0f0;
  --text-color: #000000;    
  --card-bg: #ffffff;
}
</style>
