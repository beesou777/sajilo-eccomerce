import  {useAuthStore} from "@store/authentication";
import {useOrderStore } from "@store/Order.store.js"
import { useProductStore } from '@store/product.store';
import { useHomepageStore } from '@store/homepage.store';
import router from '@router/router';

// for dashboards
import DashboardMain from "@dashboard/DashboardMain.vue"
import DashboardHome from "@dashboard/pages/Home.vue"
import DashboardCategory from "@dashboard/pages/Category.vue"
import DashboardAddProduct from "@dashboard/pages/AddProduct.vue"
import DashboardProduct from "@dashboard/pages/DisplayProduct.vue"
import DashboardAppearance from "@dashboard/pages/Appearance.vue"
import DashboardHomepageBanner from "@dashboard/pages/appearance/HomepageBannerSection.vue"
import DashboardNavbarSection from "@dashboard/pages/appearance/NavbarSection.vue"
import DashboardHomepageSection from "@dashboard/pages/appearance/HomepageSection.vue"
import DashboardHomepageProfile from "@dashboard/pages/Profile.vue"
import DashboardHomepageProfileAccount from "@dashboard/pages/profile/profileAccount.vue"
import DashboardHomepagePersonalDetails from "@dashboard/pages/profile/personalDetails.vue"
import DashboardHomepageUpdatePassword from "@dashboard/pages/profile/ChangePassword.vue"
import DashboardOrder  from "@dashboard/pages/Order.vue"
import DashboardOrderAdd  from "@dashboard/pages/order/AddOrder.vue"

// user part
import Login from "@component/customer/Login.vue"
import Register from "@component/customer/Register.vue"


export{
    useAuthStore,
    useOrderStore,
    useProductStore,
    useHomepageStore,
    router,
    DashboardAddProduct,
    DashboardAppearance,
    DashboardCategory,
    DashboardNavbarSection,
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
}