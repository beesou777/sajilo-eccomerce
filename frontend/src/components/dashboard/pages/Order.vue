<template>
    <div class="order-container px-3">
        <p class="h3 fw-normal">Orders</p>
        <div class="order-options p-4 d-flex justify-content-between align-items-center">
            <ul class="d-flex gap-3 p-0">
                <li :class="{'active_status':active_status === 'All'}" @click="setActiveStatus('All')">All</li>
                <li :class="{'active_status':active_status === 'Draft'}" @click="setActiveStatus('Draft')">Draft</li>
                <li :class="{'active_status':active_status === 'Pending'}" @click="setActiveStatus('Pending')">Pending</li>
                <li :class="{'active_status':active_status === 'Delivered'}" @click="setActiveStatus('Delivered')">Delivered</li>
                <li :class="{'active_status':active_status === 'Cancelled'}" @click="setActiveStatus('Cancelled')">Cancelled</li>
                <li :class="{'active_status':active_status === 'Returned'}" @click="setActiveStatus('Returned')">Returned</li>
            </ul>
            <div class="search-container position-relative d-flex gap-3 align-items-center">
                <div class="input_form">
                    <input type="search" class="search-input flex-grow-1 pl-3" v-model="searchQuery"
                        @input="onInputChange($event.target.value)" @click="focusInput" placeholder="search by name or email" />
                </div>
                <div class="button-wrapper">
                    <button @click="router.push('/dashboard/order/add')">Add Orders</button>
                </div>
            </div>
        </div>

        <table class="order-table text-center w-100">
            <thead>
                <tr>
                    <th class="p-3">Customer Name</th>
                    <th class="p-3">Total Price</th>
                    <th class="p-3">Payment Status</th>
                    <th class="p-3">Order Status </th>
                    <th class="p-3">Payment Method</th>
                    <th class="p-3">Created At</th>
                    <th class="p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(data, index) in fetchAllOrder" :key="index">
                    <td class="p-2">{{ data?.customer_details?.name }}</td>
                    <td class="p-2">{{ data?.final_price }}</td>
                    <td class="p-2 fw-medium" :class="{
                        'text-danger': data?.payment_status == 'Unpaid',
                        'text-success': data.payment_status !== 'Unpaid'
                    }">
                        {{ data?.payment_status }}
                    </td>
                    <td class="p-2 fw-medium"
                        :class="{ 'text-danger': data?.order_status == 'Cancell', 'text-warning': data.order_status == 'Pending', 'text-warning': data.order_status == 'Pending', 'text-success': data.order_status == 'Delivered' }">
                        {{ data?.order_status }}</td>
                    <td class="p-2">{{ data?.payment_method }}</td>
                    <td class="p-2">{{ data?.createdAt.slice(0, 10) }}</td>
                    <td class="p-2 d-flex align-items-center justify-content-center">
                        <button class="btn" @click="deleteId(index)">Delete</button>
                        <button class="btn" @click="showDetails(index)">Details</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="overlay" v-if="isDetailsShown || isDeleteShown || isEditShippingAddress" @click="removerId"></div>

        <!-- single order -->
        <div class="order-details position-absolute" v-if="isDetailsShown">
            <div class="text-end">
                <svg @click="isDetailsShown = false" width="14" height="14" viewBox="0 0 14 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L7 7L1 13M1 1L13 13" stroke="black" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>

            <div class="order-info bg-white p-3 mx-5">
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
                            <th class="fw-normal">{{ singleOrder?._id }}</th>
                            <th class="fw-normal">{{ singleOrder?.customer_details?.name }}
                            </th>
                            <th class="fw-normal">{{ singleOrder?.order_status }} <span>
                                    <svg @click="showStatus" width="26" height="24" viewBox="0 0 26 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.6589 15.7181L19.0635 14.2676C19.283 14.0409 19.6649 14.1996 19.6649 14.526V21.1169C19.6649 22.3181 18.7211 23.2927 17.5579 23.2927H2.10695C0.943738 23.2927 0 22.3181 0 21.1169V5.16087C0 3.95964 0.943738 2.98506 2.10695 2.98506H14.1122C14.4238 2.98506 14.5819 3.37489 14.3624 3.60607L12.9577 5.05662C12.8919 5.12461 12.8041 5.16087 12.7075 5.16087H2.10695V21.1169H17.5579V15.972C17.5579 15.8768 17.593 15.7861 17.6589 15.7181ZM24.5328 6.57062L13.006 18.4742L9.03794 18.9275C7.88789 19.0589 6.90904 18.0571 7.03634 16.8604L7.47528 12.7626L19.0021 0.859101C20.0072 -0.178945 21.6314 -0.178945 22.6322 0.859101L24.5284 2.81734C25.5336 3.85538 25.5336 5.53711 24.5328 6.57062ZM20.196 7.9713L17.6457 5.33766L9.49006 13.7644L9.16962 16.7244L12.036 16.3935L20.196 7.9713ZM23.0404 4.35854L21.1441 2.40031C20.9642 2.21445 20.6701 2.21445 20.4945 2.40031L19.1381 3.80099L21.6884 6.43463L23.0448 5.03395C23.2203 4.84357 23.2203 4.54439 23.0404 4.35854Z"
                                            fill="black" />
                                    </svg></span></th>
                            <th class="fw-normal">{{ singleOrder?.payment_status }} <span>
                                    <svg @click="showStatus" width="26" height="24" viewBox="0 0 26 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.6589 15.7181L19.0635 14.2676C19.283 14.0409 19.6649 14.1996 19.6649 14.526V21.1169C19.6649 22.3181 18.7211 23.2927 17.5579 23.2927H2.10695C0.943738 23.2927 0 22.3181 0 21.1169V5.16087C0 3.95964 0.943738 2.98506 2.10695 2.98506H14.1122C14.4238 2.98506 14.5819 3.37489 14.3624 3.60607L12.9577 5.05662C12.8919 5.12461 12.8041 5.16087 12.7075 5.16087H2.10695V21.1169H17.5579V15.972C17.5579 15.8768 17.593 15.7861 17.6589 15.7181ZM24.5328 6.57062L13.006 18.4742L9.03794 18.9275C7.88789 19.0589 6.90904 18.0571 7.03634 16.8604L7.47528 12.7626L19.0021 0.859101C20.0072 -0.178945 21.6314 -0.178945 22.6322 0.859101L24.5284 2.81734C25.5336 3.85538 25.5336 5.53711 24.5328 6.57062ZM20.196 7.9713L17.6457 5.33766L9.49006 13.7644L9.16962 16.7244L12.036 16.3935L20.196 7.9713ZM23.0404 4.35854L21.1441 2.40031C20.9642 2.21445 20.6701 2.21445 20.4945 2.40031L19.1381 3.80099L21.6884 6.43463L23.0448 5.03395C23.2203 4.84357 23.2203 4.54439 23.0404 4.35854Z"
                                            fill="black" />
                                    </svg></span> </th>
                            <th class="fw-normal">{{ singleOrder?.payment_method }}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex mx-5">
                <div class="orders bg-white p-3 mt-4 me-3 w-100">
                    <div class="border-bottom mb-3">
                        <p class="head-4 fw-bold">Order Summary</p>
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
                        <p class="body-1">{{ singleOrder?.total_price }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="head-5 fw-medium">Discount Amount</p>
                        <p class="body-1">{{ singleOrder?.discount_amount }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="head-5 fw-medium">Tax</p>
                        <p class="body-1">-{{ singleOrder?.tax_price }}</p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <p class="head-5 fw-bold">Total</p>
                        <p class="body-1 fw-bold">{{ singleOrder?.final_price }}</p>
                    </div>
                </div>
                <div class="customer-details bg-white w-100 mt-4 ms-3 p-3">
                    <div class="d-flex justify-content-between">
                        <p class="head-4 fw-medium">Shipping and Customer Details</p>
                        <svg @click="showShippingDetails" width="26" height="24" viewBox="0 0 26 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.6589 15.7181L19.0635 14.2676C19.283 14.0409 19.6649 14.1996 19.6649 14.526V21.1169C19.6649 22.3181 18.7211 23.2927 17.5579 23.2927H2.10695C0.943738 23.2927 0 22.3181 0 21.1169V5.16087C0 3.95964 0.943738 2.98506 2.10695 2.98506H14.1122C14.4238 2.98506 14.5819 3.37489 14.3624 3.60607L12.9577 5.05662C12.8919 5.12461 12.8041 5.16087 12.7075 5.16087H2.10695V21.1169H17.5579V15.972C17.5579 15.8768 17.593 15.7861 17.6589 15.7181ZM24.5328 6.57062L13.006 18.4742L9.03794 18.9275C7.88789 19.0589 6.90904 18.0571 7.03634 16.8604L7.47528 12.7626L19.0021 0.859101C20.0072 -0.178945 21.6314 -0.178945 22.6322 0.859101L24.5284 2.81734C25.5336 3.85538 25.5336 5.53711 24.5328 6.57062ZM20.196 7.9713L17.6457 5.33766L9.49006 13.7644L9.16962 16.7244L12.036 16.3935L20.196 7.9713ZM23.0404 4.35854L21.1441 2.40031C20.9642 2.21445 20.6701 2.21445 20.4945 2.40031L19.1381 3.80099L21.6884 6.43463L23.0448 5.03395C23.2203 4.84357 23.2203 4.54439 23.0404 4.35854Z"
                                fill="black" />
                        </svg>
                    </div>
                    <table class="d-flex gap-5 mt-3">
                        <thead>
                            <tr class="d-flex flex-column">
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Contact Number</th>
                                <th>City</th>
                                <th>Tole</th>
                                <th>name</th>
                                <th>Country</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="d-flex flex-column">
                                <th class="fw-normal">{{ singleOrder?.customer_details?.name }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.email }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.phone }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.city }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.tole }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.name }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.country }}</th>
                                <th class="fw-normal">{{ singleOrder?.customer_details?.address }}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- single order end -->

        <div class="delete-section" v-if="isDeleteShown">
            <p class="h4">Are you sure you want to delete this order?</p>
            <p class="small pt-3">Once you delete this it cannot be undone</p>
            <div class="button-wrapper d-flex gap-2 py-3 w-100">
                <button class="w-100" @click="deleteOrder">Delete</button>
                <button class="w-100" @click="removerId">Cancel</button>
            </div>
        </div>

        <!-- update shipping address -->
        <div class="update-shipping_address bg-white" v-if="isEditShippingAddress">
            <p class="h3 fw-semibold pb-2">Update shipping Address</p>
            <form @submit.prevent>
                <div class="d-flex gap-3 my-2">
                    <div class="input_form w-100">
                        <label for="name" class="small fw-medium">Full Name</label>
                        <input type="text" id="name" v-model="name" />
                    </div>
                    <div class="input_form w-100">
                        <label for="email" class="small fw-medium">E-mail</label>
                        <input type="email" id="email" v-model="email" />
                    </div>
                </div>
                <div class="d-flex gap-3 my-2">
                    <div class="input_form w-100">
                        <label for="address" class="small fw-medium">Address</label>
                        <input type="text" id="address" v-model="address" />
                    </div>
                    <div class="input_form w-100">
                        <label for="city" class="small fw-medium">City</label>
                        <input type="text" id="city" v-model="city" />
                    </div>
                </div>
                <div class="d-flex gap-3 my-2">
                    <div class="input_form w-100">
                        <label for="tole" class="small fw-medium">Tole</label>
                        <input type="text" id="tole" v-model="tole" />
                    </div>
                    <div class="input_form w-100">
                        <label for="phone" class="small fw-medium">phone</label>
                        <input type="number" id="phone" v-model="phone" />
                    </div>
                </div>
                <div class="input_form w-100">
                    <label for="country" class="small fw-medium">Country</label>
                    <input type="text" id="country" v-model="country" />
                </div>
                <div class="button-wrapper mt-3 d-flex gap-3">
                    <button class="w-100 fw-semibold" @click="updateShippingAddress">Update</button>
                    <button class="w-100 fw-semibold text-300" @click="isEditShippingAddress = false">Cancel</button>
                </div>
            </form>
        </div>
        <div class="update-overlay" v-if="isEditShippingAddress || isStatus" @click="removeOverlay"></div>
        <!-- end of update shipping -->
        <!-- update order status -->
        <div class="update-order-status bg-white" v-if="isStatus">
            <p class="h3 fw-semibold pb-2">Update Status</p>
            <form @submit.prevent>
                <div class="input_form w-100">
                    <label for="address" class="small fw-medium">Order Status</label>
                    <select class="w-100" v-model="order_status">
                        <option>Pending</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                        <option>Draft</option>
                        <option>Returned</option>
                    </select>
                </div>
                <div class="input_form w-100">
                    <label for="address" class="small fw-medium">Payment Status</label>
                    <select class="w-100" v-model="payment_status">
                        <option>Unpaid</option>
                        <option>Paid</option>
                    </select>
                </div>

                <div class="button-wrapper mt-3 d-flex gap-3">
                    <button class="w-100 fw-semibold" @click="updateStatus">Update</button>
                    <button class="w-100 fw-semibold text-300" @click="isStatus = false">Cancel</button>
                </div>
            </form>
        </div>
        <!-- end of update order status -->

    </div>
