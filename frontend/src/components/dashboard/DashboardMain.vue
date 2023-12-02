
<template>
  <div class="dashboard-container" data-theme="light" data-bkg-500="ternary">
    <SideNavbar class="side-navbar"/>
    <main class="w-100">
      <Navbar/>
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import SideNavbar from "./navbars/SideNavbar.vue";
import Navbar from "./navbars/Navbar.vue";
import { onMounted } from "vue";
import {router,useAuthStore} from "@utility/index";

const authStore = useAuthStore();


onMounted(async () => {
  await authStore.getUserDetails();
});

const Logout = () => {
  localStorage.clear()
  router.push("/login")
};
</script>

<style scoped src="../../styles/components/dashboard/_dashboard-main.scss">
</style>