import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Search from '../views/Search.vue' 
import BoKe from '../views/BoKe.vue'
import Friend from '../views/Friend.vue'
import Video from '../views/Video.vue'
import ZhiBo from '../views/ZhiBo.vue'
import SrFm from '../views/SrFm.vue'
import Login from '../views/Login.vue'
import Gedan from '../views/Gedan.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        redirect: '/home',
        component: Main,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home
            },
            {
                path: 'search',
                name: 'Search',
                component: Search
            },
            {
                path: 'boke',
                name: 'BoKe',
                component: BoKe
            },
            {
                path: 'video',
                name: 'Video',
                component: Video
            },
            {
                path: 'friend',
                name: 'Friend',
                component: Friend
            },
            {
                path: 'zhibo',
                name: 'ZhiBo',
                component: ZhiBo
            },
            {
                path: 'srfm',
                name: 'SrFm',
                component: SrFm
            },
            {
                path:'gedan',
                name:'Gedan',
                component:Gedan
            }
        ]
    },
    {
        path:'/login',
        name:'Login',
        component:Login
    }

]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
