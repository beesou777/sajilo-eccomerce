<template>
  <div class="hello">
    hello this is faltu
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {useProductStore} from '@utility/index'
const productStore  = useProductStore()

onMounted(async()=>{
  await productStore.getSearchResult('')
})

</script>
<style scoped src="../../styles/components/theme1/_home-page.scss">
</style>