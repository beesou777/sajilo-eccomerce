<template>
  <div class="row">
    <div class="col-md-6 col-12">
      <div class="bg-white my-3 p-3 rounded-2">
        <div class="input_feild">
          <label class="py-2 head-5">
            Product Name:
            <span class="text-danger">*</span>
          </label>
          <input type="text" v-model="product_name" />
        </div>

        <div class="input_feild">
          <label class="py-2 head-5">
            Product Description
            <span class="text-danger">*</span>
          </label>
          <textarea v-model="product_description"></textarea>
        </div>
      </div>

      <div class="bg-white my-3 p-3 rounded-2">
        <div class="input_feild">
          <label class="py-2 head-5">
            Discount Price
            <span class="text-danger">*</span>
          </label>
          <input
            type="number"
            v-model="product_discount"
          />
        </div>

        <div class="input_feild">
          <label class="py-2 head-5">
            Actual Price
            <span class="text-danger">*</span>
          </label>
          <input type="number" v-model="actual_price" />
        </div>

        <div class="input_feild">
          <label class="py-2 head-5">
            Quantity
            <span class="text-danger">*</span>
          </label>
          <input type="number"  v-model="quantity" />
        </div>

        <div class="input_feild">
          <label class="py-2 head-5">
            Product sku
            <span class="text-danger">*</span>
          </label>
          <input type="text" v-model="product_sku">
        </div>

        <div class="input_feild">
          <label class="py-2 head-5">
            Product Status
            <span class="text-danger">*</span>
          </label>
         
        <select v-model="status">
            <option value="active">Active</option>
            <option value="active">Draft</option>
          </select>
        </div>

      </div>

    </div>
    <div class="col-md-6 col-12">

      <div class="bg-white p-3 my-3 rounded-2">
        <h5 class="pb-4 large t-primary">Product Image  <span class="text-danger">*</span></h5>
        <div class="text-center border-2">
          <label for="image">
            <i
              class="fas fa-camera p-2 large t-primary"
              @click="openFileInput"
            ></i>
          </label>
          <br />
          <input
            type="file"
            id="product_image"
            name="product_image"
            accept="image/*"
            @change="handleFIleUpload"
          />
        </div>
        <div class="text-center">
          <h6 class="py-2 small t-primary">Upload the image</h6>
        </div>
      </div>

      <div class="input_feild bg-white my-3 p-3 rounded-2">
        <label class="py-2 head-5">
          Select Category:
          <span class="text-danger">*</span>
        </label>
        <select
          name="category"
          class="form-input"
          v-model="product_category"
        >
          <option selected disabled>Select Category</option>
          <option
            v-for="(cat_data, index) in product_ca"
            :key="index"
            :value="cat_data"
            class="t-primary"
          >
            {{ cat_data.name }}
          </option>
        </select>
      </div>

      <div class="button-wrapper p-3 w-100 bg-white rounded-2">
        <button class="primary-btn w-100" @click="createProduct">
            Add product
        </button>
      </div>

    </div>
  </div>
</template>

// <script setup>
// // imports
// import { ref, computed, onMounted } from 'vue';
// import { useProductStore } from '../../../store/Order.store';
// // import { useRouter } from 'vue-router';

// const productStore = useProductStore()
// // variables
// const product_name = ref('');
// const product_description = ref("")
// const product_discount = ref("")
// const actual_price = ref("")
// const quantity = ref()
// const product_sku = ref("")
// const status = ref("")
// const product_category = ref()
// const files = ref(null)

// onMounted(async()=>{
//   await productStore.getCategories()
//   await productStore.getProduct()
// })

// const handleFIleUpload = (event)=>{
//   const file = event.target.files[0]
//   files.value = file
// }

// const product_ca =computed(()=>{
//   return productStore.categories ? productStore.categories : ""
// })

// const createProduct = async()=>{
//     const formdata = new FormData()
//     formdata.append("product_name",product_name.value)
//     formdata.append("product_description",product_description.value)
//     formdata.append("selling_price",product_discount.value)
//     formdata.append("actual_price",actual_price.value)
//     formdata.append("quantity",quantity.value)
//     formdata.append("product_sku",product_sku.value)
//     formdata.append("status",status.value)
//     formdata.append("product_category",product_category.value._id)
//     formdata.append("product_images",files.value)
//     await productStore.createProduct(formdata);
// }
// </script>

<style scoped src="../../../styles/components/dashboard/_products.scss">

</style>