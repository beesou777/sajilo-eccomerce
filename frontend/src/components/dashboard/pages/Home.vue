<template>
  <div class="home-sction">
    welcom {{user_data ? user_data.full_name: "loading..." }}
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