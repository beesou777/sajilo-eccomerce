<template>
  <div class="homepage-section">
    <div class="homepage-banner position-relative" v-if="homepageBanner">
      <img :src="homepageBanner?.image" alt="">
      <div class="homepage-banner-content position-absolute">
        <p class="h4">{{ homepageBanner.heading }}</p>
        <p class="h1">{{ homepageBanner.sub_title }}</p>
        <a :href="'http://127.0.0.1:5173/faltu123'+ homepageBanner.button_link">
          <div class="button-wrapper mt-4">
            <button class="btn-pri"> {{ homepageBanner.button_text }} </button>
          </div>
        </a>
      </div>
    </div>
    <div class="homepage-sections container py-4" v-if="homepageSection">
      <div class="section-one"  v-if="homepageSection.section_1.products.length > 0">
        <div class="d-flex justify-content-between py-3 header">
          <p class="h3">{{ homepageSection.section_1.name }}</p>
          <a href="#">
            <button>see all</button>
          </a>
        </div>
        <div class="section-product row ">
          <div class="col-md-3 col-sm-12" v-for="(data, index) in homepageSection.section_1.products" :key="index">
            <div class="products border p-3 position-relative">
              <div class="position-absolute" @click="wishlistActive(index)">
                <svg v-if="!isClicked[index]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-if="isClicked[index]" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"
                    fill="#E02A60" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div class="img-wrapper">
                <img class="w-100" :src="data.product_images" :alt="data.product_name">
              </div>
              <p class="body-1 product-title">{{ data.product_name }}</p>
              <div class="d-flex product-price gap-2 align-items-center">
                <p class="body-1 fw-medium">${{ data.selling_price }}</p>
                <p class="small text-muted">${{ data.actual_price }}</p>
              </div>
              <p class="small save">Save {{ data.selling_price - data.actual_price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section-two" v-if="homepageSection.section_2.products.length > 0">
        <div class="d-flex justify-content-between py-3 header">
          <p class="h3">{{ homepageSection.section_3.name }}</p>
          <a href="#">
            <button>see all</button>
          </a>
        </div>
        <div class="section-product row ">
          <div class="col-md-3 col-sm-12" v-for="(data, index) in homepageSection.section_2.products" :key="index">
            <div class="products border p-3 position-relative">
              <div class="position-absolute" @click="wishlistActive2(index)">
                <svg v-if="!isClicked2[index]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-if="isClicked2[index]" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"
                    fill="#E02A60" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </div>
              <div class="img-wrapper">
                <img class="w-100" :src="data.product_images" :alt="data.product_name">
              </div>
              <p class="body-1 product-title">{{ data.product_name }}</p>
              <div class="d-flex product-price gap-2 align-items-center">
                <p class="body-1 fw-medium">${{ data.selling_price }}</p>
                <p class="small text-muted">${{ data.actual_price }}</p>
              </div>
              <p class="small save">Save {{ data.selling_price - data.actual_price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section-three" v-if="homepageSection.section_3.products.length > 0">
        <div class="d-flex justify-content-between py-3 header">
          <p class="h3">{{ homepageSection.section_3.name }}</p>
          <a href="#">
            <button>see all</button>
          </a>
        </div>
        <div class="section-product row ">

          <div class="col-md-3 col-sm-12" v-for="(data, index) in homepageSection.section_3.products" :key="index">
            <div class="products border p-3 position-relative">
              <div class="position-absolute" @click="wishlistActive3(index)">
                <svg v-if="!isClicked3[index]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"
                    stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <svg v-if="isClicked3[index]" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M16.1111 3C19.6333 3 22 6.3525 22 9.48C22 15.8138 12.1778 21 12 21C11.8222 21 2 15.8138 2 9.48C2 6.3525 4.36667 3 7.88889 3C9.91111 3 11.2333 4.02375 12 4.92375C12.7667 4.02375 14.0889 3 16.1111 3Z"
                    fill="#E02A60" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </div>
              <div class="img-wrapper">
                <img class="w-100" :src="data.product_images" :alt="data.product_name">
              </div>
              <p class="body-1 product-title">{{ data.product_name }}</p>
              <div class="d-flex product-price gap-2 align-items-center">
                <p class="body-1 fw-medium">${{ data.selling_price }}</p>
                <p class="small text-muted">${{ data.actual_price }}</p>
              </div>
              <p class="small save">Save {{ data.selling_price - data.actual_price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// imports
import { computed, onMounted, ref } from "vue";
import { useHomepageStore } from '@utility/index'
// store
const homepageStore = useHomepageStore()

// data
const isClicked = ref([])
const isClicked2 = ref([])
const isClicked3 = ref([])
// mounted
onMounted(async () => {
  await homepageStore.getHomepageBanner()
  await homepageStore.getHomepageSection()
  isClicked.value = new Array(homepageStore.homepageSection.section_1.products.length).fill(false)
  isClicked2.value = new Array(homepageStore.homepageSection.section_2.products.length).fill(false)
  isClicked3.value = new Array(homepageStore.homepageSection.section_3.products.length).fill(false)
})
// computed
const homepageBanner = computed(() => {
  return homepageStore?.homepageData
})

const homepageSection = computed(() => {
  return homepageStore?.homepageSection
})

// methods
const wishlistActive = (index)=>{
  isClicked.value[index] = !isClicked.value[index]
}

const wishlistActive2 = (index)=>{
  isClicked2.value[index] = !isClicked2.value[index]
}

const wishlistActive3 = (index)=>{
  isClicked3.value[index] = !isClicked3.value[index]
}

</script>
<style scoped>
@import "@style/base/utility.scss";
@import "@style/components/theme1/_home-page.scss"
</style>