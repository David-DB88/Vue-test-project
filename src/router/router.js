import {createRouter, createWebHistory} from "vue-router";
import PostsPage from "@/pages/PostsPage";
import PostIdPage from "@/pages/PostIdPage";
import Login from "@/pages/Login";
import Main from "@/pages/Main";
import CompositionAPI from "@/pages/CompositionAPI";


const routes = [

    {
        path: '/login',
        component: Login,
        meta: { auth: false }
    },
    {
        path: '/',
        component: Main,
        meta: { auth: true }
    },
    {
        path: '/posts',
        component: PostsPage,
        meta: { auth: true }
    },
    {
        path: '/posts/:id',
        component: PostIdPage,
        meta: { auth: true }
    },
    {
        path: '/composition',
        component: CompositionAPI,
        meta: { auth: true }
    }
]



 const router = createRouter({
     routes,
     history: createWebHistory()
 })
router.beforeEach((to, from, next) => {
    const user = localStorage.getItem('user')
    const requireAuth = to.matched.some(rec => rec.meta.auth)
    if (!user && requireAuth) {
        next('/login')
    } else {
        next()
    }
})
export default router