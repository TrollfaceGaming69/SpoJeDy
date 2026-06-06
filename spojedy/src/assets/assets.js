
import arrow_icon from '../assets/icon/arrow.png'
import bell_icon from '../assets/icon/bell.png'
import clock_icon from '../assets/icon/clock_icon.png'
import fullscreen_icon from '../assets/icon/fullscreen.png'
import home_icon from '../assets/icon/home.png'
import arrow_left from '../assets/icon/left_arrow.png'
import like_icon from '../assets/icon/like.png'
import loop_icon from '../assets/icon/loop.png'
import mic_icon from '../assets/icon/mic.png'
import mini_player_icon from '../assets/icon/mini-player.png'
import mute_icon from "../assets/icon/mute.png"
import next_icon from '../assets/icon/next.png'
import play_icon from '../assets/icon/play.png'
import pause_icon from '../assets/icon/pause.png'
import plays_icon from '../assets/icon/plays.png'
import plus_icon from '../assets/icon/plus.png'
import prev_icon from '../assets/icon/prev.png'
import queue_icon from '../assets/icon/queue.png'
import arrow_right from '../assets/icon/right_arrow.png'
import search_icon from '../assets/icon/search.png'
import shuffle_icon from '../assets/icon/shuffle.png'
import speaker_icon from '../assets/icon/speaker.png'
import spotify_logo from '../assets/icon/spotify_logo.png'
import stack_icon from '../assets/icon/stack.png'
import volume_icon from '../assets/icon/volume.png'
import zoom_icon from '../assets/icon/zoom.png'

import yoisabi1 from "../assets/videos/yoisabi1.mp4"
import yoisabi2 from "../assets/videos/yoisabi2.mp4"
import loop_active from "../assets/icon/loop_active.png"


export const assets = {
    arrow_icon,
    bell_icon,
    clock_icon,
    fullscreen_icon,
    home_icon,
    arrow_left,
    like_icon,
    loop_active,
    loop_icon,
    mic_icon,
    mini_player_icon,
    mute_icon,
    next_icon,
    pause_icon,
    play_icon,
    plays_icon,
    plus_icon,
    prev_icon,
    queue_icon,
    arrow_right,
    search_icon,
    shuffle_icon,
    speaker_icon,
    spotify_logo,
    stack_icon,
    volume_icon,
    zoom_icon,
}

export const musicData = [
    {
        id: 0,
        name: "アンコール",
        src: "https://ik.imagekit.io/kanjoed02/Music/アンコール.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/yoisabi1.png",
        artist: "YOASOBI",
        duration: "4:31"
    },
    {
        id: 1,
        name: "ハルカ",
        src: "https://ik.imagekit.io/kanjoed02/Music/YOASOBI_ハルカ_Official Music Video.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/yoisabi2.png",
        artist: "YOASOBI",
        duration: "4:04"
    },
    {
        id: 2,
        name: "Mambo",
        src: "https://ik.imagekit.io/kanjoed02/Music/mambo.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/MAMBO.png",
        artist: "Mambo",
        duration: "0:40"
    },
    {
        id: 3,
        name: "Satru 2",
        src: "https://ik.imagekit.io/kanjoed02/Music/Denny Caknan - SATRU 2 Official Music Video.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/satru2.png",
        artist: "Denny Caknan",
        duration: "4:55"
    },
    {
        id: 4,
        name: "Kim Jong Goon",
        src: "https://ik.imagekit.io/kanjoed02/Music/Kim Jung Goon.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/Kirkbanger.png",
        artist: "Master of Goon",
        duration: "2:10"
    },
    {
        id: 5,
        name: "あの夢をなぞって",
        src: "https://ik.imagekit.io/kanjoed02/Music/YOASOBI_あの夢をなぞって.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/yoasobi3.png",
        artist: "YOASOBI",
        duration: "3:59"
    },
    {
        id: 6,
        name: "Megalith Agnus Dei",
        src: "https://ik.imagekit.io/kanjoed02/Music/Megalith Agnus Dei.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/AceCombat.png",
        artist: "Bandai Namco Game Music",
        duration: "7:35"
    },
    {
        id: 7,
        name: "Koyoi Mofumofu!!",
        src: "https://ik.imagekit.io/kanjoed02/Music/Koyoi mofumofu!!.mp3",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/holy characterization.jpg",
        artist: "Purbaya",
        duration: "6:33"
    },
]


//for video id 1 and 2 i put the src locally since my imagekit is already at the limit for processing more videos
export const videoData = [
    {
        id: 0,
        name: "Jatim Slander",
        src: "https://ik.imagekit.io/kanjoed02/MusicVideo/jatimslander.mp4",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/jatim.png",
        artist: "Gus Miftah"
    },

    {
        id: 1,
        name: "Bus Antar Provinsi Bangers",
        src: "https://ik.imagekit.io/kanjoed02/MusicVideo/busantarprovinsiost.mp4",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/busantarprovinsiost.png",
        artist: "DJ Ohim"
    },
    {
        id: 2,
        name: "アンコール",
        src: yoisabi1,
        cover: "https://ik.imagekit.io/kanjoed02/Cover/YoisabiCover1.png",
        artist: "YOASOBI"
    },
    {
        id: 3,
        name: "ハルカ",
        src: yoisabi2,
        cover: "https://ik.imagekit.io/kanjoed02/Cover/YoisabiCover2.png",
        artist: "YOASOBI"
    }
]

export const albumData = [
    {
        id: 0,
        name: "Trending in Ngawi",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/Amba.png",
        artist: "Denny Caknan, Mas Amba",
        bgColor: "#44337a",
        songs: [3, 4]
    },
    {
        id: 1,
        name: "Absolute Bangers",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/Kirkbanger.png",
        artist: "Mambo, Rusdi, Brewok Audio",
        bgColor: "#742a2a",
        songs: [2, 4, 7]
    },
    {
        id: 2,
        name: "THE BOOK",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/yoisabi1.png",
        artist: "YOASOBI",
        bgColor: "#FFAFAF",
        songs: [0, 1, 5]
    },
    {
        id: 3,
        name: "Tunes While Ngarit at Sawah",
        cover: "https://ik.imagekit.io/kanjoed02/Cover/carbide.webp",
        artist: "DJ Ohim, YesKing, Gus Miftah",
        bgColor: "#FFAFAF",
        songs: [0, 3, 6]
    },
]