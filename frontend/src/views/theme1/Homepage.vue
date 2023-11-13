<template>
  <div class="container-max home-page" v-if="homepageData">
    <div class="header-page position-relative">
      <img
        :src="homepageData.image"
        alt=""
        class="position-absolute"
      />
      <div class="banner-content">
        <p class="head-1">{{ homepageData.heading }}</p>
        <p class="body-2">{{ homepageData.smallText }}</p>
      </div>
    </div>
    <div class="top-category py-3 px-5">
      <p class="head-1">Tops</p>
      <div class="products-container row">
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex gap-2">
              <p class="head-4">₹41</p>
              <p class="head-4 text-decoration-line-through text-muted">₹48</p>
              <p class="head-4">[₹7 OFF]</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex">
              <p class="head-4">₹41</p>
              <p class="head-4 text-line-through">₹48</p>
              <p class="head-4">₹7 OFF</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex">
              <p class="head-4">₹41</p>
              <p class="head-4 text-line-through">₹48</p>
              <p class="head-4">₹7 OFF</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex">
              <p class="head-4">₹41</p>
              <p class="head-4 text-line-through">₹48</p>
              <p class="head-4">₹7 OFF</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top-category py-3 px-5">
      <p class="head-1">Bottoms</p>
      <div class="products-container row">
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex gap-2">
              <p class="head-4">₹41</p>
              <p class="head-4 text-decoration-line-through text-muted">₹48</p>
              <p class="head-4">[₹7 OFF]</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex">
              <p class="head-4">₹41</p>
              <p class="head-4 text-line-through">₹48</p>
              <p class="head-4">₹7 OFF</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex">
              <p class="head-4">₹41</p>
              <p class="head-4 text-line-through">₹48</p>
              <p class="head-4">₹7 OFF</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="products">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="body-2">Rare tee - black</p>
            <div class="d-flex">
              <p class="head-4">₹41</p>
              <p class="head-4 text-line-through">₹48</p>
              <p class="head-4">₹7 OFF</p>
            </div>
            <div class="button-wrapper py-2">
              <button class="btn btn-dark w-100">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="explore-other-style py-3 px-5">
      <p class="head-1">Explore Other Styles</p>
      <div class="products-container row">
        <div class="col-md-3 col-lg-3 col-sm-12">
          <div class="category">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="head-4 py-3">Tops</p>
          </div>
        </div>
        <div class="col-md-3 col-lg-3 col-sm-12">
          <div class="category">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="head-4 py-3">Bottom</p>
          </div>
        </div>
        <div class="col-md-3 col-lg-3 col-sm-12">
          <div class="category">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="head-4 py-3">Jumpers & Coveralls</p>
          </div>
        </div>
        <div class="col-md-3 col-lg-3 col-sm-12">
          <div class="category">
            <div class="image-wrapper">
              <img
                src="https://dukaan.b-cdn.net/700x700/webp/upload_file_service/asg/38920716-5549-4534-b3de-5016e6d6d3d8/L24A3408.jpg"
                alt=""
              />
            </div>
            <p class="head-4 py-3">Jumpers & Coveralls</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "../../store/products";
const productStore = useProductStore();

onMounted(async () => {
  await productStore.getSubDomainProduct();
  await productStore.getHomepageBanner()
});

const homepageData = computed(()=>{
  return productStore.homepageBanner ? productStore.homepageBanner : ""
})
</script>
<style scoped src="../../styles/components/theme1/_home-page.scss">
</style>