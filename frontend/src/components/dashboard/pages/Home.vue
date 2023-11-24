<template>
  <div class="home-section p-3">
    <p class="head-text pb-3">Overview</p>
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
// const user_data = computed(()=>{
//    return authStore ? authStore.current_user_details : ""
// })
</script>
<style lang="scss" scoped>
@import "../../../styles/base/variable.scss";
.home-section {
  .head-text {
    color: #f53d3d;
    font-family: Quicksand;
    font-size: 24px;
    font-weight: 400;
  }
  .card-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: $white;
    padding: 20px;
    max-width: 230px;
    min-height: 110px;
    width: 100%;
    height: 100%;
    line-height: 0.9rem;
    .small {
      color: rgba(0, 0, 0, 0.45);
    }
    .head-4 {
      color: rgba(0, 0, 0, 0.88);
    }
  }
}
</style>