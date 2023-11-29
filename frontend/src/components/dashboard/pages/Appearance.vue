<template>
    <div class="appearance-container">
        <div class="row">
            <div class="col-md-3 col-sm-12">
                <div class="appearance-headings">
                    <p class="head-4">Impulses</p>
                    <ul>
                        <li><a href="/dashboard/appearance" class="body-1">Banner</a></li>
                        <li><a href="/dashboard/appearance/section" class="body-1">Sections</a></li>
                        <li><a href="#" class="body-1">Fonts And Colors</a></li>
                        <li><a href="#" class="body-1">Homepage</a></li>
                        <li><a href="#" class="body-1">Headers & Favicon</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-9 col-sm-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
// <script setup>
// import { onMounted } from 'vue';
// import { useProductStore } from '../../../store/Order.store';

// // const productStore = useProductStore()


// // onMounted(async()=>{
// //     await productStore.getHomepageBanner()
// // })

// </script>