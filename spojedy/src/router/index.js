import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/homePage.vue'
import displayAlbum from '@/component/displayAlbum.vue'
import MusicDetail from '@/pages/musicDetail.vue'
import MusicVideoPage from '@/pages/musicVideoPage.vue'
import MusicVideoDetail from '@/pages/musicVideoDetail.vue'
import Profile from '@/pages/profile.vue'
import LoginPage from '@/pages/loginPage.vue'
import RegisterPage from '@/pages/registerPage.vue'
import Display from '@/display.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/album/:id",
      name: "albumdetail",
      component: displayAlbum
    },
    {
      path: "/music/:id",
      name: "musicdetail",
      component: MusicDetail
    },
    {
      path: "/musicvideo",
      name: "musicvideo",
      component: MusicVideoPage
    },
    {
      path: "/musicvideo/:id",
      name: "videodetail",
      component: MusicVideoDetail
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    /*{
      path: "/login",
      name: "login",
      component: LoginPage
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage
    },
    {
      path: "/display",
      name: "display",
      component: Display
    }*/
  ],
})

export default router
