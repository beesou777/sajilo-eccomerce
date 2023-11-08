
import { createRouter, createWebHistory } from 'vue-router'

import Login from "../components/customer/Login.vue"
import Register from "../components/customer/Register.vue"

// dashboard
import DashboardMain from "../components/dashboard/DashboardMain.vue"
import DashboardHome from "../components/dashboard/pages/Home.vue"
import DashboardCategory from "../components/dashboard/pages/Category.vue"
import DashboardAddProduct from "../components/dashboard/pages/AddProduct.vue"
import DashboardProduct from "../components/dashboard/pages/DisplayProduct.vue"
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
            name: "refister",
            component: Register,
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardMain,
            children: [
            { path: "", name: "home", component: DashboardHome, },
            { path: "/dashboard/categories", name: "dashboard-category", component: DashboardCategory, },
            { path: "/dashboard/add_product", name: "dashboard-add-product", component: DashboardAddProduct, },
            { path: "/dashboard/products", name: "dashboard-products", component: DashboardProduct, },
            // { path: "product/add", name: "product-add", component: AddProduct, },
            // { path: "product/edit/:id", name: "product-edit", component: EditProduct, },
            // { path: "product/details", name: "product-details", component: ProductDetails, },
    
              
        ]}
          ,]
})

export default router;