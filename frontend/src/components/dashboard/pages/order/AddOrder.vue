<template>
    <div class="create-order-container container">
        <p class="h3 fw-normal">Orders</p>
        
        <div class="add-product bg-white mb-4 p-3">
            <div class="d-flex justify-content-between align-items-center">
                <p class="h4">Products</p>
                <div class="button-wrapper">
                    <button>Select Product</button>
                </div>
            </div>
        </div>
        <!-- update shipping address -->
        <div class="order-points row">
            <div class="col-md-7">
                <div class="create-order bg-white">
                    <p class="h3 fw-semibold pb-2">Customer Details</p>
                    <form @submit.prevent>
                        <div class="d-flex gap-3 my-2">
                            <div class="input_form w-100">
                                <label for="full_name" class="small fw-medium">Full Name</label>
                                <input type="text" id="full_name" v-model="name" />
                            </div>
                            <div class="input_form w-100">
                                <label for="email" class="small fw-medium">E-mail</label>
                                <input type="email" id="email" v-model="email" />
                            </div>
                        </div>
                        <div class="d-flex gap-3 my-2">
                            <div class="input_form w-100">
                                <label for="phone" class="small fw-medium">Phone Number</label>
                                <input type="number" id="phone" v-model="phone" />
                            </div>
                            <div class="input_form w-100">
                                <label for="address" class="small fw-medium">Address</label>
                                <input type="text" id="address" v-model="address" />
                            </div>
                        </div>
                        <div class="d-flex gap-3 my-2">
                            <div class="input_form w-100">
                                <label for="country" class="small fw-medium">Country</label>
                                <input type="text" id="Country" v-model="country" />
                            </div>
                            <div class="input_form w-100">
                                <label for="tole" class="small fw-medium">tole</label>
                                <input type="text" id="tole" v-model="tole" />
                            </div>
                        </div>                                             
                        <div class="input_form w-100">
                            <label for="city" class="small fw-medium">City</label>
                            <input type="text" id="City" v-model="city" />
                        </div>
                    </form>
                </div>
            </div>
            <div class="col-md-5">
                <div class="create-order bg-white">
                    <p class="h3 fw-semibold pb-2">Delivery and Discounts</p>
                    <form @submit.prevent>
                        <div class="input_form w-100">
                            <label for="country" class="small fw-medium">Discount amount</label>
                            <input type="number" id="country" v-model="discount_amount" />
                        </div>
                        <div class="input_form w-100">
                            <label for="country" class="small fw-medium">Delivery Charges</label>
                            <input type="number" id="country" v-model="delivery_charges" />
                        </div>
                    </form>
                </div>
                <div class="button-wrapper mt-3 text-end">
                    <button class="fw-semibold" @click="updateShippingAddress">Create Order</button>
                </div>
            </div>

        </div>
        <!-- end of update shipping -->


    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '../../../../store/authentication';
import { useProductStore } from '../../../../store/products';
import router from '../../../../router/router';
const authStore = useAuthStore()
const productStore = useProductStore()

const address = ref("")
const city = ref("")
const country = ref("")
const tole = ref("")
const name = ref("")
const email = ref("")
const phone = ref()
const delivery_charges = ref(0.0)
const discount_amount = ref(0.0)

onMounted(async () => {
    const uuid = authStore.uuid
    productStore.uuid = uuid
    await productStore.getOrderData()
})
</script>

<style lang="scss" scoped>
@import "../../../../styles/base/variable.scss";
@import "../../../../styles/base/utility.scss";
@import "../../../../styles/components/dashboard/create-order";
</style>