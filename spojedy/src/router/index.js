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
      name: "home",
      component: Display,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          component: HomePage
        }
      ]
    },
    {
      path: "/album/:id",
      name: "albumdetail",
      component: Display,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: displayAlbum
        }
      ]
    },
    {
      path: "/music/:id",
      name: "musicdetail",
      component: Display,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: MusicDetail
        }
      ]
    },
    {
      path: "/musicvideo",
      name: "musicvideo",
      component: Display,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: MusicVideoPage
        }
      ]
    },
    {
      path: "/musicvideo/:id",
      name: "videodetail",
      component: Display,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: MusicVideoDetail
        }
      ]
    },
    {
      path: "/profile",
      name: "profile",
      component: Display,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: Profile
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: AuthLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          component: LoginPage
        }
      ]
    },
    {
      path: "/register",
      name: "register",
      component: AuthLayout,
      meta: { requiresAuth: false },
      children: [
        {
          path: "",
          component: RegisterPage
        }
      ]
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' })
  } else if (!requiresAuth && isAuthenticated && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' })
  } else if (to.path === '/') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
