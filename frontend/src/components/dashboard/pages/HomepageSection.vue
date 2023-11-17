<template>
  <div class="dashboard-homepage-section me-3" >
    <!-- section one -->
    <div class="section-container py-2 px-3 mb-3">
      <p class="head-4">Section 1</p>
      <div class="input-form2">
        <label for="" class="small">Banner Title</label>
        <input type="text" class="w-100" />
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
        <input type="text" class="w-100" />
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
        <input type="text" class="w-100" />
      </div>
      <div class="input-form2">
        <label for="" class="small">Select Products</label>
        <input type="text" class="w-100" />
      </div>
    </div>
    <div class="button-wrapper text-end">
        <button class="primary-btn">Update</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "../../../store/products";
const productStore = useProductStore();

const heading = ref("");
const smallText = ref("");
const buttonText = ref("");
const buttonLink = ref("http://127.0.0.1:5173/dashboard/");
const file = ref(null);
onMounted(async () => {
  await productStore.getHomepageBanner();
  heading.value = productStore.homepageBanner.heading;
  smallText.value = productStore.homepageBanner.smallText;
  buttonLink.value = productStore.homepageBanner.buttonLink;
  buttonText.value = productStore.homepageBanner.buttonText;
});

const handleFile = (event) => {
  const files = event.target.files[0];
  file.value = files;
};
const homepageBannerData = computed(() => {
  return productStore.homepageBanner;
});

const editBanner = async () => {
  const formdata = new FormData();
  formdata.append("image", file.value);
  formdata.append("heading", heading.value);
  formdata.append("smallText", smallText.value);
  formdata.append("buttonText", buttonText.value);
  formdata.append("buttonLink", buttonLink.value);

  await productStore.editHomepageBanner(formdata);
};
</script>