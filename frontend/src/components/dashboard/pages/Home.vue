<template>
  <div class="home-section p-3">
    <p class="head-text">Overview</p>
    <div class="home-content d-flex gap-3 align-items-center">
      <div class="card-data">
        <p class="small">Items</p>
        <p class="head-4">40,282</p>
      </div>
      <div class="card-data">
        <p class="small">Items</p>
        <p class="head-4">40,282</p>
      </div>
      <div class="card-data">
        <p class="small">Items</p>
        <p class="head-4">40,282</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '../../../store/authentication';

const authStore = useAuthStore()
const user_data = computed(()=>{
   return authStore ? authStore.current_user_details : ""
})

</script>