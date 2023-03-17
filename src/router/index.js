import { createRouter, createWebHistory } from 'vue-router'

import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import GlobalFeed from '@/views/GlobalFeed.vue'
import TagFeed from '@/views/TagFeed.vue'
import YourFeed from '@/views/YourFeed.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'globalFeed',
      component: GlobalFeed
    },
    {
      path: '/feed',
      name: 'yourFeed',
      component: YourFeed
    },
    {
      path: '/tags/:slug',
      name: 'tag',
      component: TagFeed
    },
    {
      path: '/articles/new',
      name: 'createArticle',
      component: GlobalFeed
    },
    {
      path: '/articles/:slug',
      name: 'article',
      component: GlobalFeed
    },
    {
      path: '/articles/:slug/edit',
      name: 'editArticle',
      component: GlobalFeed
    },
    {
      path: '/settings',
      name: 'settings',
      component: GlobalFeed
    },
    {
      path: '/profiles/:slug',
      name: 'userProfile',
      component: GlobalFeed
    },
    {
      path: '/profiles/:slug/favorites',
      name: 'userProfileFavorites',
      component: GlobalFeed
    },
    
  ]
})

export default router
