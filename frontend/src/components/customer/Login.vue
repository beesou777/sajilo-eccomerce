<template>
  <div
    class="login-section px-3 d-flex vh-100 justify-content-center align-items-center"
  >
    <div class="login-point">
      <div class="brand d-flex align-items-center">
        <p class="head-1"><span>Sajilo</span> Eccomerce</p>
      </div>
      <div class="login_wraper">
        <div class="button-wrapper text-center w-100">
          <button @click="Login" class="primary-btn w-100">
            <i class="fa-brands fa-google"></i> Login With Google
          </button>
        </div>
        <p class="body-2 text-center py-3">
          Create your own store?
          <a class="body-sb" href="#"> Sign Up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../store/authentication";
const authStore = useAuthStore();
import { watch } from "vue";

const Login = async () => {
  await authStore.login();
}

watch(async()=>{
  if(!authStore.currentId && authStore.access_token){
    await authStore.getUserData()
    await authStore.getUserInfomation(); 
  }
})
</script>