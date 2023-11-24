<template>
  <div class="login-section d-flex justify-content-center">
    <div class="login-point p-4">
      <div class="logo-section pb-2 text-center">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25Z"
            fill="#D9D9D9"
          />
          <path
            d="M33.5526 14.8026C33.5526 19.3444 29.8708 23.0263 25.3289 23.0263C20.7871 23.0263 17.1053 19.3444 17.1053 14.8026C17.1053 10.2608 20.7871 6.57895 25.3289 6.57895C29.8708 6.57895 33.5526 10.2608 33.5526 14.8026Z"
            fill="#F5F5F5"
          />
          <path
            d="M43.4211 42.0847C43.4211 39.8816 42.9531 37.7001 42.0439 35.6647C41.1347 33.6293 39.802 31.7799 38.122 30.2221C36.442 28.6642 34.4475 27.4285 32.2525 26.5854C30.0575 25.7423 27.7048 25.3084 25.3289 25.3084C22.9531 25.3084 20.6004 25.7423 18.4054 26.5854C16.2104 27.4285 14.2159 28.6642 12.5359 30.2221C10.8559 31.7799 9.52323 33.6293 8.61402 35.6647C7.70481 37.7001 7.23684 39.8816 7.23684 42.0847L43.4211 42.0847Z"
            fill="#F5F5F5"
          />
        </svg>
      </div>
      <p class="h5 text-center mb-3">Login to get started</p>
      <form @submit.prevent>
          <div class="input_form w-100 my-2">
            <label for="email" class="small fw-medium"
              >E-mail: <span class="text-danger fs-5">*</span></label
            >
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="input_form w-100 my-2">
            <label for=" password" class="small fw-medium"
              >Password: <span class="text-danger fs-5">*</span></label
            >
            <input type="password" id="password" v-model="password" required />
          </div>
          <p class="text-center body-1 my-4"><a href="#" class="text-primary">
            Forgot Password ?</a></p>
        <div class="button-wrapper mt-3">
          <button class="w-100 fw-semibold" @click="Login">Login</button>
        </div>
        <p class="text-center body-1 my-4">Don’t have an account ? 
          <a href="#" class="text-primary"
           @click="router.push('/register')">Register</a></p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../../store/authentication";
const authStore = useAuthStore();
import router from "../../router/router";
import { ref } from "vue";

const email = ref("")
const password = ref("")

const Login = async () => {
  const data = {
    email:email.value,
    password:password.value
  }
  await authStore.login(data);
};


</script>
<style  scoped src="../../styles/components/dashboard/_login.scss">
@import "../../styles/base/variable.scss";
</style>