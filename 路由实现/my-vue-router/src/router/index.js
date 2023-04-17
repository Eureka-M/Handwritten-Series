import Vue from 'vue'
// import VueRouter from 'vue-router'
import myVueRouter from './myVueRouter'
Vue.use(myVueRouter)

const routes = [
    { 
        path: '/',
        component: () => import('../views/Home.vue') 
    },
    { 
        path: '/home',
        component: () => import('../views/Home.vue') 
    },
    { 
        path: '/about',
        component: () => import('../views/About.vue') 
    }
]

const router = new myVueRouter({
    mode: 'history',
    routes
})

export default router