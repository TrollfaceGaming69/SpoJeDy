<script setup>
import Navbar from '@/component/navbar.vue';
import SideBar from '@/component/sideBar.vue';
</script>

<template>
    <div class="h-screen bg-black">
        <Navbar/>
        <div class="h-[90%] flex">
            <SideBar/>
            <router-view />
        </div>

    </div>
</template>