</template>

<script setup>
// imports
import { computed, onMounted, ref } from 'vue';
import { useAuthStore, useOrderStore, router } from '@utility'

// stores
const authStore = useAuthStore()
const orderStore = useOrderStore()

// data
const address = ref("")
const city = ref("")
const country = ref("")
const tole = ref("")
const name = ref("")
const phone = ref()
const email = ref("")
const searchQuery = ref("")
const payment_status = ref("")
const order_status = ref("")
const debounceTimer = ref(null)
const active_status = ref('All')
// boolean data
const isDetailsShown = ref(false)
const isDeleteShown = ref(false)
const isEditShippingAddress = ref(false)
const isStatus = ref(false)
const isLoading = ref(true)
const showResults = ref(false)

// mounted
onMounted(async () => {
    const uuid = authStore.uuid
    orderStore.uuid = uuid
    await orderStore.getOrderData(searchQuery)
})


// computed
const fetchAllOrder = computed(() => {
    if(active_status.value == "All"){
        return orderStore?.order
    }
    else{
        return orderStore?.order?.filter((data)=>{
            if(data?.order_status == active_status.value){
                return data
            }
        })
    }
})

const singleOrder = computed(() => {
    return orderStore?.single_order
})

// methods
// @desc send id 
const showDetails = async (index) => {
    const order = orderStore.order[index]._id
    orderStore.order_id = order
    await orderStore.getSingleOrder(order)
    if (orderStore.single_order !== null) {
        isDetailsShown.value = true
    }
}

