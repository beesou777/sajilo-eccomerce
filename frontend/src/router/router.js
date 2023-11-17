import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/customer/Login.vue"
import Register from "../components/customer/Register.vue"

// dashboard
import DashboardMain from "../components/dashboard/DashboardMain.vue"
import DashboardHome from "../components/dashboard/pages/Home.vue"
import DashboardCategory from "../components/dashboard/pages/Category.vue"
import DashboardAddProduct from "../components/dashboard/pages/AddProduct.vue"
import DashboardProduct from "../components/dashboard/pages/DisplayProduct.vue"
import DashboardAppearance from "../components/dashboard/pages/Appearance.vue"
import DashboardHomepageBanner from "../components/dashboard/pages/HomapageBannerScetion.vue"
import DashboardHomepageSection from "../components/dashboard/pages/HomepageSection.vue"
import DashboardHomepageProfile from "../components/dashboard/pages/Profile.vue"
import DashboardHomepageProfileAccount from "../components/dashboard/pages/profileAccount.vue"
import DashboardHomepagePersonalDetails from "../components/dashboard/pages/personalDetails.vue"


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
            { path: "/dashboard/products", name: "dashboard-products", component: DashboardProduct, },
            { path: "/dashboard/profile", component: DashboardHomepageProfile,children:[
                { path: "", name: "dashboard-profile", component: DashboardHomepageProfileAccount, },
                { path: "personal-detail", name: "personal-details", component: DashboardHomepagePersonalDetails, },
            ] },
            { path: "/dashboard/appearance", name: "dashboard-appearance", component: DashboardAppearance, children:[
                { path: "", name: "appearance-banner", component: DashboardHomepageBanner, },
                { path: "section", name: "appearance-section", component: DashboardHomepageSection, },
            ] },
              
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