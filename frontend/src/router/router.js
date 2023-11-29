import { createRouter, createWebHistory } from 'vue-router'


// dashboard
import {
    DashboardAddProduct,
    DashboardAppearance,
    DashboardCategory,
    DashboardHome,
    DashboardHomepageBanner,
    DashboardHomepagePersonalDetails,
    DashboardHomepageProfile,
    DashboardHomepageProfileAccount,
    DashboardHomepageSection,
    DashboardHomepageUpdatePassword,
    DashboardMain,
    DashboardOrder,
    DashboardOrderAdd,
    DashboardProduct,
    Login,
    Register
} from "@utility/index"


import Homepage from "../views/theme1/Homepage.vue"
let sub_domain;
const path = window.location.pathname.startsWith("/dashboard") || window.location.pathname.startsWith("/register") || window.location.pathname.startsWith("/login")
if(!path){
    sub_domain = window.location.pathname
}
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login,
        },
        {
            path: "/register",
            name: "register",
            component: Register,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardMain,
            children: [
            { path: "", name: "dashboard-home", component: DashboardHome, },
            { path: "/dashboard/categories", name: "dashboard-category", component: DashboardCategory, },
            { path: "/dashboard/add_product", name: "dashboard-add-product", component: DashboardAddProduct, },
            { path: "/dashboard/product", name: "dashboard-products", component: DashboardProduct, },
            { path: "/dashboard/profile", component: DashboardHomepageProfile,children:[
                { path: "", name: "dashboard-profile", component: DashboardHomepageProfileAccount, },
                { path: "details", name: "personal-details", component: DashboardHomepagePersonalDetails, },
                { path: "update-password", name: "update-Password", component: DashboardHomepageUpdatePassword, },
            ] },
            { path: "/dashboard/appearance", name: "dashboard-appearance", component: DashboardAppearance, children:[
                { path: "", name: "appearance-banner", component: DashboardHomepageBanner, },
                { path: "section", name: "appearance-section", component: DashboardHomepageSection, },
            ] },
            { path: "/dashboard/order", name: "dashboard-order", component: DashboardOrder},
             {path:"/dashboard/order/add", name:"add-order" , component:DashboardOrderAdd}
              
        ]},
        {
            path: `/${sub_domain}`,
            name: "homepage",
            component: Homepage,
            children: [
            // { path: `/${sub_domain}`, name: "home-page", component: Homepage, }, 
        ]}
          ,]
})

export default router;