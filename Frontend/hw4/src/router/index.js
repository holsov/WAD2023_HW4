import { createRouter, createWebHashHistory } from 'vue-router'
import AllPosts from '../views/AllPosts.vue'
import AddPostPage from '@/views/AddPostPage'
import Apost from '@/views/Apost.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: AllPosts
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  
  {
    path: '/addpost',
    name: 'AddPostPage',
    component: AddPostPage
  },
  {
    path: "/apost/:id",
    name: "Apost",
    component: Apost,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
