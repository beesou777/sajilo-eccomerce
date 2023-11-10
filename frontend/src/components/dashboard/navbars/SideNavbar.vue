<template>
    <div class="side-navbar" v-if="user_data">
       <div class="d-flex gap-2 users align-items-center d-none d-md-block">
        <img :src="user_data.profile_picture" alt="profile-picture">
        <div class="user-attribute">
        <p class="body-2 fw-bold mb-0">{{user_data ? user_data.store_name: "loading..." }}</p>
        <p class="body-2 mb-0 text-muted">Owner</p>
        </div>
       </div>
       <div class="main-links d-none d-md-block">
        <p class="body-2">Main Links</p>
        <ul>
            <li><a href="/dashboard" class="body-2">Home</a></li>
            <li><a href="/dashboard" class="body-2">Store User</a></li>
            <li><a href="/dashboard/categories" class="body-2">Categories</a></li>
            <li><a href="/dashboard/products" class="body-2">Products</a></li>
            <li><a href="/dashboard" class="body-2">Orders</a></li>
        </ul>
       </div>
    </div>
    <div class="loading" v-else>
        loading...
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useAuthStore } from '../../../store/authentication';

const authStore = useAuthStore()
const user_data = computed(()=>{
   return authStore ? authStore.current_user_details : ""
})

</script>