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
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Display,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "home",
          component: HomePage
        }
      ]
    },
    {
      path: "/album/:id",
      component: Display,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "albumdetail",
          component: displayAlbum
        }
      ]
    },
    {
      path: "/music/:id",
      component: Display,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "musicdetail",
          component: MusicDetail
        }
      ]
    },
    {
      path: "/musicvideo",
      component: Display,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "musicvideo",
          component: MusicVideoPage
        }
      ]
    },
    {
      path: "/musicvideo/:id",
      component: Display,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "videodetail",
          component: MusicVideoDetail
        }
      ]
    },
    {
      path: "/profile",
      component: Display,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          name: "profile",
          component: Profile
        }
      ]
    },
    {
      path: "/login",
      component: AuthLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "login",
          component: LoginPage
        }
      ]
    },
    {
      path: "/register",
      component: AuthLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          name: "register",
          component: RegisterPage
        }
      ]
    }
  ],
})

router.beforeEach((to, from) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated) {
    return { name: 'login' }
  } else if (!requiresAuth && isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    return { name: 'home' }
  }
})

export default router
