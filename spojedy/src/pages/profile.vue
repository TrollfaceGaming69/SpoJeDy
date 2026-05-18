<script setup>
import MusicVideoItem from '@/component/musicVideoItem.vue';
import { musicData, assets, videoData } from '@/assets/assets';
import SongItem from '@/component/songItem.vue';
import { useRouter } from 'vue-router';


const navigate = useRouter();
</script>

<template>
    <div class="w-full m-2 px-6 rounded text-white overflow-auto lg:w-[75%] lg:ml-0">
        <div class="flex items-center gap-2 my-4">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_left" alt="" @click="navigate.go(-1)">
            <img class="w-8 bg-black p-2 rounded-2xl cursor-pointer" :src="assets.arrow_right" alt="" @click="navigate.go(1)">
        </div>

        <div class="">
            <img class="w-20 rounded-full" src="" alt="">
            <div>
                <p class="">Profile</p>
                <h1 class="text-2xl"></h1>
                
                <p></p>
            </div>
        </div>

        <div class="">
            <img src="" alt="">

            <div>
                <div>
                    <h1 class="my-5 font-bold text-2xl">Your Playlists</h1>
                    <div class="flex overflow-auto">

                    </div>
                </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top tracks</h1>
                <div class="flex overflow-auto">
                    <SongItem v-for="song in musicData" :key="song.id" :id="song.id" :cover="song.cover" :name="song.name" :artist="song.artist"/>
                </div>
            </div>

            <div>
                <h1 class="my-5 font-bold text-2xl">Top music videos</h1>
                <div class="flex overflow-auto">
                    <MusicVideoItem v-for="video in videoData" :key="video.id" :id="video.id" :name="video.name" :artist="video.artist" :cover="video.cover"/>
                </div>
            </div>
        </div>
    </div>
</template>