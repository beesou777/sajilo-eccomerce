
<template>
  <div class="dashboard-container">
    <SideNavbar class="side-navbar" />
    <main>
      <Navbar class="d-flex justify-content-between global-nav  align-items-center p-2">
        <div class="img-wrapper">
          <img src="../../assets/Logo/logo.svg" alt="" />
        </div>
        <div class="nav-links">
          <div class="button-wrapper">
            <button class="primary-btn" @click="Logout">Logout</button>
          </div>
        </div>
      </Navbar>
      <router-view></router-view>
    </main>
  </div>
</template>
<script setup>
import SideNavbar from "./navbars/SideNavbar.vue";
import Navbar from "./navbars/Navbar.vue";
import { useAuthStore } from "../../store/authentication";
import { useProductStore } from "../../store/products";
import { watch,onMounted } from "vue";
import router from "../../router/router";
const authStore = useAuthStore();
const productStore = useProductStore()


onMounted(async()=>{
  await authStore.getUserInfomation()
})

watch(() => {
  if (!authStore.current_user_id || !authStore.current_user_details) {
    authStore.getUserData();
    authStore.getUserInfomation();
  }
  if (
    !authStore.current_user_details &&
    !authStore.access_token &&
    !authStore.current_user_id
  ) {
    router.push("/login");
  }
});


const Logout = ()=>{
    localStorage.removeItem("access_token")
    authStore.access_token = ""
    authStore.current_user_details = ""
    authStore.current_user_id = ""
    localStorage.removeItem("current_user_details")
    localStorage.removeItem("user_id")
    productStore.current_user_id = ""
    router.push("/login")
}
</script>