<template>
  <div class="personal-details-page">
    <div class="personal-details-card p-3">
      <p class="h4">Update Password</p>

      <div class="input_form my-2">
        <label for="old_password" class="small fw-medium"
          >Current password</label
        >
        <input
          type="password"
          class="w-100"
          id="ld_password"
          v-model="current_password"
        />
      </div>

      <div class="input_form my-2">
        <label for="new_password" class="small fw-medium">New Password</label>
        <input
          type="password"
          class="w-100"
          id="new_password"
          v-model="new_password"
        />
      </div>

      <div class="input_form my-2">
        <label for="confirm_password" class="small fw-medium"
          >Confirm Password</label
        >
        <input
          type="password"
          class="w-100"
          id="confirm_password"
          v-model="confirm_password"
        />
      </div>
      <div class="button-wrapper mt-4">
        <button class="w-100 body-2 fw-semibold" @click="updatePassword">
          Update your password
        </button>
      </div>
    </div>
  </div>
</template>
 <script setup>
import { ref} from "vue";
import router from "../../../../router/router";
import { useAuthStore } from "../../../../store/authentication";
const authStore = useAuthStore();
const current_password = ref("");
const new_password = ref("");
const confirm_password = ref("");

const updatePassword = async() => {
 try {
  if(new_password.value.length >= 4){
    const data = {
      current_password:current_password.value,
      new_password:new_password.value,
      confirm_password:confirm_password.value
    }
    await authStore.updatePassword(data)
  }
 } catch (error) {
  console.log("error")
 }

};
</script>
    <style lang="scss" scoped>
@import "../../../../styles/components/dashboard/_user-profile.scss";
</style>