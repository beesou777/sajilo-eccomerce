<template>
  <div class="dashboard-product-page position-relative px-3">
    <p class="h3 fw-normal text-pri">Product</p>
    <div class="order-options py-4 text-end">
      <div class="search-container position-relative d-flex gap-3 align-items-center">
        <div class="input_form">
          <input type="search" class="search-input flex-grow-1 pl-3" v-model="searchQuery"
            @input="onInputChange($event.target.value)" @click="focusInput" placeholder="search by name or email" />
        </div>
        <div class="button-wrapper">
          <button class="btn-pri" @click="router.push('/dashboard/order/add')">Add Orders</button>
        </div>
      </div>
    </div>

    <table class="product-table text-center w-100">
      <thead>
        <tr>
          <th class="p-3">Product Name</th>
          <th class="p-3">Product SKU</th>
          <th class="p-3">Category Name</th>
          <th class="p-3">Actual Price</th>
          <th class="p-3">Selling Price</th>
          <th class="p-3">Payment Status</th>
          <th class="p-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in fetchProduct" :key="index">
          <td class="p-2">{{ data?.product_name }}</td>
          <td class="p-2">{{ data?.product_sku }}</td>
          <td class="p-2 fw-medium">
            {{ data?.product_category.name }}
          </td>
          <td class="p-2">{{ data?.actual_price }}</td>
          <td class="p-2">{{ data?.selling_price }}</td>
          <td class="p-2">
            <div class="form-check form-switch d-flex justify-content-center">
              <input class="form-check-input" type="checkbox" role="switch" :checked="data?.status == true ?  '' : checked">
            </div>
          </td>
          <td class="p-2 d-flex align-items-center justify-content-center button-wrapper">
            <button class="btn-del" @click="deleteId(index)">Delete</button>
            <button class="btn-200 text-dark" @click="showDetails(index)">Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useProductStore, useAuthStore } from "@utility/index";
import { ref } from "vue";

// store
const productStore = useProductStore();
const authStore = useAuthStore()


// mounted
onMounted(async () => {
  productStore.uuid = authStore.uuid
  await productStore.getSearchResult('');
});

// computed
const fetchProduct = computed(() => {
  return productStore?.search_product
})



const product = computed(() => {
  return productStore.products ? productStore.products : "";
});
</script>
<style lang="scss" scoped>
@import '@style/base/variable';
@import "@utility_style";
@import "@style/components/dashboard/products"
</style>