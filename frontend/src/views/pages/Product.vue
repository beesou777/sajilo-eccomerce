<template>
    <div class="container">
        this is product page
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useProductStore } from '../../store/products';
const productStore = useProductStore()

</script>