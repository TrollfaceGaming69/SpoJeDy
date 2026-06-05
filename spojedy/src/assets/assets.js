import bell_icon from '../assets/icon/bell.png'
import home_icon from '../assets/icon/home.png'
import like_icon from '../assets/icon/like.png'
import loop_icon from '../assets/icon/loop.png'
import mic_icon from '../assets/icon/mic.png'
import next_icon from '../assets/icon/next.png'
import play_icon from '../assets/icon/play.png'
import pause_icon from '../assets/icon/pause.png'
import plays_icon from '../assets/icon/plays.png'
import prev_icon from '../assets/icon/prev.png'
import search_icon from '../assets/icon/search.png'
import shuffle_icon from '../assets/icon/shuffle.png'
import speaker_icon from '../assets/icon/speaker.png'
import stack_icon from '../assets/icon/stack.png'
import zoom_icon from '../assets/icon/zoom.png'
import plus_icon from '../assets/icon/plus.png'
import arrow_icon from '../assets/icon/arrow.png'
import mini_player_icon from '../assets/icon/mini-player.png'
import queue_icon from '../assets/icon/queue.png'
import volume_icon from '../assets/icon/volume.png'
import arrow_right from '../assets/icon/right_arrow.png'
import arrow_left from '../assets/icon/left_arrow.png'
import spotify_logo from '../assets/icon/spotify_logo.png'
import clock_icon from '../assets/icon/clock_icon.png'
import yoisabi1 from "../assets/videos/yoisabi1.mp4"
import yoisabi2 from "../assets/videos/yoisabi2.mp4"
import loop_active from "../assets/icon/loop_active.png"
import eye from "../assets/icon/eye.png"

export const assets = {
    bell_icon,
    home_icon,
    like_icon,
    loop_icon,
    mic_icon,
    next_icon,
    play_icon,
    plays_icon,
    prev_icon,
    search_icon,
    shuffle_icon,
    speaker_icon,
    stack_icon,
    zoom_icon,
    plus_icon,
    arrow_icon,
    mini_player_icon,
    volume_icon,
    queue_icon,
    pause_icon,
    arrow_left,
    arrow_right,
    clock_icon,
    spotify_logo,
    loop_active,
    eye
}

//for video id 2 and 3 i put the src locally since my imagekit is already at the limit for processing more videos
export const videoData = [
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