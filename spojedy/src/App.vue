<script setup>
import { useRouter } from 'vue-router'
import Navbar from '@/component/navbar.vue';
import SideBar from '@/component/sideBar.vue';

const router = useRouter()
</script>

<template>
      <div class="h-screen bg-black">
        <Navbar/>
        <div class="h-[90%] flex">
            <SideBar/>
            <router-view />
        </div>
        
        <audio src="" preload="auto"></audio>
    </div>
</template>


