<template>
    <div class="dashboard-navbar-section p-3 me-3">
        <table class="w-100">
            <thead>
                <tr>
                    <th class="py-3 px-2 text-center">Logo</th>
                    <th class="py-3 px-2 text-center">Nav 1</th>
                    <th class="py-3 px-2 text-center">Nav 2</th>
                    <th class="py-3 px-2 text-center">Nav 3</th>
                    <th class="py-3 px-2 text-center">Nav 4</th>
                    <th class="py-3 px-2 text-center">Nav 5</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="py-3 px-2 text-center" @click="editNavbar('name','link')">link1</td>
                    <td class="py-3 px-2 text-center">link2</td>
                    <td class="py-3 px-2 text-center">link</td>
                    <td class="py-3 px-2 text-center">link</td>
                    <td class="py-3 px-2 text-center">link</td>
                    <td class="py-3 px-2 text-center">link</td>
                </tr>
            </tbody>
        </table>
       <div class="overlay" v-if="isOverlayOpen" @click="isOverlayOpen = false"></div>
       <div class="navbar-link-update p-3" v-if="isOverlayOpen">
         <div class="d-flex justify-content-between align-items-center">
            <p class="h3 mb-3">Edit your nav data</p>
            <span class="fw-bold close" @click="isOverlayOpen = false">X</span>
         </div>
         <form @submit.prevent>
            <div class="input_form">
                <label for="name">Nav name</label>
                <input type="text" placeholder="eg:all product" id="name" v-model="name">
            </div>
            <div class="input_form">
                <label for="link" class="pt-2">Nav Link</label>
                <input type="text" placeholder="eg:/all-product" id="link" v-model="link">
            </div>
            <div class="button-wrapper py-3">
                <button class="btn-pri">Update nav</button>
            </div>
         </form>
       </div>
    </div>
</template>

<script setup>
// imports
import { computed, onMounted, ref } from "vue";
import { useHomepageStore, useAuthStore } from "@utility/index"

// store
const homepageStore = useHomepageStore();
const authStore = useAuthStore()

// data
const isOverlayOpen = ref(false)
const name = ref("")
const link = ref("")

// methods
const editNavbar = (data,data2)=>{
    name.value = data
    link.value = data2
    isOverlayOpen.value = true
}
</script>
<style lang="scss" scoped>
@import "@style/components/dashboard/_appearance.scss";
</style>