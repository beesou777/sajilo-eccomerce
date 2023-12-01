import { createRouter, createWebHistory } from 'vue-router'

const sub_domain = window.location.pathname.trim().split('/')[1]

import Home from "@views/theme1/Homepage.vue"
import dashboardRoutes from "./dashboard.router"
import userRouter from './user.router'
const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...userRouter,
        ...dashboardRoutes,
        {
            path: `/${sub_domain}`,
            name: "homepage",
            component: Home,
            children: [
            // { path: `/${sub_domain}`, name: "home-page", component: Homepage, }, 
        ]}
          ,]
})

export default router;
