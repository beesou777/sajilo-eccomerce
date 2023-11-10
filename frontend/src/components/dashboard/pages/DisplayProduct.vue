<template>
  <div>
    <div class="dashboard-product-page px-2 position-relative">
      <div class="py-3">
        <p class="head-4">Store Products</p>
      </div>
      <div class="product-section">
        <div class="product-data-heads row">
          <div class="col-1">
            <p class="head-5 mb-0">S.N</p>
          </div>
          <div class="col-2">
            <p class="head-5 mb-0">Name</p>
          </div>
          <div class="col-2">
            <p class="head-5 mb-0">price</p>
          </div>
          <div class="col-2">
            <p class="head-5 mb-0">Inventory</p>
          </div>
          <div class="col-2">
            <p class="head-5 mb-0">status</p>
          </div>
          <div class="col-2">
            <p class="head-5 mb-0">created</p>
          </div>
          <div class="col-1">
            <p class="head-5 mb-0">Action</p>
          </div>
        </div>
        <div
          v-for="(data, index) in product"
          :key="index"
        >
        <div class="row product-data" v-if="data.status == 'active'">
            <div class="col-1 d-flex gap-3 align-items-center">
            <p class="head-5 mb-0" @click="showEditCategory(index)">
              {{count += 1}}
            </p>
          </div>
          <div class="col-2 d-flex gap-3 align-items-center">
            <div class="image-wrapper">
              <img :src="data.product_images" :alt="data.product_name" />
            </div>
            <p class="head-5 mb-0" @click="showEditCategory(index)">
              {{ data.product_name }}
            </p>
          </div>
          <div class="col-2 d-flex gap-3 align-items-center">
            <p class="head-5 mb-0" @click="showEditCategory(index)">
              {{ data.actual_price }}
            </p>
          </div>
          <div class="col-2 d-flex gap-3 align-items-center">
            <p class="head-5 mb-0" >
              {{ data.selling_price  }}
            </p>
          </div>
          <div class="col-2 d-flex gap-3 align-items-center">
            <p class="head-5 mb-0">
              {{ data.status }}
            </p>
          </div>
          <div class="col-2 d-flex gap-3 align-items-center">
            <p class="head-5 mb-0">
              {{ data.createdAt }}
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
  <script setup>
import { computed, onMounted } from "vue";
import { useProductStore } from "../../../store/products";
import { ref } from "vue";

let count = ref(1)
const productStore = useProductStore();

onMounted(async () => {
  await productStore.getProduct();
});



const product = computed(() => {
  return productStore.products ? productStore.products : "";
});
</script>