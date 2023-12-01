// dashboardRoutes.js
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
    DashboardProduct
  } from "@utility/index";
  
  const dashboardRoutes = [
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardMain,
      children: [
        { path: "", name: "dashboard-home", component: DashboardHome },
        { path: "/dashboard/categories", name: "dashboard-category", component: DashboardCategory },
        { path: "/dashboard/add_product", name: "dashboard-add-product", component: DashboardAddProduct },
        { path: "/dashboard/product", name: "dashboard-products", component: DashboardProduct },
        { path: "/dashboard/profile", component: DashboardHomepageProfile, children: [
            { path: "", name: "dashboard-profile", component: DashboardHomepageProfileAccount },
            { path: "details", name: "personal-details", component: DashboardHomepagePersonalDetails },
            { path: "update-password", name: "update-Password", component: DashboardHomepageUpdatePassword },
          ] 
        },
        { path: "/dashboard/appearance", name: "dashboard-appearance", component: DashboardAppearance, children: [
            { path: "", name: "appearance-banner", component: DashboardHomepageBanner },
            { path: "section", name: "appearance-section", component: DashboardHomepageSection },
          ] 
        },
        { path: "/dashboard/order", name: "dashboard-order", component: DashboardOrder },
        { path: "/dashboard/order/add", name: "add-order", component: DashboardOrderAdd }
      ]
    }
  ];
  
  export default dashboardRoutes;
  