<template>
    <div class="dashboard-homepage-banner-section p-3 me-3">
        <p class="head-4 pb-2">Update your banner</p>
        <div class="image_form">
            <input type="file" class="w-100" @change="handleFile">
        </div>
        <div class="input_form">
            <label for="banner-title" class="small">Banner Title</label>
            <input type="text" class="w-100" v-model="heading">
        </div>
        <div class="input_form">
            <label for="text" class="small">Banner Sub-title</label>
            <textarea v-model="smallText"></textarea>
        </div>
        <div class="input_form">
            <label for="image" class="small">Button text</label>
            <input type="text" class="w-100" v-model="buttonText">
        </div>
        <div class="input_form">
            <label for="image" class="small">Button Link</label>
            <input type="text" class="w-100" v-model="buttonLink">
        </div>
        <div class="button-wrapper my-3">
           <button class="pri-btn w-100" @click="editBanner">Save</button>
        </div>
    </div>
</template>

<script setup>
// imports
import { computed, onMounted, ref } from "vue";
import {useHomepageStore ,useAuthStore} from "@utility/index"

// store
const homepageStore = useHomepageStore();
const authStore = useAuthStore()

// data
const heading = ref("")
const smallText = ref("")
const buttonText = ref("")
const buttonLink = ref("/dashboard")
const file = ref(null)

// mounted
onMounted(async ()=>{
    homepageStore.uuid = authStore.uuid
    await homepageStore.getHomepageBanner()
    heading.value = homepageStore.homepageData.heading
    smallText.value = homepageStore.homepageData.sub_title
    buttonLink.value = homepageStore.homepageData.button_link
    buttonText.value = homepageStore.homepageData.button_text
})

const handleFile = (event)=>{
    const files = event.target.files[0]
    file.value = files
}

// methods
 const editBanner = async()=>{
     const formdata = new FormData()
     formdata.append("image",file.value)
     formdata.append("heading",heading.value)
     formdata.append("sub_title",smallText.value)
     formdata.append("button_text",buttonText.value)
     formdata.append("button_link",buttonLink.value)
     await homepageStore.updateHomepageBannerData(formdata)
 }
 </script>