<template>
    <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../store/products';
const productStore = useProductStore()


</script>