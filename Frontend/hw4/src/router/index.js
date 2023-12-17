import { createRouter, createWebHashHistory } from 'vue-router'
import AllPosts from '../views/AllPosts.vue'
import AddPostPage from '@/views/AddPostPage.vue'
import Apost from '@/views/Apost.vue'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import auth from "../auth.js";

const routes = [
        {path: "/",
        name: "home",
        component: AllPosts,
        beforeEnter: async(to, from, next) => {
            let authResult = await auth.authenticated();
            if (!authResult) {
                next('/login')
            } else {
                next();
            }
        }
    },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
  
  {
    path: '/addpost',
    name: 'AddPostPage',
    component: AddPostPage
  },
  {
    path: "/api/apost/:id",
    name: "Apost",
    component: Apost,
},
  {
    path: "/login",
    name: "LogIn",
    component: LoginPage,
},
  {
    path: '/signup',
    name: 'SignUpPage',
    component: SignUpPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
