<template>
    <div class="create-order-container container">
        <p class="h3 fw-normal">Orders</p>

        <!-- add product section -->
        <div class="add-product bg-white mb-4 p-3">
            <div class="d-flex justify-content-between align-items-center">
                <p class="h4">Products</p>
                <div class="button-wrapper">
                    <button class="btn-pri" @click="focusInput">Select Product</button>
                </div>
            </div>
            <div class="products d-flex align-items-center justify-content-between" v-for="(data, index) in displayProduct"
                :key="index">
                <div class="d-flex align-items-center gap-3">
                    <div class="img-wrapper">
                        <img :src="data.product.product_images" alt="image">
                    </div>
                    <div class="d-flex flex-column gap-1">
                        <p class="product-name body-1 fw-medium">{{ data.product.product_name }}</p>
                        <div class="d-flex gap-3">
                            <p class="price">{{ data.product.selling_price }}</p>
                            <select v-model="data.quantity">
                                <option selected>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                    </div>
                </div>
                <p class="total_price fw-semibold">{{ data.product.selling_price * data.quantity }}</p>
            </div>
        </div>
        <div class="product-overlay" v-if="isAddProductClicked" @click="isAddProductClicked = false"></div>
        <div class="product-model bg-white p-3" v-if="isAddProductClicked">
            <div class="search-container mb-4 d-flex justify-content-between align-items-center">
                <div class="form-input">
                    <input type="search" class="search-input flex-grow-1 pl-3" v-model="searchQuery"
                        @input="onInputChange($event.target.value)" @click="focusInput" />
                </div>
                <div class="button-wrapper">
                    <button class="btn-pri" @click="addProduct">add product</button>
                </div>
            </div>
            <div class="products d-flex align-items-center " :class="{ 'active': index == activeSelectedProduct }"
                v-for="(data, index) in fetchProduct" :key="index" @click="selectProduct(index)">
                <div class="img-wrapper">
                    <img :src="data.product_images" alt="">
                </div>
                <div class="d-flex flex-column ms-4">
                    <p class="h5">{{ data.product_name }}</p>
                    <p class="text-muted">{{ data.selling_price }}</p>
                </div>
            </div>
        </div>
        <!-- add product section -->
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
                    <button class="fw-semibold btn-pri" @click="createOrder">Create Order</button>
                </div>
            </div>

        </div>
        <!-- end of update shipping -->
    </div>
</template>

<script setup>
// imports
import { useAuthStore, useOrderStore, useProductStore } from '@utility'
import { computed, onMounted, ref } from 'vue';

// stores
const authStore = useAuthStore()
const orderStore = useOrderStore()
const productStore = useProductStore()

// data
const address = ref("")
const city = ref("")
const country = ref("")
const tole = ref("")
const name = ref("")
const email = ref("")
const phone = ref()
const delivery_charges = ref(0.0)
const discount_amount = ref(0.0)
const searchQuery = ref("")
const productsArray = ref([])
const selectedProduct = ref(null)
const activeSelectedProduct = ref(null)
const debounceTimer = ref(null)
// boolean data
const isAddProductClicked = ref(false)
const showResults = ref(false)
const isLoading = ref(true)

// mounted
onMounted(async () => {
    const uuid = authStore.uuid
    productStore.uuid = uuid
    orderStore.uuid = uuid
})


// computed
const fetchProduct = computed(() => {
    return productStore?.search_product
})

const displayProduct = computed(() => {
    return productsArray.value
})

// methods
const selectProduct = (index) => {
    const id = productStore.search_product[index]
    selectedProduct.value = selectedProduct.value === index ? null : id
    activeSelectedProduct.value = activeSelectedProduct.value === index ? null : index
}

const addProduct = () => {
    if (!productsArray.value.includes(selectedProduct.value)) {
        const newProduct = {
            product: selectedProduct.value,
            quantity: 1
        }
        productsArray.value.push(newProduct)
        isAddProductClicked.value = false
    }
}

const createOrder = async () => {
    const orderItems = productsArray.value.map(product => ({
        product: product.product._id, // Assuming `product` contains the product id
        quantity: product.quantity
    }));

    const customerDetails = {
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        country: country.value,
        tole: tole.value,
        city: city.value
    };

    const data = {
        orderItems,
        customer_details: customerDetails
    };

    await orderStore.createOrder(data)

    // Now you can send the `data` object to your API or perform further actions
};

const focusInput = () => {
    isAddProductClicked.value = true
    if (productStore.search_product.length > 0) {
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
        await productStore.getSearchResult(searchQuery.value)
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style lang="scss" scoped>
@import "@utility_style";
@import "@style/components/dashboard/create-order";
</style>