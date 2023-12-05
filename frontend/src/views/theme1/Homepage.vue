<template>
  <div class="homepage-section">
    <div class="homepage-banner position-relative" v-if="homepageBanner">
      <img :src="homepageBanner?.image" alt="">
      <div class="homepage-banner-content position-absolute">
        <p class="h4">{{ homepageBanner.heading }}</p>
        <p class="h1">{{ homepageBanner.sub_title }}</p>
        <div class="button-wrapper">
          <button class="btn-pri">{{ homepageBanner.button_text }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import { computed, onMounted, ref } from "vue";
import {useHomepageStore} from '@utility/index'
// store
const homepageStore  = useHomepageStore()


// mounted
onMounted(async()=>{
  await homepageStore.getHomepageBanner()
})

// computed
const homepageBanner = computed(()=>{
  return homepageStore?.homepageData
})

console.log(homepageBanner)
</script>
<style scoped>
@import "@style/base/_utility.scss";
@import "@style/components/theme1/_home-page.scss"
</style>