<template>
  <div class="personal-details-page">
    <div class="personal-details-card p-3">
      <p class="h4">Edit your details</p>

      <div class="input_form my-2">
        <label for="store_name" class="small fw-medium">Store Name</label>
        <input type="text" class="w-100" id="store_name" v-model="store_name" />
      </div>

      <div class="input_form my-2">
        <label for="name" class="small fw-medium">First Name</label>
        <input type="text" class="w-100" id="name" v-model="first_name" />
      </div>

      <div class="input_form my-2">
        <label for="name" class="small fw-medium">Last Name</label>
        <input type="text" class="w-100" id="name" v-model="last_name" />
      </div>

      <div class="input_form my-2">
        <label for="" class="small fw-medium">E-mail</label>
        <input type="text" class="w-100" disabled v-model="email" />
      </div>

      <div class="button-wrapper mt-4">
        <button class="w-100 body-2 fw-semibold" @click="updateDetails">Save your details</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref,onMounted } from 'vue';
import { useAuthStore } from '@store/authentication';
  const authStore = useAuthStore()
  const store_name = ref("")
  const first_name = ref("")
  const last_name = ref("")
  const email = ref("")

  onMounted(()=>{
    store_name.value = authStore.user_details.store_name
    first_name.value = authStore.user_details.first_name
    last_name.value = authStore.user_details.last_name
    email.value = authStore.user_details.email
  })

  const updateDetails = async()=>{
    const data = {
        store_name:store_name.value,
        first_name:first_name.value,
        last_name:last_name.value
    }
    await authStore.updateUserDetails(data)

  }

</script>
  <style lang="scss" scoped>
@import "@style/components/dashboard/_user-profile.scss";
</style>