// @desc it will send it to store wont delete
const deleteId = (index) => {
    const order_id = orderStore?.order[index]._id
    orderStore.order_id = order_id
    if (orderStore.order_id !== null) {
        isDeleteShown.value = true
    }
}

const deleteOrder = async () => {
    await orderStore.deleteOrder()
    isDeleteShown.value = false
}


const removerId = () => {
    orderStore.order_id = null
    isDeleteShown.value = false
    isDetailsShown.value = false
}

const showOverlay = () => {
    isDeleteShown.value = false
    isDetailsShown.value = false
    isEditShippingAddress.value = false
    isStatus.value = false
}

const showShippingDetails = () => {
    isEditShippingAddress.value = true
    address.value = orderStore?.single_order?.customer_details?.address
    city.value = orderStore?.single_order?.customer_details?.city
    name.value = orderStore?.single_order?.customer_details?.name
    tole.value = orderStore?.single_order?.customer_details?.tole
    country.value = orderStore?.single_order?.customer_details?.country
    email.value = orderStore?.single_order?.customer_details?.email
    phone.value = orderStore?.single_order?.customer_details?.phone
}

const updateShippingAddress = async () => {
    const data = {
        address: address.value,
        city: city.value,
        tole: tole.value,
        name: name.value,
        country: country.value,
        phone: phone.value,
        email: email.value
    }
    const res = await orderStore.updateShippingAddress(data)
    if (res.status == 200) {
        isEditShippingAddress.value = false
    }

}

const showStatus = () => {
    isStatus.value = true
    order_status.value = orderStore?.single_order?.order_status
    payment_status.value = orderStore?.single_order?.payment_status
}

const removeOverlay = () => {
    isStatus.value = false,
        isEditShippingAddress.value = false
}

const updateStatus = async () => {
    const data = {
        order_status: order_status.value,
        payment_status: payment_status.value
    }
    const res = await orderStore.updateOrderStatus(data)
    if (res.status == 200) {
        isStatus.value = false
    }
}

const focusInput = () => {
    if (orderStore.order.length > 0) {
        showResults.value = true;
        isLoading.value = false;
    } else {
        onInputChange();
        showResults.value = true;
    }
}

const onInputChange = () => {
    clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
        search();
    }, 400);
}

const search = async () => {
    showResults.value = true;
    isLoading.value = true
    try {
        await orderStore.getOrderData(searchQuery.value)
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        isLoading.value = false;
        active_status.value = "All"
    }
}

const setActiveStatus = (status)=>{
    active_status.value = status
}
</script>

<style lang="scss" scoped>
@import "@style/base/variable.scss";
@import "@style/base/utility.scss";
@import "@style/components/dashboard/_appearance.scss";
</style>