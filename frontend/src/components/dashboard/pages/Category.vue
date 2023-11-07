<template>
  <div>
    <div
      class="overlay position-absolute"
      v-if="isEditable"
      @click="isEditable = false"
    ></div>
    <div class="dashboard-category-page px-2 position-relative">
      <!-- Modal -->
      <div
        class="modal fade"
        id="addCategories"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header border-bottom-0 pb-2">
              <h1 class="modal-title fs-5" id="addCategories">
                Add Categories
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body py-2">
              <div class="input_feild py-2">
                <label for="category-name" class="pb-2"
                  >Category Name <span class="text-danger">*</span></label
                >
                <input
                  type="text"
                  class="w-100 py-2"
                  id="category-name"
                  v-model="category_name"
                />
              </div>
              <div class="input_feild py-2">
                <label for="category-image" class="pb-2"
                  >Category image <span class="text-danger pb-2">*</span></label
                >
                <input
                  type="file"
                  class="w-100 py-2"
                  id="cayegory-image"
                  @change="onFileChange"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                @click="addCategories"
                data-bs-dismiss="modal"
              >
                Add Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between py-3">
        <p class="head-4">Store Category</p>
        <div class="btn-wrapper">
          <button
            class="primary-btn"
            data-bs-toggle="modal"
            data-bs-target="#addCategories"
          >
            Add Categories
          </button>
        </div>
      </div>
      <div class="categories-section">
        <div class="categories-data-heads row">
          <div class="col-7">
            <p class="head-5 mb-0">Name</p>
          </div>
          <div class="col-5">
            <p class="head-5 mb-0">Action</p>
          </div>
        </div>
        <div
          class="categories-data row"
          v-for="(data, index) in categories"
          :key="index"
        >
          <div class="col-7 d-flex gap-3 align-items-center">
            <div class="image-wrapper">
              <img :src="data.category_images" :alt="data.category_name">
            </div>
            <p class="head-5 mb-0" @click="showEditCategory(index)">
              {{ data.category_name }}
            </p>
          </div>
          <div class="col-5">
            <div class="button-wrapper">
              <button class="head-5" @click="deleteCategory(index)">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="position-absolute edit-category" v-if="isEditable">
        <div class="d-flex justify-content-between px-3">
          <p class="head-4">Edit Category</p>
          <i class="fas fa-times pt-2" @click="isEditable = false"></i>
        </div>
        <div class="input_feild py-2 px-3">
          <label for="category-name" class="pb-2"
            >Category Name <span class="text-danger">*</span></label
          >
          <input
            type="text"
            class="w-100 py-2"
            id="category-name"
     
            v-model="edit_category_name"
          />
        </div>
        <div class="input_feild py-2 px-3">
          <label for="category-name" class="pb-2"
            >Category Images <span class="text-danger">*</span></label
          >
         <div class="position-relative">
          <input
            type="file"
            class="w-100 py-2 position-absolute input-file"
            id="category-name"
            @change="handleFileUpload"
          />
          <div class="image-wrapper">
            <img :src="edit_category_images" alt="image" v-if="!imageUrl">
            <img :src="imageUrl" alt="image" v-if="imageUrl">
          </div>
         </div>

        </div>
        <div class="button-wrapper py-3">
          <button class="primary-btn" @click="editCategory">
            <img src="../../../assets/load.gif" alt="" height="30" v-if="isloading">
            edit category
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted } from "vue";
import { useProductStore } from "../../../store/products";
// import { useAuthStore } from "../../../store/authentication";
import { ref } from "vue";
import router from "../../../router/router";

// const authStore = useAuthStore();
const productStore = useProductStore();
const category_name = ref("");
const file = ref(null);
const edit_category_name = ref("");
const edit_category_images = ref("");
let isEditable = ref(false);
let isloading = ref(false)
let imageUrl = ref('')
let file2 = ref(null)
let categoryIds;

onMounted(async () => {
  await productStore.getCategories();
});


const handleFileUpload = (event) => {
  const file = event.target.files[0];
  file2.value = file
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imageUrl.value = reader.result;
    }
    reader.readAsDataURL(file);
  }
}

const onFileChange = (event)=>{
  file.value = event.target.files[0]
}

const addCategories = async () => {
  const user = productStore.current_user_id;
  const formdata = new FormData();
  formdata.append("user", user);
  formdata.append("category_name", category_name.value);
  formdata.append("category_images", file.value);

  try {
    const res = await productStore.createCategories(formdata);
    if (res.status === 200) {
      await productStore.getCategories();
      category_name.value = "";
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteCategory = async (index) => {
  const currentIndex = categories.value[index]._id;
  await productStore.deleteCategories(currentIndex);
};

const showEditCategory = (index) => {
  isEditable.value = !isEditable.value;
  const categoryId = categories.value[index];
  categoryIds = categoryId._id;
  productStore.category_id = categoryId._id
  edit_category_name.value = categoryId.category_name;
  edit_category_images.value = categoryId.category_images;
  isloading = false
};

const editCategory = async () => {
  if(file2.value !== null){
    const formdata = new FormData()
    formdata.append("category_images",file2.value)
    formdata.append("category_name",edit_category_name.value)
    await productStore.editCategories(formdata);
    isEditable.value = !isEditable.value
    console.log(formdata)
  }else{
    const formdata = new FormData()
    formdata.append("category_name",edit_category_name.value)
    await productStore.editCategories(formdata)
    isEditable.value = !isEditable.value
  }
};

const categories = computed(() => {
  return productStore.categories ? productStore.categories : "";
});
</script>