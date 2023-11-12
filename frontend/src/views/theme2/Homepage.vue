<template>
    <div class="container-max home-page">
      <div class="header-page d-flex gap-3 ">
      <div class="img-wrapper">
        <img class="w-100" src="https://dukaan.b-cdn.net/600x600/webp/upload_file_service/15c5ef9c-3cfe-4a5a-bad1-9e52963d42c3/image.webp" alt="">
      </div>
      <div class="img-wrapper">
        <img class="w-100" src="https://dukaan.b-cdn.net/600x600/webp/upload_file_service/5624ab85-8825-4870-9706-76d59c2f1477/image.webp" alt="">
      </div>
      <div class="img-wrapper">
      <img class="w-100" src="https://dukaan.b-cdn.net/600x600/webp/upload_file_service/44f6c9c6-5fc4-433e-a066-dc2da761d26f/image.webp" alt="">
      </div>
      </div>
      <div class="container-max px-4">
     <div class="all-categories">
        <p class="head-4">All categories</p>
        <div class="product-category">
            
        </div>
     </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { useProductStore } from "../../store/products";
  const productStore = useProductStore();
  
  onMounted(async () => {
    await productStore.getSubDomainProduct();
  });
  </script>
  <style scoped src="../../styles/components/theme2/_home-page.scss">
  </style>