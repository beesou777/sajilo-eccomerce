<template>
    <div class="order-container px-3">
        <p class="h3 fw-normal">Orders</p>
        <div class="order-options p-4 d-flex justify-content-between align-items-center">
            <ul class="d-flex gap-3 p-0">
                <li>All</li>
                <li>Draft</li>
                <li>Pending</li>
                <li>Delivered</li>
                <li>Cancelled</li>
                <li>Returned</li>
            </ul>
            <div class="search-container position-relative">
                <div class="input_form">
                    <input type="text" placeholder="search order" v-model="search">
                </div>
            </div>
        </div>

        <table class="order-table text-center w-100">
            <thead>
                <tr>
                    <th class="p-3">Customer Name</th>
                    <th class="p-3">Total Price</th>
                    <th class="p-3">Payment Status</th>
                    <th class="p-3">Deliver Status </th>
                    <th class="p-3">Payment Method</th>
                    <th class="p-3">Created At</th>
                    <th class="p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in fetchAllOrder" :key="index">
                    <td class="p-2">{{ data?.user?.first_name }} {{ data?.user?.last_name }}</td>
                    <td class="p-2">{{ data?.finalPrice }}</td>
                    <td class="p-2"
                     :class="{ 'text-danger': data?.paymentResult == 'Unpaid',
                      'text-success' : data.paymentResult !== 'Unpaid'}">
                      {{ data?.paymentResult }}
                      </td>
                    <td class="p-2" :class="{ 'text-danger': data?.deliver_status == 'Cancell', 'text-warning' : data.deliver_status == 'Pending','text-warning' : data.deliver_status == 'Pending','text-success' : data.deliver_status == 'Delivered'}">{{ data?.deliver_status }}</td>
                    <td class="p-2">{{ data?.paymentMethod }}</td>
                    <td class="p-2">{{ data?.createdAt.slice(0, 10) }}</td>
                    <td class="p-2 d-flex">
                        <button class="btn">Delete</button>
                        <button class="btn" @click="showDetails(index)">Details</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="overlay" v-if="isDetailsShown" @click="isDetailsShown = false"></div>

        <!-- single order -->
        <div class="order-details position-absolute" v-if="isDetailsShown && productStore.single_order !== null">
            <div class="text-end m-3">
                <svg @click="isDetailsShown = false" width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L7 7L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <div class="order-info bg-white mt-4 p-3 mx-5">
                <table class="d-flex gap-5">
                    <thead>
                        <tr class="d-flex flex-column">
                            <th>Order Id</th>
                            <th>Created By</th>
                            <th>Order Status</th>
                            <th>Payment status</th>
                            <th>Payment Method</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="d-flex flex-column">
                            <th class="fw-normal">{{ singleOrder._id }}</th>
                            <th class="fw-normal">{{ singleOrder?.user?.first_name }} {{ singleOrder?.user?.last_name }}
                            </th>
                            <th class="fw-normal">{{ singleOrder?.deliver_status }}</th>
                            <th class="fw-normal">{{ singleOrder?.paymentResult }}</th>
                            <th class="fw-normal">{{ singleOrder?.paymentMethod }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex mx-5">
                <div class="orders bg-white p-3 mt-4 me-3 w-100">
                    <div class="border-bottom">
                        <p class="head-4 fw-medium">Order Summary</p>
                        <p class="head-4 fw-medium mb-3">Order Items</p>
                    </div>
                    <div class="order-data">
                        <div class="ordered-product" v-for="(data, index) in singleOrder?.orderItems" :key="index">
                            <div class="img-wrapper">
                                <img :src="data.product.product_images" :alt="data.product.product_name">
                            </div>
                            <span class="ms-4">{{ data?.product.product_name }}</span>
                            <span class="ms-4">{{ data?.product.selling_price }} x {{ data.quantity }}</span>
                            <span class="ms-4">{{ data?.product.selling_price * data?.quantity }}</span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center pt-3">
                        <p class="head-5 fw-medium">Sub Total</p>
                        <p class="body-1">{{ singleOrder.totalPrice }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="head-5 fw-medium">Discount Amount</p>
                        <p class="body-1">{{ singleOrder.discountPercent }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="head-5 fw-medium">Tax</p>
                        <p class="body-1">-{{ singleOrder.taxPrice }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="head-5 fw-medium">Total</p>
                        <p class="body-1">{{ singleOrder.finalPrice }}</p>
                    </div>
                </div>
                <div class="customer-details bg-white w-100 mt-4 ms-3 p-3">
                    <div class="d-flex justify-content-between">
                        <p class="head-4 fw-medium">Shipping Details</p>
                        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.6589 15.7181L19.0635 14.2676C19.283 14.0409 19.6649 14.1996 19.6649 14.526V21.1169C19.6649 22.3181 18.7211 23.2927 17.5579 23.2927H2.10695C0.943738 23.2927 0 22.3181 0 21.1169V5.16087C0 3.95964 0.943738 2.98506 2.10695 2.98506H14.1122C14.4238 2.98506 14.5819 3.37489 14.3624 3.60607L12.9577 5.05662C12.8919 5.12461 12.8041 5.16087 12.7075 5.16087H2.10695V21.1169H17.5579V15.972C17.5579 15.8768 17.593 15.7861 17.6589 15.7181ZM24.5328 6.57062L13.006 18.4742L9.03794 18.9275C7.88789 19.0589 6.90904 18.0571 7.03634 16.8604L7.47528 12.7626L19.0021 0.859101C20.0072 -0.178945 21.6314 -0.178945 22.6322 0.859101L24.5284 2.81734C25.5336 3.85538 25.5336 5.53711 24.5328 6.57062ZM20.196 7.9713L17.6457 5.33766L9.49006 13.7644L9.16962 16.7244L12.036 16.3935L20.196 7.9713ZM23.0404 4.35854L21.1441 2.40031C20.9642 2.21445 20.6701 2.21445 20.4945 2.40031L19.1381 3.80099L21.6884 6.43463L23.0448 5.03395C23.2203 4.84357 23.2203 4.54439 23.0404 4.35854Z"
                                fill="black" />
                        </svg>
                    </div>
                    <table class="d-flex gap-5 mt-3">
                        <thead>
                            <tr class="d-flex flex-column">
                                <th>City</th>
                                <th>Tole</th>
                                <th>Postal Code</th>
                                <th>Country</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="d-flex flex-column">
                                <th class="fw-normal">{{ singleOrder.shippingAddress.city }}</th>
                                <th class="fw-normal">{{ singleOrder.shippingAddress.tole }}</th>
                                <th class="fw-normal">{{ singleOrder.shippingAddress.postalCode }}</th>
                                <th class="fw-normal">{{ singleOrder.shippingAddress.country }}</th>
                                <th class="fw-normal">{{ singleOrder.shippingAddress.address }}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- single order end -->

        <div class="delete-section">
            <p class="h4">Are you sure you want to delete this order?</p>
            <p class="small pt-3">Once you delete this it cannot be undone</p>
            <div class="button-wrapper d-flex gap-2 py-3 w-100">
                <button class="w-100">Delete</button>
                <button class="w-100">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '../../../store/authentication';
import { useProductStore } from '../../../store/products';
const authStore = useAuthStore()
const productStore = useProductStore()

const isDetailsShown = ref(true)

onMounted(async () => {
    const uuid = authStore.uuid
    productStore.uuid = uuid
    await productStore.getOrderData()
})

const fetchAllOrder = computed(() => {
    return productStore?.order
})

// @desc send id 
const showDetails = async (index) => {
    const order = productStore.order[index]
    await productStore.getSingleOrder(order._id)
    if (productStore.single_order !== null) {
        isDetailsShown.value = true
    }
}

const singleOrder = computed(() => {
    return productStore?.single_order
})

</script>

<style lang="scss" scoped>
@import "../../../styles/base/variable.scss";
@import "../../../styles/base/utility.scss";
@import "../../../styles/components/dashboard/order";
</style>