<template>
  <div class="dashboard-homepage-section me-3" v-if="homepageSection">
    <!-- section one -->
    <div class="section-container py-2 px-3 mb-3">
      <p class="head-4">Section 1</p>
      <div class="input-form2">
        <label for="" class="small">Banner Title</label>
        <input type="text" class="w-100"  v-model="name_1"/>
      </div>
      <div class="input-form2">
        <label for="" class="small">Select Products</label>
        <input type="text" class="w-100" />
      </div>
    </div>
    <!-- section two start from here -->
    <div class="section-container py-2 px-3 mb-3">
      <p class="head-4">Section 2</p>
      <div class="input-form2">
        <label for="" class="small">Banner Title</label>
        <input type="text" class="w-100" v-model="name_2"/>
      </div>
      <div class="input-form2">
        <label for="" class="small">Select Products</label>
        <input type="text" class="w-100" />
      </div>
    </div>
    <!-- section three start from there -->
    <div class="section-container py-2 px-3 mb-3">
      <p class="head-4">Section 3</p>
      <div class="input-form2">
        <label for="" class="small">Banner Title</label>
        <input type="text" class="w-100" v-model="name_3"/>
      </div>
      <div class="input-form2">
        <label for="" class="small">Select Products</label>
        <input type="text" class="w-100" />
      </div>
    </div>
    <div class="button-wrapper text-end">
        <button class="primary-btn">Update</button>
    </div>

    <!-- overlay -->
    <!-- <div class="overlay"></div> -->

    <!-- form -->
   <formData/>
  </div>
</template>

// <script setup>
// import formData from "./FormData.vue"
// import { computed, onMounted, ref } from "vue";
// import { useProductStore } from "../../../store/Order.store";
// const productStore = useProductStore();

// const name_1 = ref("");
// const name_2 = ref("");
// const name_3 = ref("");

// onMounted(async () => {
//   await productStore.getHomepageSection();
//   name_1.value = productStore.homepage_section.section_1.name
//   name_2.value = productStore.homepage_section.section_2.name
//   name_3.value = productStore.homepage_section.section_3.name
// });

// const homepageSection = computed(() => {
//   return productStore.homepage_section;
// });

// const editBanner = async () => {
//   const formdata = new FormData();
//   formdata.append("image", file.value);
//   formdata.append("heading", heading.value);
//   formdata.append("smallText", smallText.value);
//   formdata.append("buttonText", buttonText.value);
//   formdata.append("buttonLink", buttonLink.value);
//   await productStore.editHomepageBanner(formdata);
// };
// </script>