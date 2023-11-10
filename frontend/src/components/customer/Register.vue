<template>
  <div
    class="login-section px-3 d-flex vh-100 justify-content-center align-items-center"
  >
    <div class="login-point">
      <div class="brand d-flex align-items-center">
        <p class="head-1"><span>Sajilo</span> Eccomerce</p>
      </div>
      <div class="user_content">
        <p class="head-4">What would you like to name your store?</p>
        <p class="head-5">You can always change this later on</p>
        <div class="input_feild">
          <input
            class="w-100"
            type="text"
            placeholder="Enter your store full name"
            v-model="storeName"
          />
        </div>
        <div class="button-wrapper py-3">
          <button class="primary-btn" @click="redir">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useAuthStore } from "../../store/authentication";
const authStore = useAuthStore();
import {ref,watch } from "vue";
import router from "../../router/router";
const storeName = ref("");


const redir = async () => {
  const userData = await authStore.getUserData();
  if (userData) {
    const user_id = userData.id;
    const email = userData.email;
    const store_name = storeName.value;
    const full_name = userData.full_name;
    const profile_picture = userData.profile_picture;
    await authStore.registerUser({
      user_id,
      store_name,
      email,
      full_name,
      profile_picture,
    });
  }
  await authStore.getUserInfomation()
  router.push("/dashboard")
};

watch(()=>{
  if(authStore.currentId || authStore.currentUser){
    router.push("/dashboard")
  }
})
</script>