<template>
    <div class="container-max home-page">
        <picture class="position-absolute">
        <source media="(min-width: 1024px)" srcset="https://cdn02.plentymarkets.com/6wg68w8zahno/frontend/assets/imgs/banners/black-friday-home-page.webp" />
        <source media="(min-width: 768px)" srcset="https://cdn02.plentymarkets.com/6wg68w8zahno/frontend/assets/imgs/banners/medium-img-black-friday.webp" />
        <source src="https://cdn02.plentymarkets.com/6wg68w8zahno/frontend/assets/imgs/banners/small-img-black-friday.webp" />
        <img src="https://cdn02.plentymarkets.com/6wg68w8zahno/frontend/assets/imgs/banners/small-img-black-friday.webp" alt="black friday banner" loading="lazy" width="700" height="700" />
    </picture>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useProductStore } from '../../store/products';
const productStore = useProductStore()

onMounted(async()=>{
    await productStore.getSubDomainProduct()
})

</script>