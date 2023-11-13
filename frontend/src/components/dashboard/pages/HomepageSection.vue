<template>
    <div class="dashboard-homepage-banner-section p-3 me-3" v-if="homepageBannerData">
        <div class="image-label">
            <label for="image" class="head-5 mb-3">Upload Image:</label>
            <input type="file" class="w-100" @change="handleFile">
        </div>
        <div class="input_form pt-3">
            <label for="banner-title" class="head-5 my-2">Banner Title</label>
            <input type="text" class="w-100" v-model="heading">
        </div>
        <div class="input_form">
            <label for="text" class="head-5 my-2">Banner Sub-title</label>
            <textarea v-model="smallText"></textarea>
        </div>
        <div class="input_form">
            <label for="image" class="head-4 my-2">Button text</label>
            <input type="text" class="w-100" v-model="buttonText">
        </div>
        <div class="input_form">
            <label for="image" class="head-4 my-2">Button Link</label>
            <input type="text" class="w-100" v-model="buttonLink">
        </div>
        <div class="input_form py-3">
           <button class="primary-btn w-100" @click="editBanner">Save</button>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "../../../store/products";
const productStore = useProductStore();

const heading = ref("")
const smallText = ref("")
const buttonText = ref("")
const buttonLink = ref("http://127.0.0.1:5173/dashboard/")
const file = ref(null)
onMounted(async ()=>{
    await productStore.getHomepageBanner()
    heading.value = productStore.homepageBanner.heading
    smallText.value = productStore.homepageBanner.smallText
    buttonLink.value = productStore.homepageBanner.buttonLink
    buttonText.value = productStore.homepageBanner.buttonText
})

const handleFile = (event)=>{
    const files = event.target.files[0]
    file.value = files
}
const homepageBannerData = computed(() => {
  return productStore.homepageBanner;
});

const editBanner = async()=>{
    const formdata = new FormData()
    formdata.append("image",file.value)
    formdata.append("heading",heading.value)
    formdata.append("smallText",smallText.value)
    formdata.append("buttonText",buttonText.value)
    formdata.append("buttonLink",buttonLink.value)

    await productStore.editHomepageBanner(formdata)
}
</script>