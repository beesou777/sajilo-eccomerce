<template>
    <div class="appearance-container">
        <div class="row">
            <div class="col-md-3 col-sm-12">
                <div class="appearance-headings">
                    <p class="head-3">Impulses</p>
                    <ul>
                        <li class="active-banner"><a href="#">Banner</a></li>
                        <li><a href="/dashboard/appearance/section">Sections</a></li>
                        <li><a href="#">Fonts And Colors</a></li>
                        <li><a href="#">Homepage</a></li>
                        <li><a href="#">Headers & Favicon</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-9 col-sm-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../../../store/products';

// const productStore = useProductStore()


// onMounted(async()=>{
//     await productStore.getHomepageBanner()
// })

</